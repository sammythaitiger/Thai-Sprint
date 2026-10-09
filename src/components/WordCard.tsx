import { Check } from 'lucide-react';
import { WordItem } from '../types';
import { useAppStore } from '../store/useAppStore';
import { AudioButton } from './AudioButton';
import { getWordTranslation, getWordCategoryLabel } from '../data/translationsEn';

interface WordCardProps {
  word: WordItem;
}

export function WordCard({ word }: WordCardProps) {
  const language = useAppStore((s) => s.language);
  const learnedWordIds = useAppStore((s) => s.learnedWordIds);
  const toggleWordLearned = useAppStore((s) => s.toggleWordLearned);

  const isLearned = learnedWordIds.includes(word.id);
  const translation = getWordTranslation(word, language);
  const categoryLabel = getWordCategoryLabel(word.category, word.categoryLabel, language);

  return (
    <div
      className={`relative rounded-2xl border p-4 transition-all duration-200 ${
        isLearned
          ? 'bg-emerald-50/50 border-emerald-200'
          : 'bg-white border-slate-200 shadow-sm hover:shadow'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium">
              {categoryLabel}
            </span>
          </div>

          {/* Thai Word */}
          <p
            className="text-2xl font-bold text-slate-900 leading-snug mb-1"
            style={{ fontFamily: "'Sarabun', sans-serif" }}
          >
            {word.thai}
          </p>

          {/* Transcription */}
          <p className="text-sm font-mono italic text-emerald-700 font-semibold mb-1">
            {word.transcription}
          </p>

          {/* Translation */}
          <p className="text-sm text-slate-700 font-medium">{translation}</p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          {/* Sound button */}
          <AudioButton text={word.thai} size="sm" />

          {/* Learned Checkbox */}
          <button
            onClick={() => toggleWordLearned(word.id)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              isLearned
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
            }`}
            title={
              language === 'en'
                ? isLearned
                  ? 'Mark as unlearned'
                  : 'Mark as learned'
                : isLearned
                ? 'Отметить как невыученное'
                : 'Отметить как выученное'
            }
            aria-label={
              language === 'en'
                ? isLearned
                  ? 'Mark as unlearned'
                  : 'Mark as learned'
                : isLearned
                ? 'Отметить как невыученное'
                : 'Отметить как выученное'
            }
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <Check className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
