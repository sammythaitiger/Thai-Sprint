/**
 * Thai Numbers Engine: Conversion, Decomposition, Transcription & Rules.
 * Supports integers from 0 to 9,999,999.
 */

export interface NumberBlock {
  digit: number;
  placeValue: number;
  thai: string;
  trans: string;
  description: string;
}

export interface ThaiNumberResult {
  num: number;
  thaiDigits: string;
  thaiScript: string;
  transcription: string;
  blocks: NumberBlock[];
  notes: string[];
}

export interface ThaiDigitInfo {
  arabic: number;
  thaiDigit: string;
  thaiScript: string;
  transcription: string;
  tone: string;
  toneEn: string;
  mnemonic: string;
  mnemonicEn: string;
}

export const THAI_DIGITS_LIST: ThaiDigitInfo[] = [
  {
    arabic: 0,
    thaiDigit: '๐',
    thaiScript: 'ศูนย์',
    transcription: 'sǔun',
    tone: 'Восходящий (Rising)',
    toneEn: 'Rising Tone',
    mnemonic: 'Похожа на маленький круглый ноль или тайскую монетку.',
    mnemonicEn: 'Looks just like a small circular zero or a round Thai coin.',
  },
  {
    arabic: 1,
    thaiDigit: '๑',
    thaiScript: 'หนึ่ง',
    transcription: 'nùeng',
    tone: 'Низкий (Low)',
    toneEn: 'Low Tone',
    mnemonic: 'Спиралька, закручивающаяся из центра вверх — как один росток.',
    mnemonicEn: 'A spiral unfurling upward from the center — like a single green sprout.',
  },
  {
    arabic: 2,
    thaiDigit: '๒',
    thaiScript: 'สอง',
    transcription: 'sǒong',
    tone: 'Восходящий (Rising)',
    toneEn: 'Rising Tone',
    mnemonic: 'Похожа на лебедя с двумя волнами или двойку с длинным хвостиком.',
    mnemonicEn: 'Looks like a swan with two ripples or a numeral 2 with an extended tail.',
  },
  {
    arabic: 3,
    thaiDigit: '๓',
    thaiScript: 'สาม',
    transcription: 'sǎam',
    tone: 'Восходящий (Rising)',
    toneEn: 'Rising Tone',
    mnemonic: 'Два верхних горбика, как у тройки «3», но с хвостиком внизу.',
    mnemonicEn: 'Two rounded humps on top, very similar to digit 3, with a little baseline tail.',
  },
  {
    arabic: 4,
    thaiDigit: '๔',
    thaiScript: 'สี่',
    transcription: 'sìi',
    tone: 'Низкий (Low)',
    toneEn: 'Low Tone',
    mnemonic: 'Петелька слева и открытый плавный хвостик направо вверх (без завитка!).',
    mnemonicEn: 'A loop on the left and a smooth upward-sweeping curve (no extra loop on top!).',
  },
  {
    arabic: 5,
    thaiDigit: '๕',
    thaiScript: 'ห้า',
    transcription: 'hâa',
    tone: 'Падающий (Falling)',
    toneEn: 'Falling Tone',
    mnemonic: 'Как цифра 4, но СВЕРХУ петля-завитушка! Запомните: у 5 есть корона/петелька.',
    mnemonicEn: 'Identical to digit 4, but with a crown loop on top! Remember: 5 wears a crown.',
  },
  {
    arabic: 6,
    thaiDigit: '๖',
    thaiScript: 'หก',
    transcription: 'hòk',
    tone: 'Низкий (Low)',
    toneEn: 'Low Tone',
    mnemonic: 'Петелька внизу и вертикальный росчерк вверх, похожа на перевёрнутую девятку.',
    mnemonicEn: 'A loop at the bottom with a tall stroke pointing up, like an inverted 9.',
  },
  {
    arabic: 7,
    thaiDigit: '๗',
    thaiScript: 'เจ็ด',
    transcription: 'jèt',
    tone: 'Низкий (Low)',
    toneEn: 'Low Tone',
    mnemonic: 'Зубчатая волна с хвостиком, напоминает тайскую семерку.',
    mnemonicEn: 'A zigzag wave with a flourish tail, representing number 7.',
  },
  {
    arabic: 8,
    thaiDigit: '๘',
    thaiScript: 'แปด',
    transcription: 'bpàaet',
    tone: 'Низкий (Low)',
    toneEn: 'Low Tone',
    mnemonic: 'Двойная дуга сверху («знак бесконечности» или подкова).',
    mnemonicEn: 'A double arc curving across the top (horseshoe / infinity symbol).',
  },
  {
    arabic: 9,
    thaiDigit: '๙',
    thaiScript: 'เก้า',
    transcription: 'gâao',
    tone: 'Падающий (Falling)',
    toneEn: 'Falling Tone',
    mnemonic: 'Тайская «девятка» — священное число (звучит как «шаг вперед» ก้าว). Длинный гордый шпиль вверх.',
    mnemonicEn: 'Sacred number 9 (sounds like "stepping forward" ก้าว). A proud tall spire pointing upward.',
  },
];

