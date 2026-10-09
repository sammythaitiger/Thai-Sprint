import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TabType, Language } from '../types';
import { PHRASES_DATA } from '../data/phrases';
import { WORDS_DATA } from '../data/words';

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
  }
  return shuffled;
}

interface AppState {
  currentTab: TabType;
  
  // 30-Day Curriculum Track State
  completedDays: number[];
  activeLessonDay: number | null;
  lessonQuizScores: Record<number, number>;

  // Trainer sub-mode & Dictionary sub-mode
  trainerMode: 'phrases' | 'words';
  dictionaryMode: 'phrases' | 'words';

  // Phrase Training State
  learnedPhraseIds: string[];
  sessionDeck: string[];
  currentCardIndex: number;
  selectedCategory: string | null;
  searchQuery: string;
  isFlipped: boolean;
  speechRate: number; // 0.5 | 0.65 | 0.8 | 1.0
  audioEngine: 'auto' | 'google' | 'native';

  // Word Training State
  learnedWordIds: string[];
  wordSessionDeck: string[];
  wordCurrentCardIndex: number;
  selectedWordCategory: string | null;
  wordSearchQuery: string;
  isWordFlipped: boolean;

  // Reading Module State
  activeReadingLessonId: number;
  completedReadingLessonIds: number[];
  readingSubTab: 'lessons' | 'words' | 'phrases' | 'matrix';
  learnedReadingWordIds: string[];
  learnedReadingPhraseIds: string[];
  setActiveReadingLessonId: (id: number) => void;
  markReadingLessonCompleted: (id: number) => void;
  setReadingSubTab: (tab: 'lessons' | 'words' | 'phrases' | 'matrix') => void;
  markReadingWordLearned: (id: string) => void;
  unmarkReadingWordLearned: (id: string) => void;
  toggleReadingWordLearned: (id: string) => void;
  markReadingPhraseLearned: (id: string) => void;
  unmarkReadingPhraseLearned: (id: string) => void;
  toggleReadingPhraseLearned: (id: string) => void;
  resetReadingWordsProgress: (category?: string | null) => void;
  resetReadingPhrasesProgress: (category?: string | null) => void;

  // Language
  language: Language;
  setLanguage: (lang: Language) => void;

  // Actions
  setTab: (tab: TabType) => void;
  setTrainerMode: (mode: 'phrases' | 'words') => void;
  setDictionaryMode: (mode: 'phrases' | 'words') => void;

  // Lesson actions
  markDayCompleted: (day: number) => void;
  setActiveLessonDay: (day: number | null) => void;
  saveQuizScore: (day: number, score: number) => void;

  // Phrase actions
  markLearned: (id: string) => void;
  unmarkLearned: (id: string) => void;
  markRepeat: (id: string) => void;
  resetSession: (category?: string | null) => void;
  resetCategoryLearned: (category?: string | null) => void;
  shuffleDeck: (category?: string | null) => void;
  toggleLearned: (id: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  setFlipped: (flipped: boolean) => void;
  setSpeechRate: (rate: number) => void;
  setAudioEngine: (engine: 'auto' | 'google' | 'native') => void;

  // Word actions
  markWordLearned: (id: string) => void;
  unmarkWordLearned: (id: string) => void;
  markWordRepeat: (id: string) => void;
  resetWordSession: (category?: string | null) => void;
  resetWordCategoryLearned: (category?: string | null) => void;
  shuffleWordDeck: (category?: string | null) => void;
  toggleWordLearned: (id: string) => void;
  setSelectedWordCategory: (category: string | null) => void;
  setWordSearchQuery: (query: string) => void;
  setWordFlipped: (flipped: boolean) => void;

  // Lesson actions
  resetLessonLearned: (wordIds: string[], phraseIds: string[]) => void;
}

const allPhraseIds = PHRASES_DATA.map((p) => p.id);
const allWordIds = WORDS_DATA.map((w) => w.id);

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentTab: 'lessons',
      trainerMode: 'phrases',
      dictionaryMode: 'phrases',

      // 30-Day Curriculum Track Defaults
      completedDays: [],
      activeLessonDay: null,
      lessonQuizScores: {},

      // Phrase defaults
      learnedPhraseIds: [],
      sessionDeck: shuffleArray(allPhraseIds),
      currentCardIndex: 0,
      selectedCategory: null,
      searchQuery: '',
      isFlipped: false,
      speechRate: 0.85,
      audioEngine: 'auto',

      // Word defaults
      learnedWordIds: [],
      wordSessionDeck: shuffleArray(allWordIds),
      wordCurrentCardIndex: 0,
      selectedWordCategory: null,
      wordSearchQuery: '',
      isWordFlipped: false,

