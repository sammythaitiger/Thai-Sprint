import { Sparkles, Volume2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { PHRASES_DATA } from '../data/phrases';
import { WORDS_DATA } from '../data/words';
import { LESSONS_DATA } from '../data/lessons';

const SPEEDS = [
  { rate: 0.5, label: '0.5x' },
  { rate: 0.65, label: '0.65x' },
  { rate: 0.8, label: '0.8x' },
];

export function Header() {
  const currentTab = useAppStore((s) => s.currentTab);
  const trainerMode = useAppStore((s) => s.trainerMode);
  const dictionaryMode = useAppStore((s) => s.dictionaryMode);

  const completedDays = useAppStore((s) => s.completedDays);
  const learnedPhraseCount = useAppStore((s) => s.learnedPhraseIds.length);
  const learnedWordCount = useAppStore((s) => s.learnedWordIds.length);

  const speechRate = useAppStore((s) => s.speechRate);
  const setSpeechRate = useAppStore((s) => s.setSpeechRate);

  const language = useAppStore((s) => s.language);
  const setLanguage = useAppStore((s) => s.setLanguage);

  // Determine current active mode
  const isWordsActive =
    (currentTab === 'trainer' && trainerMode === 'words') ||
    (currentTab === 'dictionary' && dictionaryMode === 'words');

  let learnedCount = learnedPhraseCount;
  let total = PHRASES_DATA.length;
  let label = language === 'ru' ? 'фраз' : 'phrases';

  if (currentTab === 'lessons') {
    learnedCount = completedDays.length;
    total = LESSONS_DATA.length;
    label = language === 'ru' ? 'дней' : 'days';
  } else if (isWordsActive) {
    learnedCount = learnedWordCount;
    total = WORDS_DATA.length;
    label = language === 'ru' ? 'слов' : 'words';
  }

  const pct = total > 0 ? Math.round((learnedCount / total) * 100) : 0;

  return (
    <header
      className="sticky top-0 z-30 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white px-4 py-2.5 shadow-lg"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
            <span className="text-base">🇹🇭</span>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight leading-tight">Thai Sprint</h1>
            <p className="text-[10px] text-blue-300/80 leading-tight">
              {language === 'ru' ? 'Учительский тренажёр' : 'Teacher’s Thai Trainer'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Language Toggle: RU / EN */}
          <button
            type="button"
            onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
            className="flex items-center gap-1 bg-white/10 hover:bg-white/20 active:scale-95 transition-all rounded-full px-2 py-1 text-[11px] font-bold text-white border border-white/15 select-none touch-manipulation backdrop-blur-sm"
            title={language === 'ru' ? 'Switch to English' : 'Переключить на русский'}
          >
            <span>{language === 'ru' ? '🇷🇺 RU' : '🇬🇧 EN'}</span>
          </button>
          {/* Audio Speed selector */}
          <div className="flex items-center gap-1 bg-white/10 rounded-full p-1 backdrop-blur-sm">
            <Volume2 className="w-3 h-3 text-blue-300 ml-1 shrink-0" />
            {SPEEDS.map((s) => {
              const isActive = Math.abs(speechRate - s.rate) < 0.05;
              return (
                <button
                  key={s.rate}
                  type="button"
                  onClick={() => setSpeechRate(s.rate)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all select-none touch-manipulation ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                  title={`Скорость озвучки: ${s.label}`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          {/* Progress Badge */}
          <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-2.5 py-1 backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="text-[11px] font-semibold">
              {learnedCount}/{total} {label}
            </span>
            <span className="text-[9px] text-blue-300/70">{pct}%</span>
          </div>
        </div>
      </div>
    </header>
  );
}
