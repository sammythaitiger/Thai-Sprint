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
  { key: 'question',  labelKey: 'catQuestion',  emoji: '❓' },
  { key: 'request',   labelKey: 'catRequest',   emoji: '🙏' },
  { key: 'ability',   labelKey: 'catAbility',   emoji: '⚡' },
  { key: 'desire',    labelKey: 'catDesire',    emoji: '🎯' },
  { key: 'tense',     labelKey: 'catTense',     emoji: '⏰' },
  { key: 'degree',    labelKey: 'catDegree',    emoji: '📊' },
  { key: 'connector', labelKey: 'catConnector', emoji: '🔗' },
  { key: 'particle',  labelKey: 'catParticle',  emoji: '💬' },
];

const PATTERN_CATEGORIES_EN: Record<string, string> = {
  question: 'Questions & Inquiry',
  request: 'Requests & Ordering',
  ability: 'Capability & Permission',
  desire: 'Desire & Need',
  tense: 'Tense & Aspects',
  degree: 'Evaluation & Degree',
  connector: 'Connectors & Logic',
  particle: 'Particles & Emotion',
  modal: 'Modal Frames',
};

const PATTERN_MEANINGS_EN: Record<string, string> = {
  'pattern-q1': 'General yes/no question',
  'pattern-q2': 'Already or not yet?',
  'pattern-q3': 'What? / Which?',
  'pattern-q4': 'Where? / To where?',
  'pattern-q5': 'How much? / How many?',
  'pattern-q6': 'How? / In what way?',
  'pattern-r1': 'Please give me... / May I have...',
  'pattern-r2': 'Please help / could you please...',
  'pattern-r3': "I'll take... / No thanks...",
  'pattern-r4': 'Without... / Do not add...',
  'pattern-a1': 'Can / Cannot (ability/permission)',
  'pattern-a2': 'Can I? / Is it possible? (polite)',
  'pattern-a3': 'Know how to / Cannot (learned skill)',
  'pattern-a4': 'Do not / Prohibited!',
  'pattern-a5': "Don't... / Please don't...",
  'pattern-d1': 'Want to do (action)',
  'pattern-d2': 'Want to have / get (item)',
  'pattern-d3': 'Must / Have to / Need to',
  'pattern-d4': 'No need to / Not necessary',
  'pattern-t1': 'Doing right now (Present Continuous)',
  'pattern-t2': 'Already did (completed action)',
  'pattern-t3': 'Not yet done',
  'pattern-t4': 'Ever done / Used to do (experience)',
  'pattern-t5': 'About to / Just going to do',
  'pattern-deg1': 'Like / Dislike',
  'pattern-deg2': 'Too... / Excessively...',
  'pattern-deg3': 'Very... / A little bit...',
  'pattern-deg4': 'More... than... (comparative)',
  'pattern-c1': 'But / However (contrast)',
  'pattern-c2': 'Because (reason)',
  'pattern-c3': 'If..., then... (condition)',
  'pattern-c4': 'And then / Afterwards (sequence)',
  'pattern-p1': 'Soft tag "alright? / okay?"',
  'pattern-p2': 'Urging "come on! / do it!"',
  'pattern-p3': 'Surprise "really? / is that so?"',
};

const PATTERN_EXAMPLES_EN: Record<string, string[]> = {
  'pattern-q1': ['Is it spicy?', 'Do you like it?', 'Shall we go together?'],
  'pattern-q2': ['Have you eaten yet?', 'Is it finished yet?', 'Have you arrived yet?'],
  'pattern-q3': ['What is good to eat?', 'What are you doing right now?', 'What is your name?'],
  'pattern-q4': ['Where is the restroom?', 'Where are you heading?', 'Where are you staying?'],
  'pattern-q5': ['How much is this one?', 'How much is it altogether?', 'How much per kilo?'],
  'pattern-q6': ['How to get there?', 'How do you do this?', 'How to pay?'],
  'pattern-r1': ['A glass of plain water, please', 'Menu, please', 'May I take a look?'],
  'pattern-r2': ['Please speak slower', 'Please take a photo for me', 'Please grab that for me'],
  'pattern-r3': ["I'll take this one", 'No plastic bag needed', 'With ice as well, please'],
  'pattern-r4': ['No chili pepper at all (not spicy)', 'No sugar, please', 'No MSG, please'],
  'pattern-a1': ['I can eat spicy', 'I cannot go (busy)', 'Can I scan to pay with QR?'],
  'pattern-a2': ['Can you give a discount?', 'Can I park here?', 'Can you help me?'],
  'pattern-a3': ['I can speak a little Thai', 'Can you drive a car?', 'I cannot swim'],
  'pattern-a4': ['No parking here', 'No smoking', 'Phones prohibited!'],
  'pattern-a5': ["Don't worry / don't overthink", "Don't be late", "Don't forget, okay?"],
  'pattern-d1': ['Want to go home', 'Want to travel / vacation', 'Want to try eating this'],
  'pattern-d2': ['Want to get this one', 'Want a discount', 'Want the black color'],
  'pattern-d3': ['Time to go now', 'How much do I need to pay?', 'Do I have to wait long?'],
  'pattern-d4': ['No rush / take your time', 'Keep the change', 'Make yourself at home'],
  'pattern-t1': ['Currently having lunch', 'Currently on the way', 'Currently working'],
  'pattern-t2': ['Already understood', 'Already full', 'Already finished'],
  'pattern-t3': ['Not hungry yet', 'Not finished yet', 'Never been there yet'],
  'pattern-t4': ['Have you ever been to Thailand?', 'Never tried this before', 'We have met before'],
  'pattern-t5': ['About to go', 'About to call back', 'Coming back soon'],
  'pattern-deg1': ['Love Thai food', 'Do not like extreme heat', 'Really like this one'],
  'pattern-deg2': ['Too expensive', 'Too spicy', 'Too far away'],
  'pattern-deg3': ['Very delicious', 'Very tired', 'Understand just a little bit'],
  'pattern-deg4': ['Better', 'Cheaper', 'Bigger size'],
  'pattern-c1': ['Want to go, but have no time', 'Delicious, but spicy', 'Cheap, but good quality'],
  'pattern-c2': ['Late because of traffic', 'Like it because it is fun', 'Tired because of heat'],
  'pattern-c3': ['If free, let us go together', 'If it rains, I will not go', 'If hungry, go eat'],
  'pattern-c4': ['Eat food, then go to work', 'Go to market, then home', 'Take a shower, then sleep'],
  'pattern-p1': ['Wait here, okay?', 'Careful, hear me?', 'Try your best, alright?'],
  'pattern-p2': ['Hurry up!', 'Give it a try!', 'Just tell me!'],
  'pattern-p3': ['Seriously? Really?', 'Do you really like it?', 'Are you really not going?'],
};

export function PatternBuilder() {
  const language = useAppStore((s) => s.language);
  const { t } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('pattern-q1');
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
            ? (language === 'en' ? assembled.en : assembled.ru)
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
                          const actionLabel = language === 'en' ? action.labelEn : action.label;

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
                                [{ex.trans}]
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
