import { useState } from 'react';
import { Puzzle, Volume2, Sparkles, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { PATTERNS_DATA, BUILDER_ACTIONS, ASSEMBLED_PHRASES, BUILDER_PATTERN_IDS } from '../data/patterns';
import { PatternItem } from '../types';
import { speakThai } from '../utils/tts';
import { AudioButton } from './AudioButton';
import { useAppStore } from '../store/useAppStore';
import { useTranslation, TranslationKey } from '../i18n/translations';

interface CategoryChip {
  key: string;
  labelKey: TranslationKey;
  emoji: string;
}

const CATEGORIES: CategoryChip[] = [
  { key: 'all',       labelKey: 'catAll',       emoji: '📚' },
  { key: 'modal',     labelKey: 'catModal',     emoji: '🔲' },
  { key: 'connector', labelKey: 'catConnector', emoji: '🔗' },
  { key: 'tense',     labelKey: 'catTense',     emoji: '⏰' },
  { key: 'particle',  labelKey: 'catParticle',  emoji: '💬' },
];

const ACTION_LABELS_EN: Record<string, string> = {
  go: 'go',
  eat: 'eat',
  teach: 'teach',
  home: 'home',
  play: 'play',
  do: 'do',
};

const ASSEMBLED_EN: Record<string, Record<string, string>> = {
  'pattern-1': {
    go: 'Want to go',
    eat: 'Want to eat',
    teach: 'Want to teach',
    home: 'Want to go home',
    play: 'Want to play',
    do: 'Want to do',
  },
  'pattern-2': {
    go: 'Must go / Need to go',
    eat: 'Must eat',
    teach: 'Need to teach',
    home: 'Must go home',
    play: 'Must play',
    do: 'Must do',
  },
  'pattern-3': {
    go: 'Can I go?',
    eat: 'Can I eat?',
    teach: 'Can you teach?',
    home: 'Can I go home?',
    play: 'Can I play?',
    do: 'Can you do it?',
  },
  'pattern-4': {
    go: "Don't go / Prohibited to go!",
    eat: "Don't eat!",
    teach: 'Prohibited to teach!',
    home: "Don't go home!",
    play: "Don't play!",
    do: "Don't do it!",
  },
  'pattern-5': {
    go: 'Have been / went before',
    eat: 'Have eaten before',
    teach: 'Have taught before',
    home: 'Went home before',
    play: 'Have played before',
    do: 'Have done before',
  },
  'pattern-10': {
    go: 'Currently going',
    eat: 'Currently eating',
    teach: 'Currently teaching',
    home: 'Currently heading home',
    play: 'Currently playing',
    do: 'Currently doing',
  },
  'pattern-11': {
    go: 'Already left',
    eat: 'Already ate',
    teach: 'Already taught',
    home: 'Already went home',
    play: 'Already played',
    do: 'Already done',
  },
  'pattern-12': {
    go: 'About to go',
    eat: 'About to eat',
    teach: 'About to teach',
    home: 'About to go home',
    play: 'About to play',
    do: 'About to do',
  },
  'pattern-13': {
    go: 'Not gone yet',
    eat: 'Not eaten yet',
    teach: 'Not taught yet',
    home: 'Not gone home yet',
    play: 'Not played yet',
    do: 'Not done yet',
  },
};

const PATTERN_MEANINGS_EN: Record<string, string> = {
  'pattern-1': 'Want to do something',
  'pattern-2': 'Need to / Must do',
  'pattern-3': 'Can I? / Is it possible?',
  'pattern-4': 'Do not / Prohibited',
  'pattern-5': 'Ever done / Used to do',
  'pattern-6': 'But / However (connects two clauses)',
  'pattern-7': 'Because (explains reason)',
  'pattern-8': 'If..., then... (condition)',
  'pattern-9': 'And then / Afterwards (sequence)',
  'pattern-10': 'Doing right now (continuous)',
  'pattern-11': 'Already did (completed action)',
  'pattern-12': 'About to / Just going to',
  'pattern-13': 'Not yet / Haven’t done yet',
  'pattern-14': 'Soft "alright? / okay?" (tag particle)',
  'pattern-15': 'Urging "come on! / do it!"',
  'pattern-16': 'Surprise "really? / is that so?"',
};

const PATTERN_CATEGORIES_EN: Record<string, string> = {
  modal: 'Modal Frames',
  connector: 'Connectors & Logic',
  tense: 'Tense Markers',
  particle: 'Particles & Emotion',
};

const PATTERN_EXAMPLES_EN: Record<string, string[]> = {
  'pattern-1': ['Want to go home', 'Want to drink water', 'Want to go on vacation'],
  'pattern-2': ['Time to go teach class', 'Need to do this', 'Must focus in class'],
  'pattern-3': ['Can you help me?', 'Can I go?', 'Can you give a discount?'],
  'pattern-4': ['Put away your phone!', 'Do not run!', 'Do not make noise!'],
  'pattern-5': ['Have you ever been there?', 'Never done that', 'Have tried Thai food before'],
  'pattern-6': ['Want to go, but have no time', 'Delicious, but spicy', 'Cheap, but good'],
  'pattern-7': ['Late because of traffic', 'Like it because it is fun', 'Tired because it is hot'],
  'pattern-8': ['If finished, you can leave', 'If it rains, I will not go', 'If hungry, go eat'],
  'pattern-9': ['Finish teaching, then eat', 'Go to market, then home', 'Take a shower, then sleep'],
  'pattern-10': ['Currently teaching class', 'Currently doing homework', 'Currently eating'],
  'pattern-11': ['Already ate', 'Already understand', 'Already finished'],
  'pattern-12': ['About to go', 'About to call', 'About to do it'],
  'pattern-13': ['Not finished yet', 'Haven’t eaten yet', 'Haven’t left yet'],
  'pattern-14': ['Listen to teacher, okay?', 'Focus, alright?', 'Careful, hear me?'],
  'pattern-15': ['Hurry up!', 'Give it a try!', 'Just tell me!'],
  'pattern-16': ['Seriously? Really?', 'Do you really like it?', 'Are you really not going?'],
};

export function PatternBuilder() {
  const language = useAppStore((s) => s.language);
  const { t } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('pattern-1');
  const [activeActions, setActiveActions] = useState<Record<string, string>>({});

  const filteredPatterns = PATTERNS_DATA.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.subCategory === selectedCategory;
  });

  const getActiveAction = (patternId: string) => {
    return activeActions[patternId] || 'go';
  };

  const handleActionSelect = (pattern: PatternItem, actionId: string) => {
    setActiveActions((prev) => ({ ...prev, [pattern.id]: actionId }));
    const assembled = ASSEMBLED_PHRASES[pattern.id]?.[actionId];
    if (assembled) {
      speakThai(assembled.thai, `builder-${pattern.id}-${actionId}`);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const hasBuilder = (patternId: string) => BUILDER_PATTERN_IDS.has(patternId);

  return (
    <div className="flex-1 flex flex-col px-4 py-4 max-w-md mx-auto w-full overflow-y-auto">
      {/* Module Title */}
      <div className="mb-4">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-indigo-200">
            <Puzzle className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">
              {t('patternBuilderTitle')}
            </h2>
            <p className="text-[11px] text-slate-500">
              {t('patternBuilderSubtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 no-scrollbar -mx-4 px-4 select-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap min-h-[44px] transition-all select-none touch-manipulation flex items-center gap-1.5 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-105'
                  : 'bg-white text-slate-600 border border-slate-200 active:scale-95'
              }`}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <span className="text-sm">{cat.emoji}</span>
              {t(cat.labelKey)}
            </button>
          );
        })}
      </div>

      {/* Pattern Cards */}
      <div className="space-y-3 mt-1 pb-6">
        {filteredPatterns.map((item) => {
          const isExpanded = expandedId === item.id;
          const showBuilder = hasBuilder(item.id);
          const currentActionId = getActiveAction(item.id);
          const assembled = showBuilder
            ? ASSEMBLED_PHRASES[item.id]?.[currentActionId]
            : null;

          const categoryBadge = language === 'en'
            ? (PATTERN_CATEGORIES_EN[item.subCategory] || item.subCategoryLabel)
            : item.subCategoryLabel;

          const meaningText = language === 'en'
            ? (PATTERN_MEANINGS_EN[item.id] || item.meaning)
            : item.meaning;

          const assembledTranslation = assembled
            ? (language === 'en'
                ? (ASSEMBLED_EN[item.id]?.[currentActionId] || assembled.ru)
                : assembled.ru)
            : null;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-white border-indigo-300 shadow-lg ring-1 ring-indigo-200'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              {/* Card Header */}
              <div
                onClick={() => toggleExpand(item.id)}
                className="p-4 cursor-pointer select-none touch-manipulation flex items-start justify-between gap-3"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <div className="flex-1 min-w-0">
                  {/* Category + Formula */}
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                      {categoryBadge}
                    </span>
                  </div>

                  {/* Thai pattern + Transcription */}
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-xl font-bold text-slate-900 leading-tight"
                      style={{ fontFamily: "'Sarabun', sans-serif" }}
                    >
                      {item.patternThai}
                    </span>
                    <span className="text-sm font-mono italic text-indigo-600">
                      [{item.transcription}]
                    </span>
                  </div>

                  {/* Meaning */}
                  <p className="text-xs font-semibold text-slate-600 mt-1">
                    = {meaningText}
                  </p>

                  {/* Formula */}
                  <p className="text-[10px] font-mono text-slate-400 mt-1">
                    {t('formula')} {item.pattern}
                  </p>
                </div>

                <button
                  type="button"
                  className="p-2 text-slate-400 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0"
                  aria-label={isExpanded ? 'Collapse' : 'Expand'}
                >
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-100 bg-slate-50/50 space-y-4">
                  {/* Interactive Builder */}
                  {showBuilder && assembled && (
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white shadow-lg border border-indigo-700/50">
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-indigo-300 mb-2.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>{t('patternBuilderChooseAction')}</span>
                      </div>

                      {/* Action Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {BUILDER_ACTIONS.map((action) => {
                          const isSelected = currentActionId === action.id;
                          const actionLabel = language === 'en'
                            ? (ACTION_LABELS_EN[action.id] || action.label)
                            : action.label;

                          return (
                            <button
                              key={action.id}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleActionSelect(item, action.id);
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all select-none touch-manipulation flex items-center gap-1.5 border min-h-[40px] ${
                                isSelected
                                  ? 'bg-amber-400 border-amber-300 text-slate-950 font-bold shadow-md scale-105'
                                  : 'bg-slate-800/80 border-slate-700 text-slate-200 active:scale-95'
                              }`}
                              style={{ WebkitTapHighlightColor: 'transparent' }}
                            >
                              <span
                                className="font-bold text-sm"
                                style={{ fontFamily: "'Sarabun', sans-serif" }}
                              >
                                {action.thai}
                              </span>
                              <span className={`text-[10px] font-mono italic font-semibold ${isSelected ? 'text-slate-900' : 'text-amber-300'}`}>
                                [{action.trans}]
                              </span>
                              <span className={`text-[10px] ${isSelected ? 'text-slate-800' : 'text-slate-400'}`}>
                                ({actionLabel})
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Live Result */}
                      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-lg font-bold text-amber-300 leading-tight"
                            style={{ fontFamily: "'Sarabun', sans-serif" }}
                          >
                            {assembled.thai}
                          </p>
                          <p className="text-xs font-mono text-indigo-300 mt-0.5">
                            [{assembled.trans}]
                          </p>
                          <p className="text-sm font-semibold text-emerald-400 mt-1">
                            {assembledTranslation}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakThai(assembled.thai, `play-${item.id}`);
                          }}
                          className="w-11 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-md active:scale-90 transition-transform"
                          aria-label={t('listenAudio')}
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Examples */}
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{t('examplesInSpeech')}</span>
                    </div>
                    <div className="space-y-2">
                      {item.examples.map((ex, idx) => {
                        const exampleTranslation = language === 'en'
                          ? (PATTERN_EXAMPLES_EN[item.id]?.[idx] || ex.ru)
                          : ex.ru;

                        return (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start justify-between gap-3"
                          >
                            <div className="flex-1 min-w-0">
                              <p
                                className="text-[17px] font-bold text-slate-900 leading-snug"
                                style={{ fontFamily: "'Sarabun', sans-serif" }}
                              >
                                {ex.thai}
                              </p>
                              <p className="text-xs font-mono italic text-indigo-600 mt-0.5">
                                {ex.trans}
                              </p>
                              <p className="text-xs font-medium text-slate-600 mt-1">
                                {exampleTranslation}
                              </p>
                            </div>

                            <AudioButton text={ex.thai} phraseId={`ex-${item.id}-${idx}`} size="sm" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