      // Reading defaults
      activeReadingLessonId: 1,
      completedReadingLessonIds: [],
      readingSubTab: 'lessons',
      learnedReadingWordIds: [],
      learnedReadingPhraseIds: [],
      setActiveReadingLessonId: (id) => set({ activeReadingLessonId: id }),
      markReadingLessonCompleted: (id) => {
        const state = get();
        if (!state.completedReadingLessonIds.includes(id)) {
          set({ completedReadingLessonIds: [...state.completedReadingLessonIds, id].sort((a, b) => a - b) });
        }
      },
      setReadingSubTab: (tab) => set({ readingSubTab: tab }),

      markReadingWordLearned: (id) => {
        const state = get();
        if (!state.learnedReadingWordIds.includes(id)) {
          set({ learnedReadingWordIds: [...state.learnedReadingWordIds, id] });
        }
      },
      unmarkReadingWordLearned: (id) => {
        const state = get();
        set({ learnedReadingWordIds: state.learnedReadingWordIds.filter((wid) => wid !== id) });
      },
      toggleReadingWordLearned: (id) => {
        const state = get();
        const isLearned = state.learnedReadingWordIds.includes(id);
        set({
          learnedReadingWordIds: isLearned
            ? state.learnedReadingWordIds.filter((wid) => wid !== id)
            : [...state.learnedReadingWordIds, id],
        });
      },

      markReadingPhraseLearned: (id) => {
        const state = get();
        if (!state.learnedReadingPhraseIds.includes(id)) {
          set({ learnedReadingPhraseIds: [...state.learnedReadingPhraseIds, id] });
        }
      },
      unmarkReadingPhraseLearned: (id) => {
        const state = get();
        set({ learnedReadingPhraseIds: state.learnedReadingPhraseIds.filter((pid) => pid !== id) });
      },
      toggleReadingPhraseLearned: (id) => {
        const state = get();
        const isLearned = state.learnedReadingPhraseIds.includes(id);
        set({
          learnedReadingPhraseIds: isLearned
            ? state.learnedReadingPhraseIds.filter((pid) => pid !== id)
            : [...state.learnedReadingPhraseIds, id],
        });
      },

      resetReadingWordsProgress: (category) => {
        const state = get();
        if (category) {
          const catWordIds = new Set(WORDS_DATA.filter((w) => w.category === category).map((w) => w.id));
          set({ learnedReadingWordIds: state.learnedReadingWordIds.filter((id) => !catWordIds.has(id)) });
        } else {
          set({ learnedReadingWordIds: [] });
        }
      },

      resetReadingPhrasesProgress: (category) => {
        const state = get();
        if (category) {
          const catPhraseIds = new Set(PHRASES_DATA.filter((p) => p.category === category).map((p) => p.id));
          set({ learnedReadingPhraseIds: state.learnedReadingPhraseIds.filter((id) => !catPhraseIds.has(id)) });
        } else {
          set({ learnedReadingPhraseIds: [] });
        }
      },

      // Language
      language: 'ru',
      setLanguage: (lang) => set({ language: lang }),

      setTab: (tab) => set({ currentTab: tab }),
      setTrainerMode: (mode) => set({ trainerMode: mode }),
      setDictionaryMode: (mode) => set({ dictionaryMode: mode }),

      // Lesson actions
      markDayCompleted: (day) => {
        const state = get();
        if (!state.completedDays.includes(day)) {
          set({ completedDays: [...state.completedDays, day].sort((a, b) => a - b) });
        }
      },
      setActiveLessonDay: (day) => set({ activeLessonDay: day }),
      saveQuizScore: (day, score) => {
        const state = get();
        const currentBest = state.lessonQuizScores[day] ?? 0;
        set({
          lessonQuizScores: {
            ...state.lessonQuizScores,
            [day]: Math.max(currentBest, score),
          },
        });
      },

      // Phrase actions
      markLearned: (id) => {
        const state = get();
        const newLearned = state.learnedPhraseIds.includes(id)
          ? state.learnedPhraseIds
          : [...state.learnedPhraseIds, id];
        const newDeck = state.sessionDeck.filter((pid) => pid !== id);
        const newIndex = Math.min(state.currentCardIndex, Math.max(0, newDeck.length - 1));
        set({
          learnedPhraseIds: newLearned,
          sessionDeck: newDeck,
          currentCardIndex: newIndex,
          isFlipped: false,
        });
      },

      unmarkLearned: (id) => {
        const state = get();
        set({
          learnedPhraseIds: state.learnedPhraseIds.filter((pid) => pid !== id),
        });
      },

