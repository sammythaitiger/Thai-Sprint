import { Tone } from '../types/reading';
import { WordItem, Phrase } from '../types';
import { WORDS_DATA } from '../data/words';
import { WORD_BREAKDOWNS } from '../data/wordBreakdowns';
import { getWordTranslation, PHRASES_EN } from '../data/translationsEn';

/**
 * Detects tone from romanized transcription containing diacritic tone marks.
 * Supports standard Paiboon / Royal Thai General System conventions:
 * - Rising:  caron/breve (ǎ, ě, ǐ, ǒ, ǔ, ă, ĕ, ĭ, ŏ, ŭ, ǔa, ǐa, ǎw, ǒo)
 * - Falling: circumflex (â, ê, î, ô, û, âa, ôo, îa, ûa)
 * - Low:     grave (à, è, ì, ò, ù, àa, òo, ìa, ùe)
 * - High:    acute (á, é, í, ó, ú, áa, óo, ía, úa)
 * - Mid:     no accent
 */
export function detectToneFromTranscription(text: string): Tone {
  if (!text) return 'mid';

  // Rising tone: caron / breve
  if (/[ǎěǐǒǔăĕĭŏŭ]/.test(text) || text.includes('ˇ')) {
    return 'rising';
  }

  // Falling tone: circumflex
  if (/[âêîôû]/.test(text) || text.includes('^')) {
    return 'falling';
  }

  // Low tone: grave
  if (/[àèìòù]/.test(text) || text.includes('`')) {
    return 'low';
  }

  // High tone: acute
  if (/[áéíóú]/.test(text) || text.includes('´') || text.includes("'")) {
    return 'high';
  }

  return 'mid';
}

export interface SyllableToneInfo {
  text: string;
  tone: Tone;
}

/**
 * Parses word transcription into syllables with their corresponding tones.
 * e.g. "nák-rian" -> [{ text: "nák", tone: "high" }, { text: "rian", tone: "mid" }]
 */
export function parseWordSyllables(transcription: string): SyllableToneInfo[] {
  if (!transcription) return [];

  const parts = transcription.split(/[- ]+/).filter(Boolean);
  return parts.map((part) => ({
    text: part,
    tone: detectToneFromTranscription(part),
  }));
}

export interface PhraseSegmentDisplay {
  thai: string;
  transcription: string;
  meaningRu: string;
  meaningEn: string;
  tone: Tone;
}

// Fast lookup from Thai word to English translation in WORDS_DATA
const THAI_TO_WORD_ITEM = new Map<string, WordItem>();
WORDS_DATA.forEach((w) => {
  if (!THAI_TO_WORD_ITEM.has(w.thai)) {
    THAI_TO_WORD_ITEM.set(w.thai, w);
  }
});

/**
 * Returns segmented words for a phrase from WORD_BREAKDOWNS with both RU and EN translations.
 */
export function getPhraseSegments(phrase: Phrase): PhraseSegmentDisplay[] {
  const breakdown = WORD_BREAKDOWNS[phrase.id];

  if (breakdown && breakdown.length > 0) {
    return breakdown.map((item) => {
      const matchedWord = THAI_TO_WORD_ITEM.get(item.thai);
      const meaningEn = matchedWord
        ? getWordTranslation(matchedWord, 'en')
        : item.meaning; // fallback to RU if no EN found

      return {
        thai: item.thai,
        transcription: item.transcription,
        meaningRu: item.meaning,
        meaningEn,
        tone: detectToneFromTranscription(item.transcription),
      };
    });
  }

  // Fallback: split by space if no manual breakdown
  const tokens = phrase.thai.split(/\s+/).filter(Boolean);
  const transTokens = phrase.transcription.split(/\s+/).filter(Boolean);

  return tokens.map((token, i) => {
    const trans = transTokens[i] || '';
    const matchedWord = THAI_TO_WORD_ITEM.get(token);
    const meaningRu = matchedWord?.translation || phrase.translation;
    const meaningEn = matchedWord
      ? getWordTranslation(matchedWord, 'en')
      : PHRASES_EN[phrase.id] || phrase.translation;

    return {
      thai: token,
      transcription: trans,
      meaningRu,
      meaningEn,
      tone: detectToneFromTranscription(trans),
    };
  });
}
