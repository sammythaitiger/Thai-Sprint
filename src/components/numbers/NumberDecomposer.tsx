import { useState, useMemo } from 'react';
import { Volume2, Sparkles, Delete, RotateCcw, Lightbulb, Check } from 'lucide-react';
import {
  convertNumberToThai,
  NUMBER_PRESETS,
  NumberPreset,
} from '../../utils/thaiNumbers';
import { speakThai, getSpeakingId, subscribeToSpeaking } from '../../utils/tts';
import { useAppStore } from '../../store/useAppStore';
import { useEffect } from 'react';

export function NumberDecomposer() {
  const language = useAppStore((s) => s.language);
  const [numInput, setNumInput] = useState<number>(21);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    return subscribeToSpeaking(() => {
      setIsSpeaking(getSpeakingId() === 'number-live');
    });
  }, []);

  const result = useMemo(() => {
    return convertNumberToThai(numInput);
  }, [numInput]);

  const handleSpeak = (text: string) => {
    speakThai(text, 'number-live');
  };

  const handlePreset = (preset: NumberPreset) => {
    setNumInput(preset.num);
    handleSpeak(convertNumberToThai(preset.num).thaiScript);
  };

  const handleKeypadPress = (digit: number) => {
    const nextStr = `${numInput}${digit}`.slice(0, 7); // max 9,999,999
    const nextVal = parseInt(nextStr, 10);
    if (!isNaN(nextVal)) {
      setNumInput(nextVal);
    }
  };

  const handleDeleteDigit = () => {
    const str = numInput.toString();
    if (str.length <= 1) {
      setNumInput(0);
    } else {
      setNumInput(parseInt(str.slice(0, -1), 10));
    }
  };

  const handleClear = () => {
    setNumInput(0);
  };

  const filteredPresets = useMemo(() => {
    if (activeCategory === 'all') return NUMBER_PRESETS;
    return NUMBER_PRESETS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="flex flex-col gap-4 pb-6">
      {/* Hero Display Card */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white p-5 shadow-xl relative overflow-hidden">
        {/* Background glow decoration */}
        <div className="absolute -right-8 -top-8 w-36 h-36 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-8 -bottom-8 w-36 h-36 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-3">
          {/* Top badges: Arabic & Thai digits */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold tracking-tight text-white">
                {numInput.toLocaleString(language === 'en' ? 'en-US' : 'ru-RU')}
              </span>
              <span className="text-sm font-medium text-amber-300/90 font-mono bg-white/10 px-2 py-0.5 rounded-lg border border-white/10">
                {language === 'en' ? 'in Thai digits: ' : 'тайскими: '}
                {result.thaiDigits}
              </span>
            </div>

            <button
              onClick={() => handleSpeak(result.thaiScript)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 select-none touch-manipulation shadow-lg ${
                isSpeaking
                  ? 'bg-amber-400 text-slate-900 scale-95 shadow-amber-400/40 ring-4 ring-amber-300/30'
                  : 'bg-white/15 hover:bg-white/25 active:scale-90 text-white'
              }`}
              style={{ WebkitTapHighlightColor: 'transparent' }}
              aria-label={language === 'en' ? 'Listen to pronunciation' : 'Прослушать произношение'}
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          {/* Thai Spelled Word */}
          <div className="bg-black/25 rounded-2xl p-3.5 border border-white/10">
            <div className="text-2xl font-bold text-amber-300 font-thai tracking-wide leading-relaxed">
              {result.thaiScript}
            </div>
            <div className="text-sm text-blue-200/90 font-mono font-medium mt-1">
              [{result.transcription}]
            </div>
          </div>

          {/* Explanation notes (rules triggered like 'èt' or 'yîi-sìp') */}
          {result.notes.length > 0 && (
            <div className="flex flex-col gap-1.5 pt-1">
              {result.notes.map((note, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 bg-amber-400/15 border border-amber-400/30 rounded-xl px-3 py-1.5 text-xs text-amber-200 leading-snug"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Color-Coded Decomposition Blocks */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {language === 'en' ? 'Building Blocks Breakdown' : 'Разбор числительного по кирпичикам'}
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            {language === 'en'
              ? `${result.blocks.length} ${result.blocks.length === 1 ? 'place' : 'places'}`
              : `${result.blocks.length} ${result.blocks.length === 1 ? 'разряд' : 'разряда'}`}
          </span>
        </div>

        {result.blocks.length === 0 || numInput === 0 ? (
          <div className="text-center py-3 text-xs text-slate-400">
            {language === 'en'
              ? 'Number 0 = ศูนย์ [sǔun] (single standalone word)'
              : 'Число 0 = ศูนย์ [sǔun] (отдельное самостоятельное слово)'}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {result.blocks.map((block, idx) => (
              <button
                key={idx}
                onClick={() => handleSpeak(block.thai)}
                className="group flex flex-col items-start px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 transition-all select-none touch-manipulation active:scale-95 text-left"
              >
                <div className="flex items-center gap-1.5 w-full">
                  <span className="text-sm font-bold text-blue-700 font-thai group-hover:text-blue-600">
                    {block.thai}
                  </span>
                  <Volume2 className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  [{block.trans}]
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 font-medium">
                  {block.description}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Keypad & Input controls */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {language === 'en' ? 'Interactive Keypad' : 'Интерактивный ввод'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDeleteDigit}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all select-none touch-manipulation"
              aria-label={language === 'en' ? 'Delete digit' : 'Стереть последнюю цифру'}
            >
              <Delete className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Delete' : 'Стереть'}</span>
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 active:scale-95 transition-all select-none touch-manipulation"
              aria-label={language === 'en' ? 'Reset to 0' : 'Сбросить на 0'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Clear' : 'Сброс'}</span>
            </button>
          </div>
        </div>

        {/* 10-Key Grid */}
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
            <button
              key={digit}
              onClick={() => handleKeypadPress(digit)}
              className="h-11 rounded-xl bg-slate-100 hover:bg-blue-100/70 hover:text-blue-700 active:scale-95 transition-all font-bold text-base text-slate-800 flex items-center justify-center select-none touch-manipulation border border-slate-200/60"
            >
              {digit}
            </button>
          ))}
          <button
            onClick={() => setNumInput(Math.max(0, numInput + 10))}
            className="h-11 rounded-xl bg-slate-50 hover:bg-slate-100 active:scale-95 transition-all font-semibold text-xs text-slate-600 flex items-center justify-center select-none touch-manipulation border border-slate-200/60"
          >
            +10
          </button>
          <button
            onClick={() => handleKeypadPress(0)}
            className="h-11 rounded-xl bg-slate-100 hover:bg-blue-100/70 hover:text-blue-700 active:scale-95 transition-all font-bold text-base text-slate-800 flex items-center justify-center select-none touch-manipulation border border-slate-200/60"
          >
            0
          </button>
          <button
            onClick={() => setNumInput(Math.max(0, numInput + 100))}
            className="h-11 rounded-xl bg-slate-50 hover:bg-slate-100 active:scale-95 transition-all font-semibold text-xs text-slate-600 flex items-center justify-center select-none touch-manipulation border border-slate-200/60"
          >
            +100
          </button>
        </div>
      </div>

      {/* Quick Presets for Teachers and Daily Life */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {language === 'en' ? 'Preset Classroom & Daily Numbers' : 'Готовые школьные и бытовые числа'}
          </span>
        </div>

        {/* Filter chips */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-2">
          {[
            { id: 'all', label: language === 'en' ? 'All' : 'Все' },
            { id: 'classroom', label: language === 'en' ? 'School & Class' : 'Школа и класс' },
            { id: 'time', label: language === 'en' ? 'Time & Minutes' : 'Время и минуты' },
            { id: 'price', label: language === 'en' ? 'Prices & Baht' : 'Цены и баты' },
            { id: 'daily', label: language === 'en' ? 'Daily & Dates' : 'Быт и даты' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium transition-all select-none touch-manipulation ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Preset tags grid */}
        <div className="flex flex-wrap gap-2 pt-1">
          {filteredPresets.map((preset) => {
            const isSelected = numInput === preset.num;
            return (
              <button
                key={`${preset.category}-${preset.num}-${preset.label}`}
                onClick={() => handlePreset(preset)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border select-none touch-manipulation active:scale-95 ${
                  isSelected
                    ? 'bg-blue-50 border-blue-400 text-blue-800 font-semibold shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span>{language === 'en' ? preset.labelEn : preset.label}</span>
                {isSelected && <Check className="w-3 h-3 text-blue-600" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
