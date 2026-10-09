import React from 'react';
import { Volume2, ArrowRight, BookOpen, Keyboard, Info, CheckCircle2 } from 'lucide-react';
import { ReadingLesson } from '../../types/reading';
import { useAppStore } from '../../store/useAppStore';
import { getToneBadgeInfo } from '../../data/readingLessons';
import { speakThai } from '../../utils/tts';
import { getFingerColor, getFingerLabel } from '../../utils/thaiKedmanee';

interface LessonGuideViewProps {
  lesson: ReadingLesson;
  onStartPractice: () => void;
  onSelectLesson: (id: number) => void;
  totalLessons: number;
}

export const LessonGuideView: React.FC<LessonGuideViewProps> = ({
  lesson,
  onStartPractice,
  onSelectLesson,
  totalLessons,
}) => {
  const language = useAppStore((s) => s.language);
  const completedLessons = useAppStore((s) => s.completedReadingLessonIds);
  const isCompleted = completedLessons.includes(lesson.id);

  const handlePlayAudio = (thaiText: string) => {
    speakThai(thaiText);
  };

  return (
    <div className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/20">
            {lesson.stageTitle[language]}
          </span>
          {isCompleted && (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-400/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {language === 'ru' ? 'Пройден' : 'Completed'}
            </span>
          )}
        </div>

        <h2 className="text-xl font-bold tracking-tight text-white mb-1">
          {lesson.title[language]}
        </h2>
        <p className="text-xs text-blue-200/90 leading-relaxed mb-4">
          {lesson.subtitle[language]}
        </p>

        {/* Start Practice Button */}
        <button
          onClick={onStartPractice}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold text-sm shadow-md shadow-blue-500/30 active:scale-[0.98] transition-all select-none touch-manipulation cursor-pointer"
        >
          <Keyboard className="w-4 h-4" />
          <span>{language === 'ru' ? 'Тренажёр ввода и дрилла' : 'Start Typing Practice'}</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* Keys Introduced in this lesson (if any) */}
      {lesson.keys && lesson.keys.length > 0 && (
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              {language === 'ru' ? 'Клавиши и символы урока' : 'Lesson Keys & Symbols'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {lesson.keys.map((k) => (
              <div
                key={k.thai}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-colors"
              >
                <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-xs shrink-0">
                  <span className="font-thai text-2xl font-bold text-slate-900 leading-none">
                    {k.thai}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-blue-600 leading-none mt-1">
                    [{k.qwerty.toUpperCase()}]
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-bold text-slate-800 truncate">
                      {k.name[language]}
                    </span>
                    <button
                      onClick={() => handlePlayAudio(k.thai)}
                      className="p-1 rounded-full text-blue-600 hover:bg-blue-50 active:scale-90 transition-transform cursor-pointer"
                      title={language === 'ru' ? 'Прослушать' : 'Listen'}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded border ${getFingerColor(
                        k.finger
                      )}`}
                    >
                      {getFingerLabel(k.finger, language)}
                    </span>
                    {k.consonantClass && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-700">
                        {k.consonantClass === 'mid'
                          ? language === 'ru' ? 'Средний класс' : 'Mid class'
                          : k.consonantClass === 'high'
                          ? language === 'ru' ? 'Высокий класс' : 'High class'
                          : language === 'ru' ? 'Низкий класс' : 'Low class'}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-500 leading-snug">
                    {k.sound}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tone Rule */}
      <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200/80 shadow-xs flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-700" />
          <h3 className="text-sm font-bold text-emerald-950">
            {language === 'ru' ? 'Правило чтения и тона' : 'Tone & Reading Rule'}
          </h3>
        </div>
        <p className="text-xs text-emerald-900 leading-relaxed">
          {lesson.toneRule[language]}
        </p>
      </div>

      {/* Typing Mechanics Rule */}
      <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200/80 shadow-xs flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Keyboard className="w-4 h-4 text-amber-700" />
          <h3 className="text-sm font-bold text-amber-950">
            {language === 'ru' ? 'Правило слепой печати (Touch Typing)' : 'Typing Mechanics Rule'}
          </h3>
        </div>
        <p className="text-xs text-amber-900 leading-relaxed font-medium">
          {lesson.typingRule[language]}
        </p>
      </div>

      {/* Tone Comparison (Audio Contrast) if exists */}
      {lesson.toneComparison && (
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">
              {lesson.toneComparison.description[language]}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {lesson.toneComparison.words.map((item) => {
              const badge = getToneBadgeInfo(item.tone, language);
              return (
                <button
                  key={item.thai}
                  onClick={() => handlePlayAudio(item.thai)}
                  className="flex flex-col items-center p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-indigo-300 active:scale-95 transition-all text-center group cursor-pointer"
                >
                  <span className="font-thai text-2xl font-bold text-slate-900 group-hover:text-indigo-600">
                    {item.thai}
                  </span>
                  <span className="text-xs font-mono text-slate-500 mt-0.5">
                    /{item.trans}/
                  </span>
                  <span
                    className={`mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.color}`}
                  >
                    {badge.arrow} {badge.label}
                  </span>
                  <span className="text-[11px] text-slate-600 mt-1">
                    {item.meaning[language]}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-indigo-600 mt-1 font-medium">
                    <Volume2 className="w-3 h-3" />
                    <span>{language === 'ru' ? 'Слушать' : 'Listen'}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Vocabulary or Continuous Text Breakdown */}
      {lesson.isContinuousText && lesson.continuousText ? (
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'ru' ? 'Разбивка слитного текста по словам' : 'Text Word Breakdown'}
              </h3>
            </div>
            <button
              onClick={() => handlePlayAudio(lesson.continuousText!.fullText)}
              className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-2.5 py-1 rounded-xl cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{language === 'ru' ? 'Слушать весь текст' : 'Listen Full Text'}</span>
            </button>
          </div>

          {/* Full Sentence Banner */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="font-thai text-xl font-bold text-slate-900 leading-relaxed mb-1">
              {lesson.continuousText.fullText}
            </div>
            <div className="text-xs font-mono text-slate-400 mb-1">
              /{lesson.continuousText.transcription}/
            </div>
            <div className="text-xs text-slate-700 font-medium">
              «{lesson.continuousText.translation[language]}»
            </div>
          </div>

          {/* Segments Pill Cloud */}
          <div className="flex flex-col gap-2 mt-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {language === 'ru' ? 'Слова в предложении:' : 'Words in Sentence:'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {lesson.continuousText.segments.map((seg, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 hover:border-blue-200 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-thai text-base font-bold text-slate-900 leading-none">
                          {seg.thai}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          /{seg.transcription}/
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 font-medium truncate mt-0.5">
                        {seg.translation[language]}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePlayAudio(seg.thai)}
                    className="p-1 rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 active:scale-90 transition-all shrink-0 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'ru' ? 'Словарь урока' : 'Lesson Vocabulary'}
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              {lesson.vocabulary.length} {language === 'ru' ? 'слов' : 'words'}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {lesson.vocabulary.map((word) => {
              const badge = getToneBadgeInfo(word.tone, language);
              return (
                <div
                  key={word.thai}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-slate-200 transition-colors gap-2"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={() => handlePlayAudio(word.thai)}
                      className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 active:scale-90 transition-all flex items-center justify-center shrink-0 cursor-pointer"
                      title={language === 'ru' ? 'Озвучить' : 'Pronounce'}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-thai text-xl font-bold text-slate-900 leading-tight">
                          {word.thai}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          /{word.transcription}/
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium truncate">
                        {word.translation[language]}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap ${badge.color}`}
                    >
                      {badge.arrow} {badge.label}
                    </span>
                    {word.typingSteps && (
                      <div className="flex items-center gap-0.5 font-mono text-[9px] text-slate-400">
                        {word.typingSteps.map((step, idx) => (
                          <span
                            key={idx}
                            className="px-1 py-0.5 rounded bg-slate-200/70 text-slate-700 font-bold"
                          >
                            {step.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Theory & Pedagogical Note */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs text-slate-600 leading-relaxed flex items-start gap-2.5">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <div className="flex-1">
          <span className="font-semibold text-slate-800 block mb-0.5">
            {language === 'ru' ? 'Методическая подсказка:' : 'Methodology Note:'}
          </span>
          {lesson.theoryNote[language]}
        </div>
      </div>

      {/* Lesson Navigation Footer */}
      <div className="flex items-center justify-between gap-3 pt-2 pb-4">
        <button
          onClick={() => onSelectLesson(Math.max(1, lesson.id - 1))}
          disabled={lesson.id === 1}
          className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold select-none touch-manipulation transition-colors ${
            lesson.id === 1
              ? 'border-slate-200 text-slate-300 cursor-not-allowed'
              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer'
          }`}
        >
          ← {language === 'ru' ? 'Предыдущий урок' : 'Previous Lesson'}
        </button>

        <button
          onClick={() => onSelectLesson(Math.min(totalLessons, lesson.id + 1))}
          disabled={lesson.id === totalLessons}
          className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold select-none touch-manipulation transition-colors ${
            lesson.id === totalLessons
              ? 'border-slate-200 text-slate-300 cursor-not-allowed'
              : 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700 shadow-sm cursor-pointer'
          }`}
        >
          {language === 'ru' ? 'Следующий урок' : 'Next Lesson'} →
        </button>
      </div>
    </div>
  );
};
