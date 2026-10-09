import { useAppStore } from '../store/useAppStore';
import { resolveAudioUrl } from '../data/audioManifest';

let thaiVoice: SpeechSynthesisVoice | null = null;
let audioInitialized = false;
let currentSpeakingId: string | null = null;
let currentAudio: HTMLAudioElement | null = null;
const speakingListeners: Set<() => void> = new Set();

// In-memory audio blob cache: Thai text → blob URL
const audioCache = new Map<string, string>();

// ──────────────────────────────────────────────
// Setup
// ──────────────────────────────────────────────

function findThaiVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === 'th-TH') ??
    voices.find((v) => v.lang.includes('th') || v.lang.includes('TH')) ??
    null
  );
}

function loadVoices(): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  thaiVoice = findThaiVoice();
  if (!thaiVoice) {
    window.speechSynthesis.onvoiceschanged = () => {
      thaiVoice = findThaiVoice();
    };
  }
}

function initAudio(): void {
  if (audioInitialized || typeof window === 'undefined') return;
  const handler = () => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance('');
      utterance.volume = 0;
      window.speechSynthesis.speak(utterance);
    }
    loadVoices();
    audioInitialized = true;
    document.removeEventListener('touchstart', handler, true);
    document.removeEventListener('click', handler, true);
  };
  document.addEventListener('touchstart', handler, { capture: true, once: true });
  document.addEventListener('click', handler, { capture: true, once: true });
}

export function setupTTS(): void {
  loadVoices();
  initAudio();
}

// ──────────────────────────────────────────────
// Audio control
// ──────────────────────────────────────────────

export function stopAudio(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  currentSpeakingId = null;
  notifyListeners();
}

// ──────────────────────────────────────────────
// Google Translate TTS via Vite proxy
// ──────────────────────────────────────────────

/**
 * Fetches audio from Google Translate TTS through the Vite dev proxy
 * (/api/tts → translate.google.com/translate_tts).
 * Same-origin request = no CORS issues.
 * Caches the blob in memory so the second play is instant.
 */
function playGoogleTts(
  text: string,
  rate: number,
  phraseId: string | undefined,
  onEnd?: () => void,
  onError?: () => void,
): void {
  const cached = audioCache.get(text);

  const playBlob = (blobUrl: string) => {
    const audio = new Audio(blobUrl);
    currentAudio = audio;
    audio.playbackRate = rate;
    if ('preservesPitch' in audio) {
      (audio as HTMLAudioElement & { preservesPitch: boolean }).preservesPitch = true;
    }

    audio.onended = () => {
      currentAudio = null;
      currentSpeakingId = null;
      notifyListeners();
      onEnd?.();
    };

    audio.onerror = () => {
      currentAudio = null;
      audioCache.delete(text);
      onError?.();
    };

    const p = audio.play();
    if (p) p.catch(() => { currentAudio = null; onError?.(); });
  };

  if (cached) {
    playBlob(cached);
    return;
  }

  // Build the proxied URL (Vite rewrites /api/tts → /translate_tts on translate.google.com)
  const encoded = encodeURIComponent(text);
  const url = `/api/tts?ie=UTF-8&tl=th&client=tw-ob&q=${encoded}`;

  fetch(url)
    .then((r) => {
      if (!r.ok) throw new Error(`TTS ${r.status}`);
      return r.blob();
    })
    .then((blob) => {
      const blobUrl = URL.createObjectURL(blob);
      audioCache.set(text, blobUrl);
      // Only play if user hasn't triggered something else
      if (currentSpeakingId === phraseId || !phraseId) {
        playBlob(blobUrl);
      }
    })
    .catch(() => {
      onError?.();
    });
}

// ──────────────────────────────────────────────
// Native Web Speech API (last-resort fallback)
// ──────────────────────────────────────────────

