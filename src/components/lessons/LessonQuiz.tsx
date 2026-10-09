import { useState, useMemo } from 'react';
import { Check, X, RotateCcw, Volume2, ArrowRight, Award } from 'lucide-react';
import { QuizQuestion } from '../../types';
import { speakThai } from '../../utils/tts';
import { WORDS_DATA } from '../../data/words';
import { useAppStore } from '../../store/useAppStore';
import { useTranslation } from '../../i18n/translations';

interface LessonQuizProps {
  questions: QuizQuestion[];
  day: number;
  onFinish: (score: number) => void;
}

const CHIP_TRANSCRIPTIONS: Record<string, string> = {
  'นั่งที่': 'nâng thîi',
  'ให้เรียบร้อย': 'hâi rîap-rói',
  'ครับ': 'khráp',
  'ฟัง': 'fang',
  'ครู': 'khruu',
  'นะ': 'ná',
  'อย่าวิ่ง': 'yàa wîng',
  'ใน': 'nai',
  'ห้องเรียน': 'hôong-rian',
  'เปิด': 'pòet',
  'หนังสือ': 'nǎng-sǔe',
  'เข้าใจ': 'khâo-jai',
  'ไหม': 'mǎi',
  'เก่ง': 'gèng',
  'มาก': 'mâak',
  'ส่ง': 'sòng',
  'ที่โต๊ะครู': 'thîi dtó khruu',
  'หยุด': 'yùt',
  'คุยกัน': 'khui gan',
  'ได้แล้ว': 'dâi láeo',
  'จดลงไป': 'jòt long pai',
  'ในสมุด': 'nai sa-mùt',
  'ด้วยครับ': 'dûay khráp',
  'หน้า': 'nâa',
  'ที่': 'thîi',
  'ห้า': 'hâa',
  'ทำ': 'tham',
  'ด้วยกัน': 'dûay gan',
  'อ่าน': 'àan',
  'ดังๆ': 'dang-dang',
  'อีก': 'èek',
  'นาที': 'naa-thee',
  'เปิดหนังสือ': 'pòet nǎng-sǔe',
  'ไปที่หน้า': 'pai thîi nâa',
  'สิบ': 'sìp',
  'กลับไปที่นั่ง': 'glàp pai thîi nâng',
  'ของคุณ': 'khǎawng khun',
  'เดี๋ยวนี้': 'dǐao-níi',
  'อย่าเล่นโทรศัพท์': 'yàa lên thoo-ra-sàp',
  'ในเวลาเรียน': 'nai wee-laa rian',
  'ไปห้องพยาบาล': 'pai hôong-pha-yaa-baan',
  'ได้ครับ': 'dâi khráp',
  'ขอไป': 'khǎaw pai',
  'ห้องน้ำ': 'hôong-nám',
  'ทิ้งขยะ': 'thíng kha-yà',
  'ในถังขยะ': 'nai thǎng-kha-yà',
  'เข้าแถว': 'khâo thǎo',
  'ตรงๆ': 'drong-drong',
  'ห้าม': 'hâam',
  'ส่งเสียงดัง': 'sòng sǐang dang',
  'ห้องพักครู': 'hôong-phák-khruu',
  'อยู่ที่ไหน': 'yùu thîi-nǎi',
  'ช่วยเซ็นเอกสาร': 'chûay sen èhk-ga-săan',
  'ให้หน่อยได้ไหม': 'hâi nòi dâi mǎi',
  'วันนี้มี': 'wan-níi mii',
  'ประชุมครูไหม': 'bprà-chum khruu mǎi',
  'กิน': 'gin',
  'ที่นี่': 'thîi-nîi',
  'ตั้งใจ': 'dtâng-jai',
  'เรียน': 'rian',
  'นะครับ': 'ná khráp',
  'คะแนนเต็ม': 'kha-næn dtem',
  'อย่าจับ': 'yàa jàp',
  'อันนี้อันตราย': 'an-dta-raai',
  'ช่วยคุยกับนักเรียน': 'chûay khui gàp nák-rian',
  'ผมสอน': 'phǒm sǎawn',
  'ในโรงเรียนไทย': 'nai roong-rian thai',
  'ได้แล้วครับ': 'dâi láeo khráp',
  'พร้อมกัน': 'phráawm-gan',
  'ใครเสร็จแล้ว': 'khrai sèt láeo',
  'ใช้งาน': 'chái-ngaan',
  'ยังไง': 'yang-ngai',
  'สแกนจ่าย': 'sa-gaen jàai',
  'ได้ไหมครับ': 'dâi măi khráp',
  'อุ่นร้อน': 'ùn ráawn',
  'ทั้งหมด': 'tháng-mòt',
  'เท่าไหร่ครับ': 'thâo-rài khráp',
  'กลับบ้าน': 'glàp bâan',
  'กี่โมงครับ': 'gîi moong khráp',
  'เหนื่อยไหมครับ': 'nùeay măi khráp',
  'ไปบิ๊กซี': 'pai Big C',
  'กันไหมครับ': 'gan măi khráp',
  'ขอบคุณมากครับ': 'khàawp-khun mâak khráp',
  'ที่รัก': 'thîi-rák',
  'เดี๋ยวผมไปส่งลูก': 'dĭao phŏm pai sòng lûuk',
  'เองครับ': 'eeng khráp',
  'ระวังล้ม': 'ra-wang lóm',
  'นะลูก': 'ná lûuk',
};

