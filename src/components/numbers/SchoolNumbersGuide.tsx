import { useState, useEffect } from 'react';
import { Volume2, BookOpen, Clock, Users, Award, Coffee, Lightbulb } from 'lucide-react';
import { SCHOOL_NUMBER_PHRASES, SchoolNumberPhrase } from '../../utils/thaiNumbers';
import { speakThai, getSpeakingId, subscribeToSpeaking } from '../../utils/tts';
import { useAppStore } from '../../store/useAppStore';

export function SchoolNumbersGuide() {
  const language = useAppStore((s) => s.language);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  useEffect(() => {
    return subscribeToSpeaking(() => {
      setSpeakingId(getSpeakingId());
    });
  }, []);

  const handleSpeak = (phrase: SchoolNumberPhrase) => {
    speakThai(phrase.thai, phrase.id);
  };

  const filteredPhrases = activeCategory === 'all'
    ? SCHOOL_NUMBER_PHRASES
    : SCHOOL_NUMBER_PHRASES.filter((p) => p.category === activeCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'discipline':
        return Award;
      case 'books':
        return BookOpen;
      case 'groups':
        return Users;
      case 'time':
        return Clock;
      case 'canteen':
        return Coffee;
      default:
        return BookOpen;
    }
  };

  const tabs = [
    { id: 'all', label: language === 'en' ? 'All Phrases' : 'Все фразы' },
    { id: 'discipline', label: language === 'en' ? 'Discipline & Quiet' : 'Дисциплина и тишина' },
    { id: 'books', label: language === 'en' ? 'Textbook & Pages' : 'Учебник и страницы' },
    { id: 'groups', label: language === 'en' ? 'Groups & Pairs' : 'Группы и пары' },
    { id: 'time', label: language === 'en' ? 'Timer & Time' : 'Таймер и время' },
    { id: 'canteen', label: language === 'en' ? 'Canteen & 7-Eleven' : 'Столовая и 7-Eleven' },
  ];

  return (
    <div className="flex flex-col gap-4 pb-6">
      {/* Grammar Note: Classifier Formula with Numbers */}
      <div className="rounded-3xl bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-5 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-5 h-5 text-amber-300" />
          <h3 className="text-sm font-bold uppercase tracking-wide text-amber-200">
            {language === 'en'
              ? 'Golden Rule: Counting Objects in Thai'
              : 'Золотое правило тайского счёта предметов'}
          </h3>
        </div>
        <p className="text-xs text-blue-100 leading-relaxed mb-3">
          {language === 'en' ? (
            <>
              In Thai, you cannot simply say "two students" or "five minutes".
              Thai speakers always use <strong className="text-amber-300">Classifiers (Measure Words)</strong> using the formula:
            </>
          ) : (
            <>
              В тайском языке нельзя просто сказать «два ученика» или «пять минут».
              Тайцы всегда используют <strong className="text-amber-300">Счётные слова (Классификаторы)</strong> по формуле:
            </>
          )}
        </p>

        <div className="bg-black/30 rounded-2xl p-3 border border-white/10 text-center font-mono text-xs text-amber-300">
          {language === 'en'
            ? '[NOUN / ITEM] + [NUMBER] + [CLASSIFIER]'
            : '[Предмет] + [ЧИСЛО] + [КЛАССИФИКАТОР]'}
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-slate-200">
          <div className="bg-white/10 rounded-xl p-2.5">
            <div className="font-bold text-amber-300 font-thai">คน 2 คน</div>
            <div className="text-[11px] text-blue-200">[khon sǒong khon]</div>
            <div className="text-[10px] text-slate-300 mt-0.5">
              {language === 'en' ? 'Person + 2 + person (2 people)' : 'Человек + 2 + человек (2 человека)'}
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5">
            <div className="font-bold text-amber-300 font-thai">อีก 5 นาที</div>
            <div className="text-[11px] text-blue-200">[ìik hâa naa-thee]</div>
            <div className="text-[10px] text-slate-300 mt-0.5">
              {language === 'en' ? 'More + 5 + minutes (5 more minutes)' : 'Ещё + 5 + минут (ещё 5 минут)'}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all select-none touch-manipulation ${
              activeCategory === tab.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Phrase Cards */}
      <div className="flex flex-col gap-3">
        {filteredPhrases.map((phrase) => {
          const Icon = getCategoryIcon(phrase.category);
          const isCurrentlySpeaking = speakingId === phrase.id;

          return (
            <div
              key={phrase.id}
              className={`rounded-2xl border p-4 transition-all duration-200 ${
                isCurrentlySpeaking
                  ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-300/30 shadow-md'
                  : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Icon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                      {language === 'en' ? phrase.situationEn : phrase.situation}
                    </span>
                  </div>

                  <div className="text-lg font-bold text-slate-900 font-thai leading-snug mb-1">
                    {phrase.thai}
                  </div>

                  <div className="text-xs text-slate-500 font-mono italic leading-snug mb-1">
                    [{phrase.trans}]
                  </div>

                  <div className="text-sm font-medium text-slate-700 leading-snug">
                    {language === 'en' ? phrase.en : phrase.ru}
                  </div>
                </div>

                <button
                  onClick={() => handleSpeak(phrase)}
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-all select-none touch-manipulation active:scale-90 ${
                    isCurrentlySpeaking
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-300 ring-4 ring-blue-200 animate-pulse'
                      : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100'
                  }`}
                  aria-label="Прослушать фразу"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
