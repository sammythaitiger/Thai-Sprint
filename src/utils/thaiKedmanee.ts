import { Finger } from '../types/reading';

export const PREPOSITIONAL_VOWELS = new Set(['เ', 'แ', 'โ', 'ใ', 'ไ']);
export const UPPER_VOWELS = new Set(['ิ', 'ี', 'ึ', 'ื', 'ั', '็']);
export const LOWER_VOWELS = new Set(['ุ', 'ู', 'ฺ']);
export const TONE_MARKS = new Set(['่', '้', '๊', '๋']);

export interface KeyMapItem {
  thai: string;
  thaiShift?: string;
  qwerty: string;
  finger: Finger;
  hand: 'left' | 'right';
  row: 'number' | 'top' | 'home' | 'bottom';
}

// Kedmanee standard physical keyboard layout
export const KEDMANEE_KEYS: KeyMapItem[] = [
  // Number row
  { qwerty: '1', thai: '_', thaiShift: '+', finger: 'left-pinky', hand: 'left', row: 'number' },
  { qwerty: '2', thai: '/', thaiShift: '๑', finger: 'left-ring', hand: 'left', row: 'number' },
  { qwerty: '3', thai: '-', thaiShift: '๒', finger: 'left-middle', hand: 'left', row: 'number' },
  { qwerty: '4', thai: 'ภ', thaiShift: '๓', finger: 'left-index', hand: 'left', row: 'number' },
  { qwerty: '5', thai: 'ถ', thaiShift: '๔', finger: 'left-index', hand: 'left', row: 'number' },
  { qwerty: '6', thai: 'ุ', thaiShift: 'ู', finger: 'right-index', hand: 'right', row: 'number' },
  { qwerty: '7', thai: 'ึ', thaiShift: '฿', finger: 'right-index', hand: 'right', row: 'number' },
  { qwerty: '8', thai: 'ค', thaiShift: '๕', finger: 'right-middle', hand: 'right', row: 'number' },
  { qwerty: '9', thai: 'ต', thaiShift: '๖', finger: 'right-ring', hand: 'right', row: 'number' },
  { qwerty: '0', thai: 'จ', thaiShift: '๗', finger: 'right-pinky', hand: 'right', row: 'number' },
  { qwerty: '-', thai: 'ข', thaiShift: '๘', finger: 'right-pinky', hand: 'right', row: 'number' },
  { qwerty: '=', thai: 'ช', thaiShift: '๙', finger: 'right-pinky', hand: 'right', row: 'number' },

  // Top row
  { qwerty: 'q', thai: 'ๆ', thaiShift: '๐', finger: 'left-pinky', hand: 'left', row: 'top' },
  { qwerty: 'w', thai: 'ไ', thaiShift: '"', finger: 'left-ring', hand: 'left', row: 'top' },
  { qwerty: 'e', thai: 'ำ', thaiShift: 'ฎ', finger: 'left-middle', hand: 'left', row: 'top' },
  { qwerty: 'r', thai: 'พ', thaiShift: 'ฑ', finger: 'left-index', hand: 'left', row: 'top' },
  { qwerty: 't', thai: 'ะ', thaiShift: 'ธ', finger: 'left-index', hand: 'left', row: 'top' },
  { qwerty: 'y', thai: 'ั', thaiShift: 'ํ', finger: 'right-index', hand: 'right', row: 'top' },
  { qwerty: 'u', thai: 'ี', thaiShift: '๊', finger: 'right-index', hand: 'right', row: 'top' },
  { qwerty: 'i', thai: 'ร', thaiShift: 'ณ', finger: 'right-middle', hand: 'right', row: 'top' },
  { qwerty: 'o', thai: 'น', thaiShift: 'ฯ', finger: 'right-ring', hand: 'right', row: 'top' },
  { qwerty: 'p', thai: 'ย', thaiShift: 'ญ', finger: 'right-pinky', hand: 'right', row: 'top' },
  { qwerty: '[', thai: 'บ', thaiShift: 'ฐ', finger: 'right-pinky', hand: 'right', row: 'top' },
  { qwerty: ']', thai: 'ล', thaiShift: ',', finger: 'right-pinky', hand: 'right', row: 'top' },

  // Home row (Домашний ряд)
  { qwerty: 'a', thai: 'ฟ', thaiShift: 'ฤ', finger: 'left-pinky', hand: 'left', row: 'home' },
  { qwerty: 's', thai: 'ห', thaiShift: 'ฆ', finger: 'left-ring', hand: 'left', row: 'home' },
  { qwerty: 'd', thai: 'ก', thaiShift: 'ฏ', finger: 'left-middle', hand: 'left', row: 'home' },
  { qwerty: 'f', thai: 'ด', thaiShift: 'โ', finger: 'left-index', hand: 'left', row: 'home' },
  { qwerty: 'g', thai: 'เ', thaiShift: 'ฌ', finger: 'left-index', hand: 'left', row: 'home' },
  { qwerty: 'h', thai: '่', thaiShift: '็', finger: 'right-index', hand: 'right', row: 'home' },
  { qwerty: 'j', thai: '้', thaiShift: '๋', finger: 'right-index', hand: 'right', row: 'home' },
  { qwerty: 'k', thai: 'า', thaiShift: 'ษ', finger: 'right-middle', hand: 'right', row: 'home' },
  { qwerty: 'l', thai: 'ส', thaiShift: 'ศ', finger: 'right-ring', hand: 'right', row: 'home' },
  { qwerty: ';', thai: 'ว', thaiShift: 'ซ', finger: 'right-pinky', hand: 'right', row: 'home' },
  { qwerty: "'", thai: 'ง', thaiShift: '.', finger: 'right-pinky', hand: 'right', row: 'home' },

  // Bottom row
  { qwerty: 'z', thai: 'ผ', thaiShift: '(', finger: 'left-pinky', hand: 'left', row: 'bottom' },
  { qwerty: 'x', thai: 'ป', thaiShift: ')', finger: 'left-ring', hand: 'left', row: 'bottom' },
  { qwerty: 'c', thai: 'แ', thaiShift: 'ฉ', finger: 'left-middle', hand: 'left', row: 'bottom' },
  { qwerty: 'v', thai: 'อ', thaiShift: 'ฮ', finger: 'left-index', hand: 'left', row: 'bottom' },
  { qwerty: 'b', thai: 'ิ', thaiShift: 'ฺ', finger: 'left-index', hand: 'left', row: 'bottom' },
  { qwerty: 'n', thai: 'ื', thaiShift: '์', finger: 'right-index', hand: 'right', row: 'bottom' },
  { qwerty: 'm', thai: 'ท', thaiShift: '?', finger: 'right-index', hand: 'right', row: 'bottom' },
  { qwerty: ',', thai: 'ม', thaiShift: 'ฒ', finger: 'right-middle', hand: 'right', row: 'bottom' },
  { qwerty: '.', thai: 'ใ', thaiShift: 'ฬ', finger: 'right-ring', hand: 'right', row: 'bottom' },
  { qwerty: '/', thai: 'ฝ', thaiShift: 'ฦ', finger: 'right-pinky', hand: 'right', row: 'bottom' },
];

