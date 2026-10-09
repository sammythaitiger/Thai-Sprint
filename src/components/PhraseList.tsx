import { Search, X, Download } from 'lucide-react';
import { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { PHRASES_DATA, CATEGORY_FILTERS } from '../data/phrases';
import { PhraseCard } from './PhraseCard';
import { exportToAnki } from '../utils/ankiExport';
import { getPhraseTranslation, PHRASE_CATEGORIES_EN } from '../data/translationsEn';

export function PhraseList() {
  const language = useAppStore((s) => s.language);
  const searchQuery = useAppStore((s) => s.searchQuery);
  const setSearchQuery = useAppStore((s) => s.setSearchQuery);
  const selectedCategory = useAppStore((s) => s.selectedCategory);
  const setSelectedCategory = useAppStore((s) => s.setSelectedCategory);

  const filteredPhrases = useMemo(() => {
    let result = PHRASES_DATA;

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) => {
        const transEn = getPhraseTranslation(p, 'en').toLowerCase();
        const transRu = p.translation.toLowerCase();
        return (
          p.thai.toLowerCase().includes(q) ||
          p.transcription.toLowerCase().includes(q) ||
          transRu.includes(q) ||
          transEn.includes(q)
        );
      });
    }

    return result;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Search */}
      <div className="px-4 pt-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'ru' ? 'Поиск по тайскому, транскрипции, переводу...' : 'Search Thai, pronunciation, English...'}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
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
          {CATEGORY_FILTERS.map((cat) => {
            const label = cat.value
              ? (language === 'en' ? PHRASE_CATEGORIES_EN[cat.value] || cat.label : cat.label)
              : (language === 'en' ? 'All' : 'Все');

            return (
              <button
                key={cat.value ?? 'all'}
                onClick={() => setSelectedCategory(cat.value)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 select-none touch-manipulation ${
                  selectedCategory === cat.value
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
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
          {filteredPhrases.map((phrase) => (
            <PhraseCard key={phrase.id} phrase={phrase} />
          ))}
          {filteredPhrases.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <p className="text-lg">🔍</p>
              <p className="text-sm mt-2">{language === 'ru' ? 'Ничего не найдено' : 'Nothing found'}</p>
            </div>
          )}
        </div>
      </div>

      {/* Export button */}
      <div className="px-4 py-3 border-t border-slate-100 bg-white/80 backdrop-blur-sm">
        <button
          onClick={() => exportToAnki(PHRASES_DATA)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-violet-600 text-white font-medium text-sm shadow-lg shadow-violet-200 active:scale-[0.98] transition-transform select-none touch-manipulation"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <Download className="w-4 h-4" />
          {language === 'ru' ? 'Экспорт в Anki (TSV)' : 'Export to Anki (TSV)'}
        </button>
      </div>
    </div>
  );
}
