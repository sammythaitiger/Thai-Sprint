import { useState, useMemo } from 'react';
import { ArrowLeft, BookOpen, Layers, MessageSquare, MessageCircle, Puzzle, CheckCircle2, Sparkles, Play } from 'lucide-react';
import { Lesson } from '../../types';
import { WORDS_DATA } from '../../data/words';
import { PHRASES_DATA } from '../../data/phrases';
import { PATTERNS_DATA } from '../../data/patterns';
import { AudioButton } from '../AudioButton';
import { LessonQuiz } from './LessonQuiz';
import { LessonCardTrainer } from './LessonCardTrainer';
import { useAppStore } from '../../store/useAppStore';
import { useTranslation } from '../../i18n/translations';
import {
  getLessonTitle,
  getLessonTheme,
  getLessonGrammar,
  getLessonCulturalTip,
  getLessonTeacherTip,
  getWordTranslation,
  getPhraseTranslation,
} from '../../data/translationsEn';

interface LessonViewProps {
  lesson: Lesson;
  onBack: () => void;
}

type LessonTab = 'overview' | 'trainer' | 'words' | 'phrases' | 'dialogue' | 'builder' | 'quiz';

export function LessonView({ lesson, onBack }: LessonViewProps) {
  const language = useAppStore((s) => s.language);
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<LessonTab>('overview');
  const [trainerInitialFilter, setTrainerInitialFilter] = useState<'all' | 'words' | 'phrases'>('all');

  const completedDays = useAppStore((s) => s.completedDays);
  const markDayCompleted = useAppStore((s) => s.markDayCompleted);
  const saveQuizScore = useAppStore((s) => s.saveQuizScore);
  const lessonQuizScores = useAppStore((s) => s.lessonQuizScores);
  const learnedPhraseIds = useAppStore((s) => s.learnedPhraseIds);
  const learnedWordIds = useAppStore((s) => s.learnedWordIds);

  const isCompleted = completedDays.includes(lesson.day);
  const bestScore = lessonQuizScores[lesson.day];

  // Resolve full words and phrases data for this lesson
  const words = useMemo(
    () => WORDS_DATA.filter((w) => lesson.wordIds.includes(w.id)),
    [lesson.wordIds]
  );

  const phrases = useMemo(
    () => PHRASES_DATA.filter((p) => lesson.phraseIds.includes(p.id)),
    [lesson.phraseIds]
  );

  const totalLessonCards = words.length + phrases.length;
  const lessonLearnedCount = useMemo(() => {
    const learnedWords = words.filter((w) => learnedWordIds.includes(w.id)).length;
    const learnedPhrases = phrases.filter((p) => learnedPhraseIds.includes(p.id)).length;
    return learnedWords + learnedPhrases;
  }, [words, phrases, learnedWordIds, learnedPhraseIds]);

  const pattern = useMemo(
    () => (lesson.patternId ? PATTERNS_DATA.find((p) => p.id === lesson.patternId) : null),
    [lesson.patternId]
  );

  const handleQuizFinish = (score: number) => {
    saveQuizScore(lesson.day, score);
    markDayCompleted(lesson.day);
  };

  const title = getLessonTitle(lesson, language);
  const theme = getLessonTheme(lesson, language);
  const grammarNote = getLessonGrammar(lesson, language);
  const culturalTip = getLessonCulturalTip(lesson, language);
  const teacherTip = getLessonTeacherTip(lesson, language);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50">
      {/* Top Bar with Back Button */}
      <div className="px-4 pt-3 pb-2 bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" /> {t('backToCourse')}
          </button>

          {isCompleted && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" /> {t('lessonCompleted')} {bestScore ? `(${bestScore} ${language === 'en' ? 'pts' : 'б.'})` : ''}
            </span>
          )}
        </div>

        <div>
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
            {theme}
          </span>
          <h2 className="text-base font-bold text-slate-900 leading-tight">
            {title}
          </h2>
        </div>

        {/* Step Tabs Navigation */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar pt-3 pb-0.5">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> {t('tabOverview')}
          </button>

          <button
            onClick={() => {
              setTrainerInitialFilter('all');
              setActiveTab('trainer');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'trainer'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200/70'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> {t('tabCards')} ({totalLessonCards})
          </button>

          <button
            onClick={() => setActiveTab('words')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'words'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> {t('tabWords')} ({words.length})
          </button>

          <button
            onClick={() => setActiveTab('phrases')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'phrases'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" /> {t('tabPhrases')} ({phrases.length})
          </button>

          {lesson.classroomDialogue && lesson.classroomDialogue.length > 0 && (
            <button
              onClick={() => setActiveTab('dialogue')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'dialogue'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" /> {t('tabDialogue')} ({lesson.classroomDialogue.length})
            </button>
          )}

          {pattern && (
            <button
              onClick={() => setActiveTab('builder')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'builder'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Puzzle className="w-3.5 h-3.5" /> {t('tabBuilder')}
            </button>
          )}

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-amber-100 text-amber-900 font-bold'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> {t('tabQuiz')} ({lesson.quiz.length})
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* 1. OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Grammar explanation card */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-indigo-600 font-bold text-xs">
                <BookOpen className="w-4 h-4" /> {t('grammarFocus')}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {grammarNote}
              </p>
            </div>

            {/* Cultural Tip Card */}
            {culturalTip && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-5 border border-amber-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-amber-800 font-bold text-xs">
                  <span>🇹🇭</span> {t('schoolEtiquette')}
                </div>
                <p className="text-xs text-amber-950 leading-relaxed font-medium">
                  {culturalTip}
                </p>
              </div>
            )}

            {/* Teacher Discipline Tip */}
            {teacherTip && (
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-5 border border-indigo-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-indigo-800 font-bold text-xs">
                  <span>💡</span> {t('classroomManagement')}
                </div>
                <p className="text-xs text-indigo-950 leading-relaxed font-medium">
                  {teacherTip}
                </p>
              </div>
            )}

            {/* Lesson Flashcards Drill Hero Card */}
            <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 text-7xl opacity-10 select-none pointer-events-none">
                🗂️
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold border border-amber-400/30">
                  <Sparkles className="w-3.5 h-3.5" /> {t('lessonCardsTrainerTitle')}
                </span>
                <span className="text-xs font-semibold text-blue-200">
                  {lessonLearnedCount} / {totalLessonCards} {language === 'en' ? 'learned' : 'выучено'}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                {t('interactiveTrainerHero')}
              </h3>
              <p className="text-xs text-blue-100/80 mb-4 leading-relaxed">
                {language === 'en'
                  ? `Master ${words.length} words and ${phrases.length} phrases with 3D cards, tone audio, and word breakdowns.`
                  : `Отработайте ${words.length} слов и ${phrases.length} фраз этого дня с 3D-переворотом карточек, озвучкой тонов и разбором на составные части.`}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setTrainerInitialFilter('all');
                    setActiveTab('trainer');
                  }}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold text-xs shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{t('trainAll')} ({totalLessonCards})</span>
                </button>
                <button
                  onClick={() => {
                    setTrainerInitialFilter('words');
                    setActiveTab('trainer');
                  }}
                  className="px-3.5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/20 active:scale-95 transition-transform"
                >
                  {t('words')}
                </button>
                <button
                  onClick={() => {
                    setTrainerInitialFilter('phrases');
                    setActiveTab('trainer');
                  }}
                  className="px-3.5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/20 active:scale-95 transition-transform"
                >
                  {t('phrases')}
                </button>
              </div>
            </div>

            {/* Quick Word & Phrase summary preview */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                {t('lessonMaterials')}
              </h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={() => {
                    setTrainerInitialFilter('all');
                    setActiveTab('trainer');
                  }}
                  className="col-span-2 p-3.5 rounded-2xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200/80 text-left active:scale-98 transition-transform flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🗂️</span>
                    <div>
                      <p className="text-xs font-bold text-indigo-950">{t('lessonCardsTrainerTitle')}</p>
                      <span className="text-[10px] text-indigo-600 font-medium">
                        {totalLessonCards} {t('lessonCardsTrainerSubtitle')}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-indigo-700 bg-white px-2.5 py-1 rounded-xl shadow-2xs border border-indigo-100">
                    {t('learnArrow')}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('words')}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-left active:scale-95 transition-transform"
                >
                  <span className="text-xl">🔤</span>
                  <p className="text-xs font-bold text-slate-800 mt-1">{words.length} {t('newWordsCount')}</p>
                  <span className="text-[10px] text-slate-500">{t('withAudio')}</span>
                </button>
                <button
                  onClick={() => setActiveTab('phrases')}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-left active:scale-95 transition-transform"
                >
                  <span className="text-xl">💬</span>
                  <p className="text-xs font-bold text-slate-800 mt-1">{phrases.length} {t('keyPhrasesCount')}</p>
                  <span className="text-[10px] text-slate-500">{t('forLesson')}</span>
                </button>
                {lesson.classroomDialogue && lesson.classroomDialogue.length > 0 && (
                  <button
                    onClick={() => setActiveTab('dialogue')}
                    className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100 text-left active:scale-95 transition-transform"
                  >
                    <span className="text-xl">🗣️</span>
                    <p className="text-xs font-bold text-blue-900 mt-1">{t('classroomDialogueTitle')}</p>
                    <span className="text-[10px] text-blue-600">{lesson.classroomDialogue.length} {t('dialogueLines')}</span>
                  </button>
                )}
                {pattern && (
                  <button
                    onClick={() => setActiveTab('builder')}
                    className="p-3 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-left active:scale-95 transition-transform"
                  >
                    <span className="text-xl">🧩</span>
                    <p className="text-xs font-bold text-indigo-900 mt-1">{t('builderPatternDay')}</p>
                    <span className="text-[10px] text-indigo-600">{t('patternOfDay')}</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => setActiveTab('quiz')}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2"
              >
                <span>{t('takeDailyQuiz')} ({lesson.quiz.length} {language === 'en' ? 'q.' : 'вопр.'})</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </div>
        )}

        {/* 1.5 TRAINER */}
        {activeTab === 'trainer' && (
          <LessonCardTrainer
            lesson={lesson}
            initialFilter={trainerInitialFilter}
            onGoToQuiz={() => setActiveTab('quiz')}
          />
        )}

        {/* 2. WORDS */}
        {activeTab === 'words' && (
          <div className="space-y-3">
            {/* Quick Practice Banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-center justify-between gap-2 shadow-2xs">
              <div>
                <p className="text-xs font-bold text-emerald-950">{t('drillWordsBannerTitle')}</p>
                <p className="text-[11px] text-emerald-700">{t('drillWordsBannerDesc')}</p>
              </div>
              <button
                onClick={() => {
                  setTrainerInitialFilter('words');
                  setActiveTab('trainer');
                }}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs active:scale-95 transition-transform shrink-0"
              >
                {t('toTrainerArrow')}
              </button>
            </div>

            <p className="text-xs text-slate-500 font-medium px-1">
              {t('audioHintSpeaker')}
            </p>
            {words.map((w) => (
              <div
                key={w.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xl font-bold text-slate-900 leading-snug mb-0.5"
                    style={{ fontFamily: "'Sarabun', sans-serif" }}
                  >
                    {w.thai}
                  </p>
                  <p className="text-sm font-mono italic text-emerald-700 font-semibold mb-1">
                    {w.transcription}
                  </p>
                  <p className="text-xs font-medium text-slate-700">{getWordTranslation(w, language)}</p>
                </div>
                <AudioButton text={w.thai} size="sm" />
              </div>
            ))}

            <button
              onClick={() => setActiveTab('quiz')}
              className="w-full mt-4 py-3.5 rounded-2xl bg-indigo-600 text-white font-bold text-sm shadow-md active:scale-95 transition-transform"
            >
              {t('checkWordsInQuiz')}
            </button>
          </div>
        )}

        {/* 3. PHRASES */}
        {activeTab === 'phrases' && (
          <div className="space-y-3">
            {/* Quick Practice Banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex items-center justify-between gap-2 shadow-2xs">
              <div>
                <p className="text-xs font-bold text-blue-950">{t('drillPhrasesBannerTitle')}</p>
                <p className="text-[11px] text-blue-700">{t('drillPhrasesBannerDesc')}</p>
              </div>
              <button
                onClick={() => {
                  setTrainerInitialFilter('phrases');
                  setActiveTab('trainer');
                }}
                className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs active:scale-95 transition-transform shrink-0"
              >
                {t('toTrainerArrow')}
              </button>
            </div>

            <p className="text-xs text-slate-500 font-medium px-1">
              {t('teacherPhrasesForLesson')}
            </p>
            {phrases.map((p) => (
              <div
                key={p.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <p
                    className="text-lg font-bold text-slate-900 leading-snug mb-1"
                    style={{ fontFamily: "'Sarabun', sans-serif" }}
                  >
                    {p.thai}
                  </p>
                  <p className="text-xs font-mono italic text-indigo-600 font-semibold mb-1">
                    {p.transcription}
                  </p>
                  <p className="text-xs font-medium text-slate-700">{getPhraseTranslation(p, language)}</p>
                </div>
                <AudioButton text={p.thai} phraseId={p.id} size="sm" />
              </div>
            ))}

            <button
              onClick={() => setActiveTab('quiz')}
              className="w-full mt-4 py-3.5 rounded-2xl bg-indigo-600 text-white font-bold text-sm shadow-md active:scale-95 transition-transform"
            >
              {t('checkPhrasesInQuiz')}
            </button>
          </div>
        )}

        {/* 3.5 DIALOGUE */}
        {activeTab === 'dialogue' && lesson.classroomDialogue && (
          <div className="space-y-3">
            <p className="text-xs text-slate-500 font-medium px-1">
              {t('liveClassroomDialogue')}
            </p>
            <div className="space-y-3">
              {lesson.classroomDialogue.map((line, idx) => {
                const isTeacher = line.speaker.includes('ครู') || line.speaker.toLowerCase().includes('учитель');
                const speakerLabel = language === 'en'
                  ? line.speaker
                      .replace(' (Староста)', ' (Class Monitor)')
                      .replace(' (Ученики хором)', ' (Students in Chorus)')
                      .replace(' (Ученик)', ' (Student)')
                      .replace(' (Учитель)', ' (Teacher)')
                      .replace(' (Коллега)', ' (Colleague)')
                      .replace(' (Тайский учитель)', ' (Thai Teacher)')
                  : line.speaker;

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border shadow-sm transition-all ${
                      isTeacher
                        ? 'bg-blue-50/70 border-blue-200'
                        : 'bg-emerald-50/70 border-emerald-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-slate-800 bg-white/90 px-2.5 py-0.5 rounded-full border border-slate-200/80 shadow-2xs">
                        {speakerLabel}
                      </span>
                      <AudioButton text={line.thai} size="sm" />
                    </div>
                    <p
                      className="text-lg font-bold text-slate-900 leading-snug mb-1"
                      style={{ fontFamily: "'Sarabun', sans-serif" }}
                    >
                      {line.thai}
                    </p>
                    <p className="text-xs font-mono italic text-indigo-600 font-semibold mb-1">
                      [{line.trans}]
                    </p>
                    <p className="text-xs font-medium text-slate-700">
                      {line.ru}
                    </p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setActiveTab('quiz')}
              className="w-full mt-4 py-3.5 rounded-2xl bg-indigo-600 text-white font-bold text-sm shadow-md active:scale-95 transition-transform"
            >
              {t('finishDialogueQuiz')}
            </button>
          </div>
        )}

        {/* 4. PATTERN BUILDER */}
        {activeTab === 'builder' && pattern && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                {t('grammarPatternDay')}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-baseline gap-2 flex-wrap">
                <span>{pattern.pattern}</span>
                <span className="text-sm font-mono text-indigo-600 font-semibold">[{pattern.transcription}]</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">{pattern.meaning}</p>

              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t('examplesInSpeech')}
              </h4>
              <div className="space-y-2">
                {pattern.examples.map((ex, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                        {ex.thai}
                      </p>
                      <p className="text-xs text-indigo-600 font-mono italic">{ex.trans}</p>
                      <p className="text-xs text-slate-600 mt-0.5">{ex.ru}</p>
                    </div>
                    <AudioButton text={ex.thai} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. QUIZ */}
        {activeTab === 'quiz' && (
          <LessonQuiz
            questions={lesson.quiz}
            day={lesson.day}
            onFinish={handleQuizFinish}
          />
        )}
      </div>
    </div>
  );
}
