import { useState, useEffect } from 'react';
import { Volume2, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';
import { THAI_DIGITS_LIST, ThaiDigitInfo } from '../../utils/thaiNumbers';
import { speakThai, getSpeakingId, subscribeToSpeaking } from '../../utils/tts';
import { useAppStore } from '../../store/useAppStore';

export function ThaiDigitsGuide() {
  const language = useAppStore((s) => s.language);
  const [selectedDigit, setSelectedDigit] = useState<ThaiDigitInfo>(THAI_DIGITS_LIST[1]!);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);

  useEffect(() => {
    return subscribeToSpeaking(() => {
      setIsSpeaking(getSpeakingId() === `digit-${selectedDigit.arabic}`);
    });
  }, [selectedDigit]);

  const handleSelect = (item: ThaiDigitInfo) => {
    setSelectedDigit(item);
    setCardFlipped(false);
    speakThai(item.thaiScript, `digit-${item.arabic}`);
  };

  const handleSpeakCurrent = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    speakThai(selectedDigit.thaiScript, `digit-${selectedDigit.arabic}`);
  };

  return (
    <div className="flex flex-col gap-4 pb-6">
      {/* Visual Flashcard & Spotlight */}
      <div
        onClick={() => setCardFlipped(!cardFlipped)}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white p-6 shadow-xl relative cursor-pointer select-none transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300/90 bg-amber-400/20 px-2.5 py-1 rounded-full border border-amber-400/30">
            {language === 'en' ? 'Tap card to flip' : 'Нажмите на карточку для переворота'}
          </span>
          <button
            onClick={handleSpeakCurrent}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isSpeaking
                ? 'bg-amber-400 text-slate-900 ring-4 ring-amber-300/30 shadow-lg'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            aria-label={language === 'en' ? 'Listen to digit' : 'Прослушать цифру'}
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Front / Back Display */}
        {!cardFlipped ? (
          <div className="flex flex-col items-center justify-center py-4">
            <div className="text-8xl font-black text-amber-300 font-thai tracking-tight drop-shadow-md">
              {selectedDigit.thaiDigit}
            </div>
            <div className="text-sm font-semibold text-slate-300 mt-2">
              {language === 'en'
                ? 'Thai numeral (tap to reveal Arabic digit)'
                : 'Тайская цифра (нажмите, чтобы увидеть арабскую)'}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-2">
            <div className="text-7xl font-extrabold text-white tracking-tight">
              {selectedDigit.arabic}
            </div>
            <div className="text-2xl font-bold text-amber-300 font-thai mt-1">
              {selectedDigit.thaiScript}
            </div>
            <div className="text-sm font-mono text-blue-200 mt-0.5">
              [{selectedDigit.transcription}] • {language === 'en' ? selectedDigit.toneEn : selectedDigit.tone}
            </div>
          </div>
        )}

        {/* Mnemonic and explanation */}
        <div className="mt-3 pt-3 border-t border-white/10 flex items-start gap-2.5 bg-white/5 rounded-2xl p-3">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-100/90 leading-relaxed">
            <strong className="text-amber-300">
              {language === 'en' ? 'How to remember: ' : 'Как запомнить: '}
            </strong>
            {language === 'en' ? selectedDigit.mnemonicEn : selectedDigit.mnemonic}
          </p>
        </div>
      </div>

      {/* 0-9 Interactive Selector Strip */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
          {language === 'en' ? 'Select digit (0 – 9)' : 'Выберите цифру (0 – 9)'}
        </h3>
        <div className="grid grid-cols-5 gap-2">
          {THAI_DIGITS_LIST.map((item) => {
            const isSelected = selectedDigit.arabic === item.arabic;
            return (
              <button
                key={item.arabic}
                onClick={() => handleSelect(item)}
                className={`py-3 rounded-2xl flex flex-col items-center justify-center transition-all select-none touch-manipulation active:scale-95 border ${
                  isSelected
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200 ring-2 ring-blue-400/30'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span className={`text-2xl font-black font-thai leading-none ${
                  isSelected ? 'text-white' : 'text-slate-900'
                }`}>
                  {item.thaiDigit}
                </span>
                <span className={`text-xs font-semibold mt-1 ${
                  isSelected ? 'text-blue-100' : 'text-slate-500'
                }`}>
                  = {item.arabic}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Crucial Distinctions in Thai Digits (e.g. 4 vs 5, 1 vs 9) */}
      <div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
            {language === 'en'
              ? 'Common trap: Don’t confuse ๔ (4) and ๕ (5)!'
              : 'Главная ловушка: не путайте ๔ (4) и ๕ (5)!'}
          </h4>
        </div>
        <p className="text-xs text-amber-900/90 leading-relaxed mb-3">
          {language === 'en' ? (
            <>
              Numerals <strong>๔</strong> (4) and <strong>๕</strong> (5) look identical except for one crucial feature:
              digit <strong>๕</strong> has a <strong className="underline">crown loop</strong> at the end of its top tail!
            </>
          ) : (
            <>
              Цифры <strong>๔</strong> (4) и <strong>๕</strong> (5) пишутся абсолютно одинаково, за одним ключевым исключением:
              у цифры <strong>๕</strong> на конце верхнего хвостика есть <strong className="underline">петелька-корона</strong>!
            </>
          )}
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-3 border border-amber-200 flex items-center gap-3">
            <span className="text-3xl font-black font-thai text-slate-900">๔</span>
            <div>
              <div className="text-xs font-bold text-slate-900">= 4 (สี่ / sìi)</div>
              <div className="text-[10px] text-slate-500">
                {language === 'en' ? 'No loop on top' : 'Без петельки сверху'}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 border border-amber-300 shadow-sm flex items-center gap-3">
            <span className="text-3xl font-black font-thai text-amber-600">๕</span>
            <div>
              <div className="text-xs font-bold text-amber-900">= 5 (ห้า / hâa)</div>
              <div className="text-[10px] text-amber-700 font-semibold">
                {language === 'en' ? 'Crown loop on top!' : 'С петелькой наверху!'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Where Thai digits are actually used in Thailand */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            {language === 'en'
              ? 'Where do teachers & expats encounter Thai digits?'
              : 'Где учитель и иностранец встречает тайские цифры?'}
          </h4>
        </div>
        <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>
              {language === 'en' ? (
                <>
                  <strong>School documents & schedules:</strong> Thai public schools are required to print official memos, date headers, and room numbers using Thai numerals.
                </>
              ) : (
                <>
                  <strong>Школьные документы и расписание:</strong> тайские государственные школы обязаны писать номера приказов, дат и иногда аудиторий тайскими цифрами.
                </>
              )}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>
              {language === 'en' ? (
                <>
                  <strong>Government offices & Immigration:</strong> Extension stamps, TM.30, TM.47 forms and receipts usually feature Buddhist calendar years in Thai digits (e.g., <strong>๒๕๖๘</strong>).
                </>
              ) : (
                <>
                  <strong>Государственные ведомства и виза (Иммигрейшн):</strong> штампы продления визы, формы TM.30, TM.47 и квитанции часто содержат тайские цифры года (например, <strong>๒๕๖๘</strong>).
                </>
              )}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>
              {language === 'en' ? (
                <>
                  <strong>Dual pricing (local markets & national parks):</strong> Thai numerals are commonly used on admission price boards for local residents while tourists see Arabic numerals.
                </>
              ) : (
                <>
                  <strong>Ценники для местных (на рынках и в нацпарках):</strong> тайские цифры часто используются для «тайской цены», в то время как для туристов рядом пишут арабские.
                </>
              )}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