const THAI_DIGIT_CHARS = ['๐', '๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙'];

const DIGIT_WORDS: Record<number, { thai: string; trans: string }> = {
  0: { thai: 'ศูนย์', trans: 'sǔun' },
  1: { thai: 'หนึ่ง', trans: 'nùeng' },
  2: { thai: 'สอง', trans: 'sǒong' },
  3: { thai: 'สาม', trans: 'sǎam' },
  4: { thai: 'สี่', trans: 'sìi' },
  5: { thai: 'ห้า', trans: 'hâa' },
  6: { thai: 'หก', trans: 'hòk' },
  7: { thai: 'เจ็ด', trans: 'jèt' },
  8: { thai: 'แปด', trans: 'bpàaet' },
  9: { thai: 'เก้า', trans: 'gâao' },
};

export const THAI_PLACES = [
  { value: 1000000, thai: 'ล้าน', trans: 'láan', name: 'миллион', nameEn: 'million' },
  { value: 100000, thai: 'แสน', trans: 'sǎaen', name: 'сто тысяч (сэн)', nameEn: 'hundred thousand (saen)' },
  { value: 10000, thai: 'หมื่น', trans: 'mùen', name: 'десять тысяч (муэн)', nameEn: 'ten thousand (muen)' },
  { value: 1000, thai: 'พัน', trans: 'phan', name: 'тысяча', nameEn: 'thousand' },
  { value: 100, thai: 'ร้อย', trans: 'róoi', name: 'сто', nameEn: 'hundred' },
  { value: 10, thai: 'สิบ', trans: 'sìp', name: 'десять', nameEn: 'ten' },
];

/**
 * Converts Arabic number string to Thai digits (e.g. 1250 -> ๑,๒๕๐)
 */
export function toThaiDigits(num: number): string {
  const str = num.toLocaleString('en-US');
  return str.replace(/\d/g, (d) => THAI_DIGIT_CHARS[parseInt(d, 10)] ?? d);
}

/**
 * Decomposes any integer from 0 to 9,999,999 into full Thai representations with rules
 */
export function convertNumberToThai(n: number): ThaiNumberResult {
  const num = Math.floor(Math.max(0, Math.min(n, 9999999)));

  if (num === 0) {
    return {
      num: 0,
      thaiDigits: '๐',
      thaiScript: 'ศูนย์',
      transcription: 'sǔun',
      blocks: [
        {
          digit: 0,
          placeValue: 1,
          thai: 'ศูนย์',
          trans: 'sǔun',
          description: 'Ноль (0)',
        },
      ],
      notes: [],
    };
  }

  const notes: string[] = [];
  const blocks: NumberBlock[] = [];

  // Group by millions if needed
  const millions = Math.floor(num / 1000000);
  const remainderAfterMillion = num % 1000000;

  let thaiParts: string[] = [];
  let transParts: string[] = [];

  // Process millions
  if (millions > 0) {
    const milSub = convertUnderMillion(millions, true);
    milSub.blocks.forEach((b) => blocks.push(b));
    blocks.push({
      digit: millions,
      placeValue: 1000000,
      thai: 'ล้าน',
      trans: 'láan',
      description: `${millions} млн (ล้าน)`,
    });
    thaiParts.push(`${milSub.thaiScript}ล้าน`);
    transParts.push(`${milSub.transcription}-láan`);
    notes.push(`Разряд «ล้าน» [láan]: в тайском 1 миллион выражается словом ล้าน.`);
  }

  // Process remainder under 1,000,000
  if (remainderAfterMillion > 0 || millions === 0) {
    const sub = convertUnderMillion(remainderAfterMillion, millions > 0);
    sub.blocks.forEach((b) => blocks.push(b));
    if (sub.thaiScript) {
      thaiParts.push(sub.thaiScript);
      transParts.push(sub.transcription);
    }
    sub.notes.forEach((note) => {
      if (!notes.includes(note)) notes.push(note);
    });
  }

  return {
    num,
    thaiDigits: toThaiDigits(num),
    thaiScript: thaiParts.join(''),
    transcription: transParts.join(' '),
    blocks,
    notes,
  };
}

