import { useState, useEffect, useCallback, useMemo } from 'react';
import { Volume2, Sparkles, CheckCircle2, XCircle, RotateCcw, Trophy, Zap, Layers } from 'lucide-react';
import { convertNumberToThai, toThaiDigits } from '../../utils/thaiNumbers';
import { speakThai, getSpeakingId, subscribeToSpeaking } from '../../utils/tts';
import { useAppStore } from '../../store/useAppStore';

type TrainerSubMode = 'audio' | 'blocks' | 'digits';

// Pool of interesting numbers to train (including tricky edge cases: 11, 20, 21, 101, etc.)
const TRAINING_POOL = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 14, 15, 19, 20, 21, 22, 25, 29,
  30, 31, 35, 40, 42, 45, 50, 55, 60, 65,
  70, 75, 80, 85, 90, 99, 100, 101, 111,
  125, 150, 200, 215, 245, 320, 450, 500,
  750, 1000, 1250, 2024, 2567
];

export function NumberTrainer() {
  const language = useAppStore((s) => s.language);
  const [subMode, setSubMode] = useState<TrainerSubMode>('audio');
  const [currentNum, setCurrentNum] = useState<number>(21);
  const [options, setOptions] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasListened, setHasListened] = useState(false);

  // For Block Constructor mode
  const [constructedBlocks, setConstructedBlocks] = useState<string[]>([]);
  const [availableBlocks, setAvailableBlocks] = useState<string[]>([]);

  useEffect(() => {
    return subscribeToSpeaking(() => {
      setIsSpeaking(getSpeakingId() === 'trainer-num');
    });
  }, []);

  const currentResult = useMemo(() => {
    return convertNumberToThai(currentNum);
  }, [currentNum]);

  // Generates next question based on current subMode
  const nextQuestion = useCallback(() => {
    setSelectedOption(null);
    setIsCorrect(null);
    setConstructedBlocks([]);
    setHasListened(false);

    // Pick random target
    const randTarget = TRAINING_POOL[Math.floor(Math.random() * TRAINING_POOL.length)]!;
    setCurrentNum(randTarget);

    const targetRes = convertNumberToThai(randTarget);

    if (subMode === 'audio' || subMode === 'digits') {
      // Generate 3 plausible distractors
      const distractors = new Set<number>();
      distractors.add(randTarget);

      // Add common confusion distractors: reversed digits, +/- 10, +/- 1
      if (randTarget > 10 && randTarget < 100) {
        const rev = parseInt(randTarget.toString().split('').reverse().join(''), 10);
        if (!isNaN(rev) && rev !== randTarget) distractors.add(rev);
      }
      distractors.add(Math.max(1, randTarget + 10));
      distractors.add(Math.max(1, randTarget - 10));
      distractors.add(Math.max(1, randTarget + 1));
      distractors.add(Math.max(1, randTarget - 1));

      while (distractors.size < 4) {
        distractors.add(TRAINING_POOL[Math.floor(Math.random() * TRAINING_POOL.length)]!);
      }

      const opts = Array.from(distractors).slice(0, 4);
      // Shuffle options
      setOptions(opts.sort(() => Math.random() - 0.5));
    } else if (subMode === 'blocks') {
      // Block building mode: break target into required blocks
      const correctBlockStrings = targetRes.blocks.map((b) => b.thai);
      // Add 2-3 distractor blocks from other words
      const distractorPool = ['หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'สิบ', 'ร้อย', 'พัน', 'ยี่สิบ', 'เอ็ด'];
      const extra = distractorPool
        .filter((w) => !correctBlockStrings.includes(w))
        .slice(0, 3);

      const all = [...correctBlockStrings, ...extra].sort(() => Math.random() - 0.5);
      setAvailableBlocks(all);
    }
  }, [subMode]);

  // Init on mount or mode change
  useEffect(() => {
    nextQuestion();
  }, [nextQuestion]);

  const handleSelectOption = (chosen: number) => {
    if (selectedOption !== null) return; // already answered
    setSelectedOption(chosen);

    const correct = chosen === currentNum;
    setIsCorrect(correct);

    if (correct) {
      if ('vibrate' in navigator) navigator.vibrate([10, 30, 20]);
      setStreak((s) => {
        const next = s + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
    } else {
      if ('vibrate' in navigator) navigator.vibrate(80);
      setStreak(0);
    }
  };

  const handlePlayAudio = () => {
    setHasListened(true);
    speakThai(currentResult.thaiScript, 'trainer-num');
  };

  // Block Constructor handlers
  const handleAddBlock = (blockStr: string, index: number) => {
    if (isCorrect !== null) return;
    const nextConstructed = [...constructedBlocks, blockStr];
    setConstructedBlocks(nextConstructed);

    const nextAvailable = [...availableBlocks];
    nextAvailable.splice(index, 1);
    setAvailableBlocks(nextAvailable);

    // Check if matches
    const targetScript = currentResult.thaiScript;
    const currentScript = nextConstructed.join('');

    if (currentScript === targetScript) {
      setIsCorrect(true);
      if ('vibrate' in navigator) navigator.vibrate([10, 40, 20]);
      setStreak((s) => {
        const next = s + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
    } else if (currentScript.length >= targetScript.length) {
      setIsCorrect(false);
      setStreak(0);
    }
  };

  const handleResetBlocks = () => {
    setIsCorrect(null);
    setConstructedBlocks([]);
    const correctBlockStrings = currentResult.blocks.map((b) => b.thai);
    const distractorPool = ['หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'สิบ', 'ร้อย', 'พัน', 'ยี่สิบ', 'เอ็ด'];
    const extra = distractorPool
      .filter((w) => !correctBlockStrings.includes(w))
      .slice(0, 3);
    setAvailableBlocks([...correctBlockStrings, ...extra].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="flex flex-col gap-4 pb-6">
      {/* Mode Switcher Tabs */}
      <div className="bg-slate-200/80 p-1 rounded-2xl flex items-center gap-1 shadow-inner">
        <button
          onClick={() => setSubMode('audio')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 select-none touch-manipulation ${
            subMode === 'audio'
              ? 'bg-white text-blue-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'By Ear' : 'На слух'}</span>
        </button>

        <button
          onClick={() => setSubMode('blocks')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 select-none touch-manipulation ${
            subMode === 'blocks'
              ? 'bg-white text-blue-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Assemble' : 'Собери'}</span>
        </button>

        <button
          onClick={() => setSubMode('digits')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 select-none touch-manipulation ${
            subMode === 'digits'
              ? 'bg-white text-blue-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span className="font-thai font-black text-sm leading-none">๐-๙</span>
          <span>{language === 'en' ? 'Digits' : 'Цифры'}</span>
        </button>
      </div>

      {/* Streak and Score bar */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-800 px-2.5 py-1 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>{language === 'en' ? `Streak: ${streak}` : `Серия: ${streak}`}</span>
          </div>
          {bestStreak > 0 && (
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-semibold">
              <Trophy className="w-3 h-3 text-amber-500" />
              <span>{language === 'en' ? `Best: ${bestStreak}` : `Рекорд: ${bestStreak}`}</span>
            </div>
          )}
        </div>

        <button
          onClick={nextQuestion}
          className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 active:scale-95 transition-all select-none touch-manipulation"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{language === 'en' ? 'Skip' : 'Пропустить'}</span>
        </button>
      </div>

      {/* QUESTION CARD */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white p-6 shadow-xl relative overflow-hidden flex flex-col items-center justify-center min-h-[190px]">
        {subMode === 'audio' && (
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
              {language === 'en' ? 'Listen to the Thai number and choose the match' : 'Послушайте тайское число и выберите ответ'}
            </span>
            <button
              onClick={handlePlayAudio}
              className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-200 select-none touch-manipulation shadow-2xl ${
                isSpeaking
                  ? 'bg-amber-400 text-slate-900 scale-95 ring-4 ring-amber-300/40 shadow-amber-400/50 animate-pulse'
                  : !hasListened
                  ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 ring-4 ring-amber-300/40 shadow-amber-500/30 hover:scale-105 active:scale-95'
                  : 'bg-white/20 hover:bg-white/30 text-white active:scale-90 border border-white/20'
              }`}
              aria-label={language === 'en' ? 'Listen to number' : 'Прослушать число'}
            >
              <Volume2 className="w-9 h-9" />
            </button>
            <span className={`text-xs font-bold transition-colors ${
              !hasListened ? 'text-amber-300 animate-pulse' : 'text-blue-200/80'
            }`}>
              {!hasListened
                ? (language === 'en' ? '▶ Tap to listen' : '▶ Нажмите, чтобы прослушать')
                : (language === 'en' ? 'Tap to replay' : 'Нажмите для повтора')}
            </span>
          </div>
        )}

        {subMode === 'blocks' && (
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                {language === 'en' ? 'Assemble the number from blocks' : 'Соберите числительное из блоков'}
              </span>
              <button
                onClick={handlePlayAudio}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Audio' : 'Звук'}</span>
              </button>
            </div>

            <div className="text-5xl font-black text-white tracking-tight">
              {currentNum.toLocaleString(language === 'en' ? 'en-US' : 'ru-RU')}
            </div>

            {/* Target Constructed Strip */}
            <div className="w-full min-h-[46px] rounded-2xl bg-black/30 border border-white/15 p-2 flex flex-wrap gap-1.5 items-center justify-center">
              {constructedBlocks.length === 0 ? (
                <span className="text-xs text-slate-400 font-mono italic">
                  {language === 'en' ? 'Tap blocks below...' : 'Нажимайте на плашки внизу...'}
                </span>
              ) : (
                constructedBlocks.map((b, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl bg-amber-400 text-slate-900 font-bold text-sm font-thai shadow-sm"
                  >
                    {b}
                  </span>
                ))
              )}
            </div>
          </div>
        )}

        {subMode === 'digits' && (
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
              {language === 'en'
                ? 'Which number matches these Thai digits?'
                : 'Какому числу соответствуют тайские цифры?'}
            </span>
            <div className="text-6xl font-black text-amber-300 font-thai tracking-tight drop-shadow-lg my-1">
              {toThaiDigits(currentNum)}
            </div>
            <button
              onClick={handlePlayAudio}
              className="text-xs text-blue-200/90 flex items-center gap-1 hover:text-white"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Listen to pronunciation' : 'Послушать произношение'}</span>
            </button>
          </div>
        )}
      </div>

      {/* ANSWER SECTION: OPTIONS GRID (for Audio & Digits) */}
      {(subMode === 'audio' || subMode === 'digits') && (
        <div className="grid grid-cols-2 gap-3">
          {options.map((opt) => {
            const isSelected = selectedOption === opt;
            const isCurrentCorrect = opt === currentNum;

            let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-blue-300 hover:bg-slate-50';

            if (selectedOption !== null) {
              if (isCurrentCorrect) {
                btnStyle = 'bg-emerald-500 border-emerald-500 text-white font-bold shadow-lg shadow-emerald-200 ring-2 ring-emerald-300';
              } else if (isSelected) {
                btnStyle = 'bg-rose-500 border-rose-500 text-white font-bold shadow-lg shadow-rose-200';
              } else {
                btnStyle = 'bg-slate-100 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={opt}
                disabled={selectedOption !== null}
                onClick={() => handleSelectOption(opt)}
                className={`min-h-[64px] rounded-2xl border-2 p-3 font-extrabold text-2xl transition-all duration-200 flex items-center justify-center gap-2 select-none touch-manipulation active:scale-95 ${btnStyle}`}
              >
                <span>{opt.toLocaleString(language === 'en' ? 'en-US' : 'ru-RU')}</span>
                {selectedOption !== null && isCurrentCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                )}
                {selectedOption !== null && isSelected && !isCurrentCorrect && (
                  <XCircle className="w-5 h-5 text-white" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* ANSWER SECTION: AVAILABLE BLOCKS (for Block Constructor) */}
      {subMode === 'blocks' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {language === 'en' ? 'Available Blocks:' : 'Доступные кирпичики:'}
            </span>
            <button
              onClick={handleResetBlocks}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{language === 'en' ? 'Clear' : 'Очистить'}</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 justify-center py-2">
            {availableBlocks.map((block, idx) => (
              <button
                key={idx}
                onClick={() => handleAddBlock(block, idx)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-blue-100 hover:text-blue-700 active:scale-95 font-bold font-thai text-base text-slate-800 border border-slate-300/80 transition-all select-none touch-manipulation shadow-sm"
              >
                {block}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* FEEDBACK EXPLANATION CARD ON ANSWER */}
      {isCorrect !== null && (
        <div
          className={`rounded-2xl p-4 border transition-all animate-fadeIn ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600" />
              )}
              <span className="text-sm font-bold">
                {isCorrect
                  ? (language === 'en' ? 'Correct! Excellent!' : 'Верно! Отлично!')
                  : (language === 'en' ? 'Incorrect! Correct answer:' : 'Ошибка! Правильный ответ:')}
              </span>
            </div>

            <button
              onClick={nextQuestion}
              className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md select-none touch-manipulation"
            >
              {language === 'en' ? 'Next →' : 'Дальше →'}
            </button>
          </div>

          <div className="bg-white/80 rounded-xl p-3 border border-slate-200/80 text-xs space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="font-extrabold text-base text-slate-900">
                {currentNum.toLocaleString(language === 'en' ? 'en-US' : 'ru-RU')}
              </span>
              <span className="text-sm font-bold text-amber-700 font-thai">
                {currentResult.thaiScript}
              </span>
              <span className="text-slate-500 font-mono">
                [{currentResult.transcription}]
              </span>
            </div>

            {currentResult.notes.length > 0 && (
              <div className="pt-1 text-[11px] text-amber-800 font-medium border-t border-slate-100 mt-1">
                💡 {currentResult.notes.join(' • ')}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
