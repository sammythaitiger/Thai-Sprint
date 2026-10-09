import React from 'react';
import {
  KEDMANEE_KEYS,
  getKedmaneeKeyForThai,
  getFingerLabel,
  getFingerColor,
  KeyMapItem,
} from '../../utils/thaiKedmanee';
import { useAppStore } from '../../store/useAppStore';

interface VirtualKedmaneeKeyboardProps {
  expectedChar?: string;
  onKeyClick: (thaiChar: string, qwertyKey: string) => void;
  activeLessonKeys?: string[];
}

export const VirtualKedmaneeKeyboard: React.FC<VirtualKedmaneeKeyboardProps> = ({
  expectedChar,
  onKeyClick,
  activeLessonKeys,
}) => {
  const language = useAppStore((s) => s.language);

  // Split into rows
  const numberRow = KEDMANEE_KEYS.filter((k) => k.row === 'number');
  const topRow = KEDMANEE_KEYS.filter((k) => k.row === 'top');
  const homeRow = KEDMANEE_KEYS.filter((k) => k.row === 'home');
  const bottomRow = KEDMANEE_KEYS.filter((k) => k.row === 'bottom');

  const expectedKeyInfo = expectedChar ? getKedmaneeKeyForThai(expectedChar) : undefined;
  const activeKeysSet = activeLessonKeys ? new Set(activeLessonKeys) : null;

  const renderKey = (keyItem: KeyMapItem) => {
    const isTarget = expectedKeyInfo?.item.qwerty === keyItem.qwerty;
    const isShiftedTarget = isTarget && expectedKeyInfo?.isShift;
    const isLessonKey =
      activeKeysSet?.has(keyItem.thai) ||
      (keyItem.thaiShift && activeKeysSet?.has(keyItem.thaiShift));

    // Displayed char on tap
    const mainChar = isShiftedTarget && keyItem.thaiShift ? keyItem.thaiShift : keyItem.thai;

    let baseBg = 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50 active:bg-slate-100';
    if (isTarget) {
      baseBg =
        'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-400/50 scale-105 z-10 animate-pulse';
    } else if (isLessonKey) {
      baseBg = 'bg-blue-50/80 text-blue-900 border-blue-200 font-semibold';
    }

    return (
      <button
        key={keyItem.qwerty}
        type="button"
        onClick={() => onKeyClick(mainChar, keyItem.qwerty)}
        className={`relative flex flex-col items-center justify-center rounded-lg border text-center transition-all select-none touch-manipulation px-0.5 py-1 min-w-[24px] flex-1 h-10 ${baseBg}`}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        {/* Secondary shift char */}
        {keyItem.thaiShift && (
          <span
            className={`text-[9px] leading-none absolute top-0.5 right-1 ${
              isShiftedTarget ? 'font-bold text-amber-300' : 'text-slate-400'
            }`}
          >
            {keyItem.thaiShift}
          </span>
        )}

        {/* Primary Thai char */}
        <span
          className={`font-thai leading-tight text-sm ${
            isTarget ? 'font-extrabold text-white scale-110' : 'font-medium'
          }`}
        >
          {keyItem.thai}
        </span>

        {/* Latin QWERTY helper */}
        <span
          className={`text-[8px] leading-none font-mono tracking-tighter ${
            isTarget ? 'text-blue-100' : 'text-slate-400'
          }`}
        >
          {keyItem.qwerty.toUpperCase()}
        </span>
      </button>
    );
  };

  return (
    <div className="w-full bg-slate-100/90 rounded-2xl p-2 border border-slate-200/80 shadow-sm flex flex-col gap-1.5">
      {/* Active Finger Hint Banner */}
      {expectedKeyInfo && (
        <div className="flex items-center justify-between px-2 py-1 rounded-xl bg-white border border-slate-200/60 shadow-xs text-xs">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-base">👉</span>
            <span className="text-slate-500 font-medium">
              {language === 'ru' ? 'Палец:' : 'Finger:'}
            </span>
            <span
              className={`px-2 py-0.5 rounded-md font-semibold text-[11px] border ${getFingerColor(
                expectedKeyInfo.item.finger
              )}`}
            >
              {getFingerLabel(expectedKeyInfo.item.finger, language)}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0 font-mono text-xs">
            <span className="text-slate-400">
              {language === 'ru' ? 'Клавиша:' : 'Key:'}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
              {expectedKeyInfo.item.qwerty.toUpperCase()}
            </span>
            <span className="font-thai text-sm font-bold text-slate-800">
              ({expectedChar})
            </span>
          </div>
        </div>
      )}

      {/* Keyboard rows */}
      <div className="flex flex-col gap-1 w-full text-xs">
        {/* Row 1: Numbers */}
        <div className="flex gap-1 w-full">{numberRow.map(renderKey)}</div>

        {/* Row 2: Top */}
        <div className="flex gap-1 w-full">{topRow.map(renderKey)}</div>

        {/* Row 3: Home row */}
        <div className="flex gap-1 w-full pl-2 pr-1">{homeRow.map(renderKey)}</div>

        {/* Row 4: Bottom row */}
        <div className="flex gap-1 w-full pl-4 pr-3">{bottomRow.map(renderKey)}</div>

        {/* Row 5: Spacebar */}
        <div className="flex gap-1 w-full justify-center pt-0.5">
          <button
            type="button"
            onClick={() => onKeyClick(' ', 'space')}
            className="w-1/2 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 active:bg-slate-100 flex items-center justify-center text-[10px] text-slate-400 uppercase tracking-wider font-mono shadow-xs select-none touch-manipulation"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {language === 'ru' ? 'Пробел' : 'Space'}
          </button>
        </div>
      </div>
    </div>
  );
};