/**
 * Helper to convert numbers 1 to 999,999
 */
function convertUnderMillion(
  val: number,
  isFollowedByOther: boolean
): {
  thaiScript: string;
  transcription: string;
  blocks: NumberBlock[];
  notes: string[];
} {
  if (val === 0) {
    return { thaiScript: '', transcription: '', blocks: [], notes: [] };
  }

  const blocks: NumberBlock[] = [];
  const notes: string[] = [];
  const thaiScriptList: string[] = [];
  const transList: string[] = [];

  let current = val;

  // Check each place: 100000, 10000, 1000, 100, 10
  for (const place of THAI_PLACES) {
    if (place.value === 1000000) continue;

    const count = Math.floor(current / place.value);
    current %= place.value;

    if (count > 0) {
      if (place.value === 10) {
        // Tens place has special rules
        if (count === 1) {
          // 10 is simply 'สิบ', NOT 'หนึ่งสิบ'
          thaiScriptList.push('สิบ');
          transList.push('sìp');
          blocks.push({
            digit: 1,
            placeValue: 10,
            thai: 'สิบ',
            trans: 'sìp',
            description: 'Десять (10)',
          });
        } else if (count === 2) {
          // 20 is 'ยี่สิบ', NOT 'สองสิบ'
          thaiScriptList.push('ยี่สิบ');
          transList.push('yîi-sìp');
          blocks.push({
            digit: 2,
            placeValue: 10,
            thai: 'ยี่สิบ',
            trans: 'yîi-sìp',
            description: 'Двадцать (20) — особое слово ยี่!',
          });
          notes.push('Особое правило 20: тайцы говорят «ยี่สิบ» [yîi-sìp], а не «สองสิบ».');
        } else {
          const digitObj = DIGIT_WORDS[count]!;
          thaiScriptList.push(`${digitObj.thai}สิบ`);
          transList.push(`${digitObj.trans}-sìp`);
          blocks.push({
            digit: count,
            placeValue: 10,
            thai: `${digitObj.thai}สิบ`,
            trans: `${digitObj.trans}-sìp`,
            description: `${count * 10} (${count} десятков)`,
          });
        }
      } else {
        // Higher places: 100, 1000, 10000, 100000
        const digitObj = DIGIT_WORDS[count]!;
        thaiScriptList.push(`${digitObj.thai}${place.thai}`);
        transList.push(`${digitObj.trans}-${place.trans}`);
        blocks.push({
          digit: count,
          placeValue: place.value,
          thai: `${digitObj.thai}${place.thai}`,
          trans: `${digitObj.trans}-${place.trans}`,
          description: `${(count * place.value).toLocaleString('en-US')} (${digitObj.thai} + ${place.thai})`,
        });

        if (place.value === 10000 && !notes.some((n) => n.includes('หมื่น'))) {
          notes.push('Разряд 10,000 («หมื่น» [mùen]): в тайском для десятка тысяч есть отдельное слово.');
        }
        if (place.value === 100000 && !notes.some((n) => n.includes('แสน'))) {
          notes.push('Разряд 100,000 («แสน» [sǎaen]): отдельное тайское слово для ста тысяч.');
        }
      }
    }
  }

  // Units place (0-9)
  const units = current;
  if (units > 0) {
    // Special rule for 1: if there is higher place (like 11, 21, 101, 1001), 1 is 'เอ็ด' [èt], NOT 'หนึ่ง'
    const hasHigherPlaces = val >= 10 || isFollowedByOther;
    if (units === 1 && hasHigherPlaces) {
      thaiScriptList.push('เอ็ด');
      transList.push('èt');
      blocks.push({
        digit: 1,
        placeValue: 1,
        thai: 'เอ็ด',
        trans: 'èt',
        description: 'Один на конце составного числа (เอ็ด)',
      });
      notes.push('Особое правило «เอ็ด» [èt]: в конце составных чисел (11, 21, 31, 101...) единица звучит как «เอ็ด», а не «หนึ่ง».');
    } else {
      const digitObj = DIGIT_WORDS[units]!;
      thaiScriptList.push(digitObj.thai);
      transList.push(digitObj.trans);
      blocks.push({
        digit: units,
        placeValue: 1,
        thai: digitObj.thai,
        trans: digitObj.trans,
        description: `Единицы: ${units}`,
      });
    }
  }

  return {
    thaiScript: thaiScriptList.join(''),
    transcription: transList.join(' '),
    blocks,
    notes,
  };
}

