import { Search, X, Download } from 'lucide-react';
import { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { WORDS_DATA, WORD_CATEGORY_FILTERS } from '../data/words';
import { WordCard } from './WordCard';
import { getWordTranslation, getWordCategoryLabel, WORDS_EN } from '../data/translationsEn';
import { useTranslation } from '../i18n/translations';

export function WordList() {
  const language = useAppStore((s) => s.language);
  const { t } = useTranslation();
  const wordSearchQuery = useAppStore((s) => s.wordSearchQuery);
  const setWordSearchQuery = useAppStore((s) => s.setWordSearchQuery);
  const selectedWordCategory = useAppStore((s) => s.selectedWordCategory);
  const setSelectedWordCategory = useAppStore((s) => s.setSelectedWordCategory);

  const filteredWords = useMemo(() => {
    let result = WORDS_DATA;

    if (selectedWordCategory) {
      result = result.filter((w) => w.category === selectedWordCategory);
    }

    if (wordSearchQuery.trim()) {
      const q = wordSearchQuery.toLowerCase().trim();
      result = result.filter((w) => {
        const transRu = w.translation.toLowerCase();
        const transEn = (WORDS_EN[w.id] || '').toLowerCase();
        return (
          w.thai.toLowerCase().includes(q) ||
          w.transcription.toLowerCase().includes(q) ||
          transRu.includes(q) ||
          transEn.includes(q)
        );
      });
    }

    return result;
  }, [wordSearchQuery, selectedWordCategory]);

  const handleExportAnki = () => {
    const header = 'Front\tBack\n';
    const rows = WORDS_DATA.map((w) => {
      const trans = getWordTranslation(w, language);
      const catLabel = getWordCategoryLabel(w.category, w.categoryLabel, language);
      return `${w.thai} [${w.transcription}]\t${trans} (${catLabel})`;
    }).join('\n');
    const content = header + rows;
    const blob = new Blob([content], { type: 'text/tab-separated-values;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `thai_words_anki_${language}.tsv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Search */}
      <div className="px-4 pt-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={wordSearchQuery}
            onChange={(e) => setWordSearchQuery(e.target.value)}
            placeholder={language === 'en' ? 'Search word by Thai, romanization, English...' : 'Поиск слова по тайскому, транскрипции, переводу...'}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
          />
          {wordSearchQuery && (
            <button
              onClick={() => setWordSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center hover:bg-slate-300 transition-colors"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <X className="w-3.5 h-3.5 text-slate-500" />
            </button>
          )}
        </div>
      </div>

      {/* Category chips */}
      <div className="px-4 pb-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {WORD_CATEGORY_FILTERS.map((cat) => {
            const label = cat.value
              ? getWordCategoryLabel(cat.value, cat.label, language)
              : (language === 'en' ? 'All' : 'Все');

            return (
              <button
                key={cat.value ?? 'all'}
                onClick={() => setSelectedWordCategory(cat.value)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 select-none touch-manipulation ${
                  selectedWordCategory === cat.value
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="flex flex-col gap-3">
          {filteredWords.map((word) => (
            <WordCard key={word.id} word={word} />
          ))}
          {filteredWords.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <p className="text-lg">🔍</p>
              <p className="text-sm mt-2">{t('nothingFound')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Export button */}
      <div className="px-4 py-3 border-t border-slate-100 bg-white/80 backdrop-blur-sm">
        <button
          onClick={handleExportAnki}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-teal-600 text-white font-medium text-sm shadow-lg shadow-teal-200 active:scale-[0.98] transition-transform select-none touch-manipulation"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <Download className="w-4 h-4" />
          {language === 'en' ? 'Export words to Anki (TSV)' : 'Экспорт слов в Anki (TSV)'}
        </button>
      </div>
    </div>
  );
}