// Map lookup: Thai character -> KeyMapItem
const THAI_TO_KEY = new Map<string, { item: KeyMapItem; isShift: boolean }>();
// Map lookup: QWERTY key (e.g. 'd', 'Shift+u') -> Thai character
const QWERTY_TO_THAI = new Map<string, string>();

KEDMANEE_KEYS.forEach((item) => {
  THAI_TO_KEY.set(item.thai, { item, isShift: false });
  QWERTY_TO_THAI.set(item.qwerty.toLowerCase(), item.thai);

  if (item.thaiShift) {
    THAI_TO_KEY.set(item.thaiShift, { item, isShift: true });
    QWERTY_TO_THAI.set(item.qwerty.toUpperCase(), item.thaiShift);
  }
});

export function getKedmaneeKeyForThai(thaiChar: string): { item: KeyMapItem; isShift: boolean } | undefined {
  return THAI_TO_KEY.get(thaiChar);
}

export function convertQwertyToThai(qwertyKey: string, shift: boolean = false): string | undefined {
  const key = shift ? qwertyKey.toUpperCase() : qwertyKey.toLowerCase();
  return QWERTY_TO_THAI.get(key);
}

export interface ValidationResult {
  valid: boolean;
  actualThaiChar: string;
  hintRu?: string;
  hintEn?: string;
  errorType?: 'wrong_key' | 'prepositional_vowel' | 'stacking_order';
}