const AUDIO_TRANSCRIPTIONS: Record<string, string> = {
  'หัวหน้าห้อง': 'hǔa-nâa-hôong',
  'เงียบ': 'ngîap',
  'มือถือ': 'mue-thǔe',
  'ยางลบ': 'yaang-lóp',
  'ยกมือขึ้น': 'yok-mue khûen',
  'ถูกต้อง': 'thùuk-dtâawng',
  'ตั้งใจฟัง': 'dtâng-jai fang',
  'โปรเจกเตอร์': 'bproo-jèk-dtôoe',
  'แปด': 'pææt',
  'จับคู่กัน': 'jàp-khûu gan',
  'อ่านพร้อมกัน': 'àan phráawm-gan',
  'เสร็จหรือยัง': 'sèt rǔe yang',
  'ส่งการบ้าน': 'sòng gaan-bâan',
  'ข้อสอบ': 'khôo-sòop',
  'ตรงเวลา': 'drong wee-laa',
  'ดื้อ': 'dûe',
  'ห้องพยาบาล': 'hôong-pha-yaa-baan',
  'รอก่อน': 'roo gòon',
  'ถังขยะ': 'thǎng-kha-yà',
  'เสาธง': 'sǎo thong',
  'ทำความสะอาด': 'tham khwam sa-àat',
  'สอนแทน': 'sǎawn thaean',
  'กระดาษหมด': 'gra-dàat mòt',
  'ครับผม': 'khráp-phǒm',
  'ไม่เผ็ดเลย': 'mâi phèt looei',
  'ปิดเทอม': 'bpìt thooem',
  'สอบผ่าน': 'sòop phàan',
  'อันตราย': 'an-dta-raai',
  'ผู้ปกครอง': 'phûu-bpòk-khroong',
  'เก่งมาก ยอดเยี่ยม': 'gèng mâak yôot-yîam',
  'ห้ามส่งเสียงดัง': 'hâam sòng sĭang dang',
  'เก่งมาก': 'gèng mâak',
  'เครื่องปริ้นท์': 'khrûeang-prín',
  'อันนี้เผ็ดไหม': 'an-níi phèt măi',
  'กินที่นี่': 'gin thîi-nîi',
  'เช็คบิล': 'chék-bin',
  'ไม่รับถุงพลาสติก': 'mâi ráp thŭng phlaas-dtìk',
  'ทั้งหมดเท่าไหร่': 'tháng-mòt thâo-rài',
  'กินอะไรดี': 'gin a-rai dee',
  'เหนื่อยไหม': 'nùeay măi',
  'ที่รัก': 'thîi-rák',
  'ลูกนอนหลับแล้วหรือยัง': 'lûuk naawn-làp láeo rŭue yang',
  'ระวังล้ม': 'ra-wang lóm',
  'เก่งมากคนเก่ง': 'gèng mâak khon gèng',
};

function getChipTranscription(chip: string): string | undefined {
  return CHIP_TRANSCRIPTIONS[chip] || WORDS_DATA.find((w) => w.thai === chip)?.transcription;
}