/**
 * Presets designed for teachers in Thai schools & daily life
 */
export interface NumberPreset {
  num: number;
  label: string;
  labelEn: string;
  category: 'classroom' | 'time' | 'price' | 'daily';
}

export const NUMBER_PRESETS: NumberPreset[] = [
  // Класс и страницы
  { num: 3, label: '3 (счёт на тишину)', labelEn: '3 (countdown for quiet)', category: 'classroom' },
  { num: 15, label: 'Стр. 15 (учебник)', labelEn: 'Page 15 (textbook)', category: 'classroom' },
  { num: 24, label: 'Стр. 24', labelEn: 'Page 24', category: 'classroom' },
  { num: 42, label: 'Стр. 42', labelEn: 'Page 42', category: 'classroom' },
  { num: 4, label: '4 человека в группе', labelEn: '4 students per group', category: 'classroom' },
  { num: 10, label: '10 баллов (คะแนน)', labelEn: '10 points (scores)', category: 'classroom' },
  { num: 100, label: '100% за тест', labelEn: '100% test score', category: 'classroom' },

  // Время и минуты
  { num: 5, label: '5 минут (осталось)', labelEn: '5 minutes (remaining)', category: 'time' },
  { num: 10, label: '10 минут до звонка', labelEn: '10 mins until bell', category: 'time' },
  { num: 15, label: '15 минут перемена', labelEn: '15 mins recess', category: 'time' },
  { num: 30, label: '30 минут (полчаса)', labelEn: '30 minutes (half hour)', category: 'time' },
  { num: 50, label: '50 минут (урок)', labelEn: '50 minutes (period)', category: 'time' },

  // Цены и 7-Eleven
  { num: 20, label: '20฿ (кофе / вода)', labelEn: '20฿ (coffee / water)', category: 'price' },
  { num: 21, label: '21฿ (правило èt!)', labelEn: '21฿ (rule èt!)', category: 'price' },
  { num: 35, label: '35฿ (жареный рис)', labelEn: '35฿ (fried rice)', category: 'price' },
  { num: 40, label: '40฿ (обед в столовой)', labelEn: '40฿ (canteen lunch)', category: 'price' },
  { num: 65, label: '65฿ (7-Eleven)', labelEn: '65฿ (7-Eleven)', category: 'price' },
  { num: 101, label: '101฿ (правило èt!)', labelEn: '101฿ (rule èt!)', category: 'price' },
  { num: 150, label: '150฿ (чек)', labelEn: '150฿ (bill)', category: 'price' },
  { num: 500, label: '500฿ (купюра)', labelEn: '500฿ (banknote)', category: 'price' },
  { num: 1000, label: '1,000฿ (купюра)', labelEn: '1,000฿ (banknote)', category: 'price' },

  // Быт и даты
  { num: 11, label: '11 (sìp-èt)', labelEn: '11 (sìp-èt)', category: 'daily' },
  { num: 2567, label: '2567 год (буддийский)', labelEn: 'Year 2567 (Buddhist)', category: 'daily' },
  { num: 2568, label: '2568 год (текущий)', labelEn: 'Year 2568 (current)', category: 'daily' },
  { num: 324, label: 'Кабинет 324', labelEn: 'Room 324', category: 'classroom' },
];

/**
 * Teacher school phrases with numbers
 */
export interface SchoolNumberPhrase {
  id: string;
  situation: string;
  situationEn: string;
  thai: string;
  trans: string;
  ru: string;
  en: string;
  category: 'discipline' | 'books' | 'groups' | 'time' | 'canteen';
}

