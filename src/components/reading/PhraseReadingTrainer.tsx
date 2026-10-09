import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Volume2,
  RotateCcw,
  Shuffle,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Keyboard,
  Headphones,
  Trophy,
  Sparkles,
  AlertTriangle,
  SlidersHorizontal,
  Split,
} from 'lucide-react';
import { PHRASES_DATA, CATEGORY_FILTERS } from '../../data/phrases';
import { useAppStore } from '../../store/useAppStore';
import { speakThai } from '../../utils/tts';
import { validateReadingInput, ValidationResult } from '../../utils/thaiKedmanee';
import { getPhraseSegments, PhraseSegmentDisplay } from '../../utils/readingTrainerUtils';
import { getPhraseTranslation } from '../../data/translationsEn';
import { getToneBadgeInfo } from '../../data/readingLessons';
import { VirtualKedmaneeKeyboard } from './VirtualKedmaneeKeyboard';

function shuffleList<T>(list: T[]): T[] {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}

export const PhraseReadingTrainer: React.FC = () => {
  const language = useAppStore((s) => s.language);
  const learnedReadingPhraseIds = useAppStore((s) => s.learnedReadingPhraseIds);
  const markReadingPhraseLearned = useAppStore((s) => s.markReadingPhraseLearned);
  const unmarkReadingPhraseLearned = useAppStore((s) => s.unmarkReadingPhraseLearned);
  const resetReadingPhrasesProgress = useAppStore((s) => s.resetReadingPhrasesProgress);

  // Filters & Settings
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'unlearned' | 'learned'>('all');
  const [trainerMode, setTrainerMode] = useState<'typing' | 'flow'>('flow');
  const [showBoundaries, setShowBoundaries] = useState(true);
  const [showKeyboard, setShowKeyboard] = useState(true);

  // Deck State
  const [deck, setDeck] = useState<string[]>(() => PHRASES_DATA.map((p) => p.id));
  const [cardIndex, setCardIndex] = useState(0);

  // Continuous Typing State
  const [continuousCharIndex, setContinuousCharIndex] = useState(0);
  const [errorInfo, setErrorInfo] = useState<ValidationResult | null>(null);
  const [shake, setShake] = useState(false);
  const [isCompletedPhrase, setIsCompletedPhrase] = useState(false);

  // Reading Flow State
  const [isRevealed, setIsRevealed] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);

  // Filtered pool of phrases
  const categoryPhrases = useMemo(() => {
    let list = selectedCategory
      ? PHRASES_DATA.filter((p) => p.category === selectedCategory)
      : PHRASES_DATA;

    if (statusFilter === 'unlearned') {
      list = list.filter((p) => !learnedReadingPhraseIds.includes(p.id));
    } else if (statusFilter === 'learned') {
      list = list.filter((p) => learnedReadingPhraseIds.includes(p.id));
    }
    return list;
  }, [selectedCategory, statusFilter, learnedReadingPhraseIds]);

  // Update deck when category or status filter changes
  useEffect(() => {
    const ids = categoryPhrases.map((p) => p.id);
    setDeck(ids);
    setCardIndex(0);
    setContinuousCharIndex(0);
    setErrorInfo(null);
    setIsRevealed(false);
    setIsCompletedPhrase(false);
    setActiveWordIndex(null);
  }, [categoryPhrases]);

  const currentPhraseId = deck[cardIndex];
  const currentPhrase = useMemo(
    () => (currentPhraseId ? PHRASES_DATA.find((p) => p.id === currentPhraseId) : null),
    [currentPhraseId]
  );

  // Segments for current phrase
  const segments: PhraseSegmentDisplay[] = useMemo(
    () => (currentPhrase ? getPhraseSegments(currentPhrase) : []),
    [currentPhrase]
  );

  // Clean full unspaced text or text as in phrase
  const fullText = currentPhrase ? currentPhrase.thai : '';
  const fullTextChars = useMemo(() => Array.from(fullText), [fullText]);
  const expectedChar = fullTextChars[continuousCharIndex];

  // Active word segment in typing mode
  const { currentSegmentIndex, currentSegment, charOffsetInSegment } = useMemo(() => {
    if (!currentPhrase || segments.length === 0) {
      return { currentSegmentIndex: 0, currentSegment: null, charOffsetInSegment: 0 };
    }

    let runningOffset = 0;
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i]!;
      const segLen = Array.from(seg.thai).length;

      // Account for spaces in full text between segments if any
      const textAhead = fullText.slice(runningOffset);
      const spacePrefix = textAhead.match(/^\s+/)?.[0]?.length || 0;
      runningOffset += spacePrefix;

      if (
        continuousCharIndex >= runningOffset &&
        continuousCharIndex < runningOffset + segLen
      ) {
        return {
          currentSegmentIndex: i,
          currentSegment: seg,
          charOffsetInSegment: continuousCharIndex - runningOffset,
        };
      }
      runningOffset += segLen;
    }

    return {
      currentSegmentIndex: segments.length - 1,
      currentSegment: segments[segments.length - 1] || null,
      charOffsetInSegment: 0,
    };
  }, [currentPhrase, segments, fullText, continuousCharIndex]);

  // Reset when card changes
  useEffect(() => {
    setContinuousCharIndex(0);
    setErrorInfo(null);
    setIsRevealed(false);
    setIsCompletedPhrase(false);
    setActiveWordIndex(null);
  }, [cardIndex, currentPhraseId]);

  // Handle Keystroke for Typing Mode
  const handleInputChar = useCallback(
    (inputKey: string) => {
      if (trainerMode !== 'typing' || !currentPhrase || isCompletedPhrase || !expectedChar) return;

      // Handle space in text if expected is space
      if (expectedChar === ' ' && inputKey === ' ') {
        setContinuousCharIndex((prev) => prev + 1);
        setErrorInfo(null);
        return;
      }

      // If user typed space when space was not expected, ignore or warn
      if (inputKey === ' ' && expectedChar !== ' ') {
        return;
      }

      const result = validateReadingInput(
        inputKey,
        expectedChar,
        fullText,
        continuousCharIndex
      );

      if (result.valid) {
        setErrorInfo(null);
        const nextIndex = continuousCharIndex + 1;

        if (nextIndex >= fullTextChars.length) {
          // Completed phrase!
          setIsCompletedPhrase(true);
          speakThai(currentPhrase.thai);
          markReadingPhraseLearned(currentPhrase.id);

          setTimeout(() => {
            if (cardIndex + 1 < deck.length) {
              setCardIndex((prev) => prev + 1);
            }
          }, 800);
        } else {
          setContinuousCharIndex(nextIndex);

          // If finished current word segment, speak it!
          if (currentSegment) {
            const segLen = Array.from(currentSegment.thai).length;
            if (charOffsetInSegment + 1 === segLen) {
              speakThai(currentSegment.thai);
            }
          }
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
      currentPhrase,
      isCompletedPhrase,
      expectedChar,
      fullText,
      continuousCharIndex,
      fullTextChars.length,
      markReadingPhraseLearned,
      cardIndex,
      deck.length,
      currentSegment,
      charOffsetInSegment,
    ]
  );

  // Physical Keyboard Listener
  useEffect(() => {
    if (trainerMode !== 'typing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === 'Backspace') {
        e.preventDefault();
        if (continuousCharIndex > 0) {
          setContinuousCharIndex((prev) => prev - 1);
          setErrorInfo(null);
        }
        return;
      }

      if (e.key === ' ' || e.key.length === 1) {
        e.preventDefault();
        handleInputChar(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [trainerMode, handleInputChar, continuousCharIndex]);

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
    if (!currentPhrase) return;
    const newDeck = [...deck];
    newDeck.splice(cardIndex, 1);
    newDeck.push(currentPhrase.id);
    setDeck(newDeck);
    setIsRevealed(false);
  };

  const handleLearnedInFlowMode = () => {
    if (!currentPhrase) return;
    markReadingPhraseLearned(currentPhrase.id);
    handleNext();
  };

  const totalInCategory = useMemo(() => {
    const pool = selectedCategory
      ? PHRASES_DATA.filter((p) => p.category === selectedCategory)
      : PHRASES_DATA;
    return pool.length;
  }, [selectedCategory]);

  const learnedCount = useMemo(() => {
    const pool = selectedCategory
      ? PHRASES_DATA.filter((p) => p.category === selectedCategory)
      : PHRASES_DATA;
    return pool.filter((p) => learnedReadingPhraseIds.includes(p.id)).length;
  }, [selectedCategory, learnedReadingPhraseIds]);

  const isCurrentLearned = currentPhrase
    ? learnedReadingPhraseIds.includes(currentPhrase.id)
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
                setTrainerMode('flow');
                setIsRevealed(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                trainerMode === 'flow'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>{language === 'ru' ? 'Разбор и чтение' : 'Reading Flow'}</span>
            </button>
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
              <span>{language === 'ru' ? 'Слитная печать' : 'Continuous Typing'}</span>
            </button>
          </div>

          {/* Progress & Shuffle */}
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
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat.value ?? 'all'}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors cursor-pointer shrink-0 ${
                selectedCategory === cat.value
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 border border-slate-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Status Filter Bar & Helpers */}
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

          {/* Toggle word boundaries or keyboard */}
          {trainerMode === 'flow' ? (
            <button
              onClick={() => setShowBoundaries(!showBoundaries)}
              className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              <Split className="w-3 h-3" />
              <span>
                {showBoundaries
                  ? language === 'ru'
                    ? 'Слитный вид'
                    : 'Unspaced'
                  : language === 'ru'
                  ? 'Показать границы слов'
                  : 'Show Boundaries'}
              </span>
            </button>
          ) : (
            <button
              onClick={() => setShowKeyboard(!showKeyboard)}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              {showKeyboard
                ? language === 'ru'
                  ? 'Скрыть клаву'
                  : 'Hide Keybd'
                : language === 'ru'
                ? 'Показать клаву'
                : 'Show Keybd'}
            </button>
          )}
        </div>
      </div>

      {/* Main Training Card Area */}
      {currentPhrase ? (
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
                {cardIndex + 1} / {deck.length} · {currentPhrase.categoryLabel}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    if (isCurrentLearned) {
                      unmarkReadingPhraseLearned(currentPhrase.id);
                    } else {
                      markReadingPhraseLearned(currentPhrase.id);
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
                  onClick={() => speakThai(currentPhrase.thai)}
                  className="p-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 active:scale-90 transition-transform cursor-pointer"
                  title={language === 'ru' ? 'Озвучить фразу' : 'Listen'}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* In Typing Mode: Active Segment Banner */}
            {trainerMode === 'typing' && currentSegment && (
              <div className="flex items-center justify-between p-2.5 rounded-2xl bg-blue-50/90 border border-blue-200/80">
                <div className="min-w-0">
                  <div className="text-[10px] text-blue-500 uppercase tracking-wider font-bold">
                    {language === 'ru' ? 'Текущее слово:' : 'Current word:'}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-thai font-bold text-blue-900 text-lg">
                      {currentSegment.thai}
                    </span>
                    <span className="text-xs text-blue-700 font-mono">
                      /{currentSegment.transcription}/
                    </span>
                    <span className="text-xs text-slate-600 font-medium truncate">
                      — {language === 'ru' ? currentSegment.meaningRu : currentSegment.meaningEn}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => speakThai(currentSegment.thai)}
                  className="p-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 active:scale-90 transition-transform cursor-pointer shrink-0"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Thai Phrase Presentation */}
            <div className="flex flex-col items-center justify-center py-2 select-none text-center">
              {trainerMode === 'typing' ? (
                /* Continuous Unspaced Typing with Word Segment Highlight */
                <div className="font-thai text-2xl sm:text-3xl font-semibold leading-relaxed tracking-wide flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 select-none py-2">
                  {segments.map((seg, sIdx) => {
                    const isPassed = sIdx < currentSegmentIndex;
                    const isCurrent = sIdx === currentSegmentIndex;

                    let segStyle = 'text-slate-300';
                    if (isPassed) {
                      segStyle = 'text-emerald-600 font-bold bg-emerald-50/80 px-1.5 py-0.5 rounded-lg';
                    } else if (isCurrent) {
                      segStyle = 'bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded-xl ring-2 ring-blue-500/50 shadow-xs';
                    }

                    if (isCurrent) {
                      const segChars = Array.from(seg.thai);
                      return (
                        <span key={sIdx} className={`transition-all duration-150 ${segStyle}`}>
                          {segChars.map((c, cIdx) => {
                            const isCharTyped = cIdx < charOffsetInSegment;
                            const isCharCurrent = cIdx === charOffsetInSegment;
                            return (
                              <span
                                key={cIdx}
                                className={`inline-block px-0.5 transition-all ${
                                  isCharTyped
                                    ? 'text-emerald-700'
                                    : isCharCurrent
                                    ? 'text-blue-900 underline underline-offset-4 decoration-2 decoration-blue-600 font-extrabold scale-110'
                                    : 'text-slate-400'
                                }`}
                              >
                                {c}
                              </span>
                            );
                          })}
                        </span>
                      );
                    }

                    return (
                      <span key={sIdx} className={`transition-all duration-150 ${segStyle}`}>
                        {seg.thai}
                      </span>
                    );
                  })}
                </div>
              ) : (
                /* Reading Flow Presentation (Clickable Words / Continuous Text) */
                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 py-3">
                  {segments.map((seg, sIdx) => {
                    const isSelected = activeWordIndex === sIdx;
                    return (
                      <button
                        key={sIdx}
                        onClick={() => {
                          setActiveWordIndex(isSelected ? null : sIdx);
                          speakThai(seg.thai);
                        }}
                        className={`font-thai text-2xl sm:text-3xl font-bold transition-all px-2 py-1 rounded-xl cursor-pointer select-none ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-md scale-105 ring-2 ring-blue-400'
                            : showBoundaries
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200/80'
                            : 'text-slate-900 hover:text-blue-600'
                        }`}
                      >
                        {seg.thai}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* In typing mode: Expected character hint badge */}
              {trainerMode === 'typing' && expectedChar && !isCompletedPhrase && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                  <span>{language === 'ru' ? 'Следующая буква:' : 'Next letter:'}</span>
                  <span className="font-bold font-thai text-slate-800 text-sm">
                    {expectedChar === ' ' ? '␣ [Пробел]' : expectedChar}
                  </span>
                </div>
              )}
            </div>

            {/* In Reading Flow: Active Selected Word Details */}
            {trainerMode === 'flow' && activeWordIndex !== null && segments[activeWordIndex] && (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 animate-fadeIn">
                <div className="min-w-0">
                  <div className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                    {language === 'ru' ? 'Разбор выбранного слова:' : 'Word Breakdown:'}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-thai font-bold text-slate-900 text-lg">
                      {segments[activeWordIndex]!.thai}
                    </span>
                    <span className="font-mono text-xs text-blue-800">
                      /{segments[activeWordIndex]!.transcription}/
                    </span>
                    {(() => {
                      const badge = getToneBadgeInfo(segments[activeWordIndex]!.tone, language);
                      return (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold border ${badge.color}`}>
                          {badge.arrow} {badge.label}
                        </span>
                      );
                    })()}
                  </div>
                  <div className="text-xs font-semibold text-slate-700 mt-0.5">
                    {language === 'ru'
                      ? segments[activeWordIndex]!.meaningRu
                      : segments[activeWordIndex]!.meaningEn}
                  </div>
                </div>
                <button
                  onClick={() => speakThai(segments[activeWordIndex]!.thai)}
                  className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 active:scale-90 transition-transform cursor-pointer shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
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

            {/* Full Phrase Transcription and Translation */}
            {(trainerMode === 'typing' || isRevealed) && (
              <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-100 animate-fadeIn">
                <div className="text-xs text-slate-400 font-mono text-center">
                  /{currentPhrase.transcription}/
                </div>
                <div className="text-base font-bold text-slate-800 text-center">
                  {getPhraseTranslation(currentPhrase, language)}
                </div>
              </div>
            )}

            {/* Reading Flow Reveal / Answer Controls */}
            {trainerMode === 'flow' && !isRevealed && (
              <button
                onClick={() => {
                  setIsRevealed(true);
                  speakThai(currentPhrase.thai);
                }}
                className="w-full py-3 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-md hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Headphones className="w-4 h-4" />
                <span>
                  {language === 'ru'
                    ? 'Показать перевод и чтение'
                    : 'Show Translation & Reading'}
                </span>
              </button>
            )}

            {trainerMode === 'flow' && isRevealed && (
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={handleRepeat}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                  <span>{language === 'ru' ? 'Повторить' : 'Repeat'}</span>
                </button>
                <button
                  onClick={handleLearnedInFlowMode}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs hover:bg-emerald-700 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    {language === 'ru' ? 'Прочитал без запинки' : 'Read Fluently'}
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
                  setContinuousCharIndex(0);
                  setIsRevealed(false);
                  setActiveWordIndex(null);
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
              {language === 'ru' ? 'Все фразы пройдены!' : 'All phrases completed!'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              {language === 'ru'
                ? 'Вы отработали все фразы в выбранной категории. Можно сбросить прогресс и пройти снова.'
                : 'You have completed all phrases in this category. You can reset and practice again.'}
            </p>
          </div>
          <button
            onClick={() => {
              resetReadingPhrasesProgress(selectedCategory);
              setDeck(categoryPhrases.map((p) => p.id));
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
