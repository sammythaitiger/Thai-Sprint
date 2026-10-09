import { useState, useMemo, useEffect } from 'react';
import { RotateCw, Shuffle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Lesson } from '../../types';
import { WORDS_DATA } from '../../data/words';
import { PHRASES_DATA } from '../../data/phrases';
import { AudioButton } from '../AudioButton';
import { WordBreakdown } from '../WordBreakdown';
import { speakThai } from '../../utils/tts';
import { useAppStore } from '../../store/useAppStore';
import { useTranslation } from '../../i18n/translations';
import {
  getWordTranslation,
  getWordCategoryLabel,
  getPhraseTranslation,
  getPhraseCategoryLabel,
} from '../../data/translationsEn';

export interface LessonDrillCard {
  id: string;
  type: 'word' | 'phrase';
  thai: string;
  transcription: string;
  translation: string;
  categoryLabel: string;
}

interface LessonCardTrainerProps {
  lesson: Lesson;
  initialFilter?: 'all' | 'words' | 'phrases';
  onGoToQuiz?: () => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i]!;
    shuffled[i] = shuffled[j]!;
    shuffled[j] = temp;
  }
  return shuffled;
}

export function LessonCardTrainer({
  lesson,
  initialFilter = 'all',
  onGoToQuiz,
}: LessonCardTrainerProps) {
  const language = useAppStore((s) => s.language);
  const { t } = useTranslation();

  const [filterMode, setFilterMode] = useState<'all' | 'words' | 'phrases'>(initialFilter);
  const [sessionDeck, setSessionDeck] = useState<string[]>([]);
  const [initialDeckSize, setInitialDeckSize] = useState<number>(0);
  const [completedInSession, setCompletedInSession] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const learnedPhraseIds = useAppStore((s) => s.learnedPhraseIds);
  const learnedWordIds = useAppStore((s) => s.learnedWordIds);
  const markLearned = useAppStore((s) => s.markLearned);
  const unmarkLearned = useAppStore((s) => s.unmarkLearned);
  const markWordLearned = useAppStore((s) => s.markWordLearned);
  const unmarkWordLearned = useAppStore((s) => s.unmarkWordLearned);
  const resetLessonLearned = useAppStore((s) => s.resetLessonLearned);

  // 1. Resolve all cards for this lesson with localized translations
  const allLessonCards = useMemo<LessonDrillCard[]>(() => {
    const words: LessonDrillCard[] = WORDS_DATA.filter((w) =>
      lesson.wordIds.includes(w.id)
    ).map((w) => ({
      id: w.id,
      type: 'word',
      thai: w.thai,
      transcription: w.transcription,
      translation: getWordTranslation(w, language),
      categoryLabel: getWordCategoryLabel(w.category, w.categoryLabel, language),
    }));

    const phrases: LessonDrillCard[] = PHRASES_DATA.filter((p) =>
      lesson.phraseIds.includes(p.id)
    ).map((p) => ({
      id: p.id,
      type: 'phrase',
      thai: p.thai,
      transcription: p.transcription,
      translation: getPhraseTranslation(p, language),
      categoryLabel: getPhraseCategoryLabel(p.category, p.categoryLabel, language),
    }));

    return [...words, ...phrases];
  }, [lesson.wordIds, lesson.phraseIds, language]);

  // 2. Filter available cards by current mode
  const filteredCards = useMemo<LessonDrillCard[]>(() => {
    if (filterMode === 'words') return allLessonCards.filter((c) => c.type === 'word');
    if (filterMode === 'phrases') return allLessonCards.filter((c) => c.type === 'phrase');
    return allLessonCards;
  }, [allLessonCards, filterMode]);

  // Helper to check if card is learned
  const isCardLearned = (card: LessonDrillCard) => {
    return card.type === 'phrase'
      ? learnedPhraseIds.includes(card.id)
      : learnedWordIds.includes(card.id);
  };

  // 3. Initialize / reset session deck when filter changes or lesson changes
  const initSessionDeck = (cards: LessonDrillCard[], forceFull = false) => {
    let deck: string[];
    if (forceFull) {
      deck = cards.map((c) => c.id);
    } else {
      const unlearned = cards.filter((c) => !isCardLearned(c)).map((c) => c.id);
      deck = unlearned.length > 0 ? unlearned : cards.map((c) => c.id);
    }
    setSessionDeck(deck);
    setInitialDeckSize(deck.length);
    setCompletedInSession(0);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  useEffect(() => {
    initSessionDeck(filteredCards);
  }, [filteredCards]);

  // Current active card
  const safeIndex = Math.min(currentIndex, Math.max(0, sessionDeck.length - 1));
  const currentCardId = sessionDeck[safeIndex];
  const currentCard = useMemo(
    () => (currentCardId ? allLessonCards.find((c) => c.id === currentCardId) : null),
    [currentCardId, allLessonCards]
  );

  // Statistics
  const totalCardsInFilter = filteredCards.length;
  const learnedInFilterCount = filteredCards.filter((c) => isCardLearned(c)).length;
  const totalSessionCards = initialDeckSize > 0 ? initialDeckSize : sessionDeck.length;
  const sessionProgressPct =
    totalSessionCards > 0
      ? Math.min(100, Math.round((completedInSession / totalSessionCards) * 100))
      : 0;

  // Handlers
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSound = () => {
    if (currentCard) {
      speakThai(currentCard.thai, currentCard.id);
    }
  };

  const handleKnow = () => {
    if (!currentCard) return;

    if (currentCard.type === 'phrase') {
      markLearned(currentCard.id);
    } else {
      markWordLearned(currentCard.id);
    }

    setCompletedInSession((prev) => prev + 1);

    // Remove from active session deck
    setSessionDeck((prev) => {
      const next = prev.filter((id) => id !== currentCard.id);
      const nextIdx = Math.min(currentIndex, Math.max(0, next.length - 1));
      setCurrentIndex(nextIdx);
      return next;
    });
    setIsFlipped(false);
  };

  const handleRepeat = () => {
    if (!currentCard) return;

    if (currentCard.type === 'phrase') {
      unmarkLearned(currentCard.id);
    } else {
      unmarkWordLearned(currentCard.id);
    }

    // Move to end of session deck
    setSessionDeck((prev) => {
      const next = [...prev];
      const removeIdx = next.indexOf(currentCard.id);
      if (removeIdx !== -1) {
        next.splice(removeIdx, 1);
        next.push(currentCard.id);
      }
      return next;
    });
    setIsFlipped(false);
  };

  const handleShuffle = () => {
    setSessionDeck((prev) => shuffleArray(prev));
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleRestartFull = () => {
    initSessionDeck(filteredCards, true);
  };

  const handleResetLessonStatus = () => {
    resetLessonLearned(lesson.wordIds, lesson.phraseIds);
    initSessionDeck(filteredCards, true);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* 1. Header controls: Filter chips & Shuffle/Reset */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex gap-1.5 p-1 bg-slate-200/70 rounded-2xl">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterMode === 'all'
                ? 'bg-white text-indigo-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('all')} ({allLessonCards.length})
          </button>
          <button
            onClick={() => setFilterMode('words')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterMode === 'words'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('words')} ({lesson.wordIds.length})
          </button>
          <button
            onClick={() => setFilterMode('phrases')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterMode === 'phrases'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('phrases')} ({lesson.phraseIds.length})
          </button>
        </div>

        <div className="flex items-center gap-1">
          {sessionDeck.length > 1 && (
            <button
              onClick={handleShuffle}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 active:scale-95 transition-transform"
              title={t('shuffle')}
              aria-label={t('shuffle')}
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={handleRestartFull}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 active:scale-95 transition-transform"
            title={t('restart')}
            aria-label={t('restart')}
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Progress summary bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs mb-3">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-800">
              {filterMode === 'all'
                ? (language === 'en' ? 'All Cards' : 'Все карточки')
                : filterMode === 'words'
                ? t('words')
                : t('phrases')}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              • {t('lessonDay')} {lesson.day}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-slate-500">
              {t('remaining')} <span className="font-bold text-slate-800">{sessionDeck.length}</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
              {t('done')} {completedInSession}/{totalSessionCards}
            </span>
            <span
              className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200"
              title="Status"
            >
              <CheckCircle2 className="w-3 h-3" /> {learnedInFilterCount}/{totalCardsInFilter}
            </span>
          </div>
        </div>

        {/* Visual progress bar of CURRENT SESSION */}
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${sessionProgressPct}%` }}
          />
        </div>
      </div>

      {/* 3. Main Area: Active Card OR Session Completion */}
      {sessionDeck.length === 0 || !currentCard ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-slate-200 shadow-md text-center">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-3xl shadow-inner">
            🏆
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-1">
            {t('allCardsMastered')}
          </h3>
          <p className="text-xs text-slate-500 mb-4 max-w-xs leading-relaxed">
            {language === 'en' ? (
              <>
                You successfully mastered all{' '}
                <span className="font-bold text-slate-800">{totalCardsInFilter}</span> cards (
                {learnedInFilterCount} learned) for Day {lesson.day}.
              </>
            ) : (
              <>
                Вы успешно отработали все{' '}
                <span className="font-bold text-slate-800">{totalCardsInFilter}</span> карточек (
                {learnedInFilterCount} выучено) для урока {lesson.day}.
              </>
            )}
          </p>

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 mb-5 text-emerald-900 text-xs font-medium max-w-xs">
            {language === 'en'
              ? '✨ Excellent job! Your knowledge is solidified, ready to test your skills in the daily quiz.'
              : '✨ Отличная работа! Теперь ваши знания зафиксированы, можно закрепить успех в тесте дня.'}
          </div>

          <div className="flex flex-col gap-2 w-full max-w-xs">
            <button
              onClick={handleRestartFull}
              className="w-full py-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs active:scale-95 transition-transform flex items-center justify-center gap-1.5"
            >
              <RotateCw className="w-4 h-4 text-indigo-600" />
              <span>{t('restartCardsFromZero')}</span>
            </button>

            <button
              onClick={handleResetLessonStatus}
              className="w-full py-2.5 rounded-2xl border border-rose-200 bg-rose-50/70 hover:bg-rose-100 text-rose-700 font-medium text-[11px] active:scale-95 transition-transform flex items-center justify-center gap-1"
            >
              <span>{t('resetLessonLearnedStatus')}</span>
            </button>

            {onGoToQuiz && (
              <button
                onClick={onGoToQuiz}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-bold text-xs shadow-md active:scale-95 transition-transform flex items-center justify-center gap-1.5 mt-1"
              >
                <span>{t('takeDailyQuiz')} ({lesson.quiz.length} {language === 'en' ? 'q.' : 'вопр.'})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-0">
          {/* Flip card */}
          <div className="flex-1 flex items-center justify-center min-h-[300px]">
            <div
              className="w-full h-full cursor-pointer select-none touch-manipulation"
              style={{ perspective: '1000px', WebkitTapHighlightColor: 'transparent' }}
              onClick={handleFlip}
            >
              <div
                className="relative w-full h-full min-h-[290px] transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* FRONT SIDE */}
                <div
                  className="absolute inset-0 rounded-3xl bg-white border border-slate-200 shadow-lg p-5 flex flex-col items-center justify-between"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  {/* Top card bar */}
                  <div className="w-full flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        currentCard.type === 'phrase'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {currentCard.type === 'phrase' ? t('phraseCardLabel') : t('wordCardLabel')} • {currentCard.categoryLabel}
                    </span>

                    <span className="text-[11px] font-mono text-slate-400">
                      {safeIndex + 1}/{sessionDeck.length}
                    </span>
                  </div>

                  {/* Center content */}
                  <div className="flex flex-col items-center justify-center my-auto text-center px-2 py-4">
                    <p
                      className="text-3xl font-bold text-slate-900 leading-snug mb-2"
                      style={{ fontFamily: "'Sarabun', sans-serif" }}
                    >
                      {currentCard.thai}
                    </p>

                    <p className="text-base font-mono italic text-indigo-600 font-semibold mb-3 px-3 py-1 bg-indigo-50/70 rounded-xl border border-indigo-100">
                      [{currentCard.transcription}]
                    </p>

                    <AudioButton text={currentCard.thai} phraseId={currentCard.id} size="md" />
                  </div>

                  {/* Bottom hint */}
                  <p className="text-[11px] text-slate-400 select-none pb-1">
                    {t('tapToSeeTranslation')}
                  </p>
                </div>

                {/* BACK SIDE */}
                <div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-50 to-indigo-50/40 border border-slate-200 shadow-lg p-5 flex flex-col items-center justify-between overflow-y-auto"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  {/* Top card bar */}
                  <div className="w-full flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        currentCard.type === 'phrase'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {currentCard.type === 'phrase' ? t('phraseCardLabel') : t('wordCardLabel')} • {currentCard.categoryLabel}
                    </span>

                    <span className="text-[11px] font-mono text-slate-400">
                      {safeIndex + 1}/{sessionDeck.length}
                    </span>
                  </div>

                  {/* Center content */}
                  <div className="flex flex-col items-center justify-center my-auto text-center w-full px-1 py-2">
                    <p
                      className="text-xl font-bold text-slate-900 leading-snug mb-0.5"
                      style={{ fontFamily: "'Sarabun', sans-serif" }}
                    >
                      {currentCard.thai}
                    </p>

                    <p className="text-sm font-mono italic text-indigo-600 font-semibold mb-2">
                      [{currentCard.transcription}]
                    </p>

                    <div className="w-12 h-px bg-slate-200 my-1" />

                    <p className="text-base font-bold text-slate-800 leading-snug mb-2">
                      {currentCard.translation}
                    </p>

                    {/* If phrase, render interactive word breakdown */}
                    {currentCard.type === 'phrase' && (
                      <WordBreakdown phraseId={currentCard.id} compact className="w-full mt-1" />
                    )}
                  </div>

                  {/* Bottom hint */}
                  <p className="text-[10px] text-slate-400 select-none pb-0.5">
                    {t('cardSelectKnowOrRepeat')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons bar */}
          <div className="flex items-center gap-2.5 mt-3 pt-1">
            <button
              onClick={handleRepeat}
              className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-2xl bg-rose-50 text-rose-700 border border-rose-200 font-bold text-xs active:scale-95 transition-transform select-none touch-manipulation shadow-2xs"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {t('dontRemember')}
            </button>

            <button
              onClick={handleSound}
              className="w-13 h-13 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center active:scale-90 transition-transform select-none touch-manipulation shrink-0 shadow-2xs text-lg"
              style={{ WebkitTapHighlightColor: 'transparent' }}
              aria-label={t('listenAudio')}
            >
              🔊
            </button>

            <button
              onClick={handleKnow}
              className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-md shadow-emerald-200 active:scale-95 transition-transform select-none touch-manipulation"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {t('knowButton')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
