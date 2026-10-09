import { useState, useEffect } from 'react';
import { Volume2, Sparkles, BookOpen, Lightbulb, AlertTriangle, CheckCircle2, Award } from 'lucide-react';
import { speakThai, getSpeakingId, subscribeToSpeaking } from '../../utils/tts';
import { useAppStore } from '../../store/useAppStore';

interface NumberMnemonic {
  num: number;
  thai: string;
  trans: string;
  tone: string;
  toneEn: string;
  association: string;
  associationEn: string;
  detail: string;
  detailEn: string;
}

const MNEMONICS: NumberMnemonic[] = [
  {
    num: 0,
    thai: 'ศูนย์',
    trans: 'sǔun',
    tone: 'Восходящий',
    toneEn: 'Rising',
    association: '«Сунули ноль»',
    associationEn: '“Zero in the Sun”',
    detail: 'Созвучно русскому «сунули». В кармане пусто — остался только ноль.',
    detailEn: 'Sounds like “soon” or a bright round Sun shining with 0 clouds.',
  },
  {
    num: 1,
    thai: 'หนึ่ง',
    trans: 'nùeng',
    tone: 'Низкий',
    toneEn: 'Low',
    association: '«Номер один»',
    associationEn: '“Number One step”',
    detail: 'Короткий, приземистый звук «нынг». Первая ступенька счета.',
    detailEn: 'A short, grounded sound “nùeng”. The foundation step of all Thai counting.',
  },
  {
    num: 2,
    thai: 'สอง',
    trans: 'sǒong',
    tone: 'Восходящий',
    toneEn: 'Rising',
    association: '«Сонг — дуэт двух песен»',
    associationEn: '“A duet of 2 Songs”',
    detail: 'Похоже на англ. «song» (песня). Представьте дуэт из 2 исполнителей.',
    detailEn: 'Sounds just like “Song”. Imagine a vocal duet with 2 singers.',
  },
  {
    num: 3,
    thai: 'สาม',
    trans: 'sǎam',
    tone: 'Восходящий',
    toneEn: 'Rising',
    association: '«Сообразили на троих — сам третий»',
    associationEn: '“Three amigos together”',
    detail: '«Саам» созвучно русскому слову «сам» — втроем с друзьями.',
    detailEn: '“Sǎam” has 3 curved strokes in Thai (๓), like 3 friends gathered around.',
  },
  {
    num: 4,
    thai: 'สี่',
    trans: 'sìi',
    tone: 'Низкий',
    toneEn: 'Low',
    association: '«Си-стема из 4 углов»',
    associationEn: '“See 4 cardinal directions”',
    detail: 'Легко запомнить: короткое «си», 4 стороны света.',
    detailEn: 'Simple short sound “sìi” — see 4 corners of a square.',
  },
  {
    num: 5,
    thai: 'ห้า',
    trans: 'hâa',
    tone: 'Падающий',
    toneEn: 'Falling',
    association: '«Ха-ха-ха! (555)»',
    associationEn: '“Ha-Ha-Ha! (555)”',
    detail: 'Самое легкое число в тайском! «Ха» = 5. В переписке тайцы пишут «555» вместо «ха-ха-ха».',
    detailEn: 'The easiest Thai number! “Hâa” sounds like laughter. Thais text “555” for “hahaha”!',
  },
  {
    num: 6,
    thai: 'หก',
    trans: 'hòk',
    tone: 'Низкий',
    toneEn: 'Low',
    association: '«Хоккей — шестёрка игроков»',
    associationEn: '“Hockey team of 6”',
    detail: '«Хок» — в хоккее на льду ровно 6 игроков в команде.',
    detailEn: '“Hòk” sounds like Hockey — ice hockey always has 6 players on the rink.',
  },
  {
    num: 7,
    thai: 'เจ็ด',
    trans: 'jèt',
    tone: 'Низкий',
    toneEn: 'Low',
    association: '«Самолёт Боинг 777 — Джет»',
    associationEn: '“Boeing 777 Jet”',
    detail: '«Джет» звучит в точности как англ. «Jet» (реактивный самолёт Boeing 777).',
    detailEn: 'Pronounced exactly like “Jet” — picture a triple-seven Boeing 777 jet.',
  },
  {
    num: 8,
    thai: 'แปด',
    trans: 'bpàaet',
    tone: 'Низкий',
    toneEn: 'Low',
    association: '«Бпэт — 8 ног у паука»',
    associationEn: '“Spider Pet with 8 legs”',
    detail: 'Плотный глухой звук «бпэт». Представьте паука с 8 лапками.',
    detailEn: '“Bpàaet” sounds like a quirky pet spider with 8 busy legs.',
  },
  {
    num: 9,
    thai: 'เก้า',
    trans: 'gâao',
    tone: 'Падающий',
    toneEn: 'Falling',
    association: '«Шаг вперёд (ก้าว) — самое счастливое число»',
    associationEn: '“Step forward (ก้าว) — lucky 9”',
    detail: 'Звучит как тайское слово «шагать / прогрессировать». Тайцы верят, что 9 приносит удачу.',
    detailEn: 'Sounds identical to the Thai word for “moving forward / progress”. Sacred luck in Thailand.',
  },
  {
    num: 10,
    thai: 'สิบ',
    trans: 'sìp',
    tone: 'Низкий',
    toneEn: 'Low',
    association: '«Сделать сип — 10 глотков»',
    associationEn: '“Take a Sip — count to 10”',
    detail: '«Сип» — как сделать 10 маленьких глотков прохладного чая.',
    detailEn: '“Sìp” sounds like taking a sip of Thai iced tea after counting to 10.',
  },
];

