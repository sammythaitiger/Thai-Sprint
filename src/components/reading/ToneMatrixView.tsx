import React, { useState } from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { TONE_MATRIX_DATA, getToneBadgeInfo } from '../../data/readingLessons';
import { Tone, ConsonantClass } from '../../types/reading';
import { speakThai } from '../../utils/tts';

export const ToneMatrixView: React.FC = () => {
  const language = useAppStore((s) => s.language);

  // Interactive tone calculator state
  const [calcClass, setCalcClass] = useState<ConsonantClass>('mid');
  const [calcSyllable, setCalcSyllable] = useState<'live_long' | 'dead_short' | 'dead_long'>('live_long');
  const [calcToneMark, setCalcToneMark] = useState<'none' | 'mai_ek' | 'mai_tho'>('none');

  const calculateTone = (
    cClass: ConsonantClass,
    syl: 'live_long' | 'dead_short' | 'dead_long',
    tMark: 'none' | 'mai_ek' | 'mai_tho'
  ): { tone: Tone; ruleText: { ru: string; en: string }; sampleWord: string } => {
    // 1. With Tone Marks
    if (tMark === 'mai_ek') {
      if (cClass === 'low') {
        return {
          tone: 'falling',
          ruleText: {
            ru: 'Низкий класс + знак Май Эк ( ่ ) = ПАДАЮЩИЙ ТОН (Falling)',
            en: 'Low class + Mai Ek ( ่ ) = FALLING TONE',
          },
          sampleWord: 'ไม่',
        };
      }
      return {
        tone: 'low',
        ruleText: {
          ru: `${cClass === 'mid' ? 'Средний' : 'Высокий'} класс + знак Май Эк ( ่ ) = НИЗКИЙ ТОН (Low)`,
          en: `${cClass === 'mid' ? 'Mid' : 'High'} class + Mai Ek ( ่ ) = LOW TONE`,
        },
        sampleWord: cClass === 'mid' ? 'ไก่' : 'ไข่',
      };
    }

    if (tMark === 'mai_tho') {
      if (cClass === 'low') {
        return {
          tone: 'high',
          ruleText: {
            ru: 'Низкий класс + знак Май Тхо ( ้ ) = ВЫСОКИЙ ТОН (High)',
            en: 'Low class + Mai Tho ( ้ ) = HIGH TONE',
          },
          sampleWord: 'ม้า',
        };
      }
      return {
        tone: 'falling',
        ruleText: {
          ru: `${cClass === 'mid' ? 'Средний' : 'Высокий'} класс + знак Май Тхо ( ้ ) = ПАДАЮЩИЙ ТОН (Falling)`,
          en: `${cClass === 'mid' ? 'Mid' : 'High'} class + Mai Tho ( ้ ) = FALLING TONE`,
        },
        sampleWord: cClass === 'mid' ? 'เก้า' : 'ข้าว',
      };
    }

    // 2. Without Tone Marks
    if (syl === 'live_long') {
      if (cClass === 'high') {
        return {
          tone: 'rising',
          ruleText: {
            ru: 'Высокий класс + живой слог (долгая гласная / сонорный конец) = ВОСХОДЯЩИЙ ТОН (Rising)',
            en: 'High class + live syllable (long vowel / sonorant final) = RISING TONE',
          },
          sampleWord: 'ขา',
        };
      }
      return {
        tone: 'mid',
        ruleText: {
          ru: `${cClass === 'mid' ? 'Средний' : 'Низкий'} класс + живой слог = СРЕДНИЙ ТОН (Mid)`,
          en: `${cClass === 'mid' ? 'Mid' : 'Low'} class + live syllable = MID TONE`,
        },
        sampleWord: cClass === 'mid' ? 'กา' : 'มา',
      };
    }

    if (syl === 'dead_short') {
      if (cClass === 'low') {
        return {
          tone: 'high',
          ruleText: {
            ru: 'Низкий класс + мертвый слог с короткой гласной = ВЫСОКИЙ ТОН (High)',
            en: 'Low class + dead syllable with short vowel = HIGH TONE',
          },
          sampleWord: 'คะ',
        };
      }
      return {
        tone: 'low',
        ruleText: {
          ru: `${cClass === 'mid' ? 'Средний' : 'Высокий'} класс + мертвый слог = НИЗКИЙ ТОН (Low)`,
          en: `${cClass === 'mid' ? 'Mid' : 'High'} class + dead syllable = LOW TONE`,
        },
        sampleWord: cClass === 'mid' ? 'กะ' : 'ขะ',
      };
    }

    // dead_long
    if (cClass === 'low') {
      return {
        tone: 'falling',
        ruleText: {
          ru: 'Низкий класс + мертвый слог с долгой гласной = ПАДАЮЩИЙ ТОН (Falling)',
          en: 'Low class + dead syllable with long vowel = FALLING TONE',
        },
        sampleWord: 'มาก',
      };
    }

    return {
      tone: 'low',
      ruleText: {
        ru: `${cClass === 'mid' ? 'Средний' : 'Высокий'} класс + мертвый слог = НИЗКИЙ ТОН (Low)`,
        en: `${cClass === 'mid' ? 'Mid' : 'High'} class + dead syllable = LOW TONE`,
      },
      sampleWord: cClass === 'mid' ? 'ปาก' : 'ขาด',
    };
  };

  const calculated = calculateTone(calcClass, calcSyllable, calcToneMark);
  const resultBadge = getToneBadgeInfo(calculated.tone, language);

  return (
    <div className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto">
      {/* Introduction Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 rounded-3xl p-5 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-300">
            {language === 'ru' ? 'Справочник фонетики' : 'Phonics Reference'}
          </span>
        </div>
        <h2 className="text-xl font-bold tracking-tight mb-1">
          {language === 'ru' ? 'Матрица тайских тонов' : 'Thai Tone Matrix'}
        </h2>
        <p className="text-xs text-blue-200/80 leading-relaxed">
          {language === 'ru'
            ? 'Тайский тон определяется тремя факторами: классом начальной согласной, типом слога (живой / мертвый) и наличием тонового знака.'
            : 'Thai tone is defined by 3 factors: consonant class, syllable type (live / dead), and tone mark.'}
        </p>
      </div>

      {/* 5 Tones Soundboard */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col gap-3">
        <h3 className="text-sm font-bold text-slate-900">
          {language === 'ru' ? '5 тонов тайского языка' : '5 Tones of Thai Language'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {[
            {
              tone: 'mid' as Tone,
              nameRu: 'Средний',
              nameEn: 'Mid',
              contour: '—',
              contourDescRu: 'Ровный средний тон',
              contourDescEn: 'Flat pitch',
              sample: 'กา',
              trans: 'gaa',
            },
            {
              tone: 'low' as Tone,
              nameRu: 'Низкий',
              nameEn: 'Low',
              contour: '↘',
              contourDescRu: 'Падает на низкую ноту',
              contourDescEn: 'Drops to low note',
              sample: 'ปาก',
              trans: 'bpaak',
            },
            {
              tone: 'falling' as Tone,
              nameRu: 'Падающий',
              nameEn: 'Falling',
              contour: '∧',
              contourDescRu: 'Взлет и резкий обрыв',
              contourDescEn: 'Peak and drop',
              sample: 'เก้า',
              trans: 'gao',
            },
            {
              tone: 'high' as Tone,
              nameRu: 'Высокий',
              nameEn: 'High',
              contour: '↗',
              contourDescRu: 'Высокая плоская нота',
              contourDescEn: 'High flat note',
              sample: 'คะ',
              trans: 'kha',
            },
            {
              tone: 'rising' as Tone,
              nameRu: 'Восходящий',
              nameEn: 'Rising',
              contour: '∨',
              contourDescRu: 'Спад и взлет (вопрос)',
              contourDescEn: 'Dip and rise (question)',
              sample: 'ขา',
              trans: 'khaa',
            },
          ].map((item) => {
            const badge = getToneBadgeInfo(item.tone, language);
            return (
              <button
                key={item.tone}
                onClick={() => speakThai(item.sample)}
                className="flex items-center sm:flex-col justify-between p-3 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-slate-50 active:scale-95 transition-all text-left sm:text-center group cursor-pointer"
              >
                <div className="flex items-center sm:flex-col gap-2">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs border ${badge.color}`}
                  >
                    {item.contour}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-slate-800">
                      {language === 'ru' ? item.nameRu : item.nameEn}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {language === 'ru' ? item.contourDescRu : item.contourDescEn}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 sm:mt-2">
                  <span className="font-thai text-lg font-bold text-slate-900 group-hover:text-blue-600">
                    {item.sample}
                  </span>
                  <Volume2 className="w-3.5 h-3.5 text-blue-500" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Tone Calculator / Formula */}
      <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 rounded-2xl p-4 border border-blue-200/80 shadow-xs flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-bold text-slate-900">
            {language === 'ru' ? 'Интерактивный калькулятор тона' : 'Interactive Tone Calculator'}
          </h3>
        </div>

        {/* 1. Consonant Class */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700">
            1. {language === 'ru' ? 'Класс начальной согласной:' : 'Initial Consonant Class:'}
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'mid' as ConsonantClass, ru: 'Средний (ก, ด, ต)', en: 'Mid (ก, ด, ต)' },
              { id: 'high' as ConsonantClass, ru: 'Высокий (ข, ส, ห)', en: 'High (ข, ส, ห)' },
              { id: 'low' as ConsonantClass, ru: 'Низкий (ค, ม, ร)', en: 'Low (ค, ม, ร)' },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setCalcClass(c.id)}
                className={`py-2 px-2 rounded-xl text-[11px] font-semibold border transition-all text-center select-none cursor-pointer ${
                  calcClass === c.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {language === 'ru' ? c.ru : c.en}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Syllable Type */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700">
            2. {language === 'ru' ? 'Тип слога (без знака тона):' : 'Syllable Type (No tone mark):'}
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              {
                id: 'live_long' as const,
                ru: 'Живой (долгий/сонорный)',
                en: 'Live (long/sonorant)',
              },
              {
                id: 'dead_short' as const,
                ru: 'Мертвый (короткий)',
                en: 'Dead (short vowel)',
              },
              {
                id: 'dead_long' as const,
                ru: 'Мертвый (взрывной конец)',
                en: 'Dead (stop final)',
              },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setCalcSyllable(s.id)}
                className={`py-2 px-2 rounded-xl text-[11px] font-semibold border transition-all text-center select-none cursor-pointer ${
                  calcSyllable === s.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {language === 'ru' ? s.ru : s.en}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Tone Mark */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700">
            3. {language === 'ru' ? 'Тоновый знак (если есть):' : 'Tone Mark (if any):'}
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'none' as const, ru: 'Без знака (Обычный)', en: 'No Mark' },
              { id: 'mai_ek' as const, ru: 'Май Эк ( -่ )', en: 'Mai Ek ( -่ )' },
              { id: 'mai_tho' as const, ru: 'Май Тхо ( -้ )', en: 'Mai Tho ( -้ )' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setCalcToneMark(m.id)}
                className={`py-2 px-2 rounded-xl text-[11px] font-semibold border transition-all text-center select-none cursor-pointer ${
                  calcToneMark === m.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {language === 'ru' ? m.ru : m.en}
              </button>
            ))}
          </div>
        </div>

        {/* Result Card */}
        <div className="mt-2 p-4 rounded-xl bg-white border border-blue-200 shadow-xs flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
              {language === 'ru' ? 'Результат:' : 'Result Tone:'}
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full border ${resultBadge.color}`}
              >
                {resultBadge.arrow} {resultBadge.label}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-snug">
              {calculated.ruleText[language]}
            </p>
          </div>

          <button
            onClick={() => speakThai(calculated.sampleWord)}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <span className="font-thai text-xl font-bold leading-none mb-1">
              {calculated.sampleWord}
            </span>
            <div className="flex items-center gap-1 text-[10px] font-semibold">
              <Volume2 className="w-3 h-3" />
              <span>{language === 'ru' ? 'Тест' : 'Test'}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            {language === 'ru' ? 'Сводная таблица правил' : 'Rules Summary Table'}
          </h3>
          <span className="text-xs text-slate-400">Kedmanee Touch Phonics</span>
        </div>

        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full text-left text-xs border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold">
                <th className="py-2.5 px-3">{language === 'ru' ? 'Класс' : 'Class'}</th>
                <th className="py-2.5 px-2">{language === 'ru' ? 'Живой слог' : 'Live Syl.'}</th>
                <th className="py-2.5 px-2">{language === 'ru' ? 'Мертвый слог' : 'Dead Syl.'}</th>
                <th className="py-2.5 px-2">Май Эк ( ่ )</th>
                <th className="py-2.5 px-2">Май Тхо ( ้ )</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {TONE_MATRIX_DATA.map((row) => (
                <tr key={row.consonantClass} className="hover:bg-slate-50/80">
                  <td className="py-3 px-3 font-semibold text-slate-800">
                    <div>{language === 'ru' ? row.classNameRu : row.classNameEn}</div>
                    <div className="font-thai text-slate-400 text-[11px] font-normal">
                      {row.consonantsSample}
                    </div>
                  </td>

                  <td className="py-3 px-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                        getToneBadgeInfo(row.liveLong, language).color
                      }`}
                    >
                      {getToneBadgeInfo(row.liveLong, language).label}
                    </span>
                  </td>

                  <td className="py-3 px-2">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                          getToneBadgeInfo(row.deadShort, language).color
                        }`}
                      >
                        {getToneBadgeInfo(row.deadShort, language).label}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                        getToneBadgeInfo(row.withMaiEk, language).color
                      }`}
                    >
                      {getToneBadgeInfo(row.withMaiEk, language).label}
                    </span>
                  </td>

                  <td className="py-3 px-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                        getToneBadgeInfo(row.withMaiTho, language).color
                      }`}
                    >
                      {getToneBadgeInfo(row.withMaiTho, language).label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