export const SCHOOL_NUMBER_PHRASES: SchoolNumberPhrase[] = [
  {
    id: 'snp-1',
    situation: 'Обратный отсчёт на тишину',
    situationEn: 'Countdown for silence',
    thai: 'นับ หนึ่ง สอง สาม... เงียบครับ!',
    trans: 'náp nùeng sǒong sǎam... ngîap khráp!',
    ru: 'Считаю раз, два, три... Тишина в классе!',
    en: 'Counting one, two, three... Quiet please!',
    category: 'discipline',
  },
  {
    id: 'snp-2',
    situation: 'Открыть страницу учебника',
    situationEn: 'Open page in textbook',
    thai: 'เปิดหนังสือไปที่หน้าที่ 15 ครับ',
    trans: 'pòoet năng-sŭue pai thîi nâa thîi sìp-hâa khráp',
    ru: 'Откройте учебники на странице 15.',
    en: 'Open your books to page 15.',
    category: 'books',
  },
  {
    id: 'snp-3',
    situation: 'Упражнение с номерами',
    situationEn: 'Exercise numbers',
    thai: 'ทำแบบฝึกหัดข้อ 1 ถึงข้อ 5 ครับ',
    trans: 'tham bàep-fùek-hàt khâw nùeng thǔeng khâw hâa khráp',
    ru: 'Сделайте упражнения с 1-го по 5-й пункт.',
    en: 'Do exercises from question 1 to 5.',
    category: 'books',
  },
  {
    id: 'snp-4',
    situation: 'Разбивка по парам (2 человека)',
    situationEn: 'Form pairs (2 students)',
    thai: 'จับคู่กัน 2 คนครับ',
    trans: 'jàp-khûu gan sǒong khon khráp',
    ru: 'Разбейтесь на пары по двое.',
    en: 'Pair up with a partner (2 people).',
    category: 'groups',
  },
  {
    id: 'snp-5',
    situation: 'Разбивка по группам (4 человека)',
    situationEn: 'Divide into groups (4 students)',
    thai: 'แบ่งกลุ่ม กลุ่มละ 4 คนครับ',
    trans: 'bàeng glùm, glùm lá sìi khon khráp',
    ru: 'Разделитесь на группы по 4 человека.',
    en: 'Split into groups of 4 students.',
    category: 'groups',
  },
  {
    id: 'snp-6',
    situation: 'Осталось 5 минут до конца урока',
    situationEn: '5 minutes left in class',
    thai: 'เหลือเวลาอีก 5 นาทีครับ',
    trans: 'lǔea wee-laa ìik hâa naa-thee khráp',
    ru: 'Осталось еще 5 минут (до конца).',
    en: '5 minutes left until the end.',
    category: 'time',
  },
  {
    id: 'snp-7',
    situation: 'Осталось 10 минут',
    situationEn: '10 minutes remaining',
    thai: 'เหลือเวลาอีก 10 นาที หมดเวลา',
    trans: 'lǔea wee-laa ìik sìp naa-thee, mòt wee-laa',
    ru: 'Осталось 10 минут, затем время выйдет.',
    en: '10 minutes remaining, then time is up.',
    category: 'time',
  },
  {
    id: 'snp-8',
    situation: 'Оценка за тест: 10 баллов',
    situationEn: 'Quiz score: 10 points',
    thai: 'แบบทดสอบนี้ 10 คะแนนครับ',
    trans: 'bàep-thót-sàawp níi sìp khá-naaen khráp',
    ru: 'За этот тест даётся 10 баллов.',
    en: 'This quiz is worth 10 points.',
    category: 'discipline',
  },
  {
    id: 'snp-9',
    situation: 'Школьная столовая: цена за обед',
    situationEn: 'School canteen: lunch price',
    thai: 'จานนี้ 40 บาทครับ',
    trans: 'jaan níi sìi-sìp bàat khráp',
    ru: 'Эта тарелка стоит 40 бат.',
    en: 'This dish is 40 baht.',
    category: 'canteen',
  },
  {
    id: 'snp-10',
    situation: '7-Eleven у школы: общая сумма',
    situationEn: '7-Eleven near school: total price',
    thai: 'ทั้งหมด 65 บาทครับ',
    trans: 'tháng-mòt hòk-sìp-hâa bàat khráp',
    ru: 'Всего 65 бат.',
    en: 'Total is 65 baht.',
    category: 'canteen',
  },
];
