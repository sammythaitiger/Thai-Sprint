import { PatternItem } from '../types';

/**
 * Слово-действие для интерактивного конструктора.
 * Каждый пресет содержит заранее написанные человеком переводы
 * для каждого паттерна, в котором он участвует.
 */
export interface BuilderAction {
  id: string;
  thai: string;
  trans: string;
  label: string; // Короткий ярлык кнопки на русском
}

/**
 * Готовая собранная фраза для паттерна + действия.
 * Ключ первого уровня — id паттерна, второго — id действия.
 */
export interface AssembledPhrase {
  thai: string;
  trans: string;
  ru: string;
}

export const BUILDER_ACTIONS: BuilderAction[] = [
  { id: 'go',   thai: 'ไป',       trans: 'pai',       label: 'идти' },
  { id: 'eat',  thai: 'กิน',      trans: 'gin',       label: 'есть' },
  { id: 'teach',thai: 'สอน',      trans: 'săawn',     label: 'учить' },
  { id: 'home', thai: 'กลับบ้าน', trans: 'glàp bâan', label: 'домой' },
  { id: 'play', thai: 'เล่น',     trans: 'lên',       label: 'играть' },
  { id: 'do',   thai: 'ทำ',       trans: 'tham',      label: 'делать' },
];

/**
 * Ручные переводы каждой комбинации [паттерн × действие].
 * Никакой автогенерации — только осмысленные фразы.
 */