      markRepeat: (id) => {
        const state = get();
        const currentIdx = state.currentCardIndex;
        const newDeck = [...state.sessionDeck];
        const removeIdx = newDeck.indexOf(id);
        if (removeIdx !== -1) {
          newDeck.splice(removeIdx, 1);
          newDeck.push(id);
        }
        const nextIndex = Math.min(currentIdx, newDeck.length - 1);
        set({
          learnedPhraseIds: state.learnedPhraseIds.filter((pid) => pid !== id),
          sessionDeck: newDeck,
          currentCardIndex: nextIndex,
          isFlipped: false,
        });
      },

      resetSession: (category) => {
        const state = get();
        const targetAllIds = category
          ? PHRASES_DATA.filter((p) => p.category === category).map((p) => p.id)
          : allPhraseIds;
        
        const unlearnedTargetIds = targetAllIds.filter(
          (id) => !state.learnedPhraseIds.includes(id)
        );

        if (unlearnedTargetIds.length > 0) {
          const nonTargetDeck = state.sessionDeck.filter((id) => !targetAllIds.includes(id));
          set({
            sessionDeck: [...nonTargetDeck, ...shuffleArray(unlearnedTargetIds)],
            currentCardIndex: 0,
            isFlipped: false,
          });
        } else {
          // Reset learned status for this category (or all)
          const newLearned = category
            ? state.learnedPhraseIds.filter((id) => !targetAllIds.includes(id))
            : [];
          const nonTargetDeck = category
            ? state.sessionDeck.filter((id) => !targetAllIds.includes(id))
            : [];
          set({
            learnedPhraseIds: newLearned,
            sessionDeck: [...nonTargetDeck, ...shuffleArray(targetAllIds)],
            currentCardIndex: 0,
            isFlipped: false,
          });
        }
      },

      resetCategoryLearned: (category) => {
        const state = get();
        const targetAllIds = category
          ? PHRASES_DATA.filter((p) => p.category === category).map((p) => p.id)
          : allPhraseIds;
        const targetSet = new Set(targetAllIds);

        const newLearned = state.learnedPhraseIds.filter((id) => !targetSet.has(id));
        const nonTargetDeck = state.sessionDeck.filter((id) => !targetSet.has(id));
        set({
          learnedPhraseIds: newLearned,
          sessionDeck: [...nonTargetDeck, ...shuffleArray(targetAllIds)],
          currentCardIndex: 0,
          isFlipped: false,
        });
      },

      shuffleDeck: (category) => {
        const state = get();
        const targetAllIds = category
          ? PHRASES_DATA.filter((p) => p.category === category).map((p) => p.id)
          : allPhraseIds;
        const targetSet = new Set(targetAllIds);
        const targetDeck = state.sessionDeck.filter((id) => targetSet.has(id));
        const nonTargetDeck = state.sessionDeck.filter((id) => !targetSet.has(id));
        set({
          sessionDeck: [...nonTargetDeck, ...shuffleArray(targetDeck)],
          currentCardIndex: 0,
          isFlipped: false,
        });
      },

      toggleLearned: (id) => {
        const state = get();
        const isLearned = state.learnedPhraseIds.includes(id);
        set({
          learnedPhraseIds: isLearned
            ? state.learnedPhraseIds.filter((pid) => pid !== id)
            : [...state.learnedPhraseIds, id],
        });
      },

