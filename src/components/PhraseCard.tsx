import { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Phrase } from '../types';
import { AudioButton } from './AudioButton';
import { useAppStore } from '../store/useAppStore';
import { WordBreakdown } from './WordBreakdown';
import { getPhraseTranslation, getPhraseCategoryLabel } from '../data/translationsEn';

interface PhraseCardProps {
  phrase: Phrase;
}

export function PhraseCard({ phrase }: PhraseCardProps) {
  const language = useAppStore((s) => s.language);
  const learnedPhraseIds = useAppStore((s) => s.learnedPhraseIds);
  const toggleLearned = useAppStore((s) => s.toggleLearned);
  const isLearned = learnedPhraseIds.includes(phrase.id);
  const [showWords, setShowWords] = useState(false);

  const translation = getPhraseTranslation(phrase, language);
  const categoryLabel = getPhraseCategoryLabel(phrase.category, phrase.categoryLabel, language);

  return (
    <div
      className={`rounded-2xl border p-4 transition-all duration-200 ${
        isLearned
          ? 'bg-emerald-50/50 border-emerald-200'
          : 'bg-white border-slate-200 shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-bold text-slate-900 leading-snug" style={{ fontFamily: "'Sarabun', sans-serif" }}>
              {phrase.thai}
            </span>
            <AudioButton text={phrase.thai} phraseId={phrase.id} size="sm" />
          </div>
          <p className="text-sm text-slate-500 italic font-mono leading-snug mb-1">
            {phrase.transcription}
          </p>
          <p className="text-sm font-medium text-slate-700 leading-snug">
            {translation}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full whitespace-nowrap">
            {categoryLabel}
          </span>
          <button
            onClick={() => toggleLearned(phrase.id)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 select-none touch-manipulation ${
              isLearned
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
            }`}
            style={{ WebkitTapHighlightColor: 'transparent' }}
            aria-label={isLearned ? (language === 'ru' ? 'Отметить как невыученное' : 'Mark as unlearned') : (language === 'ru' ? 'Отметить как выученное' : 'Mark as learned')}
          >
            <Check className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Expandable Word Breakdown */}
      <div className="mt-3 pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setShowWords(!showWords)}
          className="flex items-center gap-1 text-[11px] font-medium text-indigo-600 hover:text-indigo-700 select-none touch-manipulation"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <span>
            {showWords
              ? (language === 'ru' ? 'Скрыть пословный разбор' : 'Hide word breakdown')
              : (language === 'ru' ? 'Пословный разбор' : 'Word breakdown')}
          </span>
          {showWords ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showWords && (
          <div className="mt-2.5">
            <WordBreakdown phraseId={phrase.id} compact />
          </div>
        )}
      </div>
    </div>
  );
}
