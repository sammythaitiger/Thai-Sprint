import { RotateCw, RotateCcw, Shuffle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { WORDS_DATA, WORD_CATEGORY_FILTERS } from '../data/words';
import { AudioButton } from './AudioButton';
import { speakThai } from '../utils/tts';
import { useTranslation } from '../i18n/translations';
import { getWordTranslation, getWordCategoryLabel } from '../data/translationsEn';

export function WordTrainer() {
  const language = useAppStore((s) => s.language);
  const { t } = useTranslation();
  const [showResetModal, setShowResetModal] = useState(false);
  const wordSessionDeck = useAppStore((s) => s.wordSessionDeck);
  const wordCurrentCardIndex = useAppStore((s) => s.wordCurrentCardIndex);
  const learnedWordIds = useAppStore((s) => s.learnedWordIds);
  const selectedWordCategory = useAppStore((s) => s.selectedWordCategory);
  const setSelectedWordCategory = useAppStore((s) => s.setSelectedWordCategory);
  const isWordFlipped = useAppStore((s) => s.isWordFlipped);
  const markWordLearned = useAppStore((s) => s.markWordLearned);
  const markWordRepeat = useAppStore((s) => s.markWordRepeat);
  const resetWordSession = useAppStore((s) => s.resetWordSession);
  const resetWordCategoryLearned = useAppStore((s) => s.resetWordCategoryLearned);
  const shuffleWordDeck = useAppStore((s) => s.shuffleWordDeck);
  const setWordFlipped = useAppStore((s) => s.setWordFlipped);

  // All words belonging to active category (or all)
  const categoryWords = useMemo(() => {
    if (!selectedWordCategory) return WORDS_DATA;
    return WORDS_DATA.filter((w) => w.category === selectedWordCategory);
  }, [selectedWordCategory]);

  const categoryWordIds = useMemo(
    () => new Set(categoryWords.map((w) => w.id)),
    [categoryWords]
  );

  // Active unlearned cards in this category
  const activeDeck = useMemo(
    () => wordSessionDeck.filter((id) => categoryWordIds.has(id)),
    [wordSessionDeck, categoryWordIds]
  );

  const safeIndex = Math.min(wordCurrentCardIndex, Math.max(0, activeDeck.length - 1));
  const currentWordId = activeDeck[safeIndex];
  const currentWord = useMemo(
    () => (currentWordId ? WORDS_DATA.find((w) => w.id === currentWordId) : null),
    [currentWordId]
  );

  const totalWords = categoryWords.length;
  const learnedCount = categoryWords.filter((w) => learnedWordIds.includes(w.id)).length;
  const remainingInSession = activeDeck.length;
  const progressPct = totalWords > 0 ? (learnedCount / totalWords) * 100 : 0;

  const currentCategoryLabel = useMemo(() => {
    if (!selectedWordCategory) return t('allCategories');
    const filter = WORD_CATEGORY_FILTERS.find((c) => c.value === selectedWordCategory);
    return filter ? getWordCategoryLabel(selectedWordCategory, filter.label, language) : t('allCategories');
  }, [selectedWordCategory, language, t]);

  const handleFlip = () => {
    setWordFlipped(!isWordFlipped);
  };

  const handleKnow = () => {
    if (currentWord) {
      markWordLearned(currentWord.id);
    }
  };

  const handleRepeat = () => {
    if (currentWord) {
      markWordRepeat(currentWord.id);
    }
  };

  const handleSound = () => {
    if (currentWord) {
      speakThai(currentWord.thai);
    }
  };

  return (
    <div className="flex-1 flex flex-col px-4 py-3 min-h-0">
      {/* Category filter chips */}
      <div className="mb-3 -mx-4 px-4 overflow-x-auto no-scrollbar">
        <div className="flex gap-1.5 py-0.5">
          {WORD_CATEGORY_FILTERS.map((cat) => {
            const isSelected = selectedWordCategory === cat.value;
            const catWords = cat.value
              ? WORDS_DATA.filter((w) => w.category === cat.value)
              : WORDS_DATA;
            const learnedInCat = catWords.filter((w) => learnedWordIds.includes(w.id)).length;
            const catLabel = cat.value
              ? getWordCategoryLabel(cat.value, cat.label, language)
              : t('all');

            return (
              <button
                key={cat.value ?? 'all'}
                onClick={() => setSelectedWordCategory(cat.value)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all select-none touch-manipulation flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 scale-105'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <span>{catLabel}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {learnedInCat}/{catWords.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress bar with Reset and Shuffle toolbar */}
      <div className="mb-3 bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-semibold text-slate-700 truncate max-w-[140px]">
              {currentCategoryLabel}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => shuffleWordDeck(selectedWordCategory)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 active:scale-90 transition-transform"
                title={t('shuffleDeckTooltip')}
                aria-label={t('shuffleDeckTooltip')}
              >
                <Shuffle className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setShowResetModal(true)}
                className="p-1 rounded-lg text-slate-400 hover:text-emerald-600 active:scale-90 transition-transform"
                title={t('resetDeckTooltip')}
                aria-label={t('resetDeckTooltip')}
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] text-slate-500">
              {t('remaining')} <span className="font-bold text-slate-800">{remainingInSession}</span>
            </span>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              ✓ {learnedCount}/{totalWords}
            </span>
          </div>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Reset Modal Popup */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full shadow-2xl border border-slate-200 flex flex-col gap-3 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">{t('resetModalTitle')}</h3>
              <button
                onClick={() => setShowResetModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 text-xs"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-500">
              {t('resetModalDesc')} <strong className="text-slate-700">{currentCategoryLabel}</strong>
            </p>
            <div className="flex flex-col gap-2 mt-1">
              <button
                onClick={() => {
                  resetWordSession(selectedWordCategory);
                  setShowResetModal(false);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold text-left transition-colors flex items-center justify-between"
              >
                <span>{t('resetSessionDeck')}</span>
                <RotateCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  resetWordCategoryLearned(selectedWordCategory);
                  setShowResetModal(false);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold text-left transition-colors flex items-center justify-between"
              >
                <span>{t('resetCategoryProgress')}</span>
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
            <button
              onClick={() => setShowResetModal(false)}
              className="w-full py-2 rounded-xl text-slate-400 text-xs font-medium hover:text-slate-600 mt-1"
            >
              {t('resetCancel')}
            </button>
          </div>
        </div>
      )}

      {/* Main card or completion screen */}
      {activeDeck.length === 0 || !currentWord ? (
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 bg-white rounded-3xl border border-slate-200 shadow-sm text-center">
          <div className="text-6xl mb-3">🏆</div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            {learnedCount === totalWords
              ? t('allWordsLearnedCat')
              : t('categorySessionFinished')}
          </h2>
          <p className="text-sm text-slate-500 mb-4 max-w-xs">
            {language === 'en' ? (
              <>
                Learned: <span className="font-bold text-slate-800">{learnedCount}</span> of{' '}
                <span className="font-bold text-slate-800">{totalWords}</span> words in "{currentCategoryLabel}".
              </>
            ) : (
              <>
                Выучено: <span className="font-bold text-slate-800">{learnedCount}</span> из{' '}
                <span className="font-bold text-slate-800">{totalWords}</span> слов категории «{currentCategoryLabel}».
              </>
            )}
          </p>

          <div className="flex flex-col gap-2 w-full max-w-xs">
            <button
              onClick={() => resetWordCategoryLearned(selectedWordCategory)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm shadow-lg shadow-emerald-200 active:scale-95 transition-transform"
            >
              <RotateCw className="w-4 h-4" />
              <span>{t('repeatThisCategory')}</span>
            </button>

            {selectedWordCategory && (
              <button
                onClick={() => setSelectedWordCategory(null)}
                className="w-full py-2.5 rounded-2xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 active:scale-95 transition-transform"
              >
                {t('chooseOtherCategory')}
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Flip card */}
          <div className="flex-1 flex items-center justify-center min-h-0">
            <div
              className="w-full cursor-pointer select-none touch-manipulation"
              style={{ perspective: '1000px', WebkitTapHighlightColor: 'transparent' }}
              onClick={handleFlip}
            >
              <div
                className="relative w-full transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isWordFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  minHeight: '280px',
                }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 rounded-3xl bg-white border border-slate-200 shadow-xl p-6 flex flex-col items-center justify-center overflow-y-auto"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-[11px] font-medium mb-4">
                    {getWordCategoryLabel(currentWord.category, currentWord.categoryLabel, language)}
                  </span>
                  <p
                    className="text-[32px] font-bold text-slate-900 text-center leading-snug mb-3"
                    style={{ fontFamily: "'Sarabun', sans-serif" }}
                  >
                    {currentWord.thai}
                  </p>
                  <p className="text-xl font-mono font-semibold italic text-emerald-700 text-center mb-5 px-3 bg-emerald-50/70 py-1.5 rounded-xl border border-emerald-100">
                    [{currentWord.transcription}]
                  </p>
                  <AudioButton text={currentWord.thai} />
                  <p className="text-[11px] text-slate-400 mt-4 select-none">
                    {t('tapToSeeTranslation')}
                  </p>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-50 to-teal-50 border border-slate-200 shadow-xl p-6 flex flex-col items-center justify-center overflow-y-auto"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-[11px] font-medium mb-3">
                    {getWordCategoryLabel(currentWord.category, currentWord.categoryLabel, language)}
                  </span>
                  <p
                    className="text-2xl font-bold text-slate-900 text-center mb-1"
                    style={{ fontFamily: "'Sarabun', sans-serif" }}
                  >
                    {currentWord.thai}
                  </p>
                  <p className="text-base italic text-emerald-700 font-mono text-center mb-3">
                    [{currentWord.transcription}]
                  </p>
                  <div className="w-12 h-px bg-slate-300 mb-4" />
                  <p className="text-xl font-bold text-slate-900 text-center">
                    {getWordTranslation(currentWord, language)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Control buttons */}
          <div className="flex items-center gap-3 mt-3 pb-1">
            <button
              onClick={handleRepeat}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 font-semibold text-sm active:scale-95 transition-transform select-none touch-manipulation"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {t('dontRemember')}
            </button>
            <button
              onClick={handleSound}
              className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center active:scale-90 transition-transform select-none touch-manipulation shrink-0"
              style={{ WebkitTapHighlightColor: 'transparent' }}
              aria-label={t('replayAudio')}
            >
              🔊
            </button>
            <button
              onClick={handleKnow}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-emerald-600 text-white font-semibold text-sm shadow-lg shadow-emerald-200 active:scale-95 transition-transform select-none touch-manipulation"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {t('knowButton')}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
