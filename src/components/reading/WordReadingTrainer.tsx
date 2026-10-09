import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Volume2,
  RotateCcw,
  Shuffle,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Keyboard,
  Eye,
  Trophy,
  Sparkles,
  AlertTriangle,
  SlidersHorizontal,
} from 'lucide-react';
import { WORDS_DATA, WORD_CATEGORY_FILTERS } from '../../data/words';
import { useAppStore } from '../../store/useAppStore';
import { speakThai } from '../../utils/tts';
import { validateReadingInput, ValidationResult } from '../../utils/thaiKedmanee';
import { parseWordSyllables } from '../../utils/readingTrainerUtils';
import { getToneBadgeInfo } from '../../data/readingLessons';
import { getWordTranslation, getWordCategoryLabel } from '../../data/translationsEn';
import { VirtualKedmaneeKeyboard } from './VirtualKedmaneeKeyboard';

function shuffleList<T>(list: T[]): T[] {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}

export const WordReadingTrainer: React.FC = () => {
  const language = useAppStore((s) => s.language);
  const learnedReadingWordIds = useAppStore((s) => s.learnedReadingWordIds);
  const markReadingWordLearned = useAppStore((s) => s.markReadingWordLearned);
  const unmarkReadingWordLearned = useAppStore((s) => s.unmarkReadingWordLearned);
  const resetReadingWordsProgress = useAppStore((s) => s.resetReadingWordsProgress);

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'unlearned' | 'learned'>('all');
  const [trainerMode, setTrainerMode] = useState<'typing' | 'reading'>('typing');
  const [showKeyboard, setShowKeyboard] = useState(true);

  // Deck State
  const [deck, setDeck] = useState<string[]>(() => WORDS_DATA.map((w) => w.id));
  const [cardIndex, setCardIndex] = useState(0);

  // Typing practice state
  const [charIndex, setCharIndex] = useState(0);
  const [errorInfo, setErrorInfo] = useState<ValidationResult | null>(null);
  const [shake, setShake] = useState(false);
  const [isCompletedWord, setIsCompletedWord] = useState(false);

  // Reading check state
  const [isRevealed, setIsRevealed] = useState(false);

  // Filtered pool of words
  const categoryWords = useMemo(() => {
    let list = selectedCategory
      ? WORDS_DATA.filter((w) => w.category === selectedCategory)
      : WORDS_DATA;

    if (statusFilter === 'unlearned') {
      list = list.filter((w) => !learnedReadingWordIds.includes(w.id));
    } else if (statusFilter === 'learned') {
      list = list.filter((w) => learnedReadingWordIds.includes(w.id));
    }
    return list;
  }, [selectedCategory, statusFilter, learnedReadingWordIds]);

  // Update deck when category or status changes
  useEffect(() => {
    const ids = categoryWords.map((w) => w.id);
    setDeck(ids);
    setCardIndex(0);
    setCharIndex(0);
    setErrorInfo(null);
    setIsRevealed(false);
    setIsCompletedWord(false);
  }, [categoryWords]);

  const currentWordId = deck[cardIndex];
  const currentWord = useMemo(
    () => (currentWordId ? WORDS_DATA.find((w) => w.id === currentWordId) : null),
    [currentWordId]
  );

  const wordChars = useMemo(
    () => (currentWord ? Array.from(currentWord.thai) : []),
    [currentWord]
  );

  const expectedChar = wordChars[charIndex];

  // Syllables with tones
  const syllables = useMemo(
    () => (currentWord ? parseWordSyllables(currentWord.transcription) : []),
    [currentWord]
  );

  // Reset character index when card index changes
  useEffect(() => {
    setCharIndex(0);
    setErrorInfo(null);
    setIsRevealed(false);
    setIsCompletedWord(false);
  }, [cardIndex, currentWordId]);

  // Handle Keystroke for Typing Mode
  const handleInputChar = useCallback(
    (inputKey: string) => {
      if (trainerMode !== 'typing' || !currentWord || isCompletedWord || !expectedChar) return;

      const result = validateReadingInput(
        inputKey,
        expectedChar,
        currentWord.thai,
        charIndex
      );

      if (result.valid) {
        setErrorInfo(null);
        if (charIndex + 1 >= wordChars.length) {
          // Completed word!
          setIsCompletedWord(true);
          speakThai(currentWord.thai);
          markReadingWordLearned(currentWord.id);

          setTimeout(() => {
            if (cardIndex + 1 < deck.length) {
              setCardIndex((prev) => prev + 1);
            }
          }, 600);
        } else {
          setCharIndex((prev) => prev + 1);
        }
      } else {
        // Typing error
        setErrorInfo(result);
        setShake(true);
        setTimeout(() => setShake(false), 500);

        if ('vibrate' in navigator) {
          navigator.vibrate(30);
        }
      }
    },
    [
      trainerMode,
      currentWord,
      isCompletedWord,
      expectedChar,
      charIndex,
      wordChars.length,
      markReadingWordLearned,
      cardIndex,
      deck.length,
    ]
  );

  // Physical Keyboard Listener
  useEffect(() => {
    if (trainerMode !== 'typing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === 'Backspace') {
        e.preventDefault();
        if (charIndex > 0) {
          setCharIndex((prev) => prev - 1);
          setErrorInfo(null);
        }
        return;
      }

      if (e.key.length === 1) {
        e.preventDefault();
        handleInputChar(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [trainerMode, handleInputChar, charIndex]);

  // Card Navigation
  const handleNext = () => {
    if (cardIndex + 1 < deck.length) {
      setCardIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (cardIndex > 0) {
      setCardIndex((prev) => prev - 1);
    }
  };

  const handleShuffle = () => {
    setDeck(shuffleList(deck));
    setCardIndex(0);
  };

  const handleRepeat = () => {
    if (!currentWord) return;
    // Push current card to the back of session deck
    const newDeck = [...deck];
    newDeck.splice(cardIndex, 1);
    newDeck.push(currentWord.id);
    setDeck(newDeck);
    setIsRevealed(false);
  };

  const handleLearnedInReadingMode = () => {
    if (!currentWord) return;
    markReadingWordLearned(currentWord.id);
    handleNext();
  };

  const totalInCategory = useMemo(() => {
    const pool = selectedCategory
      ? WORDS_DATA.filter((w) => w.category === selectedCategory)
      : WORDS_DATA;
    return pool.length;
  }, [selectedCategory]);

  const learnedCount = useMemo(() => {
    const pool = selectedCategory
      ? WORDS_DATA.filter((w) => w.category === selectedCategory)
      : WORDS_DATA;
    return pool.filter((w) => learnedReadingWordIds.includes(w.id)).length;
  }, [selectedCategory, learnedReadingWordIds]);

  const isCurrentLearned = currentWord
    ? learnedReadingWordIds.includes(currentWord.id)
    : false;

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50 overflow-y-auto pb-6">
      {/* Category & Mode Bar */}
      <div className="bg-white border-b border-slate-200/80 px-3 py-2 flex flex-col gap-2 sticky top-0 z-10 shadow-xs">
        {/* Top Controls: Mode Switch & Progress */}
        <div className="flex items-center justify-between gap-2">
          {/* Practice Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/80">
            <button
              onClick={() => {
                setTrainerMode('typing');
                setIsRevealed(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                trainerMode === 'typing'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Keyboard className="w-3.5 h-3.5" />
              <span>{language === 'ru' ? 'Печать' : 'Typing'}</span>
            </button>
            <button
              onClick={() => setTrainerMode('reading')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                trainerMode === 'reading'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{language === 'ru' ? 'Чтение вслух' : 'Reading'}</span>
            </button>
          </div>

          {/* Progress Badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/60">
              {learnedCount} / {totalInCategory}{' '}
              <span className="text-[10px] text-slate-400 font-normal">
                ({Math.round((learnedCount / (totalInCategory || 1)) * 100)}%)
              </span>
            </span>
            <button
              onClick={handleShuffle}
              title={language === 'ru' ? 'Перемешать' : 'Shuffle'}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 active:scale-95 transition-transform cursor-pointer"
            >
              <Shuffle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filter Horizontal Scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
          {WORD_CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat.value ?? 'all'}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors cursor-pointer shrink-0 ${
                selectedCategory === cat.value
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 border border-slate-200/60'
              }`}
            >
              {getWordCategoryLabel(cat.value ?? '', cat.label, language)}
            </button>
          ))}
        </div>

        {/* Status Filter Bar */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
          <div className="flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-slate-400" />
            <span>{language === 'ru' ? 'Статус:' : 'Status:'}</span>
            {(['all', 'unlearned', 'learned'] as const).map((filterKey) => {
              const labels = {
                all: language === 'ru' ? 'Все' : 'All',
                unlearned: language === 'ru' ? 'Не выучено' : 'New',
                learned: language === 'ru' ? 'Освоено' : 'Learned',
              };
              return (
                <button
                  key={filterKey}
                  onClick={() => setStatusFilter(filterKey)}
                  className={`px-2 py-0.5 rounded-md font-semibold cursor-pointer ${
                    statusFilter === filterKey
                      ? 'bg-blue-100 text-blue-800'
                      : 'hover:text-slate-800'
                  }`}
                >
                  {labels[filterKey]}
                </button>
              );
            })}
          </div>

          {trainerMode === 'typing' && (
            <button
              onClick={() => setShowKeyboard(!showKeyboard)}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              {showKeyboard
                ? language === 'ru'
                  ? 'Скрыть клавиатуру'
                  : 'Hide Keyboard'
                : language === 'ru'
                ? 'Показать клавиатуру'
                : 'Show Keyboard'}
            </button>
          )}
        </div>
      </div>

      {/* Main Training Card Area */}
      {currentWord ? (
        <div className="flex-1 flex flex-col p-4 max-w-lg mx-auto w-full gap-4">
          {/* Card Frame */}
          <div
            className={`rounded-3xl bg-white border border-slate-200 shadow-sm p-5 flex flex-col gap-4 relative transition-all duration-200 ${
              shake ? 'animate-shake' : ''
            }`}
          >
            {/* Top Bar inside Card */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold">
                {cardIndex + 1} / {deck.length}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    if (isCurrentLearned) {
                      unmarkReadingWordLearned(currentWord.id);
                    } else {
                      markReadingWordLearned(currentWord.id);
                    }
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    isCurrentLearned
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    {isCurrentLearned
                      ? language === 'ru'
                        ? 'Освоено'
                        : 'Learned'
                      : language === 'ru'
                      ? 'В процессе'
                      : 'Learning'}
                  </span>
                </button>
                <button
                  onClick={() => speakThai(currentWord.thai)}
                  className="p-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 active:scale-90 transition-transform cursor-pointer"
                  title={language === 'ru' ? 'Озвучить' : 'Listen'}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Thai Word Display */}
            <div className="flex flex-col items-center justify-center py-4 select-none">
              {trainerMode === 'typing' ? (
                /* Character by Character Interactive Rendering */
                <div className="flex flex-wrap items-center justify-center gap-1 font-thai text-4xl sm:text-5xl font-bold tracking-wider leading-relaxed">
                  {wordChars.map((char, idx) => {
                    const isPassed = idx < charIndex;
                    const isCurrent = idx === charIndex;

                    return (
                      <span
                        key={idx}
                        className={`inline-block px-1 rounded-lg transition-all duration-150 ${
                          isPassed
                            ? 'text-emerald-600 font-bold bg-emerald-50'
                            : isCurrent
                            ? 'text-blue-700 bg-blue-100 ring-2 ring-blue-500 scale-110 shadow-xs'
                            : 'text-slate-300'
                        }`}
                      >
                        {char}
                      </span>
                    );
                  })}
                </div>
              ) : (
                /* Pure Large Thai Word Display for Reading in Mind/Aloud */
                <div className="font-thai text-4xl sm:text-5xl font-bold text-slate-900 text-center tracking-wider py-2">
                  {currentWord.thai}
                </div>
              )}

              {/* In typing mode: Expected character hint badge */}
              {trainerMode === 'typing' && expectedChar && !isCompletedWord && (
                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                  <span>{language === 'ru' ? 'Нажмите:' : 'Type:'}</span>
                  <span className="font-bold font-thai text-slate-800 text-sm">
                    {expectedChar}
                  </span>
                </div>
              )}
            </div>

            {/* Syllable Tones & Transcription Display */}
            {(trainerMode === 'typing' || isRevealed) && (
              <div className="flex flex-col items-center gap-2 pt-2 border-t border-slate-100 animate-fadeIn">
                {/* Syllable Tone Badges */}
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {syllables.map((syl, i) => {
                    const badge = getToneBadgeInfo(syl.tone, language);
                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-semibold ${badge.color}`}
                      >
                        <span className="font-mono text-slate-900">{syl.text}</span>
                        <span className="text-[10px] opacity-80">
                          {badge.arrow} {badge.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Translation */}
                <div className="text-center mt-1">
                  <div className="text-base font-bold text-slate-800">
                    {getWordTranslation(currentWord, language)}
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    /{currentWord.transcription}/
                  </div>
                </div>
              </div>
            )}

            {/* Error Hint in Typing Mode */}
            {trainerMode === 'typing' && errorInfo?.hintRu && (
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs animate-shake">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <span>
                  {language === 'ru' ? errorInfo.hintRu : errorInfo.hintEn}
                </span>
              </div>
            )}

            {/* Reading Mode Reveal / Answer Controls */}
            {trainerMode === 'reading' && !isRevealed && (
              <button
                onClick={() => {
                  setIsRevealed(true);
                  speakThai(currentWord.thai);
                }}
                className="w-full py-3 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-md hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span>
                  {language === 'ru'
                    ? 'Проверить чтение и тоны'
                    : 'Check Reading & Tones'}
                </span>
              </button>
            )}

            {trainerMode === 'reading' && isRevealed && (
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={handleRepeat}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                  <span>{language === 'ru' ? 'Повторить' : 'Repeat'}</span>
                </button>
                <button
                  onClick={handleLearnedInReadingMode}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs hover:bg-emerald-700 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    {language === 'ru' ? 'Знаю / Прочитал' : 'Know / Read It'}
                  </span>
                </button>
              </div>
            )}

            {/* Bottom Card Navigation */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
              <button
                onClick={handlePrev}
                disabled={cardIndex === 0}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{language === 'ru' ? 'Назад' : 'Back'}</span>
              </button>

              <button
                onClick={() => {
                  setCharIndex(0);
                  setIsRevealed(false);
                }}
                className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{language === 'ru' ? 'Сначала' : 'Reset'}</span>
              </button>

              <button
                onClick={handleNext}
                disabled={cardIndex + 1 >= deck.length}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>{language === 'ru' ? 'Дальше' : 'Next'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Virtual Keyboard (Only in typing mode if enabled) */}
          {trainerMode === 'typing' && showKeyboard && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-2 shadow-xs">
              <VirtualKedmaneeKeyboard
                expectedChar={expectedChar}
                onKeyClick={(thaiChar) => handleInputChar(thaiChar)}
              />
            </div>
          )}
        </div>
      ) : (
        /* Empty / Completed state */
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl shadow-sm">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {language === 'ru' ? 'Все слова пройдены!' : 'All words completed!'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              {language === 'ru'
                ? 'Вы отработали все слова в выбранной категории. Можно сбросить прогресс и пройти снова.'
                : 'You have completed all words in this category. You can reset and practice again.'}
            </p>
          </div>
          <button
            onClick={() => {
              resetReadingWordsProgress(selectedCategory);
              setDeck(categoryWords.map((w) => w.id));
              setCardIndex(0);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-md hover:bg-blue-700 active:scale-95 transition-transform cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>
              {language === 'ru' ? 'Пройти категорию заново' : 'Restart Category'}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