export function NumbersTheoryGuide() {
  const language = useAppStore((s) => s.language);
  const [speakingKey, setSpeakingKey] = useState<string | null>(null);

  useEffect(() => {
    return subscribeToSpeaking(() => {
      setSpeakingKey(getSpeakingId());
    });
  }, []);

  const handleSpeak = (text: string, key: string) => {
    speakThai(text, key);
  };

  return (
    <div className="flex flex-col gap-5 pb-8 text-slate-800 leading-relaxed">
      {/* Hero Summary Card */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-950 text-white p-5 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-amber-300" />
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
            {language === 'en' ? 'Complete Numbers Reference' : 'Полный справочник по числам'}
          </span>
        </div>
        <h2 className="text-lg font-bold text-white mb-1.5">
          {language === 'en' ? 'How Thai Counting Works' : 'Как устроена тайская система счёта'}
        </h2>
        <p className="text-xs text-blue-100/90 leading-relaxed">
          {language === 'en' ? (
            <>
              Thai counting is one of the most logical and straightforward systems in Asia. There are no convoluted irregulars like French "four-twenty-ten" or German number reversals.
              Simply learn <strong>numbers 0 to 10</strong> and <strong>two golden rules</strong> to say any number from 1 to 1,000,000.
            </>
          ) : (
            <>
              Тайский счёт — один из самых логичных и простых в Азии. В нём нет сложных исключений вроде французского «четыре-двадцать-десять» или немецких перестановок.
              Достаточно выучить <strong>числа от 0 до 10</strong> и <strong>два золотых правила</strong>, чтобы называть любые числа от 1 до 1 000 000.
            </>
          )}
        </p>
      </div>

      {/* SECTION 1: 0 to 10 with Mnemonics */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-bold text-slate-900">
            {language === 'en' ? '1. Core Numbers 0 to 10 (With Mnemonics)' : '1. Базовые числа от 0 до 10 (С мнемониками)'}
          </h3>
        </div>
        <p className="text-xs text-slate-500 mb-3">
          {language === 'en' ? 'Tap the speaker on any number to hear clear native audio:' : 'Нажмите на значок динамика у любого числа, чтобы услышать натуральное произношение:'}
        </p>

        <div className="flex flex-col divide-y divide-slate-100">
          {MNEMONICS.map((item) => {
            const isPlaying = speakingKey === `theory-${item.num}`;
            return (
              <div
                key={item.num}
                className="py-2.5 flex items-start justify-between gap-3 group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-black text-slate-900 w-5 text-right">
                      {item.num}
                    </span>
                    <span className="text-lg font-bold text-blue-700 font-thai">
                      {item.thai}
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-600">
                      [{item.trans}]
                    </span>
                    <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                      {language === 'en' ? item.toneEn : item.tone}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-700 mt-0.5">
                    💡 {language === 'en' ? 'Association: ' : 'Ассоциация: '}
                    <span className="text-indigo-600">
                      {language === 'en' ? item.associationEn : item.association}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {language === 'en' ? item.detailEn : item.detail}
                  </div>
                </div>

                <button
                  onClick={() => handleSpeak(item.thai, `theory-${item.num}`)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all select-none touch-manipulation active:scale-90 ${
                    isPlaying
                      ? 'bg-amber-400 text-slate-900 ring-2 ring-amber-300 animate-pulse'
                      : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                  aria-label={`Play ${item.num}`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Two Golden Rules (èt & yîi-sìp) */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Award className="w-4 h-4 text-amber-600" />
          <h3 className="text-sm font-bold text-slate-900">
            {language === 'en' ? '2. Two Golden Irregularities in Thai Counting' : '2. Два золотых исключения тайского счёта'}
          </h3>
        </div>
        <p className="text-xs text-slate-600 mb-3">
          {language === 'en'
            ? 'Thai counting is remarkably consistent, with just 2 golden exceptions to remember forever:'
            : 'Тайцы считают очень последовательно, но у них есть ровно 2 железных исключения, которые нужно запомнить раз и навсегда:'}
        </p>

        {/* Rule 1: èt */}
        <div className="rounded-xl bg-amber-50/70 border border-amber-200 p-3.5 mb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wide mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              {language === 'en'
                ? 'Rule #1: Numbers ending in 1 use “ÈT” (เอ็ด [èt])'
                : 'Правило №1: Окончание на 1 звучит как «ЭД» (เอ็ด [èt])'}
            </span>
          </div>
          <p className="text-xs text-amber-950 leading-relaxed mb-2.5">
            {language === 'en' ? (
              <>
                When a compound number (greater than 10) ends with 1 (11, 21, 31, 101, 1051...), Thai speakers <strong>never</strong> say "nùeng".
                Instead, they always use <strong className="text-amber-700 underline">เอ็ด [èt]</strong>:
              </>
            ) : (
              <>
                Если число составное (больше 10) и оканчивается на единицу (11, 21, 31, 101, 1051...), тайцы <strong>никогда</strong> не говорят слово «nùeng» (один).
                Вместо него всегда ставится слово <strong className="text-amber-700 underline">เอ็ด [èt]</strong>:
              </>
            )}
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleSpeak('สิบเอ็ด', 'theory-rule-11')}
              className="bg-white p-2.5 rounded-lg border border-amber-200 text-left flex items-center justify-between hover:border-blue-400 active:scale-95 transition-all"
            >
              <div>
                <div className="font-bold text-slate-900 font-thai">11 = สิบเอ็ด</div>
                <div className="text-[11px] font-mono text-amber-800">[sìp-èt]</div>
                <div className="text-[10px] text-red-500 line-through">
                  {language === 'en' ? 'not sìp-nùeng!' : 'не sìp-nùeng!'}
                </div>
              </div>
              <Volume2 className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => handleSpeak('ยี่สิบเอ็ด', 'theory-rule-21')}
              className="bg-white p-2.5 rounded-lg border border-amber-200 text-left flex items-center justify-between hover:border-blue-400 active:scale-95 transition-all"
            >
              <div>
                <div className="font-bold text-slate-900 font-thai">21 = ยี่สิบเอ็ด</div>
                <div className="text-[11px] font-mono text-amber-800">[yîi-sìp-èt]</div>
                <div className="text-[10px] text-slate-500">
                  {language === 'en' ? '20 + èt' : '20 + эд'}
                </div>
              </div>
              <Volume2 className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <p className="text-[11px] text-amber-800 italic mt-2">
            {language === 'en'
              ? '💡 Fact: The famous northeastern province Roi-Et (ร้อยเอ็ด) literally translates to "101"!'
              : '💡 Факт: Знаменитый город на востоке Таиланда Рой-Эт (ร้อยเอ็ด) буквально переводится как «101»!'}
          </p>
        </div>

        {/* Rule 2: yîi-sìp */}
        <div className="rounded-xl bg-blue-50/70 border border-blue-200 p-3.5">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wide mb-1">
            <AlertTriangle className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              {language === 'en'
                ? 'Rule #2: Twenty is “YÎI-SÌP” (ยี่สิบ [yîi-sìp])'
                : 'Правило №2: Двадцать — это «ЙИ-СИП» (ยี่สิบ [yîi-sìp])'}
            </span>
          </div>
          <p className="text-xs text-blue-950 leading-relaxed mb-2.5">
            {language === 'en' ? (
              <>
                For the number 20, Thais do not say "sǒong" (2).
                They use the ancient numeral word <strong className="text-blue-700 underline">ยี่ [yîi]</strong>:
              </>
            ) : (
              <>
                Для числа 20 тайцы не используют слово «sǒong» (два).
                Используется древнее слово <strong className="text-blue-700 underline">ยี่ [yîi]</strong>:
              </>
            )}
          </p>

          <button
            onClick={() => handleSpeak('ยี่สิบ', 'theory-rule-20')}
            className="w-full bg-white p-2.5 rounded-lg border border-blue-200 text-left flex items-center justify-between hover:border-blue-400 active:scale-95 transition-all"
          >
            <div>
              <div className="font-bold text-slate-900 font-thai text-sm">20 = ยี่สิบ [yîi-sìp]</div>
              <div className="text-[11px] text-slate-500">
                {language === 'en'
                  ? 'Notice: 30 = สามสิบ (3+10), 40 = สี่สิบ (4+10), but 20 = ยี่สิบ (NEVER sǒong-sìp)!'
                  : 'Запомните: 30 = สามสิบ (3+10), 40 = สี่สิบ (4+10), но 20 = ยี่สิบ (НЕ sǒong-sìp)!'}
              </div>
            </div>
            <Volume2 className="w-4 h-4 text-blue-600 shrink-0" />
          </button>
        </div>
      </div>

      {/* SECTION 3: Place Values (mùen, sǎaen, láan) */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-bold text-slate-900">
            {language === 'en' ? '3. Place Values Above 10: Thai Counting Logic' : '3. Разряды больше 10: Логика тайской системы'}
          </h3>
        </div>
        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
          {language === 'en' ? (
            <>
              English groups digits in thousands and millions.
              In Thai, <strong>10,000</strong> and <strong>100,000</strong> each have <strong>their own unique dedicated words</strong>!
            </>
          ) : (
            <>
              В русском языке мы группируем числа по тройкам: тысячи, миллионы.
              В тайском языке для <strong>10 000</strong> и <strong>100 000</strong> есть <strong>собственные уникальные слова</strong>!
            </>
          )}
        </p>

        <div className="space-y-2">
          {[
            { val: '10', thai: 'สิบ', trans: 'sìp', desc: language === 'en' ? 'Ten' : 'Десять' },
            { val: '100', thai: 'ร้อย', trans: 'róoi', desc: language === 'en' ? 'Hundred' : 'Сто' },
            { val: '1,000', thai: 'พัน', trans: 'phan', desc: language === 'en' ? 'Thousand' : 'Тысяча' },
            {
              val: '10,000',
              thai: 'หมื่น',
              trans: 'mùen',
              desc: language === 'en' ? 'Ten thousand (mùen)' : 'Десять тысяч (муэн)',
              highlight: language === 'en'
                ? 'Unique word! 50,000 is “5 mùen” (ห้าหมื่น).'
                : 'Отдельное слово! 50 000 — это «5 муэн» (ห้าหมื่น).',
            },
            {
              val: '100,000',
              thai: 'แสน',
              trans: 'sǎaen',
              desc: language === 'en' ? 'Hundred thousand (sǎaen)' : 'Сто тысяч (сэн)',
              highlight: language === 'en'
                ? 'Unique word! 300,000 is “3 sǎaen” (สามแสน).'
                : 'Отдельное слово! 300 000 — это «3 сэн» (สามแสน).',
            },
            { val: '1,000,000', thai: 'ล้าน', trans: 'láan', desc: language === 'en' ? 'One million (láan)' : 'Один миллион' },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSpeak(item.thai, `theory-place-${idx}`)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-blue-50/60 flex items-center justify-between text-left transition-all active:scale-95"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-extrabold text-xs text-slate-900 font-mono w-16">
                    {item.val}
                  </span>
                  <span className="font-bold text-base text-blue-700 font-thai">
                    {item.thai}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    [{item.trans}]
                  </span>
                  <span className="text-xs text-slate-700 font-medium">
                    — {item.desc}
                  </span>
                </div>
                {item.highlight && (
                  <div className="text-[10px] text-amber-700 font-semibold mt-0.5">
                    ⚡ {item.highlight}
                  </div>
                )}
              </div>
              <Volume2 className="w-4 h-4 text-slate-400 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 4: Construction Examples */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm font-bold text-slate-900">
            {language === 'en' ? '4. Assembling Any Number (LEGO Style)' : '4. Как собирается любое число (Примеры конструктора)'}
          </h3>
        </div>
        <p className="text-xs text-slate-600 mb-3">
          {language === 'en'
            ? 'Numbers are chained from left to right just like building blocks:'
            : 'Числа просто складываются слева направо, как кубики LEGO:'}
        </p>

        <div className="space-y-2.5">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="font-extrabold text-sm text-slate-900">35 = 30 + 5</span>
              <button
                onClick={() => handleSpeak('สามสิบห้า', 'theory-ex-35')}
                className="text-blue-600 hover:text-blue-800 text-xs font-semibold flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" /> {language === 'en' ? 'Audio' : 'Звук'}
              </button>
            </div>
            <div className="text-base font-bold text-blue-800 font-thai">สามสิบห้า</div>
            <div className="text-xs font-mono text-slate-500">[sǎam-sìp hâa]</div>
            <div className="text-[11px] text-slate-500 mt-1">
              [3x10 = สามสิบ] + [5 = ห้า]
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="font-extrabold text-sm text-slate-900">245 = 200 + 40 + 5</span>
              <button
                onClick={() => handleSpeak('สองร้อยสี่สิบห้า', 'theory-ex-245')}
                className="text-blue-600 hover:text-blue-800 text-xs font-semibold flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" /> {language === 'en' ? 'Audio' : 'Звук'}
              </button>
            </div>
            <div className="text-base font-bold text-blue-800 font-thai">สองร้อยสี่สิบห้า</div>
            <div className="text-xs font-mono text-slate-500">[sǒong-róoi sìi-sìp hâa]</div>
            <div className="text-[11px] text-slate-500 mt-1">
              [200 = สองร้อย] + [40 = สี่สิบ] + [5 = ห้า]
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="font-extrabold text-sm text-slate-900">1,250 = 1000 + 200 + 50</span>
              <button
                onClick={() => handleSpeak('หนึ่งพันสองร้อยห้าสิบ', 'theory-ex-1250')}
                className="text-blue-600 hover:text-blue-800 text-xs font-semibold flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" /> {language === 'en' ? 'Audio' : 'Звук'}
              </button>
            </div>
            <div className="text-base font-bold text-blue-800 font-thai">หนึ่งพันสองร้อยห้าสิบ</div>
            <div className="text-xs font-mono text-slate-500">[nùeng-phan sǒong-róoi hâa-sìp]</div>
            <div className="text-[11px] text-slate-500 mt-1">
              [1000 = หนึ่งพัน] + [200 = สองร้อย] + [50 = ห้าสิบ]
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5: Practical Tips for Thailand */}
      <div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-4 shadow-sm">
        <h3 className="text-sm font-bold text-amber-950 mb-2">
          {language === 'en' ? '5. Practical Tips for Life in Thailand' : '5. Практические лайфхаки для жизни в Таиланде'}
        </h3>
        <ul className="text-xs text-amber-900/90 space-y-2 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>
              {language === 'en' ? (
                <>
                  <strong>Hearing prices at 7-Eleven:</strong> Cashiers speak fast. Listen for the ending first: if it ends in “hâa” (5) — it is 25, 35, 45, or 65 THB. If it ends in “sìp” — it is round tens (40, 50, 60 THB).
                </>
              ) : (
                <>
                  <strong>Как слышать цену на кассе в 7-Eleven:</strong> кассир говорит быстро. Слушайте сначала окончание: если в конце «hâa» (5) — это 25, 35, 45 или 65 бат. Если «sìp» — это ровные десятки (40, 50, 60 бат).
                </>
              )}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>
              {language === 'en' ? (
                <>
                  <strong>Laughter in messaging chats:</strong> “555” means “hahaha”. When a joke is hilarious, Thais text “555555+”.
                </>
              ) : (
                <>
                  <strong>Смех в мессенджерах:</strong> «555» означает «ха-ха-ха». Если шутка очень смешная, тайцы пишут «555555+».
                </>
              )}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>
              {language === 'en' ? (
                <>
                  <strong>Lucky 9 (เก้า):</strong> In Thailand, 9 is considered sacred because it sounds like “moving forward / progress” (ก้าว). Condos on 9th floor sell faster, and license plates with “9999” fetch millions of baht at government auctions.
                </>
              ) : (
                <>
                  <strong>Счастливая 9 (เก้า):</strong> в Таиланде число 9 считается священным символом процветания. Дома с номерами на 9 стоят дороже, а номера машин «9999» продаются на правительственных аукционах за миллионы бат.
                </>
              )}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
