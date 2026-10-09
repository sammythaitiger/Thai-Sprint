import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Volume2,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  Trophy,
  Sparkles,
} from 'lucide-react';
import { ReadingLesson, ReadingWord } from '../../types/reading';
import { useAppStore } from '../../store/useAppStore';
import { getToneBadgeInfo } from '../../data/readingLessons';
import { speakThai } from '../../utils/tts';
import { validateReadingInput, ValidationResult } from '../../utils/thaiKedmanee';
import { VirtualKedmaneeKeyboard } from './VirtualKedmaneeKeyboard';

interface TypingPracticeViewProps {
  lesson: ReadingLesson;
  onNextLesson?: () => void;
}

export const TypingPracticeView: React.FC<TypingPracticeViewProps> = ({
  lesson,
  onNextLesson,
}) => {
  const language = useAppStore((s) => s.language);
  const markLessonCompleted = useAppStore((s) => s.markReadingLessonCompleted);

  // Practice mode: 'drills' | 'vocabulary' | 'continuous'
  const isContinuous = !!lesson.isContinuousText && !!lesson.continuousText;
  const [mode, setMode] = useState<'drills' | 'vocabulary' | 'continuous'>(
    isContinuous ? 'continuous' : 'drills'
  );

  useEffect(() => {
    if (lesson.isContinuousText) {
      setMode('continuous');
    } else {
      setMode('drills');
    }
  }, [lesson.id, lesson.isContinuousText]);

  // Standard Word / Drill State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [errorInfo, setErrorInfo] = useState<ValidationResult | null>(null);
  const [shake, setShake] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  // Accuracy tracking
  const [totalStrokes, setTotalStrokes] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  // ──────────────────────────────────────────────
  // Continuous Text Flow State & Calculations
  // ──────────────────────────────────────────────
  const [continuousCharIndex, setContinuousCharIndex] = useState(0);
  const fullText = lesson.continuousText?.fullText ?? '';
  const fullTextChars = useMemo(() => Array.from(fullText), [fullText]);

  // Find active segment in continuous mode
  const { activeSegmentIndex, activeSegment, charOffsetInSegment } = useMemo(() => {
    if (!isContinuous || !lesson.continuousText) {
      return { activeSegmentIndex: 0, activeSegment: null, charOffsetInSegment: 0 };
    }

    let runningOffset = 0;
    for (let i = 0; i < lesson.continuousText.segments.length; i++) {
      const seg = lesson.continuousText.segments[i]!;
      const segLen = Array.from(seg.thai).length;
      if (
        continuousCharIndex >= runningOffset &&
        continuousCharIndex < runningOffset + segLen
      ) {
        return {
          activeSegmentIndex: i,
          activeSegment: seg,
          charOffsetInSegment: continuousCharIndex - runningOffset,
        };
      }
      runningOffset += segLen;
    }

    return {
      activeSegmentIndex: lesson.continuousText.segments.length - 1,
      activeSegment:
        lesson.continuousText.segments[lesson.continuousText.segments.length - 1],
      charOffsetInSegment: 0,
    };
  }, [isContinuous, lesson.continuousText, continuousCharIndex]);

  // Standard mode active item
  const activeItems: (string | ReadingWord)[] =
    mode === 'drills' ? lesson.drills : lesson.vocabulary;
  const currentTargetWord =
    mode === 'continuous'
      ? fullText
      : typeof activeItems[currentIndex] === 'string'
      ? (activeItems[currentIndex] as string)
      : (activeItems[currentIndex] as ReadingWord)?.thai ?? '';

  const currentWordObj =
    mode === 'continuous'
      ? undefined
      : typeof activeItems[currentIndex] === 'object'
      ? (activeItems[currentIndex] as ReadingWord)
      : undefined;

  const targetChars = useMemo(
    () => Array.from(currentTargetWord),
    [currentTargetWord]
  );

  const expectedChar =
    mode === 'continuous'
      ? fullTextChars[continuousCharIndex]
      : targetChars[charIndex];

  // Auto-play audio
  const playCurrentAudio = useCallback(() => {
    if (mode === 'continuous') {
      if (activeSegment) {
        speakThai(activeSegment.thai);
      } else {
        speakThai(fullText);
      }
    } else {
      speakThai(currentTargetWord);
    }
  }, [mode, activeSegment, fullText, currentTargetWord]);

  // Reset when lesson or mode changes
  useEffect(() => {
    setCharIndex(0);
    setContinuousCharIndex(0);
    setErrorInfo(null);
    setSessionCompleted(false);
  }, [currentIndex, mode, lesson.id]);

  // Handle Keystroke
  const handleInputChar = useCallback(
    (inputKey: string) => {
      if (sessionCompleted || !expectedChar) return;

      setTotalStrokes((prev) => prev + 1);

      const targetToValidate =
        mode === 'continuous' ? fullText : currentTargetWord;
      const indexToValidate =
        mode === 'continuous' ? continuousCharIndex : charIndex;

      const result = validateReadingInput(
        inputKey,
        expectedChar,
        targetToValidate,
        indexToValidate
      );

      if (result.valid) {
        setErrorInfo(null);

        if (mode === 'continuous') {
          const nextIndex = continuousCharIndex + 1;
          if (nextIndex >= fullTextChars.length) {
            // Finished entire continuous text!
            speakThai(fullText);
            setSessionCompleted(true);
            markLessonCompleted(lesson.id);
          } else {
            setContinuousCharIndex(nextIndex);

            // If we just completed a segment, speak that segment
            if (lesson.continuousText && activeSegment) {
              const segLen = Array.from(activeSegment.thai).length;
              if (charOffsetInSegment + 1 === segLen) {
                speakThai(activeSegment.thai);
              }
            }
          }
        } else {
          // Standard word / drill mode
          if (charIndex + 1 >= targetChars.length) {
            speakThai(currentTargetWord);
            setTimeout(() => {
              if (currentIndex + 1 < activeItems.length) {
                setCurrentIndex((prev) => prev + 1);
              } else {
                setSessionCompleted(true);
                markLessonCompleted(lesson.id);
              }
            }, 300);
          } else {
            setCharIndex((prev) => prev + 1);
          }
        }
      } else {
        // Error
        setErrorCount((prev) => prev + 1);
        setErrorInfo(result);
        setShake(true);
        setTimeout(() => setShake(false), 500);

        if ('vibrate' in navigator) {
          navigator.vibrate(30);
        }
      }
    },
    [
      sessionCompleted,
      expectedChar,
      mode,
      fullText,
      currentTargetWord,
      continuousCharIndex,
      charIndex,
      fullTextChars.length,
      markLessonCompleted,
      lesson.id,
      lesson.continuousText,
      activeSegment,
      charOffsetInSegment,
      targetChars.length,
      currentIndex,
      activeItems.length,
    ]
  );

  // Global physical keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === 'Backspace') {
        e.preventDefault();
        if (mode === 'continuous') {
          if (continuousCharIndex > 0) {
            setContinuousCharIndex((prev) => prev - 1);
            setErrorInfo(null);
          }
        } else {
          if (charIndex > 0) {
            setCharIndex((prev) => prev - 1);
            setErrorInfo(null);
          }
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
  }, [handleInputChar, charIndex, continuousCharIndex, mode]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setCharIndex(0);
    setContinuousCharIndex(0);
    setErrorInfo(null);
    setSessionCompleted(false);
    setTotalStrokes(0);
    setErrorCount(0);
  };

  const accuracy =
    totalStrokes > 0
      ? Math.max(0, Math.round(((totalStrokes - errorCount) / totalStrokes) * 100))
      : 100;

  const activeLessonKeys = lesson.keys.map((k) => k.thai);

  return (
    <div className="flex-1 flex flex-col gap-3 p-3 overflow-y-auto">
      {/* Top Header: Mode selector & metrics */}
      <div className="flex items-center justify-between gap-2">
        {/* Mode Switcher */}
        <div className="flex bg-slate-200/80 p-0.5 rounded-xl text-xs font-semibold">
          {isContinuous ? (
            <>
              <button
                onClick={() => {
                  setMode('continuous');
                  handleRestart();
                }}
                className={`px-3 py-1.5 rounded-lg transition-all select-none cursor-pointer flex items-center gap-1 ${
                  mode === 'continuous'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>{language === 'ru' ? 'Слитный текст' : 'Reading Flow'}</span>
              </button>
              <button
                onClick={() => {
                  setMode('drills');
                  handleRestart();
                }}
                className={`px-3 py-1.5 rounded-lg transition-all select-none cursor-pointer ${
                  mode === 'drills'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'ru' ? 'Слова по частям' : 'Word Breakdown'}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setMode('drills');
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all select-none cursor-pointer ${
                  mode === 'drills'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'ru' ? 'Дрилл символов' : 'Typing Drill'}
              </button>
              <button
                onClick={() => {
                  setMode('vocabulary');
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all select-none cursor-pointer ${
                  mode === 'vocabulary'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'ru' ? 'Словарь урока' : 'Vocabulary'}
              </button>
            </>
          )}
        </div>

        {/* Counter & Accuracy */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-500">
            {mode === 'continuous'
              ? `${continuousCharIndex} / ${fullTextChars.length}`
              : `${currentIndex + 1} / ${activeItems.length}`}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${
              accuracy >= 90
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : accuracy >= 70
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}
          >
            {accuracy}%
          </span>
          <button
            onClick={handleRestart}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 active:scale-90 transition-all cursor-pointer"
            title={language === 'ru' ? 'Сбросить тренировку' : 'Restart'}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Completion Modal */}
      {sessionCompleted ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-3xl border border-emerald-200 text-center animate-fadeIn shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-3 animate-bounce">
            <Trophy className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-1">
            {language === 'ru' ? 'Урок успешно завершен!' : 'Lesson Completed!'}
          </h3>
          <p className="text-xs text-slate-600 max-w-xs mb-4">
            {language === 'ru'
              ? `Урок ${lesson.lessonCode} пройден с точностью ${accuracy}%. Мышечная память закреплена!`
              : `Lesson ${lesson.lessonCode} completed with ${accuracy}% accuracy.`}
          </p>

          <div className="flex gap-2 w-full max-w-xs">
            <button
              onClick={handleRestart}
              className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-xs shadow-xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
            >
              {language === 'ru' ? 'Повторить' : 'Repeat'}
            </button>
            {onNextLesson && (
              <button
                onClick={onNextLesson}
                className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 text-white font-semibold text-xs shadow-md shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all cursor-pointer"
              >
                {language === 'ru' ? 'Следующий урок →' : 'Next Lesson →'}
              </button>
            )}
          </div>
        </div>
      ) : mode === 'continuous' && lesson.continuousText ? (
        /* ═══════════════════════════════════════════════════════════ */
        /* CONTINUOUS TEXT READING FLOW DISPLAY */
        /* ═══════════════════════════════════════════════════════════ */
        <div
          className={`flex-1 min-h-[190px] flex flex-col justify-between p-4 bg-white rounded-3xl border border-slate-200 shadow-sm relative transition-all ${
            shake ? 'border-rose-400 bg-rose-50/20' : ''
          }`}
        >
          {/* Active Word Focus Banner */}
          {activeSegment && (
            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-blue-50/80 border border-blue-200/70 mb-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs font-semibold text-blue-600 shrink-0">
                  {language === 'ru' ? 'Текущее слово:' : 'Active Word:'}
                </span>
                <span className="font-thai text-xl font-bold text-slate-900 shrink-0">
                  {activeSegment.thai}
                </span>
                <span className="text-xs font-mono text-slate-400 truncate">
                  /{activeSegment.transcription}/
                </span>
                <span className="text-xs font-medium text-slate-700 truncate">
                  — {activeSegment.translation[language]}
                </span>
              </div>

              <button
                onClick={() => speakThai(activeSegment.thai)}
                className="p-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 active:scale-90 transition-transform shrink-0 cursor-pointer"
                title={language === 'ru' ? 'Озвучить слово' : 'Speak word'}
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Full Unspaced Sentence with Word Segment Highlights */}
          <div className="flex-1 flex items-center justify-center py-2 px-1">
            <div className="font-thai text-2xl sm:text-3xl font-semibold leading-relaxed tracking-wide flex flex-wrap items-center gap-x-1 gap-y-2 select-none justify-center text-center">
              {lesson.continuousText.segments.map((seg, sIdx) => {
                const isPassed = sIdx < activeSegmentIndex;
                const isCurrent = sIdx === activeSegmentIndex;

                let segmentStyle = 'text-slate-300';
                if (isPassed) {
                  segmentStyle = 'text-emerald-600 font-bold bg-emerald-50/70 px-1.5 py-0.5 rounded-lg';
                } else if (isCurrent) {
                  segmentStyle = 'bg-blue-100/90 text-blue-900 font-bold px-2 py-0.5 rounded-xl shadow-xs ring-2 ring-blue-400/40';
                }

                // Render characters inside current segment
                if (isCurrent) {
                  const segChars = Array.from(seg.thai);
                  return (
                    <span key={sIdx} className={`transition-all duration-150 ${segmentStyle}`}>
                      {segChars.map((c, cIdx) => {
                        const isCharTyped = cIdx < charOffsetInSegment;
                        const isCharCurrent = cIdx === charOffsetInSegment;

                        let cStyle = 'text-slate-400';
                        if (isCharTyped) {
                          cStyle = 'text-emerald-700 font-bold';
                        } else if (isCharCurrent) {
                          cStyle = 'text-blue-700 underline underline-offset-4 decoration-2 decoration-blue-600 animate-pulse font-extrabold';
                        }

                        return (
                          <span key={cIdx} className={cStyle}>
                            {c}
                          </span>
                        );
                      })}
                    </span>
                  );
                }

                return (
                  <span key={sIdx} className={`transition-all duration-150 ${segmentStyle}`}>
                    {seg.thai}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Full Sentence Translation & Audio */}
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
            <p className="text-slate-500 italic truncate flex-1">
              «{lesson.continuousText.translation[language]}»
            </p>
            <button
              onClick={() => speakThai(fullText)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95 transition-all shrink-0 cursor-pointer font-medium"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{language === 'ru' ? 'Весь текст' : 'Full Text'}</span>
            </button>
          </div>

          {/* Error Banner */}
          {errorInfo && !errorInfo.valid && (
            <div className="mt-2 flex items-start gap-2 p-2 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs animate-fadeIn">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-snug">
                {language === 'ru' ? errorInfo.hintRu : errorInfo.hintEn}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ═══════════════════════════════════════════════════════════ */
        /* STANDARD DRILL / VOCABULARY PRACTICE DISPLAY */
        /* ═══════════════════════════════════════════════════════════ */
        <div
          className={`flex-1 min-h-[160px] flex flex-col items-center justify-center p-5 bg-white rounded-3xl border border-slate-200 shadow-sm relative transition-all ${
            shake ? 'border-rose-400 bg-rose-50/20' : ''
          }`}
        >
          {/* Target Word in Thai with Character Highlighting */}
          <div className="flex items-center justify-center mb-2">
            <div className="font-thai text-5xl sm:text-6xl font-extrabold tracking-wide flex items-center leading-none select-none">
              {targetChars.map((char, idx) => {
                const isTyped = idx < charIndex;
                const isCurrent = idx === charIndex;

                let charStyle = 'text-slate-300';
                if (isTyped) {
                  charStyle = 'text-emerald-600';
                } else if (isCurrent) {
                  charStyle =
                    'text-blue-600 underline underline-offset-8 decoration-4 decoration-blue-500 animate-pulse';
                }

                return (
                  <span key={idx} className={`transition-colors duration-150 ${charStyle}`}>
                    {char}
                  </span>
                );
              })}
            </div>

            {/* Audio Button */}
            <button
              onClick={playCurrentAudio}
              className="ml-3 p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 active:scale-90 transition-transform cursor-pointer"
              title={language === 'ru' ? 'Прослушать' : 'Listen'}
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* Transcription & Translation if available */}
          {currentWordObj && (
            <div className="flex flex-col items-center gap-1 mt-1 text-center">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-slate-500">
                  /{currentWordObj.transcription}/
                </span>
                {currentWordObj.tone && (
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      getToneBadgeInfo(currentWordObj.tone, language).color
                    }`}
                  >
                    {getToneBadgeInfo(currentWordObj.tone, language).arrow}{' '}
                    {getToneBadgeInfo(currentWordObj.tone, language).label}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium text-slate-700">
                {currentWordObj.translation[language]}
              </span>
            </div>
          )}

          {/* Sequence & Stacking Error Banner */}
          {errorInfo && !errorInfo.valid && (
            <div className="mt-3 w-full max-w-sm flex items-start gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs animate-fadeIn">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-snug">
                {language === 'ru' ? errorInfo.hintRu : errorInfo.hintEn}
              </div>
            </div>
          )}

          {/* Touch navigation controls */}
          <div className="flex items-center justify-between w-full mt-4 pt-3 border-t border-slate-100 text-xs">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className={`flex items-center gap-1 font-semibold select-none cursor-pointer ${
                currentIndex === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{language === 'ru' ? 'Назад' : 'Prev'}</span>
            </button>

            <span className="text-[11px] text-slate-400 font-mono">
              {language === 'ru' ? 'Вводите на клавиатуре или тапайте ниже' : 'Type on keyboard or tap below'}
            </span>

            <button
              onClick={() =>
                setCurrentIndex((prev) => Math.min(activeItems.length - 1, prev + 1))
              }
              disabled={currentIndex === activeItems.length - 1}
              className={`flex items-center gap-1 font-semibold select-none cursor-pointer ${
                currentIndex === activeItems.length - 1
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{language === 'ru' ? 'Пропустить' : 'Skip'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Virtual Kedmanee Keyboard */}
      <VirtualKedmaneeKeyboard
        expectedChar={expectedChar}
        onKeyClick={(thaiChar) => handleInputChar(thaiChar)}
        activeLessonKeys={activeLessonKeys}
      />
    </div>
  );
};