export function getFingerLabel(finger: Finger, lang: 'ru' | 'en'): string {
  const labels: Record<Finger, { ru: string; en: string }> = {
    'left-pinky': { ru: 'Левый мизинец', en: 'Left Pinky' },
    'left-ring': { ru: 'Левый безымянный', en: 'Left Ring' },
    'left-middle': { ru: 'Левый средний', en: 'Left Middle' },
    'left-index': { ru: 'Левый указательный', en: 'Left Index' },
    'right-index': { ru: 'Правый указательный', en: 'Right Index' },
    'right-middle': { ru: 'Правый средний', en: 'Right Middle' },
    'right-ring': { ru: 'Правый безымянный', en: 'Right Ring' },
    'right-pinky': { ru: 'Правый мизинец', en: 'Right Pinky' },
  };
  return labels[finger][lang];
}

export function getFingerColor(finger: Finger): string {
  switch (finger) {
    case 'left-pinky':
    case 'right-pinky':
      return 'bg-pink-100 border-pink-300 text-pink-700';
    case 'left-ring':
    case 'right-ring':
      return 'bg-amber-100 border-amber-300 text-amber-700';
    case 'left-middle':
    case 'right-middle':
      return 'bg-emerald-100 border-emerald-300 text-emerald-700';
    case 'left-index':
    case 'right-index':
      return 'bg-blue-100 border-blue-300 text-blue-700';
    default:
      return 'bg-slate-100 border-slate-300 text-slate-700';
  }
}

/**
 * Validates a typed keystroke against expected character in target word context
 */
export function validateReadingInput(
  rawInput: string,
  expectedChar: string,
  targetWord: string,
  currentIndex: number
): ValidationResult {
  // If the user entered Latin QWERTY, convert to Thai Kedmanee
  let inputThai = rawInput;
  if (/^[a-zA-Z0-9\-=[\];',./`_+~{}|:"<>?]$/.test(rawInput)) {
    const isShift = rawInput !== rawInput.toLowerCase() && /[a-zA-Z]/.test(rawInput);
    const converted = convertQwertyToThai(rawInput, isShift);
    if (converted) {
      inputThai = converted;
    }
  }

  // 1. Success!
  if (inputThai === expectedChar) {
    return { valid: true, actualThaiChar: inputThai };
  }

  // 2. Specialized Check: Prepositional vowel entered late
  // Target word begins with prepositional vowel (เ, แ, โ, ใ, ไ), but student tried to type consonant first
  if (currentIndex === 0 && PREPOSITIONAL_VOWELS.has(expectedChar)) {
    // If student typed the consonant that follows
    const nextChar = targetWord[1];
    if (inputThai === nextChar) {
      return {
        valid: false,
        actualThaiChar: inputThai,
        errorType: 'prepositional_vowel',
        hintRu: `Препозиционная гласная «${expectedChar}» пишется ПЕРВОЙ, даже если произносится после согласной!`,
        hintEn: `Prepositional vowel "${expectedChar}" must be typed FIRST, even though pronounced after!`,
      };
    }
  }

  // 3. Specialized Check: Tone mark typed before upper/lower vowel
  // If expected is an upper vowel (ิ, ี, etc.) but user typed tone mark (่, ้)
  if (UPPER_VOWELS.has(expectedChar) || LOWER_VOWELS.has(expectedChar)) {
    if (TONE_MARKS.has(inputThai)) {
      return {
        valid: false,
        actualThaiChar: inputThai,
        errorType: 'stacking_order',
        hintRu: `Сначала напечатай гласную-шапочку «${expectedChar}», а затем тоновый знак поверх неё!`,
        hintEn: `Type the vowel cap "${expectedChar}" first, then the tone mark on top of it!`,
      };
    }
  }

  // 4. Tone mark expected, but user typed following consonant
  if (TONE_MARKS.has(expectedChar)) {
    const afterChar = targetWord[currentIndex + 1];
    if (afterChar && inputThai === afterChar) {
      return {
        valid: false,
        actualThaiChar: inputThai,
        errorType: 'stacking_order',
        hintRu: `Сначала поставь тоновый знак «${expectedChar}», затем конечную согласную!`,
        hintEn: `Type the tone mark "${expectedChar}" before the final consonant!`,
      };
    }
  }

  // 5. Standard Wrong Key
  const expectedKeyInfo = getKedmaneeKeyForThai(expectedChar);
  const keyLabel = expectedKeyInfo ? `[${expectedKeyInfo.item.qwerty.toUpperCase()}]` : '';

  return {
    valid: false,
    actualThaiChar: inputThai,
    errorType: 'wrong_key',
    hintRu: `Нужна клавиша «${expectedChar}» ${keyLabel}.`,
    hintEn: `Required key is "${expectedChar}" ${keyLabel}.`,
  };
}