export function LessonQuiz({ questions, day, onFinish }: LessonQuizProps) {
  const language = useAppStore((s) => s.language);
  const { t } = useTranslation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [orderedChips, setOrderedChips] = useState<string[]>([]);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCurrentCorrect, setIsCurrentCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex];

  // Scrambled pool for order_words question
  const availableChips = useMemo(() => {
    if (!currentQ || currentQ.type !== 'order_words' || !currentQ.scrambledWords) return [];
    const usedCounts: Record<string, number> = {};
    for (const chip of orderedChips) {
      usedCounts[chip] = (usedCounts[chip] || 0) + 1;
    }
    const remaining: string[] = [];
    const poolCounts: Record<string, number> = {};
    for (const word of currentQ.scrambledWords) {
      poolCounts[word] = (poolCounts[word] || 0) + 1;
      if ((usedCounts[word] || 0) < poolCounts[word]) {
        remaining.push(word);
      }
    }
    return remaining;
  }, [currentQ, orderedChips]);

  const handlePlayAudio = (text: string) => {
    speakThai(text);
  };

  const handleCheckAnswer = () => {
    if (!currentQ) return;

    let correct = false;
    if (
      currentQ.type === 'choose_translation' ||
      currentQ.type === 'audio_match' ||
      currentQ.type === 'reverse_translation' ||
      currentQ.type === 'fill_blank' ||
      currentQ.type === 'culture_situation'
    ) {
      correct = selectedOption === currentQ.correctIndex;
    } else if (currentQ.type === 'order_words') {
      const target = (currentQ.correctOrder || []).join(' ');
      const user = orderedChips.join(' ');
      correct = target === user;
    }

    setIsCurrentCorrect(correct);
    if (correct) {
      setCorrectCount((prev) => prev + 1);
    }
    setIsAnswerChecked(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setOrderedChips([]);
      setIsAnswerChecked(false);
      setIsCurrentCorrect(false);
    } else {
      setIsFinished(true);
      onFinish(correctCount + (isCurrentCorrect ? 1 : 0));
    }
  };

  const handleResetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setOrderedChips([]);
    setIsAnswerChecked(false);
    setIsCurrentCorrect(false);
    setCorrectCount(0);
    setIsFinished(false);
  };

  // Result screen
  if (isFinished) {
    const total = questions.length;
    const finalScore = correctCount;
    const passed = finalScore >= Math.ceil(total * 0.6);

    return (
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-50 flex items-center justify-center text-3xl shadow-inner">
          {passed ? '🏆' : '📚'}
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-1">
          {passed ? t('quizPassedTitle') : t('quizFailedTitle')}
        </h3>
        <p className="text-sm text-slate-500 mb-4">
          {language === 'en'
            ? `Day ${day} Score: ${finalScore} of ${total} correct`
            : `Результат урока ${day}: ${finalScore} из ${total} верно`}
        </p>

        {passed ? (
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 mb-6 text-emerald-800 text-xs font-medium">
            {t('quizPassedDesc')}
          </div>
        ) : (
          <div className="p-3 bg-rose-50 rounded-2xl border border-rose-100 mb-6 text-rose-800 text-xs font-medium">
            {t('quizFailedDesc')}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleResetQuiz}
            className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
          >
            <RotateCcw className="w-4 h-4" /> {t('retakeQuiz')}
          </button>
          <button
            onClick={() => onFinish(finalScore)}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-md active:scale-95 transition-transform flex items-center justify-center gap-1.5"
          >
            <Award className="w-4 h-4" /> {t('finishLesson')}
          </button>
        </div>
      </div>
    );
  }

  if (!currentQ) return null;

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-lg">
      {/* Quiz Progress header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
          {language === 'en'
            ? `Question ${currentIndex + 1} of ${questions.length}`
            : `Вопрос ${currentIndex + 1} из ${questions.length}`}
        </span>
        <span className="text-xs font-medium text-slate-400">
          {t('lessonDay')} {day}
        </span>
      </div>

      {/* Question Prompt */}
      <h3 className="text-base font-bold text-slate-900 mb-3">
        {currentQ.question}
      </h3>

      {/* Content based on type */}
      {currentQ.type === 'choose_translation' && currentQ.thaiPrompt && (
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center mb-4">
          <p
            className="text-2xl font-bold text-slate-900 mb-1"
            style={{ fontFamily: "'Sarabun', sans-serif" }}
          >
            {currentQ.thaiPrompt}
          </p>
          {currentQ.transPrompt && (
            <p className="text-base font-mono italic text-indigo-600 font-semibold mb-2 bg-indigo-50/70 inline-block px-3 py-0.5 rounded-lg border border-indigo-100">
              [{currentQ.transPrompt}]
            </p>
          )}
          <div>
            <button
              onClick={() => handlePlayAudio(currentQ.thaiPrompt!)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold active:scale-95 transition-transform"
            >
              <Volume2 className="w-3.5 h-3.5" /> {language === 'en' ? 'Listen' : 'Послушать'}
            </button>
          </div>
        </div>
      )}

      {currentQ.type === 'reverse_translation' && (
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center mb-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            {t('howToSayThai')}
          </span>
          <p className="text-lg font-bold text-slate-900 mb-1">
            «{currentQ.transPrompt || currentQ.question}»
          </p>
          <span className="text-xs text-slate-500">
            {t('selectOptionBelow')}
          </span>
        </div>
      )}

      {currentQ.type === 'fill_blank' && currentQ.blankSentence && (
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center mb-4">
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block mb-1">
            {t('fillBlankWord')}
          </span>
          <p
            className="text-2xl font-bold text-slate-900 mb-1"
            style={{ fontFamily: "'Sarabun', sans-serif" }}
          >
            {currentQ.blankSentence.thai}
          </p>
          <p className="text-base font-mono italic text-indigo-600 font-semibold mb-2 bg-indigo-50/70 inline-block px-3 py-0.5 rounded-lg border border-indigo-100">
            [{currentQ.blankSentence.trans}]
          </p>
          {currentQ.thaiPrompt && (
            <div className="flex flex-col items-center gap-1.5">
              <button
                onClick={() => handlePlayAudio(currentQ.thaiPrompt!)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold active:scale-95 transition-transform"
              >
                <Volume2 className="w-3.5 h-3.5" /> {t('listenHint')}
              </button>
              {isAnswerChecked && (
                <div className="text-xs text-slate-600 font-mono mt-0.5">
                  {language === 'en' ? 'Blank:' : 'Пропуск:'}{' '}
                  <span className="font-bold text-slate-900 font-thai text-sm">
                    {currentQ.thaiPrompt}
                  </span>{' '}
                  {currentQ.transPrompt && (
                    <span className="text-indigo-600 font-semibold">
                      [{currentQ.transPrompt}]
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {currentQ.type === 'culture_situation' && (
        <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 mb-4">
          <div className="flex items-center gap-1.5 text-amber-800 text-xs font-bold mb-1">
            <span>🇹🇭</span> {t('thaiSchoolSituation')}
          </div>
          <p className="text-xs text-amber-950 font-medium leading-relaxed">
            {currentQ.transPrompt || (language === 'en' ? 'Choose the polite teacher reaction in accordance with school etiquette:' : 'Выберите корректную реакцию учителя в соответствии с педагогическим этикетом:')}
          </p>
        </div>
      )}

      {currentQ.type === 'audio_match' && currentQ.audioText && (
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl border border-indigo-100 text-center mb-4">
          <button
            onClick={() => handlePlayAudio(currentQ.audioText!)}
            className="w-16 h-16 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200 active:scale-90 transition-transform mb-2"
          >
            <Volume2 className="w-8 h-8" />
          </button>
          <p className="text-xs font-medium text-slate-600">
            {isAnswerChecked
              ? (language === 'en' ? 'Tap to replay audio' : 'Нажмите, чтобы прослушать повторно')
              : (language === 'en' ? 'Tap to listen to audio' : 'Нажмите, чтобы прослушать аудио')}
          </p>

          {isAnswerChecked && (
            <div className="mt-3 pt-3 border-t border-indigo-200/60 animate-in fade-in duration-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                {t('audioHeard')}
              </span>
              <p
                className="text-xl font-bold text-slate-900 mt-0.5"
                style={{ fontFamily: "'Sarabun', sans-serif" }}
              >
                {currentQ.audioText}
              </p>
              <p className="text-sm font-mono italic text-indigo-700 font-semibold mt-0.5">
                [{AUDIO_TRANSCRIPTIONS[currentQ.audioText] || currentQ.transPrompt || ''}]
              </p>
            </div>
          )}
        </div>
      )}

      {currentQ.type === 'order_words' && (
        <div className="mb-4">
          {/* Target assembly area */}
          <div className="min-h-[64px] p-3 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 flex flex-wrap gap-2 items-center mb-3">
            {orderedChips.length === 0 ? (
              <span className="text-xs text-slate-400 italic">{t('orderWordsHint')}</span>
            ) : (
              orderedChips.map((chip, idx) => {
                const trans = getChipTranscription(chip);
                return (
                  <button
                    key={`${chip}-${idx}`}
                    disabled={isAnswerChecked}
                    onClick={() => {
                      if (isAnswerChecked) return;
                      setOrderedChips((prev) => prev.filter((_, i) => i !== idx));
                    }}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-sm active:scale-95 transition-transform flex flex-col items-center leading-tight"
                  >
                    <span style={{ fontFamily: "'Sarabun', sans-serif" }}>{chip}</span>
                    {trans && (
                      <span className="text-[10px] font-mono font-normal text-blue-200 mt-0.5">
                        [{trans}]
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Source chip pool with transliteration */}
          <div className="flex flex-wrap gap-2">
            {availableChips.map((chip, idx) => {
              const trans = getChipTranscription(chip);
              return (
                <button
                  key={`${chip}-${idx}`}
                  disabled={isAnswerChecked}
                  onClick={() => {
                    if (isAnswerChecked) return;
                    setOrderedChips((prev) => [...prev, chip]);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm font-semibold shadow-sm active:scale-95 transition-transform hover:border-blue-400 flex flex-col items-center leading-tight"
                >
                  <span style={{ fontFamily: "'Sarabun', sans-serif" }}>{chip}</span>
                  {trans && (
                    <span className="text-[10px] font-mono text-indigo-600 font-normal mt-0.5">
                      [{trans}]
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Correct complete phrase with full transliteration revealed after checking */}
          {isAnswerChecked && currentQ.correctOrder && (
            <div className="mt-3 p-3 bg-indigo-50 rounded-2xl border border-indigo-200 text-center animate-in fade-in duration-200">
              <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider block mb-0.5">
                {t('correctPhrase')}
              </span>
              <p
                className="text-lg font-bold text-slate-900 leading-snug"
                style={{ fontFamily: "'Sarabun', sans-serif" }}
              >
                {currentQ.correctOrder.join(' ')}
              </p>
              <p className="text-xs font-mono italic text-indigo-700 font-semibold mt-0.5">
                [{currentQ.correctOrder.map((c) => getChipTranscription(c) || c).join(' ')}]
              </p>
            </div>
          )}
        </div>
      )}

      {/* Options for choose_translation, reverse_translation, fill_blank, culture_situation, audio_match */}
      {currentQ.type !== 'order_words' && currentQ.options && (
        <div className="flex flex-col gap-2 mb-4">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            let btnClass = 'bg-white border-slate-200 text-slate-800 hover:border-slate-300';

            if (isAnswerChecked) {
              if (idx === currentQ.correctIndex) {
                btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
              } else if (isSelected) {
                btnClass = 'bg-rose-50 border-rose-400 text-rose-800';
              }
            } else if (isSelected) {
              btnClass = 'bg-blue-50 border-blue-600 text-blue-900 font-semibold shadow-sm';
            }

            const hasThai = /[\u0E00-\u0E7F]/.test(opt);
            const thaiPart = hasThai ? opt.match(/[\u0E00-\u0E7F\s]+/)?.[0]?.trim() : null;

            return (
              <div
                key={idx}
                className={`w-full p-3.5 rounded-xl border text-left text-sm transition-all flex items-center justify-between gap-2 cursor-pointer ${btnClass} ${
                  isAnswerChecked ? 'cursor-default' : ''
                }`}
                onClick={() => {
                  if (!isAnswerChecked) setSelectedOption(idx);
                }}
              >
                <div className="flex-1 leading-snug">
                  {opt}
                </div>
                {hasThai && thaiPart && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayAudio(thaiPart);
                    }}
                    className="p-1.5 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 active:scale-90 transition-transform shrink-0"
                    title={language === 'en' ? 'Listen' : 'Прослушать'}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                )}
                {isAnswerChecked && idx === currentQ.correctIndex && (
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 ml-1" strokeWidth={2.5} />
                )}
                {isAnswerChecked && isSelected && idx !== currentQ.correctIndex && (
                  <X className="w-4 h-4 text-rose-500 shrink-0 ml-1" strokeWidth={2.5} />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Answer feedback & Explanation */}
      {isAnswerChecked && (
        <div className={`p-3.5 rounded-2xl mb-4 text-xs ${isCurrentCorrect ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-rose-50 border border-rose-200 text-rose-900'}`}>
          <p className="font-bold mb-1">
            {isCurrentCorrect ? t('correctFeedback') : t('incorrectFeedback')}
          </p>
          <p className="leading-relaxed text-slate-700">{currentQ.explanation}</p>
        </div>
      )}

      {/* Action buttons */}
      <div>
        {!isAnswerChecked ? (
          <button
            onClick={handleCheckAnswer}
            disabled={
              (currentQ.type === 'order_words' && orderedChips.length === 0) ||
              (currentQ.type !== 'order_words' && selectedOption === null)
            }
            className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md active:scale-95 transition-transform disabled:opacity-40 disabled:pointer-events-none"
          >
            {t('quizCheckAnswer')}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <span>{currentIndex + 1 < questions.length ? t('nextQuestion') : t('finishQuiz')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
