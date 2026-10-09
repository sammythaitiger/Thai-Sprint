import { useState, useRef, useEffect } from 'react';
import { Volume2, X, Info } from 'lucide-react';
import { WORD_BREAKDOWNS } from '../data/wordBreakdowns';
import { Word } from '../types';
import { speakThai } from '../utils/tts';
import { useTranslation } from '../i18n/translations';

interface WordBreakdownProps {
  phraseId: string;
  className?: string;
  compact?: boolean;
}

export function WordBreakdown({ phraseId, className = '', compact = false }: WordBreakdownProps) {
  const { t } = useTranslation();
  const words: Word[] | undefined = WORD_BREAKDOWNS[phraseId];
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSelectedWordIndex(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  if (!words || words.length === 0) return null;

  const handleWordClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation(); // prevent flipping the card if inside a flip container
    if (selectedWordIndex === index) {
      setSelectedWordIndex(null);
    } else {
      setSelectedWordIndex(index);
    }
  };

  const handleSpeakWord = (e: React.MouseEvent, thaiText: string) => {
    e.stopPropagation();
    speakThai(thaiText, `word-${thaiText}`);
  };

  const activeWord = selectedWordIndex !== null ? words[selectedWordIndex] : null;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Header hint */}
      {!compact && (
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 mb-2">
          <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          <span>{t('wordBreakdownHint')}</span>
        </div>
      )}

      {/* Words flow */}
      <div className="flex flex-wrap gap-1.5 justify-center">
        {words.map((w, idx) => {
          const isSelected = selectedWordIndex === idx;
          return (
            <button
              key={`${w.thai}-${idx}`}
              type="button"
              onClick={(e) => handleWordClick(e, idx)}
              className={`group relative flex flex-col items-center px-2.5 py-1.5 rounded-xl border text-left transition-all select-none touch-manipulation ${
                isSelected
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md scale-105 z-10'
                  : 'bg-white/90 hover:bg-blue-50/80 border-slate-200 text-slate-800 shadow-sm active:scale-95'
              }`}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <span
                className={`text-sm font-bold leading-tight ${
                  isSelected ? 'text-white' : 'text-slate-900'
                }`}
                style={{ fontFamily: "'Sarabun', sans-serif" }}
              >
                {w.thai}
              </span>
              <span
                className={`text-[10px] font-mono leading-tight mt-0.5 ${
                  isSelected ? 'text-blue-100' : 'text-indigo-600'
                }`}
              >
                {w.transcription}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tooltip / Popup modal for active word */}
      {activeWord && (
        <div
          className="mt-3 p-3 rounded-2xl bg-slate-900 text-white shadow-xl border border-slate-700 animate-in fade-in zoom-in-95 duration-150 z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className="text-xl font-bold text-amber-300 leading-none"
                  style={{ fontFamily: "'Sarabun', sans-serif" }}
                >
                  {activeWord.thai}
                </span>
                <button
                  type="button"
                  onClick={(e) => handleSpeakWord(e, activeWord.thai)}
                  className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-blue-400 active:scale-90 transition-transform"
                  aria-label="Прослушать слово"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs font-mono text-indigo-300 mt-1">
                [{activeWord.transcription}]
              </p>
              <p className="text-sm font-semibold text-emerald-400 mt-1.5">
                {activeWord.meaning}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedWordIndex(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Закрыть"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
