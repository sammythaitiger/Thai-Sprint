import { useMemo } from 'react';
import { CheckCircle2, Play, Sparkles, ChevronRight, Award } from 'lucide-react';
import { LESSONS_DATA } from '../../data/lessons';
import { useAppStore } from '../../store/useAppStore';
import { useTranslation, TranslationKey } from '../../i18n/translations';
import { getLessonTitle, getLessonTheme } from '../../data/translationsEn';

interface WeekConfig {
  week: number;
  titleKey: TranslationKey;
  startDay: number;
  endDay: number;
  color: string;
}

const WEEKS: WeekConfig[] = [
  {
    week: 1,
    titleKey: 'week1Title',
    startDay: 1,
    endDay: 7,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    week: 2,
    titleKey: 'week2Title',
    startDay: 8,
    endDay: 14,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    week: 3,
    titleKey: 'week3Title',
    startDay: 15,
    endDay: 21,
    color: 'from-amber-500 to-orange-600',
  },
  {
    week: 4,
    titleKey: 'week4Title',
    startDay: 22,
    endDay: 30,
    color: 'from-purple-500 to-pink-600',
  },
];

export function LessonDashboard() {
  const language = useAppStore((s) => s.language);
  const { t } = useTranslation();
  const completedDays = useAppStore((s) => s.completedDays);
  const setActiveLessonDay = useAppStore((s) => s.setActiveLessonDay);
  const lessonQuizScores = useAppStore((s) => s.lessonQuizScores);

  const completedCount = completedDays.length;
  const totalDays = LESSONS_DATA.length;
  const progressPct = Math.round((completedCount / totalDays) * 100);

  // Find next uncompleted day
  const nextDay = useMemo(() => {
    const uncompleted = LESSONS_DATA.find((l) => !completedDays.includes(l.day));
    return uncompleted ? uncompleted.day : 1;
  }, [completedDays]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
      {/* Course Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-[-10px] bottom-[-10px] text-8xl opacity-10 select-none">
          🇹🇭
        </div>

        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-[11px] font-bold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" /> {t('courseBannerTrack')}
          </span>
          <span className="text-xs font-semibold text-blue-200">
            {completedCount}/{totalDays} {language === 'en' ? 'days' : 'дней'} ({progressPct}%)
          </span>
        </div>

        <h2 className="text-xl font-bold tracking-tight mb-1">
          {t('courseBannerTitle')}
        </h2>
        <p className="text-xs text-blue-200/80 mb-4 leading-relaxed">
          {t('courseBannerDesc')}
        </p>

        {/* Progress Bar */}
        <div className="h-2 bg-white/15 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Continue Button */}
        <button
          onClick={() => setActiveLessonDay(nextDay)}
          className="w-full py-3 rounded-2xl bg-amber-400 text-slate-950 font-bold text-sm shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2 select-none"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>
            {completedCount === 0
              ? t('startDay1')
              : completedCount === totalDays
              ? t('repeatDay30')
              : `${t('continueDay')} ${nextDay}`}
          </span>
        </button>
      </div>

      {/* 4 Weeks Sections */}
      <div className="space-y-4">
        {WEEKS.map((w) => {
          const weekLessons = LESSONS_DATA.filter(
            (l) => l.day >= w.startDay && l.day <= w.endDay
          );
          const weekCompleted = weekLessons.filter((l) => completedDays.includes(l.day)).length;

          return (
            <div key={w.week} className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                    {t(w.titleKey)}
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">
                  {weekCompleted}/{weekLessons.length}
                </span>
              </div>

              {/* Day Cards list */}
              <div className="space-y-2">
                {weekLessons.map((lesson) => {
                  const isDone = completedDays.includes(lesson.day);
                  const isNext = lesson.day === nextDay;
                  const score = lessonQuizScores[lesson.day];
                  const title = getLessonTitle(lesson, language);
                  const theme = getLessonTheme(lesson, language);

                  return (
                    <button
                      key={lesson.day}
                      onClick={() => setActiveLessonDay(lesson.day)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all active:scale-[0.98] select-none flex items-center justify-between gap-3 ${
                        isDone
                          ? 'bg-emerald-50/50 border-emerald-200'
                          : isNext
                          ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/20'
                          : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Day indicator badge */}
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                            isDone
                              ? 'bg-emerald-500 text-white shadow-sm'
                              : isNext
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-5 h-5" /> : lesson.day}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                              {theme}
                            </span>
                            {score !== undefined && (
                              <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                                <Award className="w-3 h-3" /> {score} {language === 'en' ? 'pts' : 'б.'}
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-bold text-slate-900 truncate">
                            {title}
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">
                            {lesson.wordIds.length} {language === 'en' ? 'words' : 'слов'} • {lesson.phraseIds.length} {language === 'en' ? 'phrases' : 'фразы'}
                          </p>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
