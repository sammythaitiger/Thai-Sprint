import { useAppStore } from '../store/useAppStore';
import { PhraseList } from './PhraseList';
import { WordList } from './WordList';
import { useTranslation } from '../i18n/translations';
import { Keyboard } from 'lucide-react';

export function DictionaryContainer() {
  const { t } = useTranslation();
  const language = useAppStore((s) => s.language);
  const setTab = useAppStore((s) => s.setTab);
  const setReadingSubTab = useAppStore((s) => s.setReadingSubTab);
  const dictionaryMode = useAppStore((s) => s.dictionaryMode);
  const setDictionaryMode = useAppStore((s) => s.setDictionaryMode);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Mode Switcher Pill */}
      <div className="px-4 pt-3 pb-1">
        <div className="bg-slate-200/70 p-1 rounded-xl flex items-center gap-1 shadow-inner">
          <button
            onClick={() => setDictionaryMode('phrases')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 select-none touch-manipulation flex items-center justify-center gap-1.5 ${
              dictionaryMode === 'phrases'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <span>💬</span> {t('phrases')}
          </button>

          <button
            onClick={() => setDictionaryMode('words')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 select-none touch-manipulation flex items-center justify-center gap-1.5 ${
              dictionaryMode === 'words'
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <span>🔤</span> {t('words')}
          </button>
        </div>
      </div>

      {/* Quick Jump to Reading Trainer */}
      <div className="px-4 py-1 flex items-center justify-end">
        <button
          onClick={() => {
            setReadingSubTab(dictionaryMode === 'phrases' ? 'phrases' : 'words');
            setTab('reading');
          }}
          className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <Keyboard className="w-3 h-3" />
          <span>
            {language === 'ru'
              ? `Тренажёр чтения ${dictionaryMode === 'phrases' ? 'фраз' : 'слов'} →`
              : `Practice reading ${dictionaryMode === 'phrases' ? 'phrases' : 'words'} →`}
          </span>
        </button>
      </div>

      {/* Render active dictionary */}
      {dictionaryMode === 'phrases' ? <PhraseList /> : <WordList />}
    </div>
  );
}
