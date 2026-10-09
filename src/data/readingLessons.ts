import { ReadingLesson, Tone } from '../types/reading';

export const READING_LESSONS: ReadingLesson[] = [
  // ══════════════════════════════════════════════════════════════════════════════
  // ГЛАВА 1 (ДЕНЬ 1): Согласные среднего класса и базовые чистые гласные
  // ══════════════════════════════════════════════════════════════════════════════
  {
    id: 1,
    lessonCode: '1.1',
    chapter: 1,
    day: 1,
    stageTitle: {
      ru: 'Глава 1 (День 1): Согласные среднего класса и чистые гласные',
      en: 'Chapter 1 (Day 1): Mid Class & Pure Vowels',
    },
    chapterToneRule: {
      ru: 'Согласная среднего класса + долгая гласная = Средний тон (Mid Tone). Звучит ровно, нейтрально.',
      en: 'Mid Class Consonant + Long Vowel = Flat Mid Tone.',
    },
    title: {
      ru: 'Урок 1.1: Первые согласные среднего класса (ก, ด, ต)',
      en: 'Lesson 1.1: First Mid Class Consonants (ก, ด, ต)',
    },
    subtitle: {
      ru: 'Освоение неаспирированных звуков [k/g], [d], [dt] на клавишах D, F, 9',
      en: 'Mastering unaspirated sounds [k/g], [d], [dt] on keys D, F, 9',
    },
    ruleSummary: {
      ru: 'Средний класс не имеет придыхания. ก, ด, ต + долгая гласная = ровный средний тон.',
      en: 'Mid class consonants lack aspiration. Open syllable with long vowel = Mid Tone.',
    },
    theoryNote: {
      ru: 'Средний класс не имеет придыхания. Звук ก [k/g] произносится связками без выдоха. Звуки ด [d] и ต [dt] — зубные (язык упирается в верхние зубы, ต глухой без придыхания).',
      en: 'Mid class is unaspirated. ก [k/g] is pronounced without breath. ด [d] and ต [dt] are dental stops.',
    },
    toneRule: {
      ru: 'Согласная среднего класса + долгая гласная = Средний тон (Mid Tone). Звучит ровно, без повышения или понижения голоса.',
      en: 'Mid Class consonant + Long Vowel = Mid Tone.',
    },
    typingRule: {
      ru: 'Порядок ввода линейный: Согласная → Гласная справа (ก → า).',
      en: 'Linear typing order: Consonant → Right Vowel (ก → า).',
    },
    keys: [
      {
        thai: 'ก',
        qwerty: 'd',
        keyCode: 'KeyD',
        finger: 'left-middle',
        hand: 'left',
        name: { ru: 'Ко Кай (ก)', en: 'Ko Kai (ก)' },
        role: 'consonant',
        consonantClass: 'mid',
        sound: '[k/g] глухой звук связок без придыхания',
      },
      {
        thai: 'ด',
        qwerty: 'f',
        keyCode: 'KeyF',
        finger: 'left-index',
        hand: 'left',
        name: { ru: 'До Дек (ด)', en: 'Do Dek (ด)' },
        role: 'consonant',
        consonantClass: 'mid',
        sound: '[d] звонкий зубной звук',
      },
      {
        thai: 'ต',
        qwerty: '9',
        keyCode: 'Digit9',
        finger: 'right-ring',
        hand: 'right',
        name: { ru: 'То Тао (ต)', en: 'To Tao (ต)' },
        role: 'consonant',
        consonantClass: 'mid',
        sound: '[dt/t] глухой зубной звук без придыхания',
      },
      {
        thai: 'า',
        qwerty: 'k',
        keyCode: 'KeyK',
        finger: 'right-middle',
        hand: 'right',
        name: { ru: 'Сара Аа (า)', en: 'Sara Aa (า)' },
        role: 'vowel',
        sound: '[-aa] долгий гласный звук',
      },
    ],
    drills: ['ก', 'ก', 'ด', 'ด', 'ต', 'ต', 'ก', 'ด', 'ต', 'ด', 'ก', 'ต'],
    vocabulary: [
      {
        thai: 'กา',
        transcription: 'gaa',
        translation: { ru: 'ворона / чайник', en: 'crow / kettle' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['d', 'k'],
      },
      {
        thai: 'ตา',
        transcription: 'dtaa',
        translation: { ru: 'глаз / дедушка по матери', en: 'eye / maternal grandfather' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['9', 'k'],
      },
      {
        thai: 'ดาดา',
        transcription: 'daa-daa',
        translation: { ru: 'ритмический слоговой паттерн', en: 'drill pattern' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['f', 'k', 'f', 'k'],
      },
    ],
  },

  {
    id: 2,
    lessonCode: '1.2',
    chapter: 1,
    day: 1,
    stageTitle: {
      ru: 'Глава 1 (День 1): Согласные среднего класса и чистые гласные',
      en: 'Chapter 1 (Day 1): Mid Class & Pure Vowels',
    },
    chapterToneRule: {
      ru: 'Согласная среднего класса + долгая гласная = Средний тон (Mid Tone).',
      en: 'Mid Class Consonant + Long Vowel = Flat Mid Tone.',
    },
    title: {
      ru: 'Урок 1.2: Губные согласные и шипящие среднего класса (บ, ป, จ, อ)',
      en: 'Lesson 1.2: Labials & Sibilants of Mid Class (บ, ป, จ, อ)',
    },
    subtitle: {
      ru: 'Клавиши [, X, 0, V: звуки [b], [bp], [j] и гортанная смычка [o]',
      en: 'Keys [, X, 0, V: sounds [b], [bp], [j] and glottal catch [o]',
    },
    ruleSummary: {
      ru: 'Все согласные среднего класса с долгой гласной звучат в ровном Среднем тоне.',
      en: 'All mid class consonants with a long vowel produce the flat Mid Tone.',
    },
    theoryNote: {
      ru: 'บ [b] — звонкий губной. ป [bp] — глухой неаспирированный губной (как в слове «спорт»). จ [j] — глухой мягкий [дж/ть]. อ [o] — гортанная смычка (нулевой согласный).',
      en: 'บ [b] is voiced labial. ป [bp] is unaspirated. จ [j] is soft affricate. อ [o] is the null consonant anchor.',
    },
    toneRule: {
      ru: 'Средний класс с открытым долгим слогом = Средний ровный тон.',
      en: 'Mid class in open long syllable = Mid Tone.',
    },
    typingRule: {
      ru: 'บ — BracketLeft ([), ป — KeyX (X), จ — Digit0 (0), อ — KeyV (V).',
      en: 'บ is BracketLeft, ป is KeyX, จ is Digit0, อ is KeyV.',
    },
    keys: [
      {
        thai: 'บ',
        qwerty: '[',
        keyCode: 'BracketLeft',
        finger: 'right-pinky',
        hand: 'right',
        name: { ru: 'Бо Баймай (บ)', en: 'Bo Baimai (บ)' },
        role: 'consonant',
        consonantClass: 'mid',
        sound: '[b] звонкий губной',
      },
      {
        thai: 'ป',
        qwerty: 'x',
        keyCode: 'KeyX',
        finger: 'left-ring',
        hand: 'left',
        name: { ru: 'По Пла (ป)', en: 'Po Pla (ป)' },
        role: 'consonant',
        consonantClass: 'mid',
        sound: '[bp] глухой неаспирированный губной',
      },
      {
        thai: 'จ',
        qwerty: '0',
        keyCode: 'Digit0',
        finger: 'right-pinky',
        hand: 'right',
        name: { ru: 'Джо Джан (จ)', en: 'Jo Jan (จ)' },
        role: 'consonant',
        consonantClass: 'mid',
        sound: '[j/c] глухой мягкий аффрикат',
      },
      {
        thai: 'อ',
        qwerty: 'v',
        keyCode: 'KeyV',
        finger: 'left-index',
        hand: 'left',
        name: { ru: 'О Анг (อ)', en: 'O Ang (อ)' },
        role: 'consonant',
        consonantClass: 'mid',
        sound: '[o/ʔ] нулевой согласный-носитель',
      },
    ],
    drills: ['บ', 'ป', 'จ', 'อ', 'บ', 'บ', 'ป', 'ป', 'จ', 'จ', 'อ', 'อ', 'ป', 'บ', 'จ', 'อ'],
    vocabulary: [
      {
        thai: 'ปา',
        transcription: 'bpaa',
        translation: { ru: 'бросать, кидать', en: 'throw, fling' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['x', 'k'],
      },
      {
        thai: 'จา',
        transcription: 'jaa',
        translation: { ru: 'говорить (лит./архаичн.)', en: 'speak (archaic)' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['0', 'k'],
      },
      {
        thai: 'อา',
        transcription: 'aa',
        translation: { ru: 'младший брат/сестра отца (дядя/тётя)', en: 'father\'s younger sibling' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['v', 'k'],
      },
    ],
  },

  {
    id: 3,
    lessonCode: '1.3',
    chapter: 1,
    day: 1,
    stageTitle: {
      ru: 'Глава 1 (День 1): Согласные среднего класса и чистые гласные',
      en: 'Chapter 1 (Day 1): Mid Class & Pure Vowels',
    },
    chapterToneRule: {
      ru: 'Согласная среднего класса + долгая гласная = Средний тон (Mid Tone).',
      en: 'Mid Class Consonant + Long Vowel = Flat Mid Tone.',
    },
    title: {
      ru: 'Урок 1.3: Долгие гласные первой тройки ( -า, -ี, -ู )',
      en: 'Lesson 1.3: Primary Long Vowels ( -า, -ี, -ู )',
    },
    subtitle: {
      ru: 'Верхняя гласная ี (U) и нижняя гласная ู (P / Shift+P): порядок нажатия',
      en: 'Upper vowel ี (U) and lower vowel ู (P / Shift+P): input order',
    },
    ruleSummary: {
      ru: 'Гласная ี ставится над буквой, гласная ู — под буквой. Жмутся ПОСЛЕ согласной.',
      en: 'Vowel ี sits above, ู sits below. Both are typed AFTER the consonant.',
    },
    theoryNote: {
      ru: 'Гласная า пишется справа. Гласная ี (долгий [ии]) ставится над буквой. Гласная ู (долгий [уу]) ставится под буквой. Обе дают средний тон с согласными среднего класса.',
      en: 'Sara Aa is on the right, Sara Ii is above, Sara Uu is below. All yield Mid Tone with mid class.',
    },
    toneRule: {
      ru: 'Средний класс + долгая чистая гласная (-า, -ี, -ู) = Средний тон.',
      en: 'Mid class + long pure vowel = Mid Tone.',
    },
    typingRule: {
      ru: 'Специфика ввода: ตี → сначала ต (Digit9), затем ี (KeyU). ดู → сначала ด (KeyF), затем ู (KeyP / Shift+P).',
      en: 'Typing sequence: consonant first, then cap or bottom vowel.',
    },
    keys: [
      {
        thai: 'ี',
        qwerty: 'u',
        keyCode: 'KeyU',
        finger: 'right-index',
        hand: 'right',
        name: { ru: 'Сара Ии ( -ี )', en: 'Sara Ii ( -ี )' },
        role: 'vowel',
        sound: '[-ii] долгий верхний гласный звук',
      },
      {
        thai: 'ู',
        qwerty: 'P',
        keyCode: 'KeyP',
        shift: true,
        finger: 'right-pinky',
        hand: 'right',
        name: { ru: 'Сара Уу ( -ู )', en: 'Sara Uu ( -ู )' },
        role: 'vowel',
        sound: '[-uu] долгий нижний гласный звук',
      },
    ],
    drills: ['า', 'ี', 'ู', 'กา', 'ตี', 'ดู', 'ปู', 'อา', 'ดี'],
    vocabulary: [
      {
        thai: 'ตี',
        transcription: 'dtii',
        translation: { ru: 'бить, ударять / бить (о часах)', en: 'hit, strike / o\'clock' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['9', 'u'],
      },
      {
        thai: 'ดู',
        transcription: 'duu',
        translation: { ru: 'смотреть, глядеть', en: 'look, watch' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['f', 'P'],
      },
      {
        thai: 'ปู',
        transcription: 'bpuu',
        translation: { ru: 'краб', en: 'crab' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['x', 'P'],
      },
      {
        thai: 'ดี',
        transcription: 'dii',
        translation: { ru: 'хороший, добрый', en: 'good, well' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['f', 'u'],
      },
    ],
  },

  {
    id: 4,
    lessonCode: '1.4',
    chapter: 1,
    day: 1,
    stageTitle: {
      ru: 'Глава 1 (День 1): Согласные среднего класса и чистые гласные',
      en: 'Chapter 1 (Day 1): Mid Class & Pure Vowels',
    },
    chapterToneRule: {
      ru: 'Согласная среднего класса + долгая гласная = Средний тон (Mid Tone).',
      en: 'Mid Class Consonant + Long Vowel = Flat Mid Tone.',
    },
    title: {
      ru: 'Урок 1.4: Буква อ как гласный носитель и экзамен Дня 1',
      en: 'Lesson 1.4: Letter อ as Vowel Anchor & Day 1 Review',
    },
    subtitle: {
      ru: 'Слова, начинающиеся с гласных звуков, и двухсложные связки',
      en: 'Words starting with vowel sounds and two-syllable combos',
    },
    ruleSummary: {
      ru: 'Гласные не висят в воздухе — буква อ служит согласной-подставкой.',
      en: 'Vowels cannot stand alone — letter อ acts as the silent anchor.',
    },
    theoryNote: {
      ru: 'Гласные в тайском не могут висеть в воздухе без согласной. Если слово начинается с гласного звука, согласной-подставкой выступает อ. Звук при этом формируется самой гласной.',
      en: 'Thai vowels require a consonant anchor. If a syllable starts with a vowel sound, letter อ serves as the holder.',
    },
    toneRule: {
      ru: 'Буква อ относится к Среднему классу, поэтому слоги อา, อี, อู звучат в Среднем тоне.',
      en: 'Letter อ is Mid Class, so อา, อี, อู are Mid Tone.',
    },
    typingRule: {
      ru: 'Сначала нажимаем อ (KeyV), затем нужную гласную: า (K), ี (U), ู (Shift+P).',
      en: 'Press อ (KeyV) first, then the vowel: า (K), ี (U), ู (Shift+P).',
    },
    keys: [],
    drills: ['อา', 'อี', 'อู', 'กา', 'กี', 'กู', 'ตา', 'ตี', 'ตู'],
    vocabulary: [
      {
        thai: 'อี',
        transcription: 'ii',
        translation: { ru: 'префикс женских имен (просторечный)', en: 'informal female prefix' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['v', 'u'],
      },
      {
        thai: 'อู',
        transcription: 'uu',
        translation: { ru: 'издавать звук / крик', en: 'make a sound / cry' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['v', 'P'],
      },
      {
        thai: 'อีกา',
        transcription: 'ii-gaa',
        translation: { ru: 'черная ворона / ворон', en: 'black crow' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['v', 'u', 'd', 'k'],
      },
      {
        thai: 'ตาดี',
        transcription: 'dtaa-dii',
        translation: { ru: 'зоркий глаз / хорошее зрение', en: 'good eyesight / sharp eye' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['9', 'k', 'f', 'u'],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // ГЛАВА 2 (ДЕНЬ 2): Согласные высокого класса и Восходящий тон (Rising Tone)
  // ══════════════════════════════════════════════════════════════════════════════
  {
    id: 5,
    lessonCode: '2.1',
    chapter: 2,
    day: 2,
    stageTitle: {
      ru: 'Глава 2 (День 2): Согласные высокого класса и Восходящий тон',
      en: 'Chapter 2 (Day 2): High Class & Rising Tone',
    },
    chapterToneRule: {
      ru: 'Согласная высокого класса + долгая гласная = Восходящий тон (Rising Tone). Интонация переспроса «А?!».',
      en: 'High Class Consonant + Long Vowel = Rising Tone (questioning intonation).',
    },
    title: {
      ru: 'Урок 2.1: Базовые высокие согласные (ข, ส, ห)',
      en: 'Lesson 2.1: Basic High Class Consonants (ข, ส, ห)',
    },
    subtitle: {
      ru: 'Клавиши 0/-, L, S: интонация вопроса без тоновых знаков',
      en: 'Keys 0/-, L, S: intrinsic rising tone without marks',
    },
    ruleSummary: {
      ru: 'Высокий класс несет скрытый вопросительный тон. ข, ส, ห + า = Восходящий тон.',
      en: 'High class carries inherent rising pitch. With long vowel = Rising Tone.',
    },
    theoryNote: {
      ru: 'ข [kh] — глухой с придыханием [кх]. ส [s] — глухой свистящий [с]. ห [h] — глухой выдох [х].',
      en: 'ข [kh] is aspirated. ส [s] is voiceless sibilant. ห [h] is voiceless glottal fricative.',
    },
    toneRule: {
      ru: 'Высокий класс + долгая гласная (открытый слог) = Восходящий тон (Rising Tone).',
      en: 'High Class + Long Vowel = Rising Tone.',
    },
    typingRule: {
      ru: 'ส на правой руке (KeyL), ห на левой руке (KeyS), ข вверху (Digit0 / -).',
      en: 'Key ส is KeyL, Key ห is KeyS, Key ข is Digit0 / Hyphen.',
    },
    keys: [
      {
        thai: 'ข',
        qwerty: '-',
        keyCode: 'Digit0',
        finger: 'right-pinky',
        hand: 'right',
        name: { ru: 'Кхо Кхай (ข)', en: 'Kho Khai (ข)' },
        role: 'consonant',
        consonantClass: 'high',
        sound: '[kh] придыхательный «кх»',
      },
      {
        thai: 'ส',
        qwerty: 'l',
        keyCode: 'KeyL',
        finger: 'right-ring',
        hand: 'right',
        name: { ru: 'Со Сыа (ส)', en: 'So Suea (ส)' },
        role: 'consonant',
        consonantClass: 'high',
        sound: '[s] свистящий звук «с»',
      },
      {
        thai: 'ห',
        qwerty: 's',
        keyCode: 'KeyS',
        finger: 'left-ring',
        hand: 'left',
        name: { ru: 'Хо Хип (ห)', en: 'Ho Hip (ห)' },
        role: 'consonant',
        consonantClass: 'high',
        sound: '[h] глухой выдох «х»',
      },
    ],
    drills: ['ส', 'ห', 'ข', 'ส', 'ส', 'ห', 'ห', 'ข', 'ข', 'สา', 'หา', 'ขา'],
    vocabulary: [
      {
        thai: 'ขา',
        transcription: 'khaa',
        translation: { ru: 'нога / ножка стола', en: 'leg' },
        tone: 'rising',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['-', 'k'],
      },
      {
        thai: 'สา',
        transcription: 'saa',
        translation: { ru: 'корень сущ. (жена, происхождение)', en: 'root (wife / origin)' },
        tone: 'rising',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['l', 'k'],
      },
      {
        thai: 'หา',
        transcription: 'haa',
        translation: { ru: 'искать / навещать', en: 'seek, find / visit' },
        tone: 'rising',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['s', 'k'],
      },
    ],
  },

  {
    id: 6,
    lessonCode: '2.2',
    chapter: 2,
    day: 2,
    stageTitle: {
      ru: 'Глава 2 (День 2): Согласные высокого класса и Восходящий тон',
      en: 'Chapter 2 (Day 2): High Class & Rising Tone',
    },
    chapterToneRule: {
      ru: 'Согласная высокого класса + долгая гласная = Восходящий тон (Rising Tone).',
      en: 'High Class Consonant + Long Vowel = Rising Tone.',
    },
    title: {
      ru: 'Урок 2.2: Дополнительные высокие согласные (ฉ, ถ, ผ, ฝ)',
      en: 'Lesson 2.2: Additional High Class Consonants (ฉ, ถ, ผ, ฝ)',
    },
    subtitle: {
      ru: 'Звуки [ch], [th], [ph], [f] на клавишах Shift+C, 5, Z, /',
      en: 'Sounds [ch], [th], [ph], [f] on keys Shift+C, 5, Z, /',
    },
    ruleSummary: {
      ru: 'ฉ, ถ, ผ, ฝ принадлежат Высокому классу и дают Восходящий тон с долгими гласными.',
      en: 'ฉ, ถ, ผ, ฝ belong to High Class and produce Rising Tone with long vowels.',
    },
    theoryNote: {
      ru: 'ฉ [ch] — шипящий с придыханием. ถ [th] — зубной с придыханием [тх]. ผ [ph] — губной с придыханием [пх]. ฝ [f] — губно-зубной глухой [ф].',
      en: 'ฉ [ch], ถ [th], and ผ [ph] are aspirated stops/affricates; ฝ [f] is a voiceless labiodental.',
    },
    toneRule: {
      ru: 'Высокий класс + долгая гласная = Восходящий тон (Rising Tone).',
      en: 'High Class + Long Vowel = Rising Tone.',
    },
    typingRule: {
      ru: 'ฉ — Shift+C, ถ — Digit5 (5), ผ — KeyZ (Z), ฝ — Slash (/).',
      en: 'ฉ is Shift+C, ถ is 5, ผ is Z, ฝ is Slash.',
    },
    keys: [
      {
        thai: 'ฉ',
        qwerty: 'C',
        shift: true,
        finger: 'left-middle',
        hand: 'left',
        name: { ru: 'Чо Чинг (ฉ)', en: 'Cho Ching (ฉ)' },
        role: 'consonant',
        consonantClass: 'high',
        sound: '[ch] придыхательный «чх»',
      },
      {
        thai: 'ถ',
        qwerty: '5',
        keyCode: 'Digit5',
        finger: 'left-index',
        hand: 'left',
        name: { ru: 'Тхо Тхунг (ถ)', en: 'Tho Thung (ถ)' },
        role: 'consonant',
        consonantClass: 'high',
        sound: '[th] придыхательный «тх»',
      },
      {
        thai: 'ผ',
        qwerty: 'z',
        keyCode: 'KeyZ',
        finger: 'left-pinky',
        hand: 'left',
        name: { ru: 'Пхо Пхынг (ผ)', en: 'Pho Phueng (ผ)' },
        role: 'consonant',
        consonantClass: 'high',
        sound: '[ph] придыхательный «пх»',
      },
      {
        thai: 'ฝ',
        qwerty: '/',
        keyCode: 'Slash',
        finger: 'right-pinky',
        hand: 'right',
        name: { ru: 'Фо Фа (ฝ)', en: 'Fo Fa (ฝ)' },
        role: 'consonant',
        consonantClass: 'high',
        sound: '[f] глухой звук «ф»',
      },
    ],
    drills: ['ผ', 'ฝ', 'ถ', 'ฉ', 'ผา', 'ฝา', 'ถา', 'ฉา'],
    vocabulary: [
      {
        thai: 'ผา',
        transcription: 'phaa',
        translation: { ru: 'скала, утес', en: 'cliff, rock' },
        tone: 'rising',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['z', 'k'],
      },
      {
        thai: 'ฝา',
        transcription: 'faa',
        translation: { ru: 'крышка (кастрюли, бутылки)', en: 'lid, cover' },
        tone: 'rising',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['/', 'k'],
      },
      {
        thai: 'ถู',
        transcription: 'thuu',
        translation: { ru: 'тереть, мыть (пол)', en: 'rub, mop (floor)' },
        tone: 'rising',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['5', 'P'],
      },
      {
        thai: 'ผี',
        transcription: 'phii',
        translation: { ru: 'призрак, дух', en: 'ghost, spirit' },
        tone: 'rising',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['z', 'u'],
      },
    ],
  },

  {
    id: 7,
    lessonCode: '2.3',
    chapter: 2,
    day: 2,
    stageTitle: {
      ru: 'Глава 2 (День 2): Согласные высокого класса и Восходящий тон',
      en: 'Chapter 2 (Day 2): High Class & Rising Tone',
    },
    chapterToneRule: {
      ru: 'Контраст мелодики: Средний класс (ровный тон) против Высокого класса (восходящий тон).',
      en: 'Tone contrast: Mid Class (flat) vs High Class (rising).',
    },
    title: {
      ru: 'Урок 2.3: Контрастные пары Mid vs Rising (Аудио-различение)',
      en: 'Lesson 2.3: Contrast Pairs Mid vs Rising (Aural Discrimination)',
    },
    subtitle: {
      ru: 'Дрилл на слух: กา ↔ ขา, ตา ↔ ถา, ปา ↔ ผา, ดู ↔ หู',
      en: 'Auditory drill: กา ↔ ขา, ตา ↔ ถา, ปา ↔ ผา, ดู ↔ หู',
    },
    ruleSummary: {
      ru: 'Одинаковые гласные звучат с разной мелодикой в зависимости от согласной.',
      en: 'Identical vowels sound completely different depending on the initial consonant class.',
    },
    theoryNote: {
      ru: 'Одинаковые гласные звучат с противоположной мелодикой в зависимости от класса первой согласной. Средний класс звучит плоско как на одной ноте, а Высокий класс делает плавный нырок вниз и взлёт наверх.',
      en: 'Listen closely: Mid class stays level, while High class dips down and rises sharply.',
    },
    toneRule: {
      ru: 'Средний класс = Mid Tone; Высокий класс = Rising Tone.',
      en: 'Mid class = Mid Tone; High class = Rising Tone.',
    },
    typingRule: {
      ru: 'Печатайте пары по очереди, обращая внимание на интонацию.',
      en: 'Type pairs alternatingly and listen to the pitch contrast.',
    },
    keys: [],
    drills: ['กา', 'ขา', 'ตา', 'ถา', 'ปา', 'ผา', 'ดู', 'หู'],
    vocabulary: [
      {
        thai: 'กา',
        transcription: 'gaa',
        translation: { ru: 'ворона (Средний тон)', en: 'crow (Mid)' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['d', 'k'],
      },
      {
        thai: 'ขา',
        transcription: 'khaa',
        translation: { ru: 'нога (Восходящий тон)', en: 'leg (Rising)' },
        tone: 'rising',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['-', 'k'],
      },
      {
        thai: 'ดู',
        transcription: 'duu',
        translation: { ru: 'смотреть (Средний тон)', en: 'watch (Mid)' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['f', 'P'],
      },
      {
        thai: 'หู',
        transcription: 'huu',
        translation: { ru: 'ухо (Восходящий тон)', en: 'ear (Rising)' },
        tone: 'rising',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['s', 'P'],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // ГЛАВА 3 (ДЕНЬ 3): Согласные низкого класса (Low Class)
  // ══════════════════════════════════════════════════════════════════════════════
  {
    id: 8,
    lessonCode: '3.1',
    chapter: 3,
    day: 3,
    stageTitle: {
      ru: 'Глава 3 (День 3): Согласные низкого класса (Low Class)',
      en: 'Chapter 3 (Day 3): Low Class Consonants',
    },
    chapterToneRule: {
      ru: 'Согласная низкого класса + долгая гласная = Средний тон (Mid Tone).',
      en: 'Low Class Consonant + Long Vowel = Flat Mid Tone.',
    },
    title: {
      ru: 'Урок 3.1: Одиночные низкие (сонорные) согласные (ง, น, ม, ย, ร, ล, ว)',
      en: 'Lesson 3.1: Single Low Sonorants (ง, น, ม, ย, ร, ล, ว)',
    },
    subtitle: {
      ru: 'Сонорные звуки правого блока: носовые, плавные и полугласные',
      en: 'Right hand sonorants: nasals, liquids and glides',
    },
    ruleSummary: {
      ru: 'Одиночные низкие согласные (Single Low) образуют сонорные живые слоги со Средним тоном.',
      en: 'Single low sonorants form resonant live syllables with Mid Tone.',
    },
    theoryNote: {
      ru: 'У этих букв нет пар среди высокого класса (Single Low). Это сонорные звуки: носовые, плавные, полугласные. В открытом слоге с долгой гласной дают Средний тон.',
      en: 'These consonants have no high-class counterparts. They are sonorant sounds producing Mid Tone in open long syllables.',
    },
    toneRule: {
      ru: 'Низкий класс + долгая гласная = Средний тон (Mid Tone).',
      en: 'Low Class + Long Vowel = Mid Tone.',
    },
    typingRule: {
      ru: 'ง (\'), น (O), ม (M), ย (P), ร (I), ล (]), ว (;).',
      en: 'ง (\'), น (O), ม (M), ย (P), ร (I), ล (]), ว (;).',
    },
    keys: [
      {
        thai: 'ง',
        qwerty: "'",
        keyCode: 'Quote',
        finger: 'right-pinky',
        hand: 'right',
        name: { ru: 'Нго Нгу (ง)', en: 'Ngo Ngu (ง)' },
        role: 'consonant',
        consonantClass: 'low',
        sound: '[ng] носовой сонорный',
      },
      {
        thai: 'น',
        qwerty: 'o',
        keyCode: 'KeyO',
        finger: 'right-ring',
        hand: 'right',
        name: { ru: 'Но Ну (น)', en: 'No Nu (น)' },
        role: 'consonant',
        consonantClass: 'low',
        sound: '[n] зубной носовой',
      },
      {
        thai: 'ม',
        qwerty: 'm',
        keyCode: 'KeyM',
        finger: 'right-index',
        hand: 'right',
        name: { ru: 'Мо Ма (ม)', en: 'Mo Ma (ม)' },
        role: 'consonant',
        consonantClass: 'low',
        sound: '[m] губной носовой',
      },
      {
        thai: 'ร',
        qwerty: 'i',
        keyCode: 'KeyI',
        finger: 'right-middle',
        hand: 'right',
        name: { ru: 'Ро Рыа (ร)', en: 'Ro Ruea (ร)' },
        role: 'consonant',
        consonantClass: 'low',
        sound: '[r] дрожащий переднеязычный',
      },
      {
        thai: 'ล',
        qwerty: ']',
        keyCode: 'BracketRight',
        finger: 'right-pinky',
        hand: 'right',
        name: { ru: 'Ло Линг (ล)', en: 'Lo Ling (ล)' },
        role: 'consonant',
        consonantClass: 'low',
        sound: '[l] боковой плавный',
      },
      {
        thai: 'ว',
        qwerty: ';',
        keyCode: 'Semicolon',
        finger: 'right-pinky',
        hand: 'right',
        name: { ru: 'Во Вэн (ว)', en: 'Wo Waen (ว)' },
        role: 'consonant',
        consonantClass: 'low',
        sound: '[w] полугласный губно-задненёбный',
      },
    ],
    drills: ['ง', 'น', 'ม', 'ย', 'ร', 'ล', 'ว', 'นา', 'มา', 'รา', 'ลา', 'วา'],
    vocabulary: [
      {
        thai: 'มา',
        transcription: 'maa',
        translation: { ru: 'приходить, идти сюда', en: 'come' },
        tone: 'mid',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['m', 'k'],
      },
      {
        thai: 'นา',
        transcription: 'naa',
        translation: { ru: 'рисовое поле', en: 'rice field' },
        tone: 'mid',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['o', 'k'],
      },
      {
        thai: 'รู',
        transcription: 'ruu',
        translation: { ru: 'дыра, отверстие', en: 'hole, aperture' },
        tone: 'mid',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['i', 'P'],
      },
      {
        thai: 'มี',
        transcription: 'mii',
        translation: { ru: 'иметь / есть в наличии', en: 'have / there is' },
        tone: 'mid',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['m', 'u'],
      },
    ],
  },

  {
    id: 9,
    lessonCode: '3.2',
    chapter: 3,
    day: 3,
    stageTitle: {
      ru: 'Глава 3 (День 3): Согласные низкого класса (Low Class)',
      en: 'Chapter 3 (Day 3): Low Class Consonants',
    },
    chapterToneRule: {
      ru: 'Согласная низкого класса + долгая гласная = Средний тон (Mid Tone).',
      en: 'Low Class Consonant + Long Vowel = Flat Mid Tone.',
    },
    title: {
      ru: 'Урок 3.2: Парные низкие согласные (ค, ช, ซ, ท, พ, ฟ, ฮ)',
      en: 'Lesson 3.2: Paired Low Consonants (ค, ช, ซ, ท, พ, ฟ, ฮ)',
    },
    subtitle: {
      ru: 'Буквы-близнецы звуков высокого класса (Paired Low)',
      en: 'Acoustic twins of high class consonants',
    },
    ruleSummary: {
      ru: 'ค звучит как ข, ท как ถ, พ как ผ, ฟ как ฝ, но дают Средний тон вместо Восходящего.',
      en: 'Paired low share pronunciation with high class, but produce Mid Tone.',
    },
    theoryNote: {
      ru: 'Буквы спарены по звуку с высоким классом (Paired Low): ค звучит так же, как ข [kh], но дает другой тон. ท звучит как ถ [th]. พ звучит как ผ [ph]. ฟ звучит как ฝ [f].',
      en: 'Paired low consonants sound identical to high class twins, but have different tonal behaviors.',
    },
    toneRule: {
      ru: 'Парный низкий класс + долгая гласная = Средний тон (Mid Tone).',
      en: 'Paired Low Class + Long Vowel = Mid Tone.',
    },
    typingRule: {
      ru: 'ค — Digit7, ช — Equal, พ — KeyR, ฟ — KeyA, ท — KeyM.',
      en: 'ค is Digit7, ช is Equal, พ is KeyR, ฟ is KeyA.',
    },
    keys: [
      {
        thai: 'ค',
        qwerty: '7',
        keyCode: 'Digit7',
        finger: 'right-middle',
        hand: 'right',
        name: { ru: 'Кхо Кхуай (ค)', en: 'Kho Khwai (ค)' },
        role: 'consonant',
        consonantClass: 'low',
        sound: '[kh] придыхательный «кх» низкого класса',
      },
      {
        thai: 'ช',
        qwerty: '=',
        keyCode: 'Equal',
        finger: 'right-pinky',
        hand: 'right',
        name: { ru: 'Чо Чанг (ช)', en: 'Cho Chang (ช)' },
        role: 'consonant',
        consonantClass: 'low',
        sound: '[ch] придыхательный «чх» низкого класса',
      },
      {
        thai: 'พ',
        qwerty: 'r',
        keyCode: 'KeyR',
        finger: 'left-index',
        hand: 'left',
        name: { ru: 'Пхо Пхан (พ)', en: 'Pho Phan (พ)' },
        role: 'consonant',
        consonantClass: 'low',
        sound: '[ph] придыхательный «пх» низкого класса',
      },
      {
        thai: 'ฟ',
        qwerty: 'a',
        keyCode: 'KeyA',
        finger: 'left-pinky',
        hand: 'left',
        name: { ru: 'Фо Фан (ฟ)', en: 'Fo Fan (ฟ)' },
        role: 'consonant',
        consonantClass: 'low',
        sound: '[f] звук «ф» низкого класса',
      },
    ],
    drills: ['ค', 'ช', 'ท', 'พ', 'ฟ', 'คา', 'ชา', 'ทา', 'พา', 'ฟา'],
    vocabulary: [
      {
        thai: 'ชา',
        transcription: 'chaa',
        translation: { ru: 'чай / онемевший', en: 'tea / numb' },
        tone: 'mid',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['=', 'k'],
      },
      {
        thai: 'ทา',
        transcription: 'thaa',
        translation: { ru: 'мазать, наносить (краску/крем)', en: 'apply, paint' },
        tone: 'mid',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['m', 'k'],
      },
      {
        thai: 'พา',
        transcription: 'phaa',
        translation: { ru: 'вести за собой, приводить', en: 'lead, bring along' },
        tone: 'mid',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['r', 'k'],
      },
    ],
  },

  {
    id: 10,
    lessonCode: '3.3',
    chapter: 3,
    day: 3,
    stageTitle: {
      ru: 'Глава 3 (День 3): Согласные низкого класса (Low Class)',
      en: 'Chapter 3 (Day 3): Low Class Consonants',
    },
    chapterToneRule: {
      ru: 'Согласная низкого класса + долгая гласная = Средний тон (Mid Tone).',
      en: 'Low Class Consonant + Long Vowel = Flat Mid Tone.',
    },
    title: {
      ru: 'Урок 3.3: Дополнительные долгие гласные ( -ื, เ- )',
      en: 'Lesson 3.3: Additional Long Vowels ( -ื, เ- )',
    },
    subtitle: {
      ru: 'Гласная ื (N) с немым อ и левая препозиционная гласная เ (G)',
      en: 'Vowel ื (N) with silent อ and left prepositional vowel เ (G)',
    },
    ruleSummary: {
      ru: 'ื пишется над буквой (требует อ справа, если нет финали). เ пишется слева, но нажимается ПЕРВОЙ.',
      en: 'ื is above (needs อ without final). เ is on the left and typed FIRST.',
    },
    theoryNote: {
      ru: 'ื — звук [ыы], пишется над буквой (требует немого อ справа, если нет конечной согласной: มือ). เ — препозиционный звук [ee], пишется слева, но читается после буквы.',
      en: 'Sara Uue (ื) sits above. Sara E (เ) sits to the left and must be typed before the consonant.',
    },
    toneRule: {
      ru: 'Долгие гласные ื и เ с низким классом = Средний тон (Mid Tone).',
      en: 'Long vowels ื and เ with low class = Mid Tone.',
    },
    typingRule: {
      ru: 'Критично: для เก сначала жмем เ (KeyG), затем ก (KeyD). Для มือ: ม → ื → อ.',
      en: 'Type เ (KeyG) before consonant. For มือ: ม → ื → อ.',
    },
    keys: [
      {
        thai: 'ื',
        qwerty: 'n',
        keyCode: 'KeyN',
        finger: 'right-index',
        hand: 'right',
        name: { ru: 'Сара Ыы ( -ื )', en: 'Sara Uue ( -ื )' },
        role: 'vowel',
        sound: '[-ue/-ыы] долгий верхний заднеязычный гласный',
      },
      {
        thai: 'เ',
        qwerty: 'g',
        keyCode: 'KeyG',
        finger: 'left-index',
        hand: 'left',
        name: { ru: 'Сара Э ( เ- )', en: 'Sara E ( เ- )' },
        role: 'vowel',
        sound: '[-ee] долгий левый препозиционный гласный',
      },
    ],
    drills: ['มือ', 'เท', 'เก', 'เวลา', 'มี', 'ดู', 'พา', 'เทยา'],
    vocabulary: [
      {
        thai: 'มือ',
        transcription: 'muu',
        translation: { ru: 'рука, кисть руки', en: 'hand' },
        tone: 'mid',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['m', 'n', 'v'],
      },
      {
        thai: 'เท',
        transcription: 'thee',
        translation: { ru: 'наливать, выливать', en: 'pour out' },
        tone: 'mid',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['g', 'm'],
      },
      {
        thai: 'เวลา',
        transcription: 'wee-laa',
        translation: { ru: 'время', en: 'time' },
        tone: 'mid',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['g', ';', ']', 'k'],
      },
    ],
  },

  {
    id: 11,
    lessonCode: '3.4',
    chapter: 3,
    day: 3,
    stageTitle: {
      ru: 'Глава 3 (День 3): Согласные низкого класса (Low Class)',
      en: 'Chapter 3 (Day 3): Low Class Consonants',
    },
    chapterToneRule: {
      ru: 'Сводная битва трех классов: Средний → Mid, Высокий → Rising, Низкий → Mid.',
      en: 'Three-way battle: Mid Class → Mid, High Class → Rising, Low Class → Mid.',
    },
    title: {
      ru: 'Урок 3.4: Трехклассовая битва (Mid vs High vs Low)',
      en: 'Lesson 3.4: Three-Class Battle (Mid vs High vs Low)',
    },
    subtitle: {
      ru: 'Акустическое сопоставление триплетов: ทา ↔ ถา ↔ ตา, พา ↔ ผา ↔ ปา',
      en: 'Triple contrast drill: ทา ↔ ถา ↔ ตา, พา ↔ ผา ↔ ปา',
    },
    ruleSummary: {
      ru: 'Открытый долгий слог: Средний класс = Mid, Высокий = Rising, Низкий = Mid.',
      en: 'Open long syllable: Mid Class = Mid, High Class = Rising, Low Class = Mid.',
    },
    theoryNote: {
      ru: 'Сводная матрица открытого слога с долгой гласной: Средний класс → Mid; Высокий класс → Rising; Низкий класс → Mid. Заметьте, что Низкий и Средний классы звучат одинаково ровно, а Высокий класс взлетает вверх.',
      en: 'Summary for open long syllables: Mid → Mid; High → Rising; Low → Mid.',
    },
    toneRule: {
      ru: 'Различайте классы по написанию и тону.',
      en: 'Differentiate classes by script and pitch.',
    },
    typingRule: {
      ru: 'Отработайте переключение между тремя пальцевыми зонами.',
      en: 'Practice switching between the 3 finger zones.',
    },
    keys: [],
    drills: ['ทา', 'ถา', 'ตา', 'พา', 'ผา', 'ปา', 'คา', 'ขา', 'กา'],
    vocabulary: [
      {
        thai: 'ทา',
        transcription: 'thaa',
        translation: { ru: 'мазать (Низкий класс: Mid)', en: 'apply (Low: Mid)' },
        tone: 'mid',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['m', 'k'],
      },
      {
        thai: 'ถา',
        transcription: 'thaa',
        translation: { ru: 'налетать (Высокий класс: Rising)', en: 'sweep down (High: Rising)' },
        tone: 'rising',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['5', 'k'],
      },
      {
        thai: 'ตา',
        transcription: 'dtaa',
        translation: { ru: 'глаз (Средний класс: Mid)', en: 'eye (Mid: Mid)' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['9', 'k'],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // ГЛАВА 4 (ДЕНЬ 4): Живые окончания слогов (Live Endings)
  // ══════════════════════════════════════════════════════════════════════════════
  {
    id: 12,
    lessonCode: '4.1',
    chapter: 4,
    day: 4,
    stageTitle: {
      ru: 'Глава 4 (День 4): Живые окончания слогов (Live Endings)',
      en: 'Chapter 4 (Day 4): Live Syllable Endings',
    },
    chapterToneRule: {
      ru: 'Живой слог оканчивается на долгую гласную или сонорный звук (-m, -n, -ng, -w, -y). Тон сохраняется!',
      en: 'Live syllables end in long vowels or sonorants (-m, -n, -ng, -w, -y). Pitch rules remain intact.',
    },
    title: {
      ru: 'Урок 4.1: Финал แม่กง (-ng) → буква ง в конце',
      en: 'Lesson 4.1: Final Mae Kong (-ng) → Letter ง',
    },
    subtitle: {
      ru: 'Заднеязычный носовой хвост [-ng] на клавише апострофа (\')',
      en: 'Velar nasal ending [-ng] on quote key (\')',
    },
    ruleSummary: {
      ru: 'Финаль ง делает слог живым закрытым. Тон определяется классом начальной согласной.',
      en: 'Final ง makes syllable live. Tone is determined by initial consonant class.',
    },
    theoryNote: {
      ru: 'Буква ง на конце слога дает звук [-ng] (носовой заднеязычный). Слог становится живым закрытым.',
      en: 'Letter ง at the end produces the [-ng] nasal. The syllable is closed and live.',
    },
    toneRule: {
      ru: 'Средний класс + ง = Mid Tone; Высокий класс + ง = Rising Tone; Низкий класс + ง = Mid Tone.',
      en: 'Mid + ง = Mid; High + ง = Rising; Low + ง = Mid.',
    },
    typingRule: {
      ru: 'Порядок ввода: Нач. согласная → Гласная → Финальная ง (\').',
      en: 'Input order: Initial consonant → Vowel → Final ง (\').',
    },
    keys: [],
    drills: ['กาง', 'ตาง', 'ปาง', 'ขาง', 'สาง', 'หาง', 'ทาง', 'นาง'],
    vocabulary: [
      {
        thai: 'กาง',
        transcription: 'gaang',
        translation: { ru: 'расправлять / раскрывать зонт', en: 'spread out / open umbrella' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['d', 'k', "'"],
      },
      {
        thai: 'หาง',
        transcription: 'haang',
        translation: { ru: 'хвост / очередь', en: 'tail / queue' },
        tone: 'rising',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['s', 'k', "'"],
      },
      {
        thai: 'ทาง',
        transcription: 'thaang',
        translation: { ru: 'дорога, путь, направление', en: 'way, route' },
        tone: 'mid',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['m', 'k', "'"],
      },
    ],
  },

  {
    id: 13,
    lessonCode: '4.2',
    chapter: 4,
    day: 4,
    stageTitle: {
      ru: 'Глава 4 (День 4): Живые окончания слогов (Live Endings)',
      en: 'Chapter 4 (Day 4): Live Syllable Endings',
    },
    chapterToneRule: {
      ru: 'Живой слог: долгая гласная или сонорные окончания сохраняют базовый тон класса.',
      en: 'Live syllable: sonorants sustain tone according to class.',
    },
    title: {
      ru: 'Урок 4.2: Финал แม่กน (-n) → буквы น, ร, ล в конце',
      en: 'Lesson 4.2: Final Mae Kon (-n) → Letters น, ร, ล',
    },
    subtitle: {
      ru: 'Буквы ร и ล в конце слова читаются строго как твердый звук [-н]!',
      en: 'Letters ร and ล at syllable end are pronounced strictly as [-n]!',
    },
    ruleSummary: {
      ru: 'В конце слога น, ร, ล звучат как [-n]. Все они образуют живые слоги.',
      en: 'At syllable end, น, ร, ล all sound as [-n], forming live syllables.',
    },
    theoryNote: {
      ru: 'В конце слова буквы น, ร, ล читаются строго одинаково: как твердый звук [-н]. Буквы ร и ล на конце никогда не звучат как «р» или «л»! Слово การ читается как [gaan].',
      en: 'At the end of a syllable, น, ร, and ล all neutralize to [-n]. Word การ is pronounced [gaan].',
    },
    toneRule: {
      ru: 'Живое окончание แม่กน (-n) сохраняет ровный тон у среднего/низкого класса и восходящий у высокого.',
      en: 'Mae Kon (-n) retains live tone behavior.',
    },
    typingRule: {
      ru: 'Жмите соответствующую букву в конце: น (KeyO), ร (KeyI), ล (BracketRight).',
      en: 'Press the exact letter at the end: น (O), ร (I), ล (]).',
    },
    keys: [],
    drills: ['นาน', 'บาน', 'ขาน', 'สาร', 'หาร', 'วาน', 'จาน', 'การ'],
    vocabulary: [
      {
        thai: 'จาน',
        transcription: 'jaan',
        translation: { ru: 'тарелка / блюдо', en: 'plate, dish' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['0', 'k', 'o'],
      },
      {
        thai: 'ขาน',
        transcription: 'khaan',
        translation: { ru: 'отвечать / окликать', en: 'call out / reply' },
        tone: 'rising',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['-', 'k', 'o'],
      },
      {
        thai: 'การ',
        transcription: 'gaan',
        translation: { ru: 'работа, дело (префикс существительных)', en: 'activity, work' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['d', 'k', 'i'],
      },
      {
        thai: 'หาร',
        transcription: 'haan',
        translation: { ru: 'делить (математика)', en: 'divide (math)' },
        tone: 'rising',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['s', 'k', 'i'],
      },
    ],
  },

  {
    id: 14,
    lessonCode: '4.3',
    chapter: 4,
    day: 4,
    stageTitle: {
      ru: 'Глава 4 (День 4): Живые окончания слогов (Live Endings)',
      en: 'Chapter 4 (Day 4): Live Syllable Endings',
    },
    chapterToneRule: {
      ru: 'Финалы แม่กม (-m), แม่เกย (-y), แม่เกอว (-w) — живые слоги.',
      en: 'Finals Mae Kom (-m), Mae Koei (-y), Mae Keow (-w) are all live.',
    },
    title: {
      ru: 'Урок 4.3: Финалы แม่กม (-m), แม่เกย (-y), แม่เกอว (-w)',
      en: 'Lesson 4.3: Finals Mae Kom (-m), Mae Koei (-y), Mae Keow (-w)',
    },
    subtitle: {
      ru: 'Окончания на ม [-m], ย [-y], ว [-w]: клавиши M, P, ;',
      en: 'Endings on ม [-m], ย [-y], ว [-w]: keys M, P, ;',
    },
    ruleSummary: {
      ru: 'Все сонорные и полугласные на конце слова сохраняют живой слог.',
      en: 'All sonorants and semivowels preserve live syllable tone rules.',
    },
    theoryNote: {
      ru: 'Финалы на ม [-м], ย [-й], ว [-у/в]. Все они образуют живые слоги, позволяя звуку плавно тянуться.',
      en: 'Finals with ม [-m], ย [-y], ว [-w] yield live resonance.',
    },
    toneRule: {
      ru: 'Высокий класс дает Восходящий тон (สาย, ขาว). Средний и низкий дают Средний тон (ตาม, ชาม).',
      en: 'High class produces Rising Tone (สาย, ขาว). Mid and Low produce Mid Tone.',
    },
    typingRule: {
      ru: 'Финальная согласная жмется последней в слоге.',
      en: 'Final consonant is pressed last in the syllable sequence.',
    },
    keys: [],
    drills: ['ตาม', 'ขาม', 'ชาม', 'ยาย', 'สาย', 'พาย', 'ดาว', 'ขาว'],
    vocabulary: [
      {
        thai: 'ตาม',
        transcription: 'dtaam',
        translation: { ru: 'следовать за / согласно', en: 'follow / according to' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['9', 'k', 'm'],
      },
      {
        thai: 'ชาม',
        transcription: 'chaam',
        translation: { ru: 'глубокая миска, чаша', en: 'bowl' },
        tone: 'mid',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['=', 'k', 'm'],
      },
      {
        thai: 'สาย',
        transcription: 'saai',
        translation: { ru: 'линия / поздний (по времени)', en: 'line / late' },
        tone: 'rising',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['l', 'k', 'P'],
      },
      {
        thai: 'ขาว',
        transcription: 'khaao',
        translation: { ru: 'белый цвет', en: 'white color' },
        tone: 'rising',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['-', 'k', ';'],
      },
    ],
  },

  {
    id: 15,
    lessonCode: '4.4',
    chapter: 4,
    day: 4,
    stageTitle: {
      ru: 'Глава 4 (День 4): Живые окончания слогов (Live Endings)',
      en: 'Chapter 4 (Day 4): Live Syllable Endings',
    },
    chapterToneRule: {
      ru: 'Комплексный тренинг живых закрытых слогов со всеми сонорными окончаниями.',
      en: 'Comprehensive drill of live closed syllables with all sonorant endings.',
    },
    title: {
      ru: 'Урок 4.4: Комплексный тренинг живых закрытых слогов',
      en: 'Lesson 4.4: Comprehensive Live Closed Syllable Drill',
    },
    subtitle: {
      ru: 'Отработка 3-буквенных и 4-буквенных слов: บาง, สาม, ลิง, ยืน',
      en: 'Drilling 3 and 4-letter words: บาง, สาม, ลิง, ยืน',
    },
    ruleSummary: {
      ru: 'Закрепление трех классов согласных со всеми сонорными окончаниями.',
      en: 'Consolidating all 3 consonant classes with sonorant finals.',
    },
    theoryNote: {
      ru: 'В живом слоге гласная может быть как долгой, так и короткой — сонорный хвост берет на себя вытягивание звука и делает слог живым!',
      en: 'In live closed syllables, sonorant endings carry tone resonance.',
    },
    toneRule: {
      ru: 'Высокий класс = Восходящий (สาม). Средний и низкий = Средний (บาง, ลิง, ยืน).',
      en: 'High = Rising (สาม); Mid and Low = Mid (บาง, ลิง, ยืน).',
    },
    typingRule: {
      ru: 'Для ลิง: ล (]) → ิ (B) → ง (\'). Для ยืน: ย (P) → ื (N) → น (O).',
      en: 'For ลิง: ล → ิ → ง. For ยืน: ย → ื → น.',
    },
    keys: [],
    drills: ['บาง', 'สาม', 'ลิง', 'ยืน', 'กลาง', 'งาน', 'ยืม', 'นาน'],
    vocabulary: [
      {
        thai: 'บาง',
        transcription: 'baang',
        translation: { ru: 'тонкий / район, поселение (как Бангкок)', en: 'thin / district' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['[', 'k', "'"],
      },
      {
        thai: 'สาม',
        transcription: 'saam',
        translation: { ru: 'три (цифра 3)', en: 'three (3)' },
        tone: 'rising',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['l', 'k', 'm'],
      },
      {
        thai: 'ลิง',
        transcription: 'ling',
        translation: { ru: 'обезьяна', en: 'monkey' },
        tone: 'mid',
        class: 'low',
        syllableType: 'live',
        typingSteps: [']', 'b', "'"],
      },
      {
        thai: 'ยืน',
        transcription: 'yuun',
        translation: { ru: 'стоять на ногах', en: 'stand up' },
        tone: 'mid',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['P', 'n', 'o'],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // ГЛАВА 5 (ДЕНЬ 5): Мертвые слоги и отсечки (Dead Syllables)
  // ══════════════════════════════════════════════════════════════════════════════
  {
    id: 16,
    lessonCode: '5.1',
    chapter: 5,
    day: 5,
    stageTitle: {
      ru: 'Глава 5 (День 5): Мертвые слоги и отсечки (Dead Syllables)',
      en: 'Chapter 5 (Day 5): Dead Syllables & Stop Finals',
    },
    chapterToneRule: {
      ru: 'Средний и Высокий классы в мертвом слоге ПАДАЮТ В НИЗКИЙ ТОН (Low Tone). Голос спотыкается.',
      en: 'Mid and High classes in a dead syllable drop to LOW TONE.',
    },
    title: {
      ru: 'Урок 5.1: Взрывной финал แม่กก (-k) → буквы ก, ข, ค в конце',
      en: 'Lesson 5.1: Stop Final Mae Kok (-k) → Letters ก, ข, ค',
    },
    subtitle: {
      ru: 'Гортанный затвор [-к] без выдоха: рот захлопывается',
      en: 'Unreleased glottal stop [-k]: airflow trapped at vocal cords',
    },
    ruleSummary: {
      ru: 'Любая из букв ก, ข, ค в конце звучит как глухой [-к]. Слог умирает → Низкий тон.',
      en: 'Letters ก, ข, ค at the end neutralize to [-k]. Syllable dies → Low Tone.',
    },
    theoryNote: {
      ru: 'В конце слова буквы ก, ข, ค превращаются в глухую гортанную смычку [-к] (звук запечатывается связками без выдоха).',
      en: 'Final letters ก, ข, ค become an unreleased velar stop [-k].',
    },
    toneRule: {
      ru: 'Средний класс (ปาก, ตาก) и Высокий класс (ฝาก) в мертвом слоге дают Низкий тон (Low Tone).',
      en: 'Mid and High classes produce Low Tone in dead syllables.',
    },
    typingRule: {
      ru: 'Набор финали: KeyD (ก) в конце слова.',
      en: 'Press KeyD (ก) at the end of the word.',
    },
    keys: [],
    drills: ['ปาก', 'ตาก', 'ดาก', 'ขาก', 'ผาก', 'ฉาก', 'ฝาก'],
    vocabulary: [
      {
        thai: 'ปาก',
        transcription: 'bpaak',
        translation: { ru: 'рот, губы / клюв', en: 'mouth, lips' },
        tone: 'low',
        class: 'mid',
        syllableType: 'dead',
        typingSteps: ['x', 'k', 'd'],
      },
      {
        thai: 'ตาก',
        transcription: 'dtaak',
        translation: { ru: 'сушить на солнце', en: 'dry in the sun' },
        tone: 'low',
        class: 'mid',
        syllableType: 'dead',
        typingSteps: ['9', 'k', 'd'],
      },
      {
        thai: 'ฝาก',
        transcription: 'faak',
        translation: { ru: 'оставлять на хранение / передавать привет', en: 'deposit / entrust' },
        tone: 'low',
        class: 'high',
        syllableType: 'dead',
        typingSteps: ['/', 'k', 'd'],
      },
      {
        thai: 'ฉาก',
        transcription: 'chaak',
        translation: { ru: 'ширма / сцена, эпизод', en: 'screen / scene' },
        tone: 'low',
        class: 'high',
        syllableType: 'dead',
        typingSteps: ['C', 'k', 'd'],
      },
    ],
  },

  {
    id: 17,
    lessonCode: '5.2',
    chapter: 5,
    day: 5,
    stageTitle: {
      ru: 'Глава 5 (День 5): Мертвые слоги и отсечки (Dead Syllables)',
      en: 'Chapter 5 (Day 5): Dead Syllables & Stop Finals',
    },
    chapterToneRule: {
      ru: 'Мертвый слог с взрывным звуком (-k, -t, -p) дает Низкий тон для Среднего и Высокого классов.',
      en: 'Dead syllables with stop endings (-k, -t, -p) drop to Low Tone for Mid and High classes.',
    },
    title: {
      ru: 'Урок 5.2: Взрывной финал แม่กบ (-p) → буквы บ, ป, พ, ฟ в конце',
      en: 'Lesson 5.2: Stop Final Mae Kop (-p) → Letters บ, ป, พ, ฟ',
    },
    subtitle: {
      ru: 'Губной схлоп [-п] без размыкания губ',
      en: 'Bilabial stop [-p] without lip release',
    },
    ruleSummary: {
      ru: 'บ, ป, พ, ฟ на конце слога звучат как глухой отсекающий [-п].',
      en: 'All labials at the end close into an unreleased [-p].',
    },
    theoryNote: {
      ru: 'На конце слога любые губные согласные схлопываются губами в глухой звук [-п] без размыкания губ. Воздух запирается в полости рта.',
      en: 'All labial consonants close the lips into an unreleased [-p].',
    },
    toneRule: {
      ru: 'Средний класс (ดาบ) и Высокий класс (สาบ) падают в Низкий тон.',
      en: 'Mid and High classes drop to Low Tone.',
    },
    typingRule: {
      ru: 'Финаль บ нажимается клавишей BracketLeft ([).',
      en: 'Final บ is pressed with BracketLeft ([).',
    },
    keys: [],
    drills: ['ดาบ', 'ตาบ', 'ปาบ', 'สาบ', 'ขาบ', 'ภาพ', 'แบบ'],
    vocabulary: [
      {
        thai: 'ดาบ',
        transcription: 'daap',
        translation: { ru: 'меч, сабля', en: 'sword' },
        tone: 'low',
        class: 'mid',
        syllableType: 'dead',
        typingSteps: ['f', 'k', '['],
      },
      {
        thai: 'สาบ',
        transcription: 'saap',
        translation: { ru: 'запах затхлости / подгиб края', en: 'musty odor' },
        tone: 'low',
        class: 'high',
        syllableType: 'dead',
        typingSteps: ['l', 'k', '['],
      },
      {
        thai: 'ภาพ',
        transcription: 'phaap',
        translation: { ru: 'картина / образ (Низкий класс долгий мертвый = Falling)', en: 'image, picture' },
        tone: 'falling',
        class: 'low',
        syllableType: 'dead',
        typingSteps: ['r', 'k', 'r'],
      },
    ],
  },

  {
    id: 18,
    lessonCode: '5.3',
    chapter: 5,
    day: 5,
    stageTitle: {
      ru: 'Глава 5 (День 5): Мертвые слоги и отсечки (Dead Syllables)',
      en: 'Chapter 5 (Day 5): Dead Syllables & Stop Finals',
    },
    chapterToneRule: {
      ru: 'Финал แม่กด (-t) — самый объемный в тайском языке. Глухая отсечка [-т].',
      en: 'Mae Kot (-t) is the largest final class in Thai, ending in sharp [-t].',
    },
    title: {
      ru: 'Урок 5.3: «Зоопарк» финала แม่กด (-t) → ด, ต, จ, ช, ซ, ท, ส',
      en: 'Lesson 5.3: The Zoo of Mae Kot (-t) → ด, ต, จ, ช, ซ, ท, ส',
    },
    subtitle: {
      ru: 'Все шипящие и зубные на конце слога читаются строго как отсечка [-т]!',
      en: 'All sibilants and dentals at syllable end become unreleased [-t]!',
    },
    ruleSummary: {
      ru: 'ด, ต, จ, ช, ซ, ท, ส в конце слова превращаются в глухой звук [-т]. Слог мертвый.',
      en: 'All these letters neutralize to stop [-t] in final position.',
    },
    theoryNote: {
      ru: 'Самый объемный финал в тайском языке. Все шипящие, зубные и аффрикаты в конце слога читаются строго как глухая отсечка [-т]. Язык прижимается к нёбу и звук обрывается.',
      en: 'All dentals, sibilants and affricates neutralize to unreleased [-t] at syllable end.',
    },
    toneRule: {
      ru: 'Мертвый слог с финалом แม่กด: Средний и Высокий классы дают Низкий тон.',
      en: 'Dead syllable with Mae Kot final: Mid & High classes give Low Tone.',
    },
    typingRule: {
      ru: 'Печатайте точно указанную букву финали: ด (KeyF), ส (KeyL), ต (Digit9).',
      en: 'Type the exact final consonant required.',
    },
    keys: [],
    drills: ['กาด', 'ขาด', 'สาด', 'หาด', 'ชาด', 'ตรวจ', 'กอด'],
    vocabulary: [
      {
        thai: 'ขาด',
        transcription: 'khaat',
        translation: { ru: 'разорванный / отсутствовать', en: 'torn / missing' },
        tone: 'low',
        class: 'high',
        syllableType: 'dead',
        typingSteps: ['-', 'k', 'f'],
      },
      {
        thai: 'หาด',
        transcription: 'haat',
        translation: { ru: 'пляж, песчаная коса', en: 'beach, coast' },
        tone: 'low',
        class: 'high',
        syllableType: 'dead',
        typingSteps: ['s', 'k', 'f'],
      },
      {
        thai: 'กอด',
        transcription: 'gaawt',
        translation: { ru: 'обнимать', en: 'hug, embrace' },
        tone: 'low',
        class: 'mid',
        syllableType: 'dead',
        typingSteps: ['d', 'v', 'f'],
      },
    ],
  },

  {
    id: 19,
    lessonCode: '5.4',
    chapter: 5,
    day: 5,
    stageTitle: {
      ru: 'Глава 5 (День 5): Мертвые слоги и отсечки (Dead Syllables)',
      en: 'Chapter 5 (Day 5): Dead Syllables & Stop Finals',
    },
    chapterToneRule: {
      ru: 'Сортировочный дрилл: мгновенное распознавание Живого слога против Мертвого.',
      en: 'Sorting drill: instant recognition of Live vs Dead syllable.',
    },
    title: {
      ru: 'Урок 5.4: Анализ типа слога: Живой vs Мертвый (Сортировочный дрилл)',
      en: 'Lesson 5.4: Syllable Analysis: Live vs Dead (Sorting Drill)',
    },
    subtitle: {
      ru: 'Контраст: หาง (Live: Rising) ↔ หาก (Dead: Low), ปาน (Live) ↔ ปาด (Dead)',
      en: 'Contrast: หาง (Live: Rising) ↔ หาก (Dead: Low), ปาน (Live) ↔ ปาด (Dead)',
    },
    ruleSummary: {
      ru: 'Сонорный хвост = Живой слог; Взрывной хвост (-k, -t, -p) = Мертвый слог.',
      en: 'Sonorant final = Live syllable; Stop final (-k, -t, -p) = Dead syllable.',
    },
    theoryNote: {
      ru: 'Определение тона по финальной букве. Ввод с мгновенной проверкой тона. Почувствуйте, как меняется интонация при замене всего одной последней буквы!',
      en: 'Observe how replacing only the final consonant flips the entire pitch contour.',
    },
    toneRule: {
      ru: 'Живой слог сохраняет свободный тон; Мертвый слог сбрасывает голос вниз (Низкий тон).',
      en: 'Live syllables sustain tone; Dead syllables drop to Low Tone.',
    },
    typingRule: {
      ru: 'Печатайте пары слитно и слушайте разницу интонации связок.',
      en: 'Type pairs sequentially and listen to the vocal cutoff.',
    },
    keys: [],
    drills: ['หาง', 'หาก', 'ปาน', 'ปาด', 'สาน', 'สาด', 'ดาน', 'ดาบ'],
    vocabulary: [
      {
        thai: 'หาง',
        transcription: 'haang',
        translation: { ru: 'хвост (Живой: Восходящий)', en: 'tail (Live: Rising)' },
        tone: 'rising',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['s', 'k', "'"],
      },
      {
        thai: 'หาก',
        transcription: 'haak',
        translation: { ru: 'если (Мертвый: Низкий)', en: 'if (Dead: Low)' },
        tone: 'low',
        class: 'high',
        syllableType: 'dead',
        typingSteps: ['s', 'k', 'd'],
      },
      {
        thai: 'ปาน',
        transcription: 'bpaan',
        translation: { ru: 'родинка, родимое пятно (Живой: Средний)', en: 'birthmark (Live: Mid)' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['x', 'k', 'o'],
      },
      {
        thai: 'ปาด',
        transcription: 'bpaat',
        translation: { ru: 'счищать, срезать (Мертвый: Низкий)', en: 'scrape off (Dead: Low)' },
        tone: 'low',
        class: 'mid',
        syllableType: 'dead',
        typingSteps: ['x', 'k', 'f'],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // ГЛАВА 6 (ДЕНЬ 6): Короткие гласные и Мертвые слоги Низкого класса
  // ══════════════════════════════════════════════════════════════════════════════
  {
    id: 20,
    lessonCode: '6.1',
    chapter: 6,
    day: 6,
    stageTitle: {
      ru: 'Глава 6 (День 6): Короткие гласные и Мертвые слоги Низкого класса',
      en: 'Chapter 6 (Day 6): Short Vowels & Low Class Dead Syllables',
    },
    chapterToneRule: {
      ru: 'Открытый короткий слог приравнивается к мертвому. Низкий класс ломает паттерн!',
      en: 'Open short syllable is dead. Low class diverges with High and Falling tones.',
    },
    title: {
      ru: 'Урок 6.1: Короткие гласные ( -ะ, -ิ, -ุ )',
      en: 'Lesson 6.1: Short Vowels ( -ะ, -ิ, -ุ )',
    },
    subtitle: {
      ru: 'Связочный обрыв: ะ (T), ิ (B), ุ (6)',
      en: 'Glottal stop cutoff: ะ (T), ิ (B), ุ (6)',
    },
    ruleSummary: {
      ru: 'Короткие открытые гласные обрываются связочным щелчком = Мертвый слог → Low Tone для среднего класса.',
      en: 'Short open vowels cut off with a glottal click = Dead syllable → Low Tone for mid class.',
    },
    theoryNote: {
      ru: 'Гласная ะ пишется справа. Гласная ิ — короткий [и] над буквой. Гласная ุ — короткий [у] под буквой. Без финальной согласной они обрываются резким смыканием связок.',
      en: 'Sara A (ะ), Sara I (ิ), and Sara U (ุ) end in a sharp glottal stop without final consonant.',
    },
    toneRule: {
      ru: 'Средний и Высокий классы + короткая гласная = Низкий тон (Low Tone).',
      en: 'Mid & High classes + short vowel = Low Tone.',
    },
    typingRule: {
      ru: 'ะ — KeyT, ิ — KeyB, ุ — Digit6.',
      en: 'ะ is KeyT, ิ is KeyB, ุ is Digit6.',
    },
    keys: [
      {
        thai: 'ะ',
        qwerty: 't',
        keyCode: 'KeyT',
        finger: 'left-index',
        hand: 'left',
        name: { ru: 'Висанчани ( -ะ )', en: 'Wisanchani ( -ะ )' },
        role: 'vowel',
        sound: '[-a] короткий гласный со связочным щелчком',
      },
      {
        thai: 'ุ',
        qwerty: '6',
        keyCode: 'Digit6',
        finger: 'right-index',
        hand: 'right',
        name: { ru: 'Сара У ( -ุ )', en: 'Sara U ( -ุ )' },
        role: 'vowel',
        sound: '[-u] короткий нижний гласный',
      },
    ],
    drills: ['กะ', 'ดะ', 'ตะ', 'ปะ', 'กิ', 'ติ', 'ปิ', 'กุ', 'ดุ', 'ตุ'],
    vocabulary: [
      {
        thai: 'กะ',
        transcription: 'ga',
        translation: { ru: 'приблизительно, оценивать', en: 'estimate, rough' },
        tone: 'low',
        class: 'mid',
        syllableType: 'dead',
        typingSteps: ['d', 't'],
      },
      {
        thai: 'ปะ',
        transcription: 'bpa',
        translation: { ru: 'латать / сталкиваться', en: 'patch / meet' },
        tone: 'low',
        class: 'mid',
        syllableType: 'dead',
        typingSteps: ['x', 't'],
      },
      {
        thai: 'ดุ',
        transcription: 'du',
        translation: { ru: 'свирепый / ругать', en: 'fierce / scold' },
        tone: 'low',
        class: 'mid',
        syllableType: 'dead',
        typingSteps: ['f', '6'],
      },
    ],
  },

  {
    id: 21,
    lessonCode: '6.2',
    chapter: 6,
    day: 6,
    stageTitle: {
      ru: 'Глава 6 (День 6): Короткие гласные и Мертвые слоги Низкого класса',
      en: 'Chapter 6 (Day 6): Short Vowels & Low Class Dead Syllables',
    },
    chapterToneRule: {
      ru: 'Низкий класс + Короткий мертвый слог = ВЫСОКИЙ ТОН (High Tone)! Голос взлетает вверх.',
      en: 'Low Class + Short Dead Syllable = HIGH TONE! Pitch stays up.',
    },
    title: {
      ru: 'Урок 6.2: Низкий класс + Короткий мертвый = Высокий тон (High Tone)',
      en: 'Lesson 6.2: Low Class + Short Dead = High Tone',
    },
    subtitle: {
      ru: 'Вежливые частицы คะ, นะ, знак Май-ханакат (-ั) и слово รัก',
      en: 'Polite particles คะ, นะ, Mai Han-akat (-ั) and word รัก',
    },
    ruleSummary: {
      ru: 'Низкий класс в коротком мертвом слоге дает Высокий тон: คะ, นะ, รัก.',
      en: 'Low class in short dead syllable yields High Tone: คะ, นะ, รัก.',
    },
    theoryNote: {
      ru: 'Короткий взрывной слог с согласной низкого класса выталкивает интонацию на самый верх регистра. Когда к короткому ะ добавляется конечная согласная, он мутирует в шапочку ั (KeyY): รัก (rak) = ร + ั + ก.',
      en: 'Short dead syllable with low class triggers High Tone. Sara A transforms into Mai Han-akat (ั) when closed.',
    },
    toneRule: {
      ru: 'Низкий класс + Короткая гласная / взрывной конец = Высокий тон (High Tone).',
      en: 'Low Class + Short Vowel / Stop Final = High Tone.',
    },
    typingRule: {
      ru: 'Для รัก: ร (KeyI) + ั (KeyY) + ก (KeyD).',
      en: 'For รัก: ร (I) + ั (Y) + ก (D).',
    },
    keys: [
      {
        thai: 'ั',
        qwerty: 'y',
        keyCode: 'KeyY',
        finger: 'right-index',
        hand: 'right',
        name: { ru: 'Май-ханакат ( -ั )', en: 'Mai Han-akat ( -ั )' },
        role: 'vowel',
        sound: 'Мутировавший короткий гласный [a] перед согласной',
      },
    ],
    drills: ['คะ', 'นะ', 'ละ', 'พะ', 'คึก', 'นึก', 'รัก', 'มัก', 'พัก'],
    vocabulary: [
      {
        thai: 'คะ',
        transcription: 'kha',
        translation: { ru: 'вежливая частица женщины (вопрос)', en: 'polite female question particle' },
        tone: 'high',
        class: 'low',
        syllableType: 'dead',
        typingSteps: ['7', 't'],
      },
      {
        thai: 'นะ',
        transcription: 'na',
        translation: { ru: 'смягчающая частица («ладно?», «хорошо?»)', en: 'softening particle' },
        tone: 'high',
        class: 'low',
        syllableType: 'dead',
        typingSteps: ['o', 't'],
      },
      {
        thai: 'รัก',
        transcription: 'rak',
        translation: { ru: 'любить', en: 'love' },
        tone: 'high',
        class: 'low',
        syllableType: 'dead',
        typingSteps: ['i', 'y', 'd'],
      },
    ],
  },

  {
    id: 22,
    lessonCode: '6.3',
    chapter: 6,
    day: 6,
    stageTitle: {
      ru: 'Глава 6 (День 6): Короткие гласные и Мертвые слоги Низкого класса',
      en: 'Chapter 6 (Day 6): Short Vowels & Low Class Dead Syllables',
    },
    chapterToneRule: {
      ru: 'Низкий класс + Долгий мертвый слог = ПАДАЮЩИЙ ТОН (Falling Tone)! Резкое ударение вниз.',
      en: 'Low Class + Long Dead Syllable = FALLING TONE! Emphatic drop.',
    },
    title: {
      ru: 'Урок 6.3: Низкий класс + Долгий мертвый = Падающий тон (Falling Tone)',
      en: 'Lesson 6.3: Low Class + Long Dead = Falling Tone',
    },
    subtitle: {
      ru: 'Слова มาก, พูด, ภาพ, มีด: почему они падают с высокой ноты вниз',
      en: 'Words มาก, พูด, ภาพ, มีด: why they plunge from high pitch',
    },
    ruleSummary: {
      ru: 'Низкий класс + долгая гласная + взрывной конец = Падающий тон.',
      en: 'Low class + long vowel + stop ending = Falling Tone.',
    },
    theoryNote: {
      ru: 'Долгая гласная дает время на подъем голоса, а взрывной финал заставляет голос резко сорваться вниз. Получается эффект резкой команды: «нет!» или «стой!».',
      en: 'The long vowel allows pitch to peak, then the stop final causes an abrupt plunge: Falling Tone.',
    },
    toneRule: {
      ru: 'Низкий класс + Долгая гласная + Мертвый финал = Падающий тон (Falling Tone).',
      en: 'Low Class + Long Vowel + Dead Final = Falling Tone.',
    },
    typingRule: {
      ru: 'Сначала начальная согласная низкого класса, затем долгая гласная, затем финал.',
      en: 'Initial low consonant → Long vowel → Stop final.',
    },
    keys: [],
    drills: ['มาก', 'ราก', 'ลาก', 'พูด', 'รูด', 'คาด', 'ทอด', 'มีด'],
    vocabulary: [
      {
        thai: 'มาก',
        transcription: 'maak',
        translation: { ru: 'очень / много', en: 'very / much' },
        tone: 'falling',
        class: 'low',
        syllableType: 'dead',
        typingSteps: ['m', 'k', 'd'],
      },
      {
        thai: 'พูด',
        transcription: 'phuut',
        translation: { ru: 'говорить, разговаривать', en: 'speak, talk' },
        tone: 'falling',
        class: 'low',
        syllableType: 'dead',
        typingSteps: ['r', 'P', 'f'],
      },
      {
        thai: 'มีด',
        transcription: 'miit',
        translation: { ru: 'нож', en: 'knife' },
        tone: 'falling',
        class: 'low',
        syllableType: 'dead',
        typingSteps: ['m', 'u', 'f'],
      },
    ],
  },

  {
    id: 23,
    lessonCode: '6.4',
    chapter: 6,
    day: 6,
    stageTitle: {
      ru: 'Глава 6 (День 6): Короткие гласные и Мертвые слоги Низкого класса',
      en: 'Chapter 6 (Day 6): Short Vowels & Low Class Dead Syllables',
    },
    chapterToneRule: {
      ru: 'Лаборатория длины гласных: сравнение длины гласной и смены тонов.',
      en: 'Vowel length laboratory: comparing length and tone shifts.',
    },
    title: {
      ru: 'Урок 6.4: Лаборатория длины гласных (Long vs Short Contrast)',
      en: 'Lesson 6.4: Vowel Length Lab (Long vs Short Contrast)',
    },
    subtitle: {
      ru: 'Контрасты: ปะ ↔ ปา, รัก (High) ↔ ราก (Falling), มัด ↔ มาด',
      en: 'Contrasts: ปะ ↔ ปา, รัก (High) ↔ ราก (Falling), มัด ↔ มาด',
    },
    ruleSummary: {
      ru: 'Длина гласной меняет тон у согласных низкого класса: короткая = High, долгая = Falling.',
      en: 'Vowel length flips tone in low class dead syllables: short = High, long = Falling.',
    },
    theoryNote: {
      ru: 'Сравнение длины гласной и смены тонов на одинаковых согласных. У низкого класса короткий мертвый взлетает в High, а долгий мертвый срывается в Falling!',
      en: 'Notice the dramatic tone flip: short dead is High, long dead is Falling.',
    },
    toneRule: {
      ru: 'Короткий = High Tone; Долгий = Falling Tone.',
      en: 'Short = High Tone; Long = Falling Tone.',
    },
    typingRule: {
      ru: 'Печатайте пары слитно и слушайте переход High → Falling.',
      en: 'Type pairs sequentially and listen to the High → Falling shift.',
    },
    keys: [],
    drills: ['ปะ', 'ปา', 'รัก', 'ราก', 'มัด', 'มาด', 'คึก', 'คูก'],
    vocabulary: [
      {
        thai: 'รัก',
        transcription: 'rak',
        translation: { ru: 'любить (Короткий: Высокий тон)', en: 'love (Short: High)' },
        tone: 'high',
        class: 'low',
        syllableType: 'dead',
        typingSteps: ['i', 'y', 'd'],
      },
      {
        thai: 'ราก',
        transcription: 'raak',
        translation: { ru: 'корень (Долгий: Падающий тон)', en: 'root (Long: Falling)' },
        tone: 'falling',
        class: 'low',
        syllableType: 'dead',
        typingSteps: ['i', 'k', 'd'],
      },
      {
        thai: 'ปะ',
        transcription: 'bpa',
        translation: { ru: 'латать (Средний класс короткий: Низкий тон)', en: 'patch (Mid Short: Low)' },
        tone: 'low',
        class: 'mid',
        syllableType: 'dead',
        typingSteps: ['x', 't'],
      },
      {
        thai: 'ปา',
        transcription: 'bpaa',
        translation: { ru: 'бросать (Средний класс долгий: Средний тон)', en: 'throw (Mid Long: Mid)' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['x', 'k'],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // ГЛАВА 7 (ДЕНЬ 7): Тоновые знаки (Tone Marks)
  // ══════════════════════════════════════════════════════════════════════════════
  {
    id: 24,
    lessonCode: '7.1',
    chapter: 7,
    day: 7,
    stageTitle: {
      ru: 'Глава 7 (День 7): Тоновые знаки (Tone Marks)',
      en: 'Chapter 7 (Day 7): Tone Marks & Stacking Order',
    },
    chapterToneRule: {
      ru: 'Знаки тонов ставятся над согласной или над верхней гласной. Средний класс берет все 5 тонов!',
      en: 'Tone marks sit over consonants or upper vowels. Mid class covers all 5 tones.',
    },
    title: {
      ru: 'Урок 7.1: Тоновые знаки со Средним классом (่, ้, ๊, ๋)',
      en: 'Lesson 7.1: Tone Marks with Mid Class (่, ้, ๊, ๋)',
    },
    subtitle: {
      ru: 'Май Эк (H), Май Тхо (J), Май Три (Shift+7), Май Чаттава (Shift+8)',
      en: 'Mai Ek (H), Mai Tho (J), Mai Tri (Shift+7), Mai Chattawa (Shift+8)',
    },
    ruleSummary: {
      ru: 'Средний класс подчиняется знакам буквально: без знака = Mid, ่ = Low, ้ = Falling, ๊ = High, ๋ = Rising.',
      en: 'Mid class mirrors marks directly: none = Mid, ่ = Low, ้ = Falling, ๊ = High, ๋ = Rising.',
    },
    theoryNote: {
      ru: 'Средний класс — единственный, способный спеть все 5 тонов со знаками. Знак ่ делает тон Низким, знак ้ делает тон Падающим.',
      en: 'Mid class is the only class that can express all 5 tones with marks.',
    },
    toneRule: {
      ru: '่ = Low Tone, ้ = Falling Tone, ๊ = High Tone, ๋ = Rising Tone.',
      en: '่ = Low, ้ = Falling, ๊ = High, ๋ = Rising.',
    },
    typingRule: {
      ru: '่ нажимается клавишей KeyH, ้ нажимается клавишей KeyJ.',
      en: 'Press KeyH for ่, KeyJ for ้.',
    },
    keys: [
      {
        thai: '่',
        qwerty: 'h',
        keyCode: 'KeyH',
        finger: 'right-index',
        hand: 'right',
        name: { ru: 'Май Эк ( -่ )', en: 'Mai Ek ( -่ )' },
        role: 'tone_mark',
        sound: 'Знак 1-го тона (Low Tone со средним классом)',
      },
      {
        thai: '้',
        qwerty: 'j',
        keyCode: 'KeyJ',
        finger: 'right-index',
        hand: 'right',
        name: { ru: 'Май Тхо ( -้ )', en: 'Mai Tho ( -้ )' },
        role: 'tone_mark',
        sound: 'Знак 2-го тона (Falling Tone со средним классом)',
      },
    ],
    drills: ['กา', 'ก่า', 'ก้า', 'ก๊า', 'ก๋า', 'ปา', 'ป่า', 'ป้า', 'ป๊า', 'ป๋า'],
    vocabulary: [
      {
        thai: 'ป่า',
        transcription: 'bpaa',
        translation: { ru: 'лес, джунгли', en: 'forest, woods' },
        tone: 'low',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['x', 'h', 'k'],
      },
      {
        thai: 'ป้า',
        transcription: 'bpaa',
        translation: { ru: 'тётя (старшая сестра родителей)', en: 'elder aunt' },
        tone: 'falling',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['x', 'j', 'k'],
      },
      {
        thai: 'โต๊ะ',
        transcription: 'dto',
        translation: { ru: 'стол', en: 'table' },
        tone: 'high',
        class: 'mid',
        syllableType: 'dead',
        typingSteps: ['#', '9', 'j', 't'],
      },
      {
        thai: 'ตั๋ว',
        transcription: 'dtua',
        translation: { ru: 'билет', en: 'ticket' },
        tone: 'rising',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['9', 'y', '*', ';'],
      },
    ],
  },

  {
    id: 25,
    lessonCode: '7.2',
    chapter: 7,
    day: 7,
    stageTitle: {
      ru: 'Глава 7 (День 7): Тоновые знаки (Tone Marks)',
      en: 'Chapter 7 (Day 7): Tone Marks & Stacking Order',
    },
    chapterToneRule: {
      ru: 'Высокий класс использует только 2 знака: ่ дает Low Tone, ้ дает Falling Tone.',
      en: 'High class uses only 2 tone marks: ่ produces Low, ้ produces Falling.',
    },
    title: {
      ru: 'Урок 7.2: Тоновые знаки с Высоким классом',
      en: 'Lesson 7.2: Tone Marks with High Class',
    },
    subtitle: {
      ru: 'Связки ขา (Rising) → ข่า (Low) → ข้า (Falling)',
      en: 'Combos ขา (Rising) → ข่า (Low) → ข้า (Falling)',
    },
    ruleSummary: {
      ru: 'Высокий класс сам по себе поет Rising. Знак ่ сбрасывает в Low, знак ้ переводит в Falling.',
      en: 'High class is inherently Rising. ่ forces Low Tone, ้ forces Falling Tone.',
    },
    theoryNote: {
      ru: 'У высокого класса нет знаков ๊ и ๋, потому что высокий класс сам по себе поет Rising. Знак ่ принудительно делает тон Низким (Low), а знак ้ делает тон Падающим (Falling).',
      en: 'High class never takes ๊ or ๋ marks. Mark ่ yields Low, ้ yields Falling.',
    },
    toneRule: {
      ru: 'Высокий класс: без знака = Rising, ่ = Low, ้ = Falling.',
      en: 'High class: none = Rising, ่ = Low, ้ = Falling.',
    },
    typingRule: {
      ru: 'Печатайте согласную высокого класса (ข, ส, ห), затем знак тона (KeyH, KeyJ), затем гласную.',
      en: 'Type initial high consonant → Tone mark → Vowel.',
    },
    keys: [],
    drills: ['ขา', 'ข่า', 'ข้า', 'สา', 'ส่า', 'ส้า', 'หา', 'ห่า', 'ห้า'],
    vocabulary: [
      {
        thai: 'ข่า',
        transcription: 'khaa',
        translation: { ru: 'галангал (корень)', en: 'galangal root' },
        tone: 'low',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['-', 'h', 'k'],
      },
      {
        thai: 'ข้า',
        transcription: 'khaa',
        translation: { ru: 'я / слуга (архаичн./лит.)', en: 'I, me / servant' },
        tone: 'falling',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['-', 'j', 'k'],
      },
      {
        thai: 'ห้า',
        transcription: 'haa',
        translation: { ru: 'пять (цифра 5)', en: 'five (5)' },
        tone: 'falling',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['s', 'j', 'k'],
      },
    ],
  },

  {
    id: 26,
    lessonCode: '7.3',
    chapter: 7,
    day: 7,
    stageTitle: {
      ru: 'Глава 7 (День 7): Тоновые знаки (Tone Marks)',
      en: 'Chapter 7 (Day 7): Tone Marks & Stacking Order',
    },
    chapterToneRule: {
      ru: 'Сдвиг знаков у Низкого класса: знак ่ дает Falling Tone, а знак ้ дает High Tone!',
      en: 'Low class tone shift: mark ่ creates Falling Tone, mark ้ creates High Tone!',
    },
    title: {
      ru: 'Урок 7.3: Сдвиг знаков у Низкого класса (Май Эк → Falling, Май Тхо → High)',
      en: 'Lesson 7.3: Tone Shift in Low Class (Mai Ek → Falling, Mai Tho → High)',
    },
    subtitle: {
      ru: '«Коварное правило»: Низкий класс всегда делает шаг вперед по шкале тонов',
      en: 'The insidious shift: Low class advances one step up the tone scale',
    },
    ruleSummary: {
      ru: 'Низкий класс со знаком ่ звучит в Падающем тоне, а со знаком ้ — в Высоком.',
      en: 'Low class with mark ่ yields Falling Tone; with mark ้ yields High Tone.',
    },
    theoryNote: {
      ru: '«Коварное правило»: Низкий класс не слушается названий знаков. Знак 1 (่) дает Падающий тон (Falling). Знак 2 (้) дает Высокий тон (High). Это главное правило, на котором ошибаются новички!',
      en: 'Major rule: Low class with Mai Ek (่) creates Falling Tone. Low class with Mai Tho (้) creates High Tone.',
    },
    toneRule: {
      ru: 'Низкий класс + ่ = Falling Tone; Низкий класс + ้ = High Tone.',
      en: 'Low Class + ่ = Falling Tone; Low Class + ้ = High Tone.',
    },
    typingRule: {
      ru: 'Согласная низкого класса (ค, ม, ท) + KeyH или KeyJ.',
      en: 'Low class consonant + KeyH or KeyJ.',
    },
    keys: [],
    drills: ['คา', 'ค่า', 'ค้า', 'มา', 'ม่า', 'ม้า', 'ทา', 'ท่า', 'ท้า'],
    vocabulary: [
      {
        thai: 'ค่า',
        transcription: 'khaa',
        translation: { ru: 'цена, стоимость, ценность', en: 'value, cost' },
        tone: 'falling',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['7', 'h', 'k'],
      },
      {
        thai: 'ค้า',
        transcription: 'khaa',
        translation: { ru: 'торговать, вести торговлю', en: 'trade, do business' },
        tone: 'high',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['7', 'j', 'k'],
      },
      {
        thai: 'ม่า',
        transcription: 'maa',
        translation: { ru: 'мама (разг. / лапша Мама)', en: 'mom / Mama noodles' },
        tone: 'falling',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['m', 'h', 'k'],
      },
      {
        thai: 'ม้า',
        transcription: 'maa',
        translation: { ru: 'лошадь, конь', en: 'horse' },
        tone: 'high',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['m', 'j', 'k'],
      },
    ],
  },

  {
    id: 27,
    lessonCode: '7.4',
    chapter: 7,
    day: 7,
    stageTitle: {
      ru: 'Глава 7 (День 7): Тоновые знаки (Tone Marks)',
      en: 'Chapter 7 (Day 7): Tone Marks & Stacking Order',
    },
    chapterToneRule: {
      ru: 'Unicode-стек ввода: Базовая согласная → Верхняя гласная → Тоновый знак → Финал.',
      en: 'Unicode stacking order: Base Consonant → Upper Vowel → Tone Mark → Final.',
    },
    title: {
      ru: 'Урок 7.4: Трехэтажный стек набора символов (Stacking Order Engine)',
      en: 'Lesson 7.4: 3-Tier Stacking Order Engine',
    },
    subtitle: {
      ru: 'Слова กิ่ง, น้ำ, ชิ้น: защита от поломки тайского шрифта',
      en: 'Words กิ่ง, น้ำ, ชิ้น: preventing font collision and rendering bugs',
    },
    ruleSummary: {
      ru: 'Сначала нажимается шапочка-гласная, затем тоновый знак поверх неё!',
      en: 'Vowel cap must be typed before placing tone mark on top.',
    },
    theoryNote: {
      ru: 'Жесткий порядок кодировки в Unicode: 1. Базовая согласная. 2. Верхняя или нижняя гласная (ิ, ี, ุ, ู). 3. Тоновый знак (่, ้). 4. Конечная согласная. Попытка нажать тоновый знак раньше верхней гласной блокируется интерфейсом!',
      en: 'Strict Unicode standard: Base consonant → Cap/bottom vowel → Tone mark → Final consonant.',
    },
    toneRule: {
      ru: 'Тоновый знак определяет итоговый тон слога.',
      en: 'Tone mark defines the resulting syllable tone.',
    },
    typingRule: {
      ru: 'Гласная ВСЕГДА предшествует тоновому знаку в стеке.',
      en: 'Vowel ALWAYS precedes tone mark in the stack.',
    },
    keys: [],
    drills: ['กิ่ง', 'น้ำ', 'ชิ้น', 'ลิ้น', 'ปิ้ง', 'ดื่ม', 'ทิ้ง'],
    vocabulary: [
      {
        thai: 'กิ่ง',
        transcription: 'ging',
        translation: { ru: 'ветка, сук', en: 'branch, twig' },
        tone: 'low',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['d', 'b', 'h', "'"],
      },
      {
        thai: 'น้ำ',
        transcription: 'naam',
        translation: { ru: 'вода', en: 'water' },
        tone: 'high',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['o', 'j', 'e'],
      },
      {
        thai: 'ชิ้น',
        transcription: 'chin',
        translation: { ru: 'кусок, штука, порция', en: 'piece, slice, item' },
        tone: 'high',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['=', 'b', 'j', 'o'],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // ГЛАВА 8 (ДЕНЬ 8): Сложные гласные и дифтонги (Complex Vowels)
  // ══════════════════════════════════════════════════════════════════════════════
  {
    id: 28,
    lessonCode: '8.1',
    chapter: 8,
    day: 8,
    stageTitle: {
      ru: 'Глава 8 (День 8): Сложные гласные и дифтонги (Complex Vowels)',
      en: 'Chapter 8 (Day 8): Complex Vowels & Diphthongs',
    },
    chapterToneRule: {
      ru: 'Препозиционные гласные (เ, แ, โ, ใ, ไ) всегда печатаются первыми, даже если читаются после согласной.',
      en: 'Prepositional vowels (เ, แ, โ, ใ, ไ) are always typed first.',
    },
    title: {
      ru: 'Урок 8.1: Дифтонги трех направлений ( เ-ีย, เ-ือ, -ัว )',
      en: 'Lesson 8.1: Three Directional Diphthongs ( เ-ีย, เ-ือ, -ัว )',
    },
    subtitle: {
      ru: 'Сложные сборные гласные: [иа], [ыа], [уа] и порядок их ввода',
      en: 'Compound diphthongs [ia], [uea], [ua] and keyboard sequence',
    },
    ruleSummary: {
      ru: 'เ-ีย [иа], เ-ือ [ыа], -ัว [уа] — трехсторонние сборные гласные.',
      en: 'Compound vowels surround consonant from left, top, and right.',
    },
    theoryNote: {
      ru: 'เ-ีย [иа]: слева เ, над буквой ี, справа ย. เ-ือ [ыа]: слева เ, над буквой ื, справа อ. -ัว [уа]: над буквой ั, справа ว (ตัว).',
      en: 'Sara Ia (เ-ีย), Sara Uea (เ-ือ), Sara Ua (-ัว) wrap around the initial consonant.',
    },
    toneRule: {
      ru: 'Все три дифтонга являются долгими гласными!',
      en: 'All three diphthongs act as long vowels.',
    },
    typingRule: {
      ru: 'Для เสีย: เ (KeyG) → ส (KeyL) → ี (KeyU) → ย (KeyP). Слева направо!',
      en: 'For เสีย: เ (G) → ส (L) → ี (U) → ย (P). Left to right!',
    },
    keys: [],
    drills: ['เสีย', 'เรือ', 'ตัว', 'เมีย', 'เสือ', 'หัว', 'เลีย', 'เกลือ'],
    vocabulary: [
      {
        thai: 'เสีย',
        transcription: 'siia',
        translation: { ru: 'сломанный, испорченный / терять', en: 'broken, spoiled / lose' },
        tone: 'rising',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['g', 'l', 'u', 'P'],
      },
      {
        thai: 'เรือ',
        transcription: 'ruua',
        translation: { ru: 'лодка, корабль', en: 'boat, ship' },
        tone: 'mid',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['g', 'i', 'n', 'v'],
      },
      {
        thai: 'ตัว',
        transcription: 'dtua',
        translation: { ru: 'тело / счетное слово для животных', en: 'body / classifier for animals' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['9', 'y', ';'],
      },
    ],
  },

  {
    id: 29,
    lessonCode: '8.2',
    chapter: 8,
    day: 8,
    stageTitle: {
      ru: 'Глава 8 (День 8): Сложные гласные и дифтонги (Complex Vowels)',
      en: 'Chapter 8 (Day 8): Complex Vowels & Diphthongs',
    },
    chapterToneRule: {
      ru: 'Препозиционные гласные แ и โ стоят перед согласной буквой.',
      en: 'Prepositional vowels แ and โ precede the consonant.',
    },
    title: {
      ru: 'Урок 8.2: Препозиционные гласные ( แ-, โ- )',
      en: 'Lesson 8.2: Prepositional Vowels ( แ-, โ- )',
    },
    subtitle: {
      ru: 'Широкий [аэ] на клавише C и долгий глубокий [оо] на Shift+3',
      en: 'Open [ae] on key C and long [oo] on Shift+3',
    },
    ruleSummary: {
      ru: 'Палец ОБЯЗАН нажать แ или โ ДО согласной, даже если мозг читает после.',
      en: 'Finger MUST press แ or โ BEFORE the consonant.',
    },
    theoryNote: {
      ru: 'แ [аэ] — широкий открытый звук «э». โ [оо] — долгий глубокий [о]. Оба знака стоят перед согласной буквой.',
      en: 'Sara Ae (แ) and Sara O (โ) are written before the initial consonant.',
    },
    toneRule: {
      ru: 'Обе гласные долгие. แม่ (Low Class + ่) = Falling Tone.',
      en: 'Both are long vowels. แม่ (Low + ่) = Falling Tone.',
    },
    typingRule: {
      ru: 'แ — KeyC, โ — Shift+Digit3 (หรือ KeyF/Shift).',
      en: 'แ is KeyC, โ is Shift+Digit3.',
    },
    keys: [
      {
        thai: 'แ',
        qwerty: 'c',
        keyCode: 'KeyC',
        finger: 'left-middle',
        hand: 'left',
        name: { ru: 'Сара Аэ ( แ- )', en: 'Sara Ae ( แ- )' },
        role: 'vowel',
        sound: '[-ae] широкий открытый звук «э»',
      },
      {
        thai: 'โ',
        qwerty: '#',
        keyCode: 'Digit3',
        shift: true,
        finger: 'left-middle',
        hand: 'left',
        name: { ru: 'Сара О ( โ- )', en: 'Sara O ( โ- )' },
        role: 'vowel',
        sound: '[-oo] долгий глубокий гласный «о»',
      },
    ],
    drills: ['แก', 'แม่', 'แพ', 'โต', 'โก', 'โพ', 'แตง', 'โม'],
    vocabulary: [
      {
        thai: 'แม่',
        transcription: 'mae',
        translation: { ru: 'мама, мать', en: 'mother, mom' },
        tone: 'falling',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['c', 'm', 'h'],
      },
      {
        thai: 'โต',
        transcription: 'dto',
        translation: { ru: 'расти / большой, взрослый', en: 'grow / big' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['#', '9'],
      },
      {
        thai: 'แตงโม',
        transcription: 'dtaeng-moo',
        translation: { ru: 'арбуз', en: 'watermelon' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['c', '9', "'", '#', 'm'],
      },
    ],
  },

  {
    id: 30,
    lessonCode: '8.3',
    chapter: 8,
    day: 8,
    stageTitle: {
      ru: 'Глава 8 (День 8): Сложные гласные и дифтонги (Complex Vowels)',
      en: 'Chapter 8 (Day 8): Complex Vowels & Diphthongs',
    },
    chapterToneRule: {
      ru: 'Дифтонги «Ай» ( ใ- и ไ- ) и «Ау» ( เ-า ).',
      en: 'Diphthongs "Ai" ( ใ- and ไ- ) and "Ao" ( เ-า ).',
    },
    title: {
      ru: 'Урок 8.3: Гласные группы «Ай» ( ใ- и ไ- ) и «Ау» ( เ-า )',
      en: 'Lesson 8.3: Vowels "Ai" ( ใ- & ไ- ) and "Ao" ( เ-า )',
    },
    subtitle: {
      ru: 'Май Муан ใ (.), Май Малай ไ (W) и связка เ-า (G + K)',
      en: 'Mai Muan ใ (.), Mai Malai ไ (W) and combo เ-า (G + K)',
    },
    ruleSummary: {
      ru: 'ใ и ไ звучат одинаково как [ай]. เ-า звучит как [ау]. Считаются живыми слогами.',
      en: 'ใ and ไ both sound as [ai]. เ-า sounds as [ao]. Treated as live.',
    },
    theoryNote: {
      ru: 'ใ (Май Муан — 20 особых слов) и ไ (Май Малай — общая буква) звучат одинаково: краткий дифтонг [ай]. เ-า звучит как [ау].',
      en: 'ใ (Mai Muan - 20 special words) and ไ (Mai Malai) both pronounce [ai]. Sara Ao sounds as [ao].',
    },
    toneRule: {
      ru: 'Относятся к категории живых слогов! При знаке ้ со средним классом дают Падающий тон (เก้า).',
      en: 'Treated as live syllables. With ้ on mid class = Falling (เก้า).',
    },
    typingRule: {
      ru: 'ใ — Period (.), ไ — KeyW (W), เ-า — связка KeyG (слева) + KeyK (справа).',
      en: 'ใ is Period, ไ is KeyW, เ-า is KeyG + KeyK.',
    },
    keys: [
      {
        thai: 'ใ',
        qwerty: '.',
        keyCode: 'Period',
        finger: 'right-ring',
        hand: 'right',
        name: { ru: 'Май Муан ( ใ- )', en: 'Mai Muan ( ใ- )' },
        role: 'vowel',
        sound: '[-ai] дифтонг «ай» в 20 корневых словах',
      },
      {
        thai: 'ไ',
        qwerty: 'w',
        keyCode: 'KeyW',
        finger: 'left-ring',
        hand: 'left',
        name: { ru: 'Май Малай ( ไ- )', en: 'Mai Malai ( ไ- )' },
        role: 'vowel',
        sound: '[-ai] стандартный дифтонг «ай»',
      },
    ],
    drills: ['ใจ', 'ใหม่', 'ให้', 'ไป', 'ไม่', 'ได้', 'เรา', 'เขา', 'เก้า'],
    vocabulary: [
      {
        thai: 'ใจ',
        transcription: 'jai',
        translation: { ru: 'сердце / душа, намерение', en: 'heart / mind' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['.', '0'],
      },
      {
        thai: 'ไป',
        transcription: 'bpai',
        translation: { ru: 'идти, ехать', en: 'go' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['w', 'x'],
      },
      {
        thai: 'เรา',
        transcription: 'rao',
        translation: { ru: 'мы / я (дружески)', en: 'we / us' },
        tone: 'mid',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['g', 'i', 'k'],
      },
      {
        thai: 'เก้า',
        transcription: 'gaao',
        translation: { ru: 'девять (цифра 9)', en: 'nine (9)' },
        tone: 'falling',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['g', 'd', 'j', 'k'],
      },
    ],
  },

  {
    id: 31,
    lessonCode: '8.4',
    chapter: 8,
    day: 8,
    stageTitle: {
      ru: 'Глава 8 (День 8): Сложные гласные и дифтонги (Complex Vowels)',
      en: 'Chapter 8 (Day 8): Complex Vowels & Diphthongs',
    },
    chapterToneRule: {
      ru: 'Трансформация гласных при добавлении хвоста (ะ → ั, เ-อ → เ-ิ, -ัว → -ว-).',
      en: 'Vowel transformations when closed by a final consonant.',
    },
    title: {
      ru: 'Урок 8.4: Трансформация гласных при добавлении хвоста',
      en: 'Lesson 8.4: Vowel Transformation Under Closed Finals',
    },
    subtitle: {
      ru: 'Слова เดิน, เงิน, พวก, ขวด: мутация гласных форм',
      en: 'Words เดิน, เงิน, พวก, ขวด: mutating vowel shapes',
    },
    ruleSummary: {
      ru: 'Гласная เ-อ превращается в เ-ิ перед конечной согласной. -ัว теряет шапочку ั.',
      en: 'Sara Oe becomes เ-ิ with final consonant. Sara Ua drops its cap to -ว-.',
    },
    theoryNote: {
      ru: 'Когда к гласной เ-อ [оэ/ыы] добавляется конечная согласная, буква อ превращается в шапочку ิ над буквой: เดิน (doen, идти: เ + ด + ิ + น). Гласная -ัว при добавлении хвоста теряет шапочку ั: остается только ว: พวก (phuak, группа: พ + ว + ก).',
      en: 'Under final consonants, Sara Oe transforms into เ-ิ, and Sara Ua loses its cap ั.',
    },
    toneRule: {
      ru: 'Тон определяется по стандартным правилам живого/мертвого слога.',
      en: 'Tones follow standard live/dead syllable rules.',
    },
    typingRule: {
      ru: 'Для เดิน: เ (KeyG) → ด (KeyF) → ิ (KeyB) → น (KeyO).',
      en: 'For เดิน: เ (G) → ด (F) → ิ (B) → น (O).',
    },
    keys: [],
    drills: ['เดิน', 'เงิน', 'พวก', 'ขวด', 'เปิด', 'เกิด', 'รวม', 'ช่วย'],
    vocabulary: [
      {
        thai: 'เดิน',
        transcription: 'doen',
        translation: { ru: 'гулять, идти пешком', en: 'walk' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['g', 'f', 'b', 'o'],
      },
      {
        thai: 'เงิน',
        transcription: 'ngoen',
        translation: { ru: 'деньги / серебро', en: 'money / silver' },
        tone: 'mid',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['g', "'", 'b', 'o'],
      },
      {
        thai: 'พวก',
        transcription: 'phuak',
        translation: { ru: 'группа людей / компания', en: 'group, party' },
        tone: 'falling',
        class: 'low',
        syllableType: 'dead',
        typingSteps: ['r', ';', 'd'],
      },
      {
        thai: 'ขวด',
        transcription: 'khuat',
        translation: { ru: 'бутылка', en: 'bottle' },
        tone: 'low',
        class: 'high',
        syllableType: 'dead',
        typingSteps: ['-', ';', 'f'],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // ГЛАВА 9 (ДЕНЬ 9): Ведущие согласные (Leading Consonants)
  // ══════════════════════════════════════════════════════════════════════════════
  {
    id: 32,
    lessonCode: '9.1',
    chapter: 9,
    day: 9,
    stageTitle: {
      ru: 'Глава 9 (День 9): Ведущие согласные (Leading Consonants)',
      en: 'Chapter 9 (Day 9): Leading Consonants',
    },
    chapterToneRule: {
      ru: 'Немой согласный впереди меняет тоновый класс всего слога!',
      en: 'A leading silent consonant overrides the tone class of the syllable!',
    },
    title: {
      ru: 'Урок 9.1: Ведущая буква ห (ห Нам — หนำ)',
      en: 'Lesson 9.1: Leading Letter ห (Ho Nam)',
    },
    subtitle: {
      ru: 'Буква ห повышает низкий класс до Высокого: หมา, หมู, หนัง, ใหม่',
      en: 'Silent ห elevates low class to High Class: หมา, หมู, หนัง, ใหม่',
    },
    ruleSummary: {
      ru: 'Буква ห перед сонорными согласными не читается, но превращает слог в Высокий класс!',
      en: 'Silent initial ห turns single low sonorants into High Class tone rules.',
    },
    theoryNote: {
      ru: 'Если перед одиночной согласной низкого класса (ง, น, ม, ย, ร, ล, ว) стоит буква ห, сама буква ห не читается вообще. Но она повышает класс следующей согласной до Высокого класса (переключает правила тонов!). Слово หมา читается как [maa] в Восходящем тоне.',
      en: 'Initial ห before single low sonorants is silent, but promotes syllable to High Class.',
    },
    toneRule: {
      ru: 'Слог подчиняется правилам Высокого класса (живой слог = Восходящий тон!).',
      en: 'Syllable obeys High Class rules (live syllable = Rising Tone!).',
    },
    typingRule: {
      ru: 'Печатается буква ห (KeyS) первой: ห → ม → า.',
      en: 'Type silent ห (KeyS) first: ห → ม → า.',
    },
    keys: [],
    drills: ['หม', 'หน', 'หล', 'หว', 'หง', 'หมา', 'หมู', 'หนัง', 'หวาน', 'ใหม่'],
    vocabulary: [
      {
        thai: 'หма',
        transcription: 'maa',
        translation: { ru: 'собака (Восходящий тон, как Высокий класс!)', en: 'dog (Rising Tone)' },
        tone: 'rising',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['s', 'm', 'k'],
      },
      {
        thai: 'หมู',
        transcription: 'muu',
        translation: { ru: 'свинья / свинина (Восходящий тон)', en: 'pig / pork (Rising)' },
        tone: 'rising',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['s', 'm', 'P'],
      },
      {
        thai: 'หนัง',
        transcription: 'nang',
        translation: { ru: 'кожа / кино, фильм', en: 'skin / movie' },
        tone: 'rising',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['s', 'o', 'y', "'"],
      },
      {
        thai: 'ใหม่',
        transcription: 'mai',
        translation: { ru: 'новый (Высокий класс + ่ = Низкий тон)', en: 'new (Low Tone)' },
        tone: 'low',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['.', 's', 'm', 'h'],
      },
    ],
  },

  {
    id: 33,
    lessonCode: '9.2',
    chapter: 9,
    day: 9,
    stageTitle: {
      ru: 'Глава 9 (День 9): Ведущие согласные (Leading Consonants)',
      en: 'Chapter 9 (Day 9): Leading Consonants',
    },
    chapterToneRule: {
      ru: 'Буква อ встает перед ย и переводит её в Средний класс (всего 4 слова в языке!).',
      en: 'Leading letter อ promotes ย to Mid Class (only 4 words in the Thai language!).',
    },
    title: {
      ru: 'Урок 9.2: Ведущая буква อ (อยนำ) — 4 ключевых слова',
      en: 'Lesson 9.2: Leading Letter อ (O Nam Yo) — 4 Core Words',
    },
    subtitle: {
      ru: 'Золотая четверка тайского языка: อย่า, อยาก, อย่าง, อยู่',
      en: 'The Golden Quartet: อย่า, อยาก, อย่าง, อยู่',
    },
    ruleSummary: {
      ru: 'Всего 4 слова: อย่า, อยาก, อย่าง, อยู่. Все они звучат в Низком тоне (Low Tone).',
      en: 'Exactly 4 words in Thai: อย่า, อยาก, อย่าง, อยู่. All take Low Tone.',
    },
    theoryNote: {
      ru: 'Буква อ встает перед ย и делает её согласной Среднего класса. В тайском языке существует всего 4 таких слова: อย่า (не делай), อยาก (хотеть), อย่าง (вид/сорт), อยู่ (находиться/жить).',
      en: 'There are only 4 words with leading อ before ย in Thai: อย่า, อยาก, อย่าง, อยู่.',
    },
    toneRule: {
      ru: 'Средний класс + знак Май Эк ( ่ ) / мертвый финал = Низкий тон (Low Tone).',
      en: 'Mid Class + ่ / dead final = Low Tone.',
    },
    typingRule: {
      ru: 'Печатаем อ (KeyV) первым: อ → ย → ่ → า = อย่า.',
      en: 'Type letter อ (KeyV) first.',
    },
    keys: [],
    drills: ['อย่า', 'อยาก', 'อย่าง', 'อยู่', 'อย่า', 'อยาก', 'อย่าง', 'อยู่'],
    vocabulary: [
      {
        thai: 'อย่า',
        transcription: 'yaa',
        translation: { ru: 'не делай! (запрет)', en: 'do not! (prohibition)' },
        tone: 'low',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['v', 'P', 'h', 'k'],
      },
      {
        thai: 'อยาก',
        transcription: 'yaak',
        translation: { ru: 'хотеть, желать', en: 'want, desire' },
        tone: 'low',
        class: 'mid',
        syllableType: 'dead',
        typingSteps: ['v', 'P', 'k', 'd'],
      },
      {
        thai: 'อย่าง',
        transcription: 'yaang',
        translation: { ru: 'вид, сорт, образец / как', en: 'kind, sort, like' },
        tone: 'low',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['v', 'P', 'k', 'h', "'"],
      },
      {
        thai: 'อยู่',
        transcription: 'yuu',
        translation: { ru: 'находиться, жить, быть', en: 'stay, reside, be' },
        tone: 'low',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['v', 'P', 'P', 'h'],
      },
    ],
  },

  {
    id: 34,
    lessonCode: '9.3',
    chapter: 9,
    day: 9,
    stageTitle: {
      ru: 'Глава 9 (День 9): Ведущие согласные (Leading Consonants)',
      en: 'Chapter 9 (Day 9): Leading Consonants',
    },
    chapterToneRule: {
      ru: 'Невидимые гласные [a] и [o] — чтение скрытых слогов.',
      en: 'Inherent invisible vowels [a] and [o].',
    },
    title: {
      ru: 'Урок 9.3: Невидимые гласные [a] и [o]',
      en: 'Lesson 9.3: Invisible Inherent Vowels [a] and [o]',
    },
    subtitle: {
      ru: 'Слова คน, รถ, นก (скрытый [o]) и สบาย, ถนน (скрытый [a])',
      en: 'Words คน, รถ, นก (inherent [o]) and สบาย, ถนน (inherent [a])',
    },
    ruleSummary: {
      ru: 'Между двумя согласными без гласных звучит [о]. В первом слоге слова без гласной звучит [а].',
      en: 'Two bare consonants imply [o]. An open initial syllable implies [a].',
    },
    theoryNote: {
      ru: 'Скрытая [o]: Если между двумя согласными нет вообще никаких гласных знаков, внутри по умолчанию звучит короткий звук [о]: คน (khon, человек), รถ (rot, машина). Скрытая [a]: В двухсложных словах первая буква читается с короткой гласной [а]: สบาย (sa-baai), ถนน (tha-non).',
      en: 'Inherent [o] occurs between bare consonant clusters. Inherent [a] occurs on initial syllable prefixes.',
    },
    toneRule: {
      ru: 'Скрытый [a] образует короткий мертвый слог; второй слог берет тон по ведущей согласной.',
      en: 'Inherent [a] forms a short dead syllable.',
    },
    typingRule: {
      ru: 'Печатаются только согласные буквы — скрытые гласные не набираются!',
      en: 'Only the consonants are typed — inherent vowels exist only in speech!',
    },
    keys: [],
    drills: ['คน', 'นก', 'บน', 'รถ', 'สบาย', 'ขนม', 'ถนน', 'ตลาด'],
    vocabulary: [
      {
        thai: 'คน',
        transcription: 'khon',
        translation: { ru: 'человек', en: 'person, human' },
        tone: 'mid',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['7', 'o'],
      },
      {
        thai: 'นก',
        transcription: 'nok',
        translation: { ru: 'птица', en: 'bird' },
        tone: 'high',
        class: 'low',
        syllableType: 'dead',
        typingSteps: ['o', 'd'],
      },
      {
        thai: 'สบาย',
        transcription: 'sa-baai',
        translation: { ru: 'в порядке / комфортно, удобно', en: 'comfortable, fine' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['l', '[', 'k', 'P'],
      },
      {
        thai: 'ถนน',
        transcription: 'tha-non',
        translation: { ru: 'улица, дорога', en: 'road, street' },
        tone: 'rising',
        class: 'high',
        syllableType: 'live',
        typingSteps: ['5', 'o', 'o'],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // ГЛАВА 10 (ДЕНЬ 10): Кластеры, спецсимволы и исключения
  // ══════════════════════════════════════════════════════════════════════════════
  {
    id: 35,
    lessonCode: '10.1',
    chapter: 10,
    day: 10,
    stageTitle: {
      ru: 'Глава 10 (День 10): Кластеры, спецсимволы и исключения',
      en: 'Chapter 10 (Day 10): Clusters, Special Symbols & Exceptions',
    },
    chapterToneRule: {
      ru: 'Две согласные сливаются в единый неделимый звук (True clusters) или мутируют (False clusters).',
      en: 'Consonant clusters blend as single unit or mutate (False clusters).',
    },
    title: {
      ru: 'Урок 10.1: Истинные и ложные кластеры согласных',
      en: 'Lesson 10.1: True and False Consonant Clusters',
    },
    subtitle: {
      ru: 'Кластеры ปลา, ครู, ความ и ложный кластер ทร → звук [s] (ทราบ)',
      en: 'Clusters ปลา, ครู, ความ and false cluster ทร → sound [s] (ทราบ)',
    },
    ruleSummary: {
      ru: 'В истинных кластерах тон определяет первая буква. В ложном кластере ท + ร читается как [s].',
      en: 'First letter determines tone in true clusters. Combination ท + ร sounds as [s].',
    },
    theoryNote: {
      ru: 'Истинные кластеры: Вторая буква — ร, ล, или ว. Читаются слитно: กร [kr], ปล [bpl], คว [khw]. Класс тона определяет первая буква! Ложный кластер ทร: сочетание букв ท + ร читается как чистый звук [s]!',
      en: 'True clusters blend with ร, ล, ว. False cluster ทร is pronounced as [s] (e.g. ทราบ).',
    },
    toneRule: {
      ru: 'Класс первой буквы определяет тон всего кластера.',
      en: 'First consonant determines cluster tone.',
    },
    typingRule: {
      ru: 'Печатаются обе согласные подряд: ป → ล → า = ปลา.',
      en: 'Type both consonants sequentially.',
    },
    keys: [],
    drills: ['ปลา', 'ครู', 'ความ', 'ใคร', 'ทราบ', 'ทราย', 'จริง'],
    vocabulary: [
      {
        thai: 'ปลา',
        transcription: 'plaa',
        translation: { ru: 'рыба', en: 'fish' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['x', ']', 'k'],
      },
      {
        thai: 'ครู',
        transcription: 'khruu',
        translation: { ru: 'учитель, преподаватель', en: 'teacher' },
        tone: 'mid',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['7', 'i', 'P'],
      },
      {
        thai: 'ทราบ',
        transcription: 'saap',
        translation: { ru: 'знать, быть осведомленным (вежливо)', en: 'know (formal)' },
        tone: 'falling',
        class: 'low',
        syllableType: 'dead',
        typingSteps: ['m', 'i', 'k', '['],
      },
      {
        thai: 'จริง',
        transcription: 'jing',
        translation: { ru: 'правда, действительно', en: 'true, real' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['0', 'i', 'b', "'"],
      },
    ],
  },

  {
    id: 36,
    lessonCode: '10.2',
    chapter: 10,
    day: 10,
    stageTitle: {
      ru: 'Глава 10 (День 10): Кластеры, спецсимволы и исключения',
      en: 'Chapter 10 (Day 10): Clusters, Special Symbols & Exceptions',
    },
    chapterToneRule: {
      ru: 'Знак глушения Каран ( -์ ) выключает чтение буквы.',
      en: 'Karan ( -์ ) mutes the letter completely.',
    },
    title: {
      ru: 'Урок 10.2: Знак глушения Каран ( -์ )',
      en: 'Lesson 10.2: The Mute Mark Karan ( -์ )',
    },
    subtitle: {
      ru: 'Заимствования из английского и санскрита: เบียร์, การ์ด, วันเสาร์',
      en: 'Loanwords: เบียร์ (beer), การ์ด (card), วันเสาร์ (Saturday)',
    },
    ruleSummary: {
      ru: 'Буква под знаком Каран ( -์ ) не читается вообще. Знак жмется Shift+N.',
      en: 'Letter under Karan is completely silent. Key is Shift+N.',
    },
    theoryNote: {
      ru: 'Знак ์ (Тхантхакхат / Каран) ставится над буквой на конце слова (чаще в заимствованиях из английского или санскрита). Буква под этим знаком не читается вообще.',
      en: 'Than-thakhat / Karan ( -์ ) mutes foreign ending letters that Thai phonology cannot pronounce.',
    },
    toneRule: {
      ru: 'Заглушенная буква не влияет на тон слога.',
      en: 'Muted letter has zero effect on syllable tone.',
    },
    typingRule: {
      ru: 'Сначала согласная, затем знак Каран (Shift+KeyN).',
      en: 'Type consonant, then press Shift+N for Karan.',
    },
    keys: [
      {
        thai: '์',
        qwerty: 'N',
        keyCode: 'KeyN',
        shift: true,
        finger: 'right-index',
        hand: 'right',
        name: { ru: 'Каран ( -์ )', en: 'Karan ( -์ )' },
        role: 'special',
        sound: 'Знак глушения непроизносимой согласной',
      },
    ],
    drills: ['เบียร์', 'การ์ด', 'เสาร์', 'อาทิตย์', 'คอนโด'],
    vocabulary: [
      {
        thai: 'เบียร์',
        transcription: 'biia',
        translation: { ru: 'пиво (англ. beer, буква ร заглушена)', en: 'beer' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['g', '[', 'u', 'P', 'i', 'N'],
      },
      {
        thai: 'การ์ด',
        transcription: 'gaat',
        translation: { ru: 'карта, открытка (буква ร заглушена)', en: 'card' },
        tone: 'low',
        class: 'mid',
        syllableType: 'dead',
        typingSteps: ['d', 'k', 'i', 'N', 'f'],
      },
      {
        thai: 'วันเสาร์',
        transcription: 'wan-sao',
        translation: { ru: 'суббота (буква ร заглушена)', en: 'Saturday' },
        tone: 'mid',
        class: 'mid',
        syllableType: 'live',
        typingSteps: [';', 'y', 'o', 'g', 'l', 'k', 'i', 'N'],
      },
    ],
  },

  {
    id: 37,
    lessonCode: '10.3',
    chapter: 10,
    day: 10,
    stageTitle: {
      ru: 'Глава 10 (День 10): Кластеры, спецсимволы и исключения',
      en: 'Chapter 10 (Day 10): Clusters, Special Symbols & Exceptions',
    },
    chapterToneRule: {
      ru: 'Специальные знаки тайской письменности: повторение, сокращение, санскрит.',
      en: 'Special orthographic symbols: duplication, abbreviation, Sanskrit.',
    },
    title: {
      ru: 'Урок 10.3: Знаки Майямок ( ๆ ), Паййанной ( ฯ ) и санскритская ฤ',
      en: 'Lesson 10.3: Maiyamok ( ๆ ), Paiyannoi ( ฯ ) and Sanskrit ฤ',
    },
    subtitle: {
      ru: 'Повтор слов เร็ว ๆ, сокращение กรุงเทพฯ и слог ฤดู',
      en: 'Word duplication เร็ว ๆ, abbreviation กรุงเทพฯ and syllable ฤดู',
    },
    ruleSummary: {
      ru: 'ๆ (KeyQ) удваивает слово. ฯ (Shift+O) сокращает название. ฤ (Shift+A) читается [ры/ри].',
      en: 'ๆ duplicates word. ฯ abbreviates. ฤ is the Sanskrit vocalic r.',
    },
    theoryNote: {
      ru: 'ๆ (Майямок) — повторяет предыдущее слово или фразу (для усиления или множественного числа): มาก ๆ (maak-maak, очень-очень). ฯ (Паййанной) — знак сокращения длинного названия (как в официальном названии Бангкока: กรุงเทพฯ). ฤ — гласный слог, читается как [ры] или [ри].',
      en: 'Maiyamok (ๆ) duplicates. Paiyannoi (ฯ) abbreviates. Rue (ฤ) represents Sanskrit vocalic r.',
    },
    toneRule: {
      ru: 'Повторенное слово сохраняет свой исходный тон.',
      en: 'Duplicated word retains original tone.',
    },
    typingRule: {
      ru: 'ๆ — KeyQ, ฯ — Shift+KeyO, ฤ — Shift+KeyA.',
      en: 'ๆ is KeyQ, ฯ is Shift+O, ฤ is Shift+A.',
    },
    keys: [
      {
        thai: 'ๆ',
        qwerty: 'q',
        keyCode: 'KeyQ',
        finger: 'left-pinky',
        hand: 'left',
        name: { ru: 'Майямок ( ๆ )', en: 'Maiyamok ( ๆ )' },
        role: 'special',
        sound: 'Знак удвоения слова или фразы',
      },
    ],
    drills: ['เร็วๆ', 'มากๆ', 'ต่าง ๆ', 'ฤดู', 'กรุงเทพฯ'],
    vocabulary: [
      {
        thai: 'เร็วๆ',
        transcription: 'reo-reo',
        translation: { ru: 'быстрее! / скоро', en: 'hurry up! / quickly' },
        tone: 'mid',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['g', 'i', 'y', ';', 'q'],
      },
      {
        thai: 'ต่าง ๆ',
        transcription: 'dtaang-dtaang',
        translation: { ru: 'различные, всякие', en: 'various, different' },
        tone: 'low',
        class: 'mid',
        syllableType: 'live',
        typingSteps: ['9', 'k', 'h', "'", 'q'],
      },
      {
        thai: 'ฤดู',
        transcription: 'rue-duu',
        translation: { ru: 'сезон, время года', en: 'season' },
        tone: 'mid',
        class: 'low',
        syllableType: 'live',
        typingSteps: ['A', 'f', 'P'],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // ФИНАЛЬНЫЙ БЛОК (ДЕНЬ 11): Слитное чтение текстов без пробелов (Reading Flow)
  // ══════════════════════════════════════════════════════════════════════════════
  {
    id: 38,
    lessonCode: '11.1',
    chapter: 11,
    day: 11,
    stageTitle: {
      ru: 'Финальный модуль: Слитное чтение текстов без пробелов',
      en: 'Final Module: Continuous Text Reading Flow',
    },
    chapterToneRule: {
      ru: 'В тайском языке нет пробелов между словами. Движок подсвечивает границы слов в реальном времени.',
      en: 'Thai script has no spaces between words. Real-time word boundary recognition.',
    },
    title: {
      ru: 'Урок 11.1: Текст 1 — Базовые фразы о себе',
      en: 'Lesson 11.1: Text 1 — Introducing Yourself',
    },
    subtitle: {
      ru: 'Слитный текст: «Меня зовут Джон. Я американец. Мне очень нравится Таиланд»',
      en: 'Connected text: "My name is John. I am American. I love Thailand very much"',
    },
    ruleSummary: {
      ru: 'Чтение и непрерывный набор 12 слов без пробелов.',
      en: 'Continuous reading and typing of 12 unspaced words.',
    },
    theoryNote: {
      ru: 'В тайском языке слова пишутся слитно в рамках предложения. Пробел ставится только между предложениями или законченными мыслями. Тренажер помогает глазу вычленять границы слов по структуре согласных и гласных.',
      en: 'Thai sentences flow continuously without word spaces. Word boundaries are recognized through vowel anchors.',
    },
    toneRule: {
      ru: 'Каждое слово сохраняет свой тон в непрерывном потоке речи.',
      en: 'Each word maintains its tone within the speech stream.',
    },
    typingRule: {
      ru: 'Набирайте текст подряд буква за буквой — тренажёр сам подсветит границы слов.',
      en: 'Type continuously letter by letter; active words are segmented in real time.',
    },
    keys: [],
    drills: ['ผม', 'ชื่อ', 'จอห์น', 'เป็น', 'คน', 'ชอบ', 'เมือง', 'ไทย', 'มาก'],
    vocabulary: [
      {
        thai: 'ผมชื่อจอห์นผมเป็นคนอเมริกันผมชอบเมืองไทยมาก',
        transcription: 'phom chuue jawn phom bpen khon a-mee-ri-gan phom chawp muang thai maak',
        translation: {
          ru: 'Меня зовут Джон. Я американец. Мне очень нравится Таиланд.',
          en: 'My name is John. I am American. I love Thailand very much.',
        },
        tone: 'mid',
      },
    ],
    isContinuousText: true,
    continuousText: {
      fullText: 'ผมชื่อจอห์นผมเป็นคนอเมริกันผมชอบเมืองไทยมาก',
      transcription: 'phom chuue jawn phom bpen khon a-mee-ri-gan phom chawp muang thai maak',
      translation: {
        ru: 'Меня зовут Джон. Я американец. Мне очень нравится Таиланд.',
        en: 'My name is John. I am American. I love Thailand very much.',
      },
      segments: [
        { thai: 'ผม', transcription: 'phom', translation: { ru: 'я (мужчина)', en: 'I (male)' } },
        { thai: 'ชื่อ', transcription: 'chuue', translation: { ru: 'зовут / имя', en: 'name / called' } },
        { thai: 'จอห์น', transcription: 'jawn', translation: { ru: 'Джон', en: 'John' } },
        { thai: 'ผม', transcription: 'phom', translation: { ru: 'я', en: 'I' } },
        { thai: 'เป็น', transcription: 'bpen', translation: { ru: 'являюсь / есть', en: 'am / be' } },
        { thai: 'คน', transcription: 'khon', translation: { ru: 'человек', en: 'person' } },
        { thai: 'อเมริกัน', transcription: 'a-mee-ri-gan', translation: { ru: 'американец', en: 'American' } },
        { thai: 'ผม', transcription: 'phom', translation: { ru: 'я', en: 'I' } },
        { thai: 'ชอบ', transcription: 'chawp', translation: { ru: 'люблю, нравится', en: 'like' } },
        { thai: 'เมือง', transcription: 'muang', translation: { ru: 'страна / город', en: 'country / town' } },
        { thai: 'ไทย', transcription: 'thai', translation: { ru: 'Тай', en: 'Thai' } },
        { thai: 'มาก', transcription: 'maak', translation: { ru: 'очень', en: 'very much' } },
      ],
    },
  },

  {
    id: 39,
    lessonCode: '11.2',
    chapter: 11,
    day: 11,
    stageTitle: {
      ru: 'Финальный модуль: Слитное чтение текстов без пробелов',
      en: 'Final Module: Continuous Text Reading Flow',
    },
    chapterToneRule: {
      ru: 'Слитное чтение: заказ еды в ресторане.',
      en: 'Continuous reading: ordering food at a restaurant.',
    },
    title: {
      ru: 'Урок 11.2: Текст 2 — В ресторане и заказ еды',
      en: 'Lesson 11.2: Text 2 — At the Restaurant & Ordering Food',
    },
    subtitle: {
      ru: '«Сегодня мы идем есть в ресторан. Заказали том-ям с креветками и жареный рис»',
      en: '"Today we go to eat at a restaurant. Ordered Tom Yum Goong and fried rice"',
    },
    ruleSummary: {
      ru: 'Отработка реального текста ресторанного диалога из 15 слов.',
      en: 'Practicing a real 15-word restaurant narrative.',
    },
    theoryNote: {
      ru: 'Обратите внимание на стыки слов: วันนี้ | เรา | ไป | กิน | ข้าว | ที่ | ร้าน | อาหาร. Глаз тренируется находить опорные согласные и гласные рамки.',
      en: 'Focus on boundary transitions between monosyllabic and polysyllabic terms.',
    },
    toneRule: {
      ru: 'Интонационные группы делятся по смыслу.',
      en: 'Phrasing breaks follow syntactic groups.',
    },
    typingRule: {
      ru: 'Печатайте весь текст сплошной строкой.',
      en: 'Type the entire narrative as one continuous string.',
    },
    keys: [],
    drills: ['วันนี้', 'กินข้าว', 'ร้านอาหาร', 'ต้มยำกุ้ง', 'ข้าวผัด'],
    vocabulary: [
      {
        thai: 'วันนี้เราไปกินข้าวที่ร้านอาหารสั่งต้มยำกุ้งและข้าวผัด',
        transcription: 'wan-níi rao bpai gin khâao thîi ráan aa-hăan sàng dtôm-yam gûng láe khâao phàt',
        translation: {
          ru: 'Сегодня мы идем есть в ресторан. Заказали том-ям с креветками и жареный рис.',
          en: 'Today we go eat at a restaurant. Ordered tom yum with shrimp and fried rice.',
        },
        tone: 'mid',
      },
    ],
    isContinuousText: true,
    continuousText: {
      fullText: 'วันนี้เราไปกินข้าวที่ร้านอาหารสั่งต้มยำกุ้งและข้าวผัด',
      transcription: 'wan-níi rao bpai gin khâao thîi ráan aa-hăan sàng dtôm-yam gûng láe khâao phàt',
      translation: {
        ru: 'Сегодня мы идем есть в ресторан. Заказали том-ям с креветками и жареный рис.',
        en: 'Today we go eat at a restaurant. Ordered tom yum with shrimp and fried rice.',
      },
      segments: [
        { thai: 'วันนี้', transcription: 'wan-níi', translation: { ru: 'сегодня', en: 'today' } },
        { thai: 'เรา', transcription: 'rao', translation: { ru: 'мы', en: 'we' } },
        { thai: 'ไป', transcription: 'bpai', translation: { ru: 'идти', en: 'go' } },
        { thai: 'กิน', transcription: 'gin', translation: { ru: 'есть', en: 'eat' } },
        { thai: 'ข้าว', transcription: 'khâao', translation: { ru: 'рис/еду', en: 'rice/meal' } },
        { thai: 'ที่', transcription: 'thîi', translation: { ru: 'в/на', en: 'at' } },
        { thai: 'ร้านอาหาร', transcription: 'ráan aa-hăan', translation: { ru: 'ресторан', en: 'restaurant' } },
        { thai: 'สั่ง', transcription: 'sàng', translation: { ru: 'заказать', en: 'order' } },
        { thai: 'ต้ม', transcription: 'dtôm', translation: { ru: 'варить', en: 'boiled' } },
        { thai: 'ยำ', transcription: 'yam', translation: { ru: 'острый салат', en: 'spicy salad' } },
        { thai: 'กุ้ง', transcription: 'gûng', translation: { ru: 'креветки', en: 'shrimp' } },
        { thai: 'และ', transcription: 'láe', translation: { ru: 'и', en: 'and' } },
        { thai: 'ข้าวผัด', transcription: 'khâao phàt', translation: { ru: 'жареный рис', en: 'fried rice' } },
      ],
    },
  },

  {
    id: 40,
    lessonCode: '11.3',
    chapter: 11,
    day: 11,
    stageTitle: {
      ru: 'Финальный модуль: Слитное чтение текстов без пробелов',
      en: 'Final Module: Continuous Text Reading Flow',
    },
    chapterToneRule: {
      ru: 'Слитное чтение: такси и навигация в городе.',
      en: 'Continuous reading: taxi instructions and city navigation.',
    },
    title: {
      ru: 'Урок 11.3: Текст 3 — Поездка на такси и ориентация на местности',
      en: 'Lesson 11.3: Text 3 — Taking a Taxi & City Navigation',
    },
    subtitle: {
      ru: '«Поверните направо на следующем перекрестке, затем поезжайте прямо до ж/д станции»',
      en: '"Turn right at the intersection ahead, then go straight to the train station"',
    },
    ruleSummary: {
      ru: 'Навигационные команды: поворот, перекресток, прямо, вокзал.',
      en: 'Directions: turn right, intersection, straight ahead, railway station.',
    },
    theoryNote: {
      ru: 'Слитный текст: เลี้ยวขวาที่สี่แยกข้างหน้าแล้วตรงไปส่งที่สถานีรถไฟ. Обратите внимание на слово สถานี (sa-thaa-nii) со скрытым звуком [a].',
      en: 'Navigate through complex road directions written as a single connected sentence.',
    },
    toneRule: {
      ru: 'Смена тонов придает тайской речи характерную плавную мелодику.',
      en: 'Fluctuating tones create natural melodic cadence.',
    },
    typingRule: {
      ru: 'Набирайте без пауз и пробелов.',
      en: 'Type continuously without adding spaces.',
    },
    keys: [],
    drills: ['เลี้ยวขวา', 'สี่แยก', 'ข้างหน้า', 'ตรงไป', 'สถานีรถไฟ'],
    vocabulary: [
      {
        thai: 'เลี้ยวขวาที่สี่แยกข้างหน้าแล้วตรงไปส่งที่สถานีรถไฟ',
        transcription: 'líao khwăa thîi sìi yâek khâang nâa láeo dtrong bpai sòng thîi sa-thăa-nii rót fai',
        translation: {
          ru: 'Поверните направо на следующем перекрестке, затем поезжайте прямо до ж/д станции.',
          en: 'Turn right at the next intersection, then go straight to the train station.',
        },
        tone: 'mid',
      },
    ],
    isContinuousText: true,
    continuousText: {
      fullText: 'เลี้ยวขวาที่สี่แยกข้างหน้าแล้วตรงไปส่งที่สถานีรถไฟ',
      transcription: 'líao khwăa thîi sìi yâek khâang nâa láeo dtrong bpai sòng thîi sa-thăa-nii rót fai',
      translation: {
        ru: 'Поверните направо на следующем перекрестке, затем поезжайте прямо до ж/д станции.',
        en: 'Turn right at the next intersection, then go straight to the train station.',
      },
      segments: [
        { thai: 'เลี้ยว', transcription: 'líao', translation: { ru: 'повернуть', en: 'turn' } },
        { thai: 'ขวา', transcription: 'khwăa', translation: { ru: 'направо', en: 'right' } },
        { thai: 'ที่', transcription: 'thîi', translation: { ru: 'на', en: 'at' } },
        { thai: 'สี่แยก', transcription: 'sìi yâek', translation: { ru: 'перекресток', en: 'intersection' } },
        { thai: 'ข้างหน้า', transcription: 'khâang nâa', translation: { ru: 'впереди', en: 'ahead' } },
        { thai: 'แล้ว', transcription: 'láeo', translation: { ru: 'затем/уже', en: 'then/already' } },
        { thai: 'ตรงไป', transcription: 'dtrong bpai', translation: { ru: 'прямо', en: 'straight ahead' } },
        { thai: 'ส่ง', transcription: 'sòng', translation: { ru: 'довезти/высадить', en: 'drop off' } },
        { thai: 'ที่', transcription: 'thîi', translation: { ru: 'у', en: 'at' } },
        { thai: 'สถานี', transcription: 'sa-thăa-nii', translation: { ru: 'станция', en: 'station' } },
        { thai: 'รถไฟ', transcription: 'rót fai', translation: { ru: 'поезд/железная дорога', en: 'train' } },
      ],
    },
  },

  {
    id: 41,
    lessonCode: '11.4',
    chapter: 11,
    day: 11,
    stageTitle: {
      ru: 'Финальный модуль: Слитное чтение текстов без пробелов',
      en: 'Final Module: Continuous Text Reading Flow',
    },
    chapterToneRule: {
      ru: 'Слитное чтение: торг и покупки на рынке.',
      en: 'Continuous reading: bargaining and market shopping.',
    },
    title: {
      ru: 'Урок 11.4: Текст 4 — Покупки и торг на рынке',
      en: 'Lesson 11.4: Text 4 — Shopping & Bargaining at the Market',
    },
    subtitle: {
      ru: '«Сколько стоит эта рубашка? Сделайте скидку, пожалуйста. За 80 бат отдадите?»',
      en: '"How much is this shirt? Can you discount a bit? Can I get it for 80 baht?"',
    },
    ruleSummary: {
      ru: 'Разговорный тайский диалог торга на рынке: цена, скидка, цифры.',
      en: 'Bargaining market dialogue: price, discount, numbers, politeness.',
    },
    theoryNote: {
      ru: 'Тайский текст: เสื้อตัวนี้ราคาเท่าไหร่ลดหน่อยได้ไหมแปดสิบบาทได้ไหมครับ. Все слова сливаются в единую фразу, произносимую на одном дыхании.',
      en: 'A natural shopping phrase uttered in a single continuous breath.',
    },
    toneRule: {
      ru: 'Частица ครับ на конце дает ровный завершающий акцент.',
      en: 'Final polite particle ครับ adds clean closing cadence.',
    },
    typingRule: {
      ru: 'Набирайте без пробелов: от เสื้อ до ครับ.',
      en: 'Type smoothly without spaces from เสื้อ to ครับ.',
    },
    keys: [],
    drills: ['เสื้อตัวนี้', 'ราคาเท่าไหร่', 'ลดหน่อย', 'ได้ไหม', 'แปดสิบบาท', 'ครับ'],
    vocabulary: [
      {
        thai: 'เสื้อตัวนี้ราคาเท่าไหร่ลดหน่อยได้ไหมแปดสิบบาทได้ไหมครับ',
        transcription: 'sûea dtua níi raa-khaa thâo-rài lót nòi dâi măi bpàaet-sìp bàat dâi măi khráp',
        translation: {
          ru: 'Сколько стоит эта рубашка? Сделайте скидку, пожалуйста. За 80 бат отдадите?',
          en: 'How much is this shirt? Could you discount it a bit? Can I have it for 80 baht, please?',
        },
        tone: 'mid',
      },
    ],
    isContinuousText: true,
    continuousText: {
      fullText: 'เสื้อตัวนี้ราคาเท่าไหร่ลดหน่อยได้ไหมแปดสิบบาทได้ไหมครับ',
      transcription: 'sûea dtua níi raa-khaa thâo-rài lót nòi dâi măi bpàaet-sìp bàat dâi măi khráp',
      translation: {
        ru: 'Сколько стоит эта рубашка? Сделайте скидку, пожалуйста. За 80 бат отдадите?',
        en: 'How much is this shirt? Could you discount it a bit? Can I have it for 80 baht, please?',
      },
      segments: [
        { thai: 'เสื้อ', transcription: 'sûea', translation: { ru: 'рубашка/одежда', en: 'shirt' } },
        { thai: 'ตัวนี้', transcription: 'dtua níi', translation: { ru: 'эта штука', en: 'this one' } },
        { thai: 'ราคา', transcription: 'raa-khaa', translation: { ru: 'цена', en: 'price' } },
        { thai: 'เท่าไหร่', transcription: 'thâo-rài', translation: { ru: 'сколько', en: 'how much' } },
        { thai: 'ลด', transcription: 'lót', translation: { ru: 'снизить/скинуть', en: 'reduce/discount' } },
        { thai: 'หน่อย', transcription: 'nòi', translation: { ru: 'немного/пожалуйста', en: 'a bit' } },
        { thai: 'ได้ไหม', transcription: 'dâi măi', translation: { ru: 'можно ли?', en: 'can you?' } },
        { thai: 'แปดสิบ', transcription: 'bpàaet-sìp', translation: { ru: 'восемьдесят', en: 'eighty' } },
        { thai: 'บาท', transcription: 'bàat', translation: { ru: 'бат', en: 'baht' } },
        { thai: 'ได้ไหม', transcription: 'dâi măi', translation: { ru: 'можно?', en: 'possible?' } },
        { thai: 'ครับ', transcription: 'khráp', translation: { ru: 'вежливая частица', en: 'polite particle' } },
      ],
    },
  },

  {
    id: 42,
    lessonCode: '11.5',
    chapter: 11,
    day: 11,
    stageTitle: {
      ru: 'Финальный модуль: Слитное чтение текстов без пробелов',
      en: 'Final Module: Continuous Text Reading Flow',
    },
    chapterToneRule: {
      ru: 'Итоговый экзамен курса: преодоление барьера слитного чтения.',
      en: 'Graduation Exam: mastering continuous unspaced Thai literacy.',
    },
    title: {
      ru: 'Урок 11.5: Текст 5 — Итоговый экзамен курса',
      en: 'Lesson 11.5: Text 5 — Graduation Exam',
    },
    subtitle: {
      ru: '«Тайский язык не сложный, если мы тренируемся читать и печатать каждый день»',
      en: '"Thai is not difficult if we practice reading and typing every day"',
    },
    ruleSummary: {
      ru: 'Венец программы: 15 слов, охватывающих все изученные правила тонов и раскладки.',
      en: 'Culmination of the course: 15 words spanning all tone rules and Kedmanee layout.',
    },
    theoryNote: {
      ru: 'Тайский текст: ภาษาไทยไม่ยากถ้าเราฝึกอ่านและพิมพ์ทุกวันคุณทำได้แน่นอน. Если вы дошли до этого урока, ваши пальцы знают тайскую раскладку, а глаза мгновенно считывают тоны!',
      en: 'Graduation text proving your mastery of Thai phonics, tone rules and muscle memory.',
    },
    toneRule: {
      ru: 'Победный итоговый дрилл курса чтения!',
      en: 'Final victory lap of the touch reading course!',
    },
    typingRule: {
      ru: 'Наберите весь манифест от начала до конца без единой ошибки.',
      en: 'Type the entire manifesto with 100% precision.',
    },
    keys: [],
    drills: ['ภาษาไทย', 'ไม่ยาก', 'ถ้าเรา', 'ฝึกอ่าน', 'พิมพ์', 'ทุกวัน', 'แน่นอน'],
    vocabulary: [
      {
        thai: 'ภาษาไทยไม่ยากถ้าเราฝึกอ่านและพิมพ์ทุกวันคุณทำได้แน่นอน',
        transcription: 'phaa-săa thai mâi yâak thâa rao fùek àan láe phim thúk wan khun tham dâi nâae-nawn',
        translation: {
          ru: 'Тайский язык не сложный, если мы тренируемся читать и печатать каждый день. У вас точно всё получится!',
          en: 'Thai is not difficult if we practice reading and typing every day. You can definitely do it!',
        },
        tone: 'mid',
      },
    ],
    isContinuousText: true,
    continuousText: {
      fullText: 'ภาษาไทยไม่ยากถ้าเราฝึกอ่านและพิมพ์ทุกวันคุณทำได้แน่นอน',
      transcription: 'phaa-săa thai mâi yâak thâa rao fùek àan láe phim thúk wan khun tham dâi nâae-nawn',
      translation: {
        ru: 'Тайский язык не сложный, если мы тренируемся читать и печатать каждый день. У вас точно всё получится!',
        en: 'Thai is not difficult if we practice reading and typing every day. You can definitely do it!',
      },
      segments: [
        { thai: 'ภาษาไทย', transcription: 'phaa-săa thai', translation: { ru: 'тайский язык', en: 'Thai language' } },
        { thai: 'ไม่', transcription: 'mâi', translation: { ru: 'не', en: 'not' } },
        { thai: 'ยาก', transcription: 'yâak', translation: { ru: 'трудный/сложный', en: 'difficult' } },
        { thai: 'ถ้า', transcription: 'thâa', translation: { ru: 'если', en: 'if' } },
        { thai: 'เรา', transcription: 'rao', translation: { ru: 'мы', en: 'we' } },
        { thai: 'ฝึก', transcription: 'fùek', translation: { ru: 'тренироваться', en: 'practice' } },
        { thai: 'อ่าน', transcription: 'àan', translation: { ru: 'читать', en: 'read' } },
        { thai: 'และ', transcription: 'láe', translation: { ru: 'и', en: 'and' } },
        { thai: 'พิมพ์', transcription: 'phim', translation: { ru: 'печатать', en: 'type' } },
        { thai: 'ทุกวัน', transcription: 'thúk wan', translation: { ru: 'каждый день', en: 'every day' } },
        { thai: 'คุณ', transcription: 'khun', translation: { ru: 'вы/ты', en: 'you' } },
        { thai: 'ทำได้', transcription: 'tham dâi', translation: { ru: 'сможете/справитесь', en: 'can do it' } },
        { thai: 'แน่นอน', transcription: 'nâae-nawn', translation: { ru: 'точно, наверняка!', en: 'definitely!' } },
      ],
    },
  },
];

// Tone Matrix Summary Data for Phonics reference
export interface ToneMatrixRow {
  consonantClass: 'mid' | 'high' | 'low';
  classNameRu: string;
  classNameEn: string;
  consonantsSample: string;
  liveLong: Tone;
  liveShort: Tone;
  deadLong: Tone;
  deadShort: Tone;
  withMaiEk: Tone;
  withMaiTho: Tone;
  withMaiTri?: Tone;
  withMaiChattawa?: Tone;
}

export const TONE_MATRIX_DATA: ToneMatrixRow[] = [
  {
    consonantClass: 'mid',
    classNameRu: 'Средний класс (ก จ ด ต บ ป อ)',
    classNameEn: 'Mid Class (ก จ ด ต บ ป อ)',
    consonantsSample: 'ก, ด, ต, บ, ป, จ, อ',
    liveLong: 'mid',
    liveShort: 'low',
    deadLong: 'low',
    deadShort: 'low',
    withMaiEk: 'low',
    withMaiTho: 'falling',
    withMaiTri: 'high',
    withMaiChattawa: 'rising',
  },
  {
    consonantClass: 'high',
    classNameRu: 'Высокий класс (ข ฉ ฐ ถ ผ ฝ ศ ษ ส ห)',
    classNameEn: 'High Class (ข ฉ ฐ ถ ผ ฝ ศ ษ ส ห)',
    consonantsSample: 'ข, ส, ห, ถ, ผ, ฝ',
    liveLong: 'rising',
    liveShort: 'low',
    deadLong: 'low',
    deadShort: 'low',
    withMaiEk: 'low',
    withMaiTho: 'falling',
  },
  {
    consonantClass: 'low',
    classNameRu: 'Низкий класс (ค ง ช ซ ท น พ ฟ ม ย ร ล ว)',
    classNameEn: 'Low Class (ค ง ช ซ ท น พ ฟ ม ย ร ล ว)',
    consonantsSample: 'ค, ง, ม, ร, ล, ว, น, ท',
    liveLong: 'mid',
    liveShort: 'high',
    deadLong: 'falling',
    deadShort: 'high',
    withMaiEk: 'falling',
    withMaiTho: 'high',
  },
];

export function getToneBadgeInfo(tone: Tone, lang: 'ru' | 'en'): { label: string; color: string; arrow: string } {
  switch (tone) {
    case 'mid':
      return {
        label: lang === 'ru' ? 'Средний' : 'Mid',
        color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        arrow: '→',
      };
    case 'low':
      return {
        label: lang === 'ru' ? 'Низкий' : 'Low',
        color: 'bg-blue-100 text-blue-800 border-blue-300',
        arrow: '↘',
      };
    case 'falling':
      return {
        label: lang === 'ru' ? 'Падающий' : 'Falling',
        color: 'bg-amber-100 text-amber-800 border-amber-300',
        arrow: '∧',
      };
    case 'high':
      return {
        label: lang === 'ru' ? 'Высокий' : 'High',
        color: 'bg-purple-100 text-purple-800 border-purple-300',
        arrow: '↗',
      };
    case 'rising':
      return {
        label: lang === 'ru' ? 'Восходящий' : 'Rising',
        color: 'bg-rose-100 text-rose-800 border-rose-300',
        arrow: '∨',
      };
  }
}