      setSelectedCategory: (category) => set({ selectedCategory: category, currentCardIndex: 0 }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setFlipped: (flipped) => set({ isFlipped: flipped }),
      setSpeechRate: (rate) => set({ speechRate: rate }),
      setAudioEngine: (engine) => set({ audioEngine: engine }),

      // Word actions
      markWordLearned: (id) => {
        const state = get();
        const newLearned = state.learnedWordIds.includes(id)
          ? state.learnedWordIds
          : [...state.learnedWordIds, id];
        const newDeck = state.wordSessionDeck.filter((wid) => wid !== id);
        const newIndex = Math.min(state.wordCurrentCardIndex, Math.max(0, newDeck.length - 1));
        set({
          learnedWordIds: newLearned,
          wordSessionDeck: newDeck,
          wordCurrentCardIndex: newIndex,
          isWordFlipped: false,
        });
      },

      unmarkWordLearned: (id) => {
        const state = get();
        set({
          learnedWordIds: state.learnedWordIds.filter((wid) => wid !== id),
        });
      },

      markWordRepeat: (id) => {
        const state = get();
        const currentIdx = state.wordCurrentCardIndex;
        const newDeck = [...state.wordSessionDeck];
        const removeIdx = newDeck.indexOf(id);
        if (removeIdx !== -1) {
          newDeck.splice(removeIdx, 1);
          newDeck.push(id);
        }
        const nextIndex = Math.min(currentIdx, newDeck.length - 1);
        set({
          learnedWordIds: state.learnedWordIds.filter((wid) => wid !== id),
          wordSessionDeck: newDeck,
          wordCurrentCardIndex: nextIndex,
          isWordFlipped: false,
        });
      },

      resetLessonLearned: (wordIds, phraseIds) => {
        const state = get();
        const wordSet = new Set(wordIds);
        const phraseSet = new Set(phraseIds);
        set({
          learnedWordIds: state.learnedWordIds.filter((id) => !wordSet.has(id)),
          learnedPhraseIds: state.learnedPhraseIds.filter((id) => !phraseSet.has(id)),
        });
      },

      resetWordSession: (category) => {
        const state = get();
        const targetAllIds = category
          ? WORDS_DATA.filter((w) => w.category === category).map((w) => w.id)
          : allWordIds;

        const unlearnedTargetIds = targetAllIds.filter(
          (id) => !state.learnedWordIds.includes(id)
        );

        if (unlearnedTargetIds.length > 0) {
          const nonTargetDeck = state.wordSessionDeck.filter((id) => !targetAllIds.includes(id));
          set({
            wordSessionDeck: [...nonTargetDeck, ...shuffleArray(unlearnedTargetIds)],
            wordCurrentCardIndex: 0,
            isWordFlipped: false,
          });
        } else {
          const newLearned = category
            ? state.learnedWordIds.filter((id) => !targetAllIds.includes(id))
            : [];
          const nonTargetDeck = category
            ? state.wordSessionDeck.filter((id) => !targetAllIds.includes(id))
            : [];
          set({
            learnedWordIds: newLearned,
            wordSessionDeck: [...nonTargetDeck, ...shuffleArray(targetAllIds)],
            wordCurrentCardIndex: 0,
            isWordFlipped: false,
          });
        }
      },

      resetWordCategoryLearned: (category) => {
        const state = get();
        const targetAllIds = category
          ? WORDS_DATA.filter((w) => w.category === category).map((w) => w.id)
          : allWordIds;
        const targetSet = new Set(targetAllIds);

        const newLearned = state.learnedWordIds.filter((id) => !targetSet.has(id));
        const nonTargetDeck = state.wordSessionDeck.filter((id) => !targetSet.has(id));
        set({
          learnedWordIds: newLearned,
          wordSessionDeck: [...nonTargetDeck, ...shuffleArray(targetAllIds)],
          wordCurrentCardIndex: 0,
          isWordFlipped: false,
        });
      },

      shuffleWordDeck: (category) => {
        const state = get();
        const targetAllIds = category
          ? WORDS_DATA.filter((w) => w.category === category).map((w) => w.id)
          : allWordIds;
        const targetSet = new Set(targetAllIds);
        const targetDeck = state.wordSessionDeck.filter((id) => targetSet.has(id));
        const nonTargetDeck = state.wordSessionDeck.filter((id) => !targetSet.has(id));
        set({
          wordSessionDeck: [...nonTargetDeck, ...shuffleArray(targetDeck)],
          wordCurrentCardIndex: 0,
          isWordFlipped: false,
        });
      },

      toggleWordLearned: (id) => {
        const state = get();
        const isLearned = state.learnedWordIds.includes(id);
        set({
          learnedWordIds: isLearned
            ? state.learnedWordIds.filter((wid) => wid !== id)
            : [...state.learnedWordIds, id],
        });
      },

      setSelectedWordCategory: (category) => set({ selectedWordCategory: category }),
      setWordSearchQuery: (query) => set({ wordSearchQuery: query }),
      setWordFlipped: (flipped) => set({ isWordFlipped: flipped }),
    }),
    {
      name: 'thai-sprint-storage',
      partialize: (state) => ({
        completedDays: state.completedDays,
        activeLessonDay: state.activeLessonDay,
        lessonQuizScores: state.lessonQuizScores,
        learnedPhraseIds: state.learnedPhraseIds,
        sessionDeck: state.sessionDeck,
        currentCardIndex: state.currentCardIndex,
        learnedWordIds: state.learnedWordIds,
        wordSessionDeck: state.wordSessionDeck,
        wordCurrentCardIndex: state.wordCurrentCardIndex,
        speechRate: state.speechRate,
        audioEngine: state.audioEngine,
        language: state.language,
        activeReadingLessonId: state.activeReadingLessonId,
        completedReadingLessonIds: state.completedReadingLessonIds,
        readingSubTab: state.readingSubTab,
        learnedReadingWordIds: state.learnedReadingWordIds,
        learnedReadingPhraseIds: state.learnedReadingPhraseIds,
      }),
    }
  )
);
