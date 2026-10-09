import { RotateCw, RotateCcw, Shuffle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { PHRASES_DATA, CATEGORY_FILTERS } from '../data/phrases';
import { AudioButton } from './AudioButton';
import { speakThai } from '../utils/tts';
import { WordBreakdown } from './WordBreakdown';
import { useTranslation } from '../i18n/translations';
import { getPhraseTranslation, getPhraseCategoryLabel } from '../data/translationsEn';

export function CardTrainer() {
  const language = useAppStore((s) => s.language);
  const { t } = useTranslation();
  const [showResetModal, setShowResetModal] = useState(false);
  const sessionDeck = useAppStore((s) => s.sessionDeck);
  const currentCardIndex = useAppStore((s) => s.currentCardIndex);
  const learnedPhraseIds = useAppStore((s) => s.learnedPhraseIds);
  const selectedCategory = useAppStore((s) => s.selectedCategory);
  const setSelectedCategory = useAppStore((s) => s.setSelectedCategory);
  const isFlipped = useAppStore((s) => s.isFlipped);
  const markLearned = useAppStore((s) => s.markLearned);
  const markRepeat = useAppStore((s) => s.markRepeat);
  const resetSession = useAppStore((s) => s.resetSession);
  const resetCategoryLearned = useAppStore((s) => s.resetCategoryLearned);
  const shuffleDeck = useAppStore((s) => s.shuffleDeck);
  const setFlipped = useAppStore((s) => s.setFlipped);

  // All phrases belonging to active category (or all)
  const categoryPhrases = useMemo(() => {
    if (!selectedCategory) return PHRASES_DATA;
    return PHRASES_DATA.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const categoryPhraseIds = useMemo(
    () => new Set(categoryPhrases.map((p) => p.id)),
    [categoryPhrases]
  );

  // Active unlearned cards in this category
  const activeDeck = useMemo(
    () => sessionDeck.filter((id) => categoryPhraseIds.has(id)),
    [sessionDeck, categoryPhraseIds]
  );

  const safeIndex = Math.min(currentCardIndex, Math.max(0, activeDeck.length - 1));
  const currentPhraseId = activeDeck[safeIndex];
  const currentPhrase = useMemo(
    () => (currentPhraseId ? PHRASES_DATA.find((p) => p.id === currentPhraseId) : null),
    [currentPhraseId]
  );

  const totalPhrases = categoryPhrases.length;
  const learnedCount = categoryPhrases.filter((p) => learnedPhraseIds.includes(p.id)).length;
  const remainingInSession = activeDeck.length;
  const progressPct = totalPhrases > 0 ? (learnedCount / totalPhrases) * 100 : 0;

  const currentCategoryLabel = useMemo(() => {
    if (!selectedCategory) return t('allCategories');
    const filter = CATEGORY_FILTERS.find((c) => c.value === selectedCategory);
    return filter ? getPhraseCategoryLabel(selectedCategory, filter.label, language) : t('allCategories');
  }, [selectedCategory, language, t]);

  const handleFlip = () => {
    setFlipped(!isFlipped);
  };

  const handleKnow = () => {
    if (currentPhrase) {
      markLearned(currentPhrase.id);
    }
  };

  const handleRepeat = () => {
    if (currentPhrase) {
      markRepeat(currentPhrase.id);
    }
  };

  const handleSound = () => {
    if (currentPhrase) {
      speakThai(currentPhrase.thai, currentPhrase.id);
    }
  };

  return (
    <div className="flex-1 flex flex-col px-4 py-3 min-h-0">
      {/* Category filter chips */}
      <div className="mb-3 -mx-4 px-4 overflow-x-auto no-scrollbar">
        <div className="flex gap-1.5 py-0.5">
          {CATEGORY_FILTERS.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            const catPhrases = cat.value
              ? PHRASES_DATA.filter((p) => p.category === cat.value)
              : PHRASES_DATA;
            const learnedInCat = catPhrases.filter((p) => learnedPhraseIds.includes(p.id)).length;
            const catLabel = cat.value
              ? getPhraseCategoryLabel(cat.value, cat.label, language)
              : t('all');

            return (
              <button
                key={cat.value ?? 'all'}
                onClick={() => setSelectedCategory(cat.value)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all select-none touch-manipulation flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200 scale-105'
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
                  {learnedInCat}/{catPhrases.length}
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
                onClick={() => shuffleDeck(selectedCategory)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 active:scale-90 transition-transform"
                title={t('shuffleDeckTooltip')}
                aria-label={t('shuffleDeckTooltip')}
              >
                <Shuffle className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setShowResetModal(true)}
                className="p-1 rounded-lg text-slate-400 hover:text-blue-600 active:scale-90 transition-transform"
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
              ✓ {learnedCount}/{totalPhrases}
            </span>
          </div>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500 ease-out"
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
                  resetSession(selectedCategory);
                  setShowResetModal(false);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold text-left transition-colors flex items-center justify-between"
              >
                <span>{t('resetSessionDeck')}</span>
                <RotateCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  resetCategoryLearned(selectedCategory);
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
      {activeDeck.length === 0 || !currentPhrase ? (
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 bg-white rounded-3xl border border-slate-200 shadow-sm text-center">
          <div className="text-6xl mb-3">🎉</div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            {learnedCount === totalPhrases
              ? t('allCardsLearnedCat')
              : t('categorySessionFinished')}
          </h2>
          <p className="text-sm text-slate-500 mb-4 max-w-xs">
            {language === 'en' ? (
              <>
                Learned: <span className="font-bold text-slate-800">{learnedCount}</span> of{' '}
                <span className="font-bold text-slate-800">{totalPhrases}</span> phrases in "{currentCategoryLabel}".
              </>
            ) : (
              <>
                Выучено: <span className="font-bold text-slate-800">{learnedCount}</span> из{' '}
                <span className="font-bold text-slate-800">{totalPhrases}</span> фраз категории «{currentCategoryLabel}».
              </>
            )}
          </p>

          <div className="flex flex-col gap-2 w-full max-w-xs">
            <button
              onClick={() => resetCategoryLearned(selectedCategory)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-blue-200 active:scale-95 transition-transform"
            >
              <RotateCw className="w-4 h-4" />
              <span>{t('repeatThisCategory')}</span>
            </button>

            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
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
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  minHeight: '300px',
                }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 rounded-3xl bg-white border border-slate-200 shadow-xl p-6 flex flex-col items-center justify-center overflow-y-auto"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-medium mb-4">
                    {getPhraseCategoryLabel(currentPhrase.category, currentPhrase.categoryLabel, language)}
                  </span>
                  <p
                    className="text-[24px] font-bold text-slate-900 text-center leading-snug mb-2"
                    style={{ fontFamily: "'Sarabun', sans-serif" }}
                  >
                    {currentPhrase.thai}
                  </p>
                  <p className="text-lg font-mono font-semibold italic text-indigo-600 text-center mb-4 px-3 bg-indigo-50/70 py-1.5 rounded-xl border border-indigo-100">
                    [{currentPhrase.transcription}]
                  </p>
                  <AudioButton text={currentPhrase.thai} phraseId={currentPhrase.id} />
                  <p className="text-[11px] text-slate-400 mt-4 select-none">
                    {t('tapToSeeTranslation')}
                  </p>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 shadow-xl p-5 flex flex-col items-center justify-center overflow-y-auto"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-medium mb-2">
                    {getPhraseCategoryLabel(currentPhrase.category, currentPhrase.categoryLabel, language)}
                  </span>
                  <p
                    className="text-lg font-bold text-slate-900 text-center mb-1"
                    style={{ fontFamily: "'Sarabun', sans-serif" }}
                  >
                    {currentPhrase.thai}
                  </p>
                  <p className="text-sm italic text-indigo-600 font-mono text-center mb-2">
                    [{currentPhrase.transcription}]
                  </p>
                  <div className="w-12 h-px bg-slate-300 mb-2" />
                  <p className="text-base font-semibold text-slate-800 text-center mb-3">
                    {getPhraseTranslation(currentPhrase, language)}
                  </p>

                  {/* Interactive word breakdown */}
                  <WordBreakdown phraseId={currentPhrase.id} compact className="w-full" />
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
              className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center active:scale-90 transition-transform select-none touch-manipulation shrink-0"
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