function speakWithNativeTTS(
  text: string,
  rate: number,
  phraseId?: string,
  onEnd?: () => void
): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    currentSpeakingId = null;
    notifyListeners();
    onEnd?.();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'th-TH';
  utterance.rate = rate;
  utterance.pitch = 1.0;
  if (thaiVoice) utterance.voice = thaiVoice;

  if (phraseId) {
    currentSpeakingId = phraseId;
    notifyListeners();
  }

  utterance.onend = () => {
    currentSpeakingId = null;
    notifyListeners();
    onEnd?.();
  };

  utterance.onerror = () => {
    currentSpeakingId = null;
    notifyListeners();
  };

  window.speechSynthesis.speak(utterance);
}

// ──────────────────────────────────────────────
function playAudioUrl(
  url: string,
  rate: number,
  phraseId: string | undefined,
  onEnd?: () => void,
  onError?: () => void,
): void {
  const audio = new Audio(url);
  currentAudio = audio;
  audio.playbackRate = rate;
  if ('preservesPitch' in audio) {
    (audio as HTMLAudioElement & { preservesPitch: boolean }).preservesPitch = true;
  }

  audio.onended = () => {
    currentAudio = null;
    if (phraseId && currentSpeakingId === phraseId) {
      currentSpeakingId = null;
    } else if (!phraseId) {
      currentSpeakingId = null;
    }
    notifyListeners();
    onEnd?.();
  };

  audio.onerror = () => {
    currentAudio = null;
    if (phraseId && currentSpeakingId === phraseId) {
      currentSpeakingId = null;
    } else if (!phraseId) {
      currentSpeakingId = null;
    }
    notifyListeners();
    onError?.();
  };

  const p = audio.play();
  if (p) {
    p.catch(() => {
      currentAudio = null;
      if (phraseId && currentSpeakingId === phraseId) {
        currentSpeakingId = null;
      } else if (!phraseId) {
        currentSpeakingId = null;
      }
      notifyListeners();
      onError?.();
    });
  }
}

// ──────────────────────────────────────────────
// Main speak function
// ──────────────────────────────────────────────

/**
 * Speak Thai text.
 * Priority 1: Studio Neural MP3 from manifest (Premwadee / Niwat Neural)
 * Priority 2: Direct /audio/{phraseId}.mp3
 * Priority 3: Google Translate TTS via dev proxy
 * Priority 4: Native Web Speech API fallback
 */
export function speakThai(
  text: string,
  phraseId?: string,
  onEnd?: () => void,
  customRate?: number
): void {
  stopAudio();

  const store = useAppStore.getState();
  const rate = customRate ?? store.speechRate ?? 0.85;

  if (phraseId) {
    currentSpeakingId = phraseId;
    notifyListeners();
  }

  // 1. Studio Neural audio by ID or exact Thai text
  const staticUrl = resolveAudioUrl(phraseId, text);
  if (staticUrl) {
    playAudioUrl(staticUrl, rate, phraseId, onEnd, () => {
      playGoogleTts(text, rate, phraseId, onEnd, () => {
        speakWithNativeTTS(text, rate, phraseId, onEnd);
      });
    });
    return;
  }

  // 2. Direct ID fallback if phraseId is specified
  if (phraseId) {
    const directUrl = `/audio/${phraseId}.mp3`;
    playAudioUrl(directUrl, rate, phraseId, onEnd, () => {
      playGoogleTts(text, rate, phraseId, onEnd, () => {
        speakWithNativeTTS(text, rate, phraseId, onEnd);
      });
    });
    return;
  }

  // 3. Dynamic fallback
  playGoogleTts(text, rate, phraseId, onEnd, () => {
    speakWithNativeTTS(text, rate, phraseId, onEnd);
  });
}

// ──────────────────────────────────────────────
// Speaking state subscriptions
// ──────────────────────────────────────────────

export function getSpeakingId(): string | null {
  return currentSpeakingId;
}

export function subscribeToSpeaking(listener: () => void): () => void {
  speakingListeners.add(listener);
  return () => { speakingListeners.delete(listener); };
}

function notifyListeners(): void {
  speakingListeners.forEach((fn) => fn());
}