export const ASSEMBLED_PHRASES: Record<string, Record<string, AssembledPhrase>> = {
  // ─── อยาก (Хочу...) ───
  'pattern-1': {
    go:    { thai: 'อยากไป',       trans: 'yàak pai',       ru: 'Хочу пойти' },
    eat:   { thai: 'อยากกิน',      trans: 'yàak gin',       ru: 'Хочу поесть' },
    teach: { thai: 'อยากสอน',      trans: 'yàak săawn',     ru: 'Хочу преподавать' },
    home:  { thai: 'อยากกลับบ้าน', trans: 'yàak glàp bâan', ru: 'Хочу вернуться домой' },
    play:  { thai: 'อยากเล่น',     trans: 'yàak lên',       ru: 'Хочу поиграть' },
    do:    { thai: 'อยากทำ',       trans: 'yàak tham',      ru: 'Хочу сделать' },
  },
  // ─── ต้อง (Надо...) ───
  'pattern-2': {
    go:    { thai: 'ต้องไป',       trans: 'dtâawng pai',       ru: 'Надо идти' },
    eat:   { thai: 'ต้องกิน',      trans: 'dtâawng gin',       ru: 'Надо поесть' },
    teach: { thai: 'ต้องสอน',      trans: 'dtâawng săawn',     ru: 'Надо вести урок' },
    home:  { thai: 'ต้องกลับบ้าน', trans: 'dtâawng glàp bâan', ru: 'Надо идти домой' },
    play:  { thai: 'ต้องเล่น',     trans: 'dtâawng lên',       ru: 'Надо играть' },
    do:    { thai: 'ต้องทำ',       trans: 'dtâawng tham',      ru: 'Надо сделать' },
  },
  // ─── ...ได้ไหม (Можно...?) ───
  'pattern-3': {
    go:    { thai: 'ไปได้ไหม',       trans: 'pai dâi măi',       ru: 'Можно пойти?' },
    eat:   { thai: 'กินได้ไหม',      trans: 'gin dâi măi',       ru: 'Можно есть?' },
    teach: { thai: 'สอนได้ไหม',      trans: 'săawn dâi măi',     ru: 'Можешь провести урок?' },
    home:  { thai: 'กลับบ้านได้ไหม', trans: 'glàp bâan dâi măi', ru: 'Можно домой?' },
    play:  { thai: 'เล่นได้ไหม',     trans: 'lên dâi măi',       ru: 'Можно поиграть?' },
    do:    { thai: 'ทำได้ไหม',       trans: 'tham dâi măi',      ru: 'Можешь сделать?' },
  },
  // ─── ห้าม (Нельзя!) ───
  'pattern-4': {
    go:    { thai: 'ห้ามไป',       trans: 'hâam pai',       ru: 'Нельзя уходить!' },
    eat:   { thai: 'ห้ามกิน',      trans: 'hâam gin',       ru: 'Нельзя есть!' },
    teach: { thai: 'ห้ามสอน',      trans: 'hâam săawn',     ru: 'Запрещено преподавать!' },
    home:  { thai: 'ห้ามกลับบ้าน', trans: 'hâam glàp bâan', ru: 'Нельзя идти домой!' },
    play:  { thai: 'ห้ามเล่น',     trans: 'hâam lên',       ru: 'Нельзя играть!' },
    do:    { thai: 'ห้ามทำ',       trans: 'hâam tham',      ru: 'Нельзя делать!' },
  },
  // ─── เคย (Уже делал раньше) ───
  'pattern-5': {
    go:    { thai: 'เคยไป',       trans: 'khooei pai',       ru: 'Ходил / бывал раньше' },
    eat:   { thai: 'เคยกิน',      trans: 'khooei gin',       ru: 'Пробовал есть раньше' },
    teach: { thai: 'เคยสอน',      trans: 'khooei săawn',     ru: 'Преподавал раньше' },
    home:  { thai: 'เคยกลับบ้าน', trans: 'khooei glàp bâan', ru: 'Раньше уходил домой' },
    play:  { thai: 'เคยเล่น',     trans: 'khooei lên',       ru: 'Играл раньше' },
    do:    { thai: 'เคยทำ',       trans: 'khooei tham',      ru: 'Уже делал это раньше' },
  },
  // ─── กำลัง...อยู่ (Прямо сейчас...) ───
  'pattern-10': {
    go:    { thai: 'กำลังไปอยู่',       trans: 'gam-lang pai yùu',       ru: 'Сейчас иду (в процессе)' },
    eat:   { thai: 'กำลังกินอยู่',      trans: 'gam-lang gin yùu',       ru: 'Сейчас ем' },
    teach: { thai: 'กำลังสอนอยู่',      trans: 'gam-lang săawn yùu',     ru: 'Сейчас веду урок' },
    home:  { thai: 'กำลังกลับบ้านอยู่', trans: 'gam-lang glàp bâan yùu', ru: 'Сейчас еду домой' },
    play:  { thai: 'กำลังเล่นอยู่',     trans: 'gam-lang lên yùu',       ru: 'Сейчас играю' },
    do:    { thai: 'กำลังทำอยู่',       trans: 'gam-lang tham yùu',      ru: 'Сейчас делаю' },
  },
  // ─── ...แล้ว (Уже сделал) ───
  'pattern-11': {
    go:    { thai: 'ไปแล้ว',       trans: 'pai láeo',       ru: 'Уже ушёл' },
    eat:   { thai: 'กินแล้ว',      trans: 'gin láeo',       ru: 'Уже поел' },
    teach: { thai: 'สอนแล้ว',      trans: 'săawn láeo',     ru: 'Уже провёл урок' },
    home:  { thai: 'กลับบ้านแล้ว', trans: 'glàp bâan láeo', ru: 'Уже ушёл домой' },
    play:  { thai: 'เล่นแล้ว',     trans: 'lên láeo',       ru: 'Уже поиграл' },
    do:    { thai: 'ทำแล้ว',       trans: 'tham láeo',      ru: 'Уже сделал' },
  },
  // ─── เดี๋ยวจะ (Сейчас собираюсь...) ───
  'pattern-12': {
    go:    { thai: 'เดี๋ยวจะไป',       trans: 'dĭao jà pai',       ru: 'Сейчас пойду' },
    eat:   { thai: 'เดี๋ยวจะกิน',      trans: 'dĭao jà gin',       ru: 'Сейчас буду есть' },
    teach: { thai: 'เดี๋ยวจะสอน',      trans: 'dĭao jà săawn',     ru: 'Сейчас буду вести урок' },
    home:  { thai: 'เดี๋ยวจะกลับบ้าน', trans: 'dĭao jà glàp bâan', ru: 'Сейчас пойду домой' },
    play:  { thai: 'เดี๋ยวจะเล่น',     trans: 'dĭao jà lên',       ru: 'Сейчас буду играть' },
    do:    { thai: 'เดี๋ยวจะทำ',       trans: 'dĭao jà tham',      ru: 'Сейчас сделаю' },
  },
  // ─── ยังไม่ (Ещё не...) ───
  'pattern-13': {
    go:    { thai: 'ยังไม่ไป',       trans: 'yang mâi pai',       ru: 'Ещё не ушёл' },
    eat:   { thai: 'ยังไม่กิน',      trans: 'yang mâi gin',       ru: 'Ещё не ел' },
    teach: { thai: 'ยังไม่สอน',      trans: 'yang mâi săawn',     ru: 'Ещё не провёл урок' },
    home:  { thai: 'ยังไม่กลับบ้าน', trans: 'yang mâi glàp bâan', ru: 'Ещё не пошёл домой' },
    play:  { thai: 'ยังไม่เล่น',     trans: 'yang mâi lên',       ru: 'Ещё не играл' },
    do:    { thai: 'ยังไม่ทำ',       trans: 'yang mâi tham',      ru: 'Ещё не сделал' },
  },
};

