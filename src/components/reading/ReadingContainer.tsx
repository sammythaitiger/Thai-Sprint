import React, { useState, useMemo } from 'react';
import {
  Keyboard,
  BookOpen,
  Grid,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Type,
  MessageSquareQuote,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { READING_LESSONS } from '../../data/readingLessons';
import { LessonGuideView } from './LessonGuideView';
import { TypingPracticeView } from './TypingPracticeView';
import { ToneMatrixView } from './ToneMatrixView';
import { WordReadingTrainer } from './WordReadingTrainer';
import { PhraseReadingTrainer } from './PhraseReadingTrainer';

export const ReadingContainer: React.FC = () => {
  const language = useAppStore((s) => s.language);
  const activeLessonId = useAppStore((s) => s.activeReadingLessonId);
  const setActiveLessonId = useAppStore((s) => s.setActiveReadingLessonId);
  const completedLessons = useAppStore((s) => s.completedReadingLessonIds);

  const readingSubTab = useAppStore((s) => s.readingSubTab);
  const setReadingSubTab = useAppStore((s) => s.setReadingSubTab);

  const [activeCourseTab, setActiveCourseTab] = useState<'practice' | 'guide'>('guide');
  const [isLessonSelectorOpen, setIsLessonSelectorOpen] = useState(false);
  const [filterChapter, setFilterChapter] = useState<'all' | '1-5' | '6-10' | '11'>('all');

  const currentLesson =
    READING_LESSONS.find((l) => l.id === activeLessonId) ?? READING_LESSONS[0]!;

  const handleNextLesson = () => {
    const nextId = Math.min(READING_LESSONS.length, activeLessonId + 1);
    setActiveLessonId(nextId);
  };

  const filteredLessons = useMemo(() => {
    if (filterChapter === '1-5') {
      return READING_LESSONS.filter((l) => l.chapter >= 1 && l.chapter <= 5);
    }
    if (filterChapter === '6-10') {
      return READING_LESSONS.filter((l) => l.chapter >= 6 && l.chapter <= 10);
    }
    if (filterChapter === '11') {
      return READING_LESSONS.filter((l) => l.chapter === 11);
    }
    return READING_LESSONS;
  }, [filterChapter]);

  // Group lessons by chapter
  const groupedLessons = useMemo(() => {
    const groups: { [key: number]: typeof READING_LESSONS } = {};
    filteredLessons.forEach((lesson) => {
      if (!groups[lesson.chapter]) {
        groups[lesson.chapter] = [];
      }
      groups[lesson.chapter]!.push(lesson);
    });
    return groups;
  }, [filteredLessons]);

  const completionPct = Math.round(
    (completedLessons.length / READING_LESSONS.length) * 100
  );

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50 relative">
      {/* Top Reading Navigation Bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3 py-2 flex flex-col gap-2 shadow-xs">
        {/* Main 4-Mode Segmented Control */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200/60">
          <button
            onClick={() => setReadingSubTab('lessons')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              readingSubTab === 'lessons'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="truncate">{language === 'ru' ? 'Курс (41)' : 'Course (41)'}</span>
          </button>

          <button
            onClick={() => setReadingSubTab('words')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              readingSubTab === 'words'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span className="truncate">{language === 'ru' ? 'Слова (300+)' : 'Words (300+)'}</span>
          </button>

          <button
            onClick={() => setReadingSubTab('phrases')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              readingSubTab === 'phrases'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span className="truncate">{language === 'ru' ? 'Фразы (65)' : 'Phrases (65)'}</span>
          </button>

          <button
            onClick={() => setReadingSubTab('matrix')}
            className={`flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 ${
              readingSubTab === 'matrix'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title={language === 'ru' ? 'Матрица тонов' : 'Tone Matrix'}
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{language === 'ru' ? 'Тоны' : 'Tones'}</span>
          </button>
        </div>

        {/* When 'lessons' is active: show lesson selector and Course Sub-tabs */}
        {readingSubTab === 'lessons' && (
          <div className="flex flex-col gap-2 animate-fadeIn">
            {/* Lesson Selector Bar */}
            <div className="relative">
              <button
                onClick={() => setIsLessonSelectorOpen(!isLessonSelectorOpen)}
                className="w-full flex items-center justify-between py-2 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200/70 border border-slate-200/60 transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                    {currentLesson.lessonCode}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider truncate">
                      {currentLesson.stageTitle[language]}
                    </div>
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {currentLesson.title[language]}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className="text-[11px] font-semibold text-slate-500 bg-white/80 px-2 py-0.5 rounded-full border border-slate-200">
                    {currentLesson.id}/41
                  </span>
                  {completedLessons.includes(currentLesson.id) && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  )}
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isLessonSelectorOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Dropdown Menu with 41 lessons grouped by chapter */}
              {isLessonSelectorOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 max-h-96 overflow-y-auto bg-white rounded-2xl border border-slate-200 shadow-2xl z-30 flex flex-col animate-fadeIn">
                  {/* Progress & Chapter Filter Bar */}
                  <div className="p-3 border-b border-slate-100 bg-slate-50/80 sticky top-0 z-10 backdrop-blur-sm flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">
                        {language === 'ru' ? 'Сетка курса (41 урок)' : 'Course Grid (41 lessons)'}
                      </span>
                      <span className="font-semibold text-blue-600 text-[11px]">
                        {completedLessons.length} / 41 ({completionPct}%)
                      </span>
                    </div>

                    {/* Filter chips */}
                    <div className="flex items-center gap-1 overflow-x-auto text-[11px] font-semibold no-scrollbar">
                      {[
                        { id: 'all' as const, ru: 'Все (41)', en: 'All (41)' },
                        { id: '1-5' as const, ru: 'Дни 1–5', en: 'Days 1–5' },
                        { id: '6-10' as const, ru: 'Дни 6–10', en: 'Days 6–10' },
                        { id: '11' as const, ru: 'Тексты (11)', en: 'Texts (11)' },
                      ].map((chip) => (
                        <button
                          key={chip.id}
                          onClick={() => setFilterChapter(chip.id)}
                          className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                            filterChapter === chip.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/80'
                          }`}
                        >
                          {language === 'ru' ? chip.ru : chip.en}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Grouped list */}
                  <div className="divide-y divide-slate-100 p-1">
                    {Object.entries(groupedLessons).map(([chapterNum, lessons]) => {
                      const sampleLesson = lessons[0]!;
                      return (
                        <div key={chapterNum} className="py-2">
                          <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                            <span>{sampleLesson.stageTitle[language]}</span>
                            {Number(chapterNum) === 11 && (
                              <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                                <Sparkles className="w-3 h-3" />
                                {language === 'ru' ? 'Финал' : 'Final'}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-col gap-0.5 mt-1">
                            {lessons.map((lesson) => {
                              const isSelected = lesson.id === activeLessonId;
                              const isDone = completedLessons.includes(lesson.id);

                              return (
                                <button
                                  key={lesson.id}
                                  onClick={() => {
                                    setActiveLessonId(lesson.id);
                                    setIsLessonSelectorOpen(false);
                                  }}
                                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                                    isSelected
                                      ? 'bg-blue-50 text-blue-900 font-semibold'
                                      : 'hover:bg-slate-50 text-slate-700'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <span
                                      className={`w-7 h-6 rounded-lg text-[11px] font-bold flex items-center justify-center shrink-0 ${
                                        isSelected
                                          ? 'bg-blue-600 text-white'
                                          : isDone
                                          ? 'bg-emerald-100 text-emerald-700'
                                          : 'bg-slate-100 text-slate-600'
                                      }`}
                                    >
                                      {lesson.lessonCode}
                                    </span>
                                    <div className="min-w-0">
                                      <div className="text-xs truncate font-medium">
                                        {lesson.title[language]}
                                      </div>
                                      <div className="text-[10px] text-slate-400 truncate">
                                        {lesson.ruleSummary[language]}
                                      </div>
                                    </div>
                                  </div>

                                  {isDone && (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 ml-2" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Course Sub-Tabs: Theory vs Lesson Practice */}
            <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl">
              <button
                onClick={() => setActiveCourseTab('guide')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all select-none cursor-pointer ${
                  activeCourseTab === 'guide'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{language === 'ru' ? 'Теория урока' : 'Lesson Theory'}</span>
              </button>

              <button
                onClick={() => setActiveCourseTab('practice')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all select-none cursor-pointer ${
                  activeCourseTab === 'practice'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Keyboard className="w-3.5 h-3.5" />
                <span>{language === 'ru' ? 'Тренажёр урока' : 'Lesson Practice'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area based on readingSubTab */}
      {readingSubTab === 'lessons' && (
        <>
          {activeCourseTab === 'guide' && (
            <LessonGuideView
              lesson={currentLesson}
              onStartPractice={() => setActiveCourseTab('practice')}
              onSelectLesson={(id) => setActiveLessonId(id)}
              totalLessons={READING_LESSONS.length}
            />
          )}

          {activeCourseTab === 'practice' && (
            <TypingPracticeView
              lesson={currentLesson}
              onNextLesson={handleNextLesson}
            />
          )}
        </>
      )}

      {readingSubTab === 'words' && <WordReadingTrainer />}

      {readingSubTab === 'phrases' && <PhraseReadingTrainer />}

      {readingSubTab === 'matrix' && <ToneMatrixView />}
    </div>
  );
};
