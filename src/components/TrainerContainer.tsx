import { useAppStore } from '../store/useAppStore';
import { CardTrainer } from './CardTrainer';
import { WordTrainer } from './WordTrainer';
import { useTranslation } from '../i18n/translations';

export function TrainerContainer() {
  const { t } = useTranslation();
  const trainerMode = useAppStore((s) => s.trainerMode);
  const setTrainerMode = useAppStore((s) => s.setTrainerMode);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Mode Switcher Pill */}
      <div className="px-4 pt-3 pb-1">
        <div className="bg-slate-200/70 p-1 rounded-xl flex items-center gap-1 shadow-inner">
          <button
            onClick={() => setTrainerMode('phrases')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 select-none touch-manipulation flex items-center justify-center gap-1.5 ${
              trainerMode === 'phrases'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <span>💬</span> {t('phrases')}
          </button>

          <button
            onClick={() => setTrainerMode('words')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 select-none touch-manipulation flex items-center justify-center gap-1.5 ${
              trainerMode === 'words'
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <span>🔤</span> {t('words')}
          </button>
        </div>
      </div>

      {/* Render active trainer */}
      {trainerMode === 'phrases' ? <CardTrainer /> : <WordTrainer />}
    </div>
  );
}