/** Паттерны, для которых интерактивный конструктор имеет смысл */
export const BUILDER_PATTERN_IDS = new Set(Object.keys(ASSEMBLED_PHRASES));

export const PATTERNS_DATA: PatternItem[] = [
  // ─── 1. Модальные рамки (modal) ───
  {
    id: 'pattern-1',
    pattern: 'อยาก [yàak] + Глагол',
    patternThai: 'อยาก...',
    transcription: 'yàak...',
    meaning: 'Хочу сделать что-то',
    subCategory: 'modal',
    subCategoryLabel: 'Модальные рамки',
    examples: [
      { thai: 'อยากกลับบ้าน',  trans: 'yàak glàp bâan', ru: 'Хочу домой' },
      { thai: 'อยากกินน้ำ',    trans: 'yàak gin náam',   ru: 'Хочу попить воды' },
      { thai: 'อยากไปเที่ยว',  trans: 'yàak pai thîao',  ru: 'Хочу поехать отдохнуть' },
    ],
  },
  {
    id: 'pattern-2',
    pattern: 'ต้อง [dtâawng] + Глагол',
    patternThai: 'ต้อง...',
    transcription: 'dtâawng...',
    meaning: 'Надо / должен',
    subCategory: 'modal',
    subCategoryLabel: 'Модальные рамки',
    examples: [
      { thai: 'ต้องไปสอนแล้ว',  trans: 'dtâawng pai săawn láeo', ru: 'Пора идти вести урок' },
      { thai: 'ต้องทำอันนี้',    trans: 'dtâawng tham an-níi',    ru: 'Надо сделать вот это' },
      { thai: 'ต้องตั้งใจเรียน', trans: 'dtâawng dtâng-jai rian', ru: 'Нужно стараться на уроке' },
    ],
  },
  {
    id: 'pattern-3',
    pattern: 'Глагол + ได้ไหม [dâi măi]?',
    patternThai: '...ได้ไหม',
    transcription: '...dâi măi?',
    meaning: 'Можно? / Получится?',
    subCategory: 'modal',
    subCategoryLabel: 'Модальные рамки',
    examples: [
      { thai: 'ช่วยหน่อยได้ไหม', trans: 'chûai nòi dâi măi',     ru: 'Можешь помочь?' },
      { thai: 'ไปได้ไหม',         trans: 'pai dâi măi',           ru: 'Можно пойти?' },
      { thai: 'ลดราคาได้ไหม',     trans: 'lót raa-khaa dâi măi', ru: 'Скинете цену?' },
    ],
  },
  {
    id: 'pattern-4',
    pattern: 'ห้าม [hâam] + Глагол',
    patternThai: 'ห้าม...',
    transcription: 'hâam...',
    meaning: 'Нельзя / запрещено',
    subCategory: 'modal',
    subCategoryLabel: 'Модальные рамки',
    examples: [
      { thai: 'ห้ามเล่นโทรศัพท์', trans: 'hâam lên thoo-ra-sàp', ru: 'Телефон убрали!' },
      { thai: 'ห้ามวิ่ง',          trans: 'hâam wîng',            ru: 'Не бегать!' },
      { thai: 'ห้ามส่งเสียงดัง',   trans: 'hâam sòng sĭang dang', ru: 'Не шуметь!' },
    ],
  },
  {
    id: 'pattern-5',
    pattern: 'เคย [khooei] + Глагол',
    patternThai: 'เคย...',
    transcription: 'khooei...',
    meaning: 'Когда-то делал / бывало',
    subCategory: 'modal',
    subCategoryLabel: 'Модальные рамки',
    examples: [
      { thai: 'เคยไปไหม',       trans: 'khooei pai măi',          ru: 'Ты бывал там?' },
      { thai: 'ไม่เคยทำ',        trans: 'mâi khooei tham',        ru: 'Никогда такого не делал' },
      { thai: 'เคยทานอาหารไทย', trans: 'khooei thaan aa-hăan thai', ru: 'Раньше пробовал тайскую еду' },
    ],
  },

  // ─── 2. Связки и логика (connector) ───
  {
    id: 'pattern-6',
    pattern: 'A + แต่ว่า [dtàae-wâa] + B',
    patternThai: 'แต่ว่า',
    transcription: 'dtàae-wâa',
    meaning: 'Но / однако (соединяет две части)',
    subCategory: 'connector',
    subCategoryLabel: 'Связки и логика',
    examples: [
      { thai: 'อยากไป แต่ว่าไม่มีเวลา',  trans: 'yàak pai, dtàae-wâa mâi mee wee-laa', ru: 'Хочу пойти, но нет времени' },
      { thai: 'อร่อย แต่ว่าเผ็ด',          trans: 'a-ròi, dtàae-wâa phèt',               ru: 'Вкусно, но остро' },
      { thai: 'ถูก แต่ว่าดี',              trans: 'thùuk, dtàae-wâa dee',                 ru: 'Дёшево, но хорошо' },
    ],
  },
  {
    id: 'pattern-7',
    pattern: 'Результат + เพราะว่า [phraw-wâa] + Причина',
    patternThai: 'เพราะว่า',
    transcription: 'phraw-wâa',
    meaning: 'Потому что (объясняет причину)',
    subCategory: 'connector',
    subCategoryLabel: 'Связки и логика',
    examples: [
      { thai: 'มาสาย เพราะว่ารถติด',   trans: 'maa săai, phraw-wâa rót dtìt', ru: 'Опоздал, потому что пробка' },
      { thai: 'ชอบ เพราะว่าสนุก',       trans: 'châawp, phraw-wâa sa-nùk',     ru: 'Нравится, потому что весело' },
      { thai: 'เหนื่อย เพราะว่าร้อน', trans: 'nèuai, phraw-wâa ráwn',       ru: 'Устал, потому что жарко' },
    ],
  },
  {
    id: 'pattern-8',
    pattern: 'ถ้า [thâa] + Условие + ก็ [gâaw] + Результат',
    patternThai: 'ถ้า... ก็...',
    transcription: 'thâa... gâaw...',
    meaning: 'Если..., то... (условие)',
    subCategory: 'connector',
    subCategoryLabel: 'Связки и логика',
    examples: [
      { thai: 'ถ้าเสร็จแล้ว ก็กลับได้',   trans: 'thâa sèt láeo, gâaw glàp dâi',    ru: 'Если закончил — можешь идти' },
      { thai: 'ถ้าฝนตก ก็ไม่ไป',           trans: 'thâa fŏn dtok, gâaw mâi pai',     ru: 'Если дождь — не пойду' },
      { thai: 'ถ้าหิว ก็ไปกินข้าว',        trans: 'thâa hĭu, gâaw pai gin khâaw',    ru: 'Если голодный — иди поешь' },
    ],
  },
  {
    id: 'pattern-9',
    pattern: 'Действие 1 + แล้วก็ [láeo-gâaw] + Действие 2',
    patternThai: 'แล้วก็',
    transcription: 'láeo-gâaw',
    meaning: 'А потом / а затем (последовательность)',
    subCategory: 'connector',
    subCategoryLabel: 'Связки и логика',
    examples: [
      { thai: 'สอนเสร็จ แล้วก็กินข้าว',   trans: 'săawn sèt, láeo-gâaw gin khâaw',   ru: 'Закончу урок, потом поем' },
      { thai: 'ไปตลาด แล้วก็กลับบ้าน',    trans: 'pai dtà-làat, láeo-gâaw glàp bâan', ru: 'Схожу на рынок, потом домой' },
      { thai: 'อาบน้ำ แล้วก็นอน',          trans: 'àap náam, láeo-gâaw naawn',         ru: 'Помоюсь, потом лягу спать' },
    ],
  },

  // ─── 3. Временные маркеры (tense) ───
  {
    id: 'pattern-10',
    pattern: 'กำลัง [gam-lang] + Глагол + อยู่ [yùu]',
    patternThai: 'กำลัง...อยู่',
    transcription: 'gam-lang... yùu',
    meaning: 'Делаю прямо сейчас (длительное)',
    subCategory: 'tense',
    subCategoryLabel: 'Время',
    examples: [
      { thai: 'กำลังสอนอยู่',       trans: 'gam-lang săawn yùu',         ru: 'Сейчас веду урок' },
      { thai: 'กำลังทำการบ้านอยู่', trans: 'gam-lang tham kaan-bâan yùu', ru: 'Сейчас делаю домашку' },
      { thai: 'กำลังกินอยู่',       trans: 'gam-lang gin yùu',            ru: 'Сейчас ем' },
    ],
  },
  {
    id: 'pattern-11',
    pattern: 'Глагол + แล้ว [láeo]',
    patternThai: '...แล้ว',
    transcription: '...láeo',
    meaning: 'Уже сделал (завершённость)',
    subCategory: 'tense',
    subCategoryLabel: 'Время',
    examples: [
      { thai: 'กินข้าวแล้ว', trans: 'gin khâaw láeo',  ru: 'Уже поел' },
      { thai: 'เข้าใจแล้ว',  trans: 'khâo-jai láeo',   ru: 'Уже понял' },
      { thai: 'เสร็จแล้ว',   trans: 'sèt láeo',        ru: 'Уже готово' },
    ],
  },
  {
    id: 'pattern-12',
    pattern: 'เดี๋ยวจะ [dĭao jà] + Глагол',
    patternThai: 'เดี๋ยวจะ...',
    transcription: 'dĭao jà...',
    meaning: 'Сейчас / вот-вот сделаю',
    subCategory: 'tense',
    subCategoryLabel: 'Время',
    examples: [
      { thai: 'เดี๋ยวจะไป',    trans: 'dĭao jà pai',     ru: 'Сейчас пойду' },
      { thai: 'เดี๋ยวจะโทรหา', trans: 'dĭao jà thoo hăa', ru: 'Сейчас позвоню' },
      { thai: 'เดี๋ยวจะทำ',    trans: 'dĭao jà tham',     ru: 'Сейчас сделаю' },
    ],
  },
  {
    id: 'pattern-13',
    pattern: 'ยังไม่ [yang mâi] + Глагол',
    patternThai: 'ยังไม่...',
    transcription: 'yang mâi...',
    meaning: 'Ещё не сделал',
    subCategory: 'tense',
    subCategoryLabel: 'Время',
    examples: [
      { thai: 'ยังไม่เสร็จ',   trans: 'yang mâi sèt',     ru: 'Ещё не готово' },
      { thai: 'ยังไม่ได้กิน',  trans: 'yang mâi dâi gin',  ru: 'Ещё не ел' },
      { thai: 'ยังไม่ไป',      trans: 'yang mâi pai',      ru: 'Ещё не ушёл' },
    ],
  },

  // ─── 4. Финальные частицы живой речи (particle) ───
  {
    id: 'pattern-14',
    pattern: 'Фраза + นะ [ná]',
    patternThai: '...นะ',
    transcription: '...ná',
    meaning: 'Мягкое «ладно? / хорошо?»',
    subCategory: 'particle',
    subCategoryLabel: 'Эмоции и частицы',
    examples: [
      { thai: 'ฟังครูนะ',    trans: 'fang khruu ná',  ru: 'Слушай учителя, хорошо?' },
      { thai: 'ตั้งใจนะ',    trans: 'dtâng-jai ná',   ru: 'Постарайся, ладно?' },
      { thai: 'ระวังนะ',     trans: 'rá-wang ná',     ru: 'Осторожнее, слышишь?' },
    ],
  },
  {
    id: 'pattern-15',
    pattern: 'Фраза + สิ [sì]',
    patternThai: '...สิ',
    transcription: '...sì',
    meaning: 'Побуждение «давай же! / ну!»',
    subCategory: 'particle',
    subCategoryLabel: 'Эмоции и частицы',
    examples: [
      { thai: 'เร็วๆ สิ',   trans: 'reo-reo sì',  ru: 'Давай быстрее!' },
      { thai: 'ลองดูสิ',    trans: 'lawng doo sì', ru: 'Ну попробуй же!' },
      { thai: 'บอกมาสิ',    trans: 'bàwk maa sì',  ru: 'Ну скажи давай!' },
    ],
  },
  {
    id: 'pattern-16',
    pattern: 'Фраза + หรอ [răaw]?',
    patternThai: '...หรอ / ...เหรอ',
    transcription: '...răaw?',
    meaning: 'Удивление «серьёзно? / правда?»',
    subCategory: 'particle',
    subCategoryLabel: 'Эмоции и частицы',
    examples: [
      { thai: 'จริงหรอ',  trans: 'jing răaw',    ru: 'Серьёзно? Да ладно?' },
      { thai: 'ชอบหรอ',   trans: 'châawp răaw',  ru: 'Правда нравится?' },
      { thai: 'ไม่ไปหรอ', trans: 'mâi pai răaw', ru: 'Правда не пойдёшь?' },
    ],
  },
];
