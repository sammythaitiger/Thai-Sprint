import { PatternItem } from '../types';

export interface BuilderAction {
  id: string;
  thai: string;
  trans: string;
  label: string; // Короткий ярлык кнопки на русском
  labelEn: string;
}

export interface AssembledPhrase {
  thai: string;
  trans: string;
  ru: string;
  en: string;
}

export const BUILDER_ACTIONS: BuilderAction[] = [
  { id: 'go',    thai: 'ไป',    trans: 'pai',     label: 'идти',     labelEn: 'go' },
  { id: 'eat',   thai: 'กิน',   trans: 'gin',     label: 'есть',     labelEn: 'eat' },
  { id: 'drink', thai: 'ดื่ม',  trans: 'dùem',    label: 'пить',     labelEn: 'drink' },
  { id: 'buy',   thai: 'ซื้อ',  trans: 'súue',    label: 'покупать', labelEn: 'buy' },
  { id: 'try',   thai: 'ลอง',   trans: 'laawng',  label: 'пробовать',labelEn: 'try' },
  { id: 'speak', thai: 'พูด',   trans: 'phûut',   label: 'говорить', labelEn: 'speak' },
  { id: 'do',    thai: 'ทำ',    trans: 'tham',    label: 'делать',   labelEn: 'do' },
  { id: 'wait',  thai: 'รอ',    trans: 'raaw',    label: 'ждать',    labelEn: 'wait' },
  { id: 'pay',   thai: 'จ่าย',  trans: 'jàai',    label: 'платить',  labelEn: 'pay' },
  { id: 'help',  thai: 'ช่วย',  trans: 'chûay',   label: 'помогать', labelEn: 'help' },
];

export const ASSEMBLED_PHRASES: Record<string, Record<string, AssembledPhrase>> = {
  // ─── pattern-d1: อยาก (Хочу...) ───
  'pattern-d1': {
    go:    { thai: 'อยากไป',    trans: 'yàak pai',    ru: 'Хочу пойти / поехать', en: 'Want to go' },
    eat:   { thai: 'อยากกิน',   trans: 'yàak gin',    ru: 'Хочу поесть',          en: 'Want to eat' },
    drink: { thai: 'อยากดื่ม',  trans: 'yàak dùem',   ru: 'Хочу попить',          en: 'Want to drink' },
    buy:   { thai: 'อยากซื้อ',  trans: 'yàak súue',   ru: 'Хочу купить',          en: 'Want to buy' },
    try:   { thai: 'อยากลอง',   trans: 'yàak laawng', ru: 'Хочу попробовать',     en: 'Want to try' },
    speak: { thai: 'อยากพูด',   trans: 'yàak phûut',  ru: 'Хочу сказать / говорить', en: 'Want to speak' },
    do:    { thai: 'อยากทำ',    trans: 'yàak tham',   ru: 'Хочу сделать',         en: 'Want to do' },
    wait:  { thai: 'อยากรอ',    trans: 'yàak raaw',   ru: 'Хочу подождать',       en: 'Want to wait' },
    pay:   { thai: 'อยากจ่าย',  trans: 'yàak jàai',   ru: 'Хочу заплатить',       en: 'Want to pay' },
    help:  { thai: 'อยากช่วย',  trans: 'yàak chûay',  ru: 'Хочу помочь',          en: 'Want to help' },
  },

  // ─── pattern-d3: ต้อง (Надо / Должен...) ───
  'pattern-d3': {
    go:    { thai: 'ต้องไป',    trans: 'dtâawng pai',    ru: 'Надо идти / ехать',  en: 'Must go' },
    eat:   { thai: 'ต้องกิน',   trans: 'dtâawng gin',    ru: 'Надо поесть',        en: 'Must eat' },
    drink: { thai: 'ต้องดื่ม',  trans: 'dtâawng dùem',   ru: 'Надо попить',        en: 'Must drink' },
    buy:   { thai: 'ต้องซื้อ',  trans: 'dtâawng súue',   ru: 'Надо купить',        en: 'Must buy' },
    try:   { thai: 'ต้องลอง',   trans: 'dtâawng laawng', ru: 'Надо попробовать',   en: 'Must try' },
    speak: { thai: 'ต้องพูด',   trans: 'dtâawng phûut',  ru: 'Надо сказать',       en: 'Must speak' },
    do:    { thai: 'ต้องทำ',    trans: 'dtâawng tham',   ru: 'Надо сделать',       en: 'Must do' },
    wait:  { thai: 'ต้องรอ',    trans: 'dtâawng raaw',   ru: 'Надо подождать',     en: 'Must wait' },
    pay:   { thai: 'ต้องจ่าย',  trans: 'dtâawng jàai',   ru: 'Надо заплатить',     en: 'Must pay' },
    help:  { thai: 'ต้องช่วย',  trans: 'dtâawng chûay',  ru: 'Надо помочь',        en: 'Must help' },
  },

  // ─── pattern-d4: ไม่ต้อง (Не надо...) ───
  'pattern-d4': {
    go:    { thai: 'ไม่ต้องไป',    trans: 'mâi dtâawng pai',    ru: 'Не надо идти',       en: 'No need to go' },
    eat:   { thai: 'ไม่ต้องกิน',   trans: 'mâi dtâawng gin',    ru: 'Не надо есть',       en: 'No need to eat' },
    drink: { thai: 'ไม่ต้องดื่ม',  trans: 'mâi dtâawng dùem',   ru: 'Не надо пить',       en: 'No need to drink' },
    buy:   { thai: 'ไม่ต้องซื้อ',  trans: 'mâi dtâawng súue',   ru: 'Не надо покупать',   en: 'No need to buy' },
    try:   { thai: 'ไม่ต้องลอง',   trans: 'mâi dtâawng laawng', ru: 'Не надо пробовать',  en: 'No need to try' },
    speak: { thai: 'ไม่ต้องพูด',   trans: 'mâi dtâawng phûut',  ru: 'Не надо говорить',   en: 'No need to speak' },
    do:    { thai: 'ไม่ต้องทำ',    trans: 'mâi dtâawng tham',   ru: 'Не надо делать',     en: 'No need to do' },
    wait:  { thai: 'ไม่ต้องรอ',    trans: 'mâi dtâawng raaw',   ru: 'Не надо ждать',      en: 'No need to wait' },
    pay:   { thai: 'ไม่ต้องจ่าย',  trans: 'mâi dtâawng jàai',   ru: 'Не надо платить',    en: 'No need to pay' },
    help:  { thai: 'ไม่ต้องช่วย',  trans: 'mâi dtâawng chûay',  ru: 'Не надо помогать',   en: 'No need to help' },
  },

  // ─── pattern-a1: ...ได้ (Могу / Получится) ───
  'pattern-a1': {
    go:    { thai: 'ไปได้',    trans: 'pai dâi',    ru: 'Могу пойти',      en: 'Can go' },
    eat:   { thai: 'กินได้',   trans: 'gin dâi',    ru: 'Могу съесть (съедобно)', en: 'Can eat' },
    drink: { thai: 'ดื่มได้',  trans: 'dùem dâi',   ru: 'Могу выпить',     en: 'Can drink' },
    buy:   { thai: 'ซื้อได้',  trans: 'súue dâi',   ru: 'Могу купить',     en: 'Can buy' },
    try:   { thai: 'ลองได้',   trans: 'laawng dâi', ru: 'Можно попробовать', en: 'Can try' },
    speak: { thai: 'พูดได้',   trans: 'phûut dâi',  ru: 'Могу сказать',    en: 'Can speak' },
    do:    { thai: 'ทำได้',    trans: 'tham dâi',   ru: 'Могу сделать (получится)', en: 'Can do it' },
    wait:  { thai: 'รอได้',    trans: 'raaw dâi',   ru: 'Могу подождать',  en: 'Can wait' },
    pay:   { thai: 'จ่ายได้',  trans: 'jàai dâi',   ru: 'Могу оплатить',   en: 'Can pay' },
    help:  { thai: 'ช่วยได้',  trans: 'chûay dâi',  ru: 'Могу помочь',     en: 'Can help' },
  },

  // ─── pattern-a2: ...ได้ไหม (Можно...? / Получится?) ───
  'pattern-a2': {
    go:    { thai: 'ไปได้ไหม',    trans: 'pai dâi măi',    ru: 'Можно пойти? / Поедем?', en: 'Can I go?' },
    eat:   { thai: 'กินได้ไหม',   trans: 'gin dâi măi',    ru: 'Можно съесть? (съедобно?)', en: 'Can I eat this?' },
    drink: { thai: 'ดื่มได้ไหม',  trans: 'dùem dâi măi',   ru: 'Можно пить?',           en: 'Can I drink this?' },
    buy:   { thai: 'ซื้อได้ไหม',  trans: 'súue dâi măi',   ru: 'Можно купить?',         en: 'Can I buy this?' },
    try:   { thai: 'ลองได้ไหม',   trans: 'laawng dâi măi', ru: 'Можно попробовать / примерить?', en: 'Can I try this?' },
    speak: { thai: 'พูดได้ไหม',   trans: 'phûut dâi măi',  ru: 'Можно сказать?',        en: 'Can I speak?' },
    do:    { thai: 'ทำได้ไหม',    trans: 'tham dâi măi',   ru: 'Сможешь сделать?',      en: 'Can you do this?' },
    wait:  { thai: 'รอได้ไหม',    trans: 'raaw dâi măi',   ru: 'Можешь подождать?',     en: 'Can you wait?' },
    pay:   { thai: 'จ่ายได้ไหม',  trans: 'jàai dâi măi',   ru: 'Можно оплатить (картой/qr)?', en: 'Can I pay?' },
    help:  { thai: 'ช่วยได้ไหม',  trans: 'chûay dâi măi',  ru: 'Можешь помочь?',        en: 'Can you help?' },
  },

  // ─── pattern-a4: ห้าม (Нельзя! Запрещено!) ───
  'pattern-a4': {
    go:    { thai: 'ห้ามไป',    trans: 'hâam pai',    ru: 'Нельзя уходить / ехать!', en: 'Do not go!' },
    eat:   { thai: 'ห้ามกิน',   trans: 'hâam gin',    ru: 'Нельзя есть!',            en: 'Do not eat!' },
    drink: { thai: 'ห้ามดื่ม',  trans: 'hâam dùem',   ru: 'Нельзя пить!',            en: 'Do not drink!' },
    buy:   { thai: 'ห้ามซื้อ',  trans: 'hâam súue',   ru: 'Нельзя покупать!',        en: 'Do not buy!' },
    try:   { thai: 'ห้ามลอง',   trans: 'hâam laawng', ru: 'Нельзя пробовать!',       en: 'Do not try!' },
    speak: { thai: 'ห้ามพูด',   trans: 'hâam phûut',  ru: 'Нельзя разговаривать!',   en: 'Do not speak!' },
    do:    { thai: 'ห้ามทำ',    trans: 'hâam tham',   ru: 'Нельзя делать!',          en: 'Do not do!' },
    wait:  { thai: 'ห้ามรอ',    trans: 'hâam raaw',   ru: 'Нельзя ждать здесь!',     en: 'Do not wait!' },
    pay:   { thai: 'ห้ามจ่าย',  trans: 'hâam jàai',   ru: 'Нельзя платить!',         en: 'Do not pay!' },
    help:  { thai: 'ห้ามช่วย',  trans: 'hâam chûay',  ru: 'Нельзя помогать (сам)!',  en: 'Do not help!' },
  },

  // ─── pattern-q1: ...ไหม (Да или нет?) ───
  'pattern-q1': {
    go:    { thai: 'ไปไหม',    trans: 'pai măi',    ru: 'Пойдешь / поедешь?', en: 'Are you going?' },
    eat:   { thai: 'กินไหม',   trans: 'gin măi',    ru: 'Будешь есть?',       en: 'Do you want to eat?' },
    drink: { thai: 'ดื่มไหม',  trans: 'dùem măi',   ru: 'Будешь пить?',       en: 'Do you want to drink?' },
    buy:   { thai: 'ซื้อไหม',  trans: 'súue măi',   ru: 'Покупаешь / берешь?', en: 'Are you buying?' },
    try:   { thai: 'ลองไหม',   trans: 'laawng măi', ru: 'Попробуешь?',        en: 'Want to try?' },
    speak: { thai: 'พูดไหม',   trans: 'phûut măi',  ru: 'Будешь говорить?',   en: 'Will you speak?' },
    do:    { thai: 'ทำไหม',    trans: 'tham măi',   ru: 'Будешь делать?',     en: 'Are you doing it?' },
    wait:  { thai: 'รอไหม',    trans: 'raaw măi',   ru: 'Будешь ждать?',      en: 'Are you waiting?' },
    pay:   { thai: 'จ่ายไหม',  trans: 'jàai măi',   ru: 'Будешь платить?',    en: 'Are you paying?' },
    help:  { thai: 'ช่วยไหม',  trans: 'chûay măi',  ru: 'Помочь тебе?',       en: 'Should I help?' },
  },

  // ─── pattern-q2: ...หรือยัง (Уже или еще нет?) ───
  'pattern-q2': {
    go:    { thai: 'ไปหรือยัง',    trans: 'pai rŭue yang',    ru: 'Уже ушел / поехал?',    en: 'Have you left yet?' },
    eat:   { thai: 'กินหรือยัง',   trans: 'gin rŭue yang',    ru: 'Уже поел или нет?',     en: 'Have you eaten yet?' },
    drink: { thai: 'ดื่มหรือยัง',  trans: 'dùem rŭue yang',   ru: 'Уже попил?',            en: 'Have you drank yet?' },
    buy:   { thai: 'ซื้อหรือยัง',  trans: 'súue rŭue yang',   ru: 'Уже купил?',            en: 'Have you bought it yet?' },
    try:   { thai: 'ลองหรือยัง',   trans: 'laawng rŭue yang', ru: 'Уже попробовал?',       en: 'Have you tried it yet?' },
    speak: { thai: 'พูดหรือยัง',   trans: 'phûut rŭue yang',  ru: 'Уже сказал ему?',       en: 'Have you spoken yet?' },
    do:    { thai: 'ทำหรือยัง',    trans: 'tham rŭue yang',   ru: 'Уже сделал или нет?',   en: 'Have you done it yet?' },
    wait:  { thai: 'รอหรือยัง',    trans: 'raaw rŭue yang',   ru: 'Уже ждешь?',            en: 'Are you waiting yet?' },
    pay:   { thai: 'จ่ายหรือยัง',  trans: 'jàai rŭue yang',   ru: 'Уже оплатил?',          en: 'Have you paid yet?' },
    help:  { thai: 'ช่วยหรือยัง',  trans: 'chûay rŭue yang',  ru: 'Уже помог ему?',        en: 'Have you helped yet?' },
  },

  // ─── pattern-t1: กำลัง...อยู่ (Прямо сейчас...) ───
  'pattern-t1': {
    go:    { thai: 'กำลังไปอยู่',    trans: 'gam-lang pai yùu',    ru: 'Прямо сейчас иду / еду',  en: 'Currently going' },
    eat:   { thai: 'กำลังกินอยู่',   trans: 'gam-lang gin yùu',    ru: 'Прямо сейчас ем',         en: 'Currently eating' },
    drink: { thai: 'กำลังดื่มอยู่',  trans: 'gam-lang dùem yùu',   ru: 'Прямо сейчас пью',        en: 'Currently drinking' },
    buy:   { thai: 'กำลังซื้ออยู่',  trans: 'gam-lang súue yùu',   ru: 'Прямо сейчас покупаю',    en: 'Currently buying' },
    try:   { thai: 'กำลังลองอยู่',   trans: 'gam-lang laawng yùu', ru: 'Прямо сейчас примеряю / пробую', en: 'Currently trying' },
    speak: { thai: 'กำลังพูดอยู่',   trans: 'gam-lang phûut yùu',  ru: 'Прямо сейчас говорю',     en: 'Currently speaking' },
    do:    { thai: 'กำลังทำอยู่',    trans: 'gam-lang tham yùu',   ru: 'Прямо сейчас делаю',      en: 'Currently doing' },
    wait:  { thai: 'กำลังรออยู่',    trans: 'gam-lang raaw yùu',   ru: 'Прямо сейчас жду',        en: 'Currently waiting' },
    pay:   { thai: 'กำลังจ่ายอยู่',  trans: 'gam-lang jàai yùu',   ru: 'Прямо сейчас оплачиваю',  en: 'Currently paying' },
    help:  { thai: 'กำลังช่วยอยู่',  trans: 'gam-lang chûay yùu',  ru: 'Прямо сейчас помогаю',    en: 'Currently helping' },
  },

  // ─── pattern-t2: ...แล้ว (Уже сделал) ───
  'pattern-t2': {
    go:    { thai: 'ไปแล้ว',    trans: 'pai láeo',    ru: 'Уже ушел / уехал', en: 'Already left' },
    eat:   { thai: 'กินแล้ว',   trans: 'gin láeo',    ru: 'Уже поел',         en: 'Already ate' },
    drink: { thai: 'ดื่มแล้ว',  trans: 'dùem láeo',   ru: 'Уже выпил',        en: 'Already drank' },
    buy:   { thai: 'ซื้อแล้ว',  trans: 'súue láeo',   ru: 'Уже купил',        en: 'Already bought' },
    try:   { thai: 'ลองแล้ว',   trans: 'laawng láeo', ru: 'Уже попробовал',   en: 'Already tried' },
    speak: { thai: 'พูดแล้ว',   trans: 'phûut láeo',  ru: 'Уже сказал',       en: 'Already said' },
    do:    { thai: 'ทำแล้ว',    trans: 'tham láeo',   ru: 'Уже сделал',       en: 'Already done' },
    wait:  { thai: 'รอแล้ว',    trans: 'raaw láeo',   ru: 'Уже подождал',     en: 'Already waited' },
    pay:   { thai: 'จ่ายแล้ว',  trans: 'jàai láeo',   ru: 'Уже оплатил',      en: 'Already paid' },
    help:  { thai: 'ช่วยแล้ว',  trans: 'chûay láeo',  ru: 'Уже помог',        en: 'Already helped' },
  },

  // ─── pattern-t3: ยังไม่ (Еще не...) ───
  'pattern-t3': {
    go:    { thai: 'ยังไม่ไป',    trans: 'yang mâi pai',    ru: 'Еще не пошел / не поехал', en: 'Not gone yet' },
    eat:   { thai: 'ยังไม่กิน',   trans: 'yang mâi gin',    ru: 'Еще не ел',                en: 'Not eaten yet' },
    drink: { thai: 'ยังไม่ดื่ม',  trans: 'yang mâi dùem',   ru: 'Еще не пил',               en: 'Not drank yet' },
    buy:   { thai: 'ยังไม่ซื้อ',  trans: 'yang mâi súue',   ru: 'Еще не купил',             en: 'Not bought yet' },
    try:   { thai: 'ยังไม่ลอง',   trans: 'yang mâi laawng', ru: 'Еще не пробовал',          en: 'Not tried yet' },
    speak: { thai: 'ยังไม่พูด',   trans: 'yang mâi phûut',  ru: 'Еще не говорил',           en: 'Not spoken yet' },
    do:    { thai: 'ยังไม่ทำ',    trans: 'yang mâi tham',   ru: 'Еще не сделал',            en: 'Not done yet' },
    wait:  { thai: 'ยังไม่รอ',    trans: 'yang mâi raaw',   ru: 'Еще не жду',               en: 'Not waited yet' },
    pay:   { thai: 'ยังไม่จ่าย',  trans: 'yang mâi jàai',   ru: 'Еще не оплатил',           en: 'Not paid yet' },
    help:  { thai: 'ยังไม่ช่วย',  trans: 'yang mâi chûay',  ru: 'Еще не помог',             en: 'Not helped yet' },
  },

  // ─── pattern-t4: เคย (Доводилось / Бывал) ───
  'pattern-t4': {
    go:    { thai: 'เคยไป',    trans: 'khooei pai',    ru: 'Бывал / ездил раньше',  en: 'Have been before' },
    eat:   { thai: 'เคยกิน',   trans: 'khooei gin',    ru: 'Пробовал есть раньше',  en: 'Have eaten before' },
    drink: { thai: 'เคยดื่ม',  trans: 'khooei dùem',   ru: 'Пил такое раньше',      en: 'Have drank before' },
    buy:   { thai: 'เคยซื้อ',  trans: 'khooei súue',   ru: 'Покупал такое раньше',  en: 'Have bought before' },
    try:   { thai: 'เคยลอง',   trans: 'khooei laawng', ru: 'Уже пробовал раньше',   en: 'Have tried before' },
    speak: { thai: 'เคยพูด',   trans: 'khooei phûut',  ru: 'Уже говорил об этом',   en: 'Have spoken before' },
    do:    { thai: 'เคยทำ',    trans: 'khooei tham',   ru: 'Уже делал такое раньше', en: 'Have done before' },
    wait:  { thai: 'เคยรอ',    trans: 'khooei raaw',   ru: 'Приходилось ждать',     en: 'Have waited before' },
    pay:   { thai: 'เคยจ่าย',  trans: 'khooei jàai',   ru: 'Уже платил за это',     en: 'Have paid before' },
    help:  { thai: 'เคยช่วย',  trans: 'khooei chûay',  ru: 'Приходилось помогать',  en: 'Have helped before' },
  },

  // ─── pattern-r1: ขอ (Можно мне / Пожалуйста, дайте...) ───
  'pattern-r1': {
    go:    { thai: 'ขอไป',    trans: 'khăaw pai',    ru: 'Разрешите пойти',         en: 'May I go?' },
    eat:   { thai: 'ขอกิน',   trans: 'khăaw gin',    ru: 'Можно я съем? (угощусь)', en: 'May I eat?' },
    drink: { thai: 'ขอดื่ม',  trans: 'khăaw dùem',   ru: 'Можно я попью?',          en: 'May I drink?' },
    buy:   { thai: 'ขอซื้อ',  trans: 'khăaw súue',   ru: 'Хочу приобрести это',     en: 'May I buy?' },
    try:   { thai: 'ขอลอง',   trans: 'khăaw laawng', ru: 'Дайте попробовать / примерить', en: 'May I try?' },
    speak: { thai: 'ขอพูด',   trans: 'khăaw phûut',  ru: 'Позвольте сказать',       en: 'May I speak?' },
    do:    { thai: 'ขอทำ',    trans: 'khăaw tham',   ru: 'Позвольте сделать',       en: 'May I do this?' },
    wait:  { thai: 'ขอรอ',    trans: 'khăaw raaw',   ru: 'Разрешите подождать тут', en: 'May I wait here?' },
    pay:   { thai: 'ขอจ่าย',  trans: 'khăaw jàai',   ru: 'Позвольте я заплачу (угощаю)', en: 'Let me pay' },
    help:  { thai: 'ขอช่วย',  trans: 'khăaw chûay',  ru: 'Позвольте помочь вам',    en: 'Let me help' },
  },

  // ─── pattern-deg1: ชอบ (Нравится / Люблю...) ───
  'pattern-deg1': {
    go:    { thai: 'ชอบไป',    trans: 'châawp pai',    ru: 'Люблю ходить / ездить туда', en: 'Like going' },
    eat:   { thai: 'ชอบกิน',   trans: 'châawp gin',    ru: 'Люблю есть это',             en: 'Like eating' },
    drink: { thai: 'ชอบดื่ม',  trans: 'châawp dùem',   ru: 'Люблю пить это',             en: 'Like drinking' },
    buy:   { thai: 'ชอบซื้อ',  trans: 'châawp súue',   ru: 'Люблю покупать',             en: 'Like buying' },
    try:   { thai: 'ชอบลอง',   trans: 'châawp laawng', ru: 'Люблю пробовать новое',      en: 'Like trying' },
    speak: { thai: 'ชอบพูด',   trans: 'châawp phûut',  ru: 'Люблю поболтать',            en: 'Like talking' },
    do:    { thai: 'ชอบทำ',    trans: 'châawp tham',   ru: 'Нравится заниматься этим',   en: 'Like doing' },
    wait:  { thai: 'ชอบรอ',    trans: 'châawp raaw',   ru: 'Люблю подождать (спокойно)', en: 'Don’t mind waiting' },
    pay:   { thai: 'ชอบจ่าย',  trans: 'châawp jàai',   ru: 'Люблю оплачивать (щедрый)',  en: 'Like paying' },
    help:  { thai: 'ชอบช่วย',  trans: 'châawp chûay',  ru: 'Люблю помогать людям',       en: 'Like helping' },
  },
};

export const BUILDER_PATTERN_IDS = new Set(Object.keys(ASSEMBLED_PHRASES));

export const PATTERNS_DATA: PatternItem[] = [
  // ==========================================
  // 1. ВОПРОСЫ И ДИАЛОГ (question) - 6 шаблонов
  // ==========================================
  {
    id: 'pattern-q1',
    pattern: 'Глагол / Прилагательное + ไหม [măi]?',
    patternThai: '...ไหม',
    transcription: '...măi?',
    meaning: 'Общий вопрос (Да или нет?)',
    subCategory: 'question',
    subCategoryLabel: 'Вопросы и диалог',
    examples: [
      { thai: 'เผ็ดไหม',       trans: 'phèt măi',       ru: 'Это острое?' },
      { thai: 'ชอบไหม',       trans: 'châawp măi',     ru: 'Тебе нравится?' },
      { thai: 'ไปด้วยกันไหม', trans: 'pai dûay-gan măi', ru: 'Пойдем вместе?' },
    ],
  },
  {
    id: 'pattern-q2',
    pattern: 'Действие + หรือยัง [rŭue yang]?',
    patternThai: '...หรือยัง',
    transcription: '...rŭue yang?',
    meaning: 'Уже сделал или еще нет?',
    subCategory: 'question',
    subCategoryLabel: 'Вопросы и диалог',
    examples: [
      { thai: 'กินข้าวหรือยัง', trans: 'gin khâao rŭue yang', ru: 'Ты уже поел?' },
      { thai: 'เสร็จหรือยัง',   trans: 'sèt rŭue yang',       ru: 'Уже готово / закончил?' },
      { thai: 'ถึงหรือยัง',     trans: 'thŭeng rŭue yang',    ru: 'Уже доехали / на месте?' },
    ],
  },
  {
    id: 'pattern-q3',
    pattern: 'Глагол + อะไร [a-rai]?',
    patternThai: '...อะไร',
    transcription: '...a-rai?',
    meaning: 'Что? / Какой?',
    subCategory: 'question',
    subCategoryLabel: 'Вопросы и диалог',
    examples: [
      { thai: 'กินอะไรดี', trans: 'gin a-rai dee', ru: 'Что вкусного поесть?' },
      { thai: 'ทำอะไรอยู่', trans: 'tham a-rai yùu', ru: 'Что ты сейчас делаешь?' },
      { thai: 'ชื่ออะไรครับ', trans: 'chûue a-rai khráp', ru: 'Как вас зовут?' },
    ],
  },
  {
    id: 'pattern-q4',
    pattern: 'Глагол / อยู่ + ที่ไหน [thîi-năi]?',
    patternThai: '...ที่ไหน',
    transcription: '...thîi-năi?',
    meaning: 'Где? / Куда?',
    subCategory: 'question',
    subCategoryLabel: 'Вопросы и диалог',
    examples: [
      { thai: 'ห้องน้ำอยู่ที่ไหน', trans: 'hông-nám yùu thîi-năi', ru: 'Где находится туалет?' },
      { thai: 'จะไปที่ไหน',       trans: 'jà pai thîi-năi',        ru: 'Куда направляетесь?' },
      { thai: 'พักที่ไหน',         trans: 'phák thîi-năi',          ru: 'Где вы остановились?' },
    ],
  },
  {
    id: 'pattern-q5',
    pattern: 'Предмет / Счет + เท่าไหร่ [thâo-rài]?',
    patternThai: '...เท่าไหร่',
    transcription: '...thâo-rài?',
    meaning: 'Сколько стоит? / Сколько?',
    subCategory: 'question',
    subCategoryLabel: 'Вопросы и диалог',
    examples: [
      { thai: 'อันนี้เท่าไหร่',   trans: 'an-níi thâo-rài',   ru: 'Сколько стоит вот эта штука?' },
      { thai: 'ทั้งหมดเท่าไหร่', trans: 'tháng-mòt thâo-rài', ru: 'Сколько всего с меня?' },
      { thai: 'กิโลละเท่าไหร่',  trans: 'gi-loo-lá thâo-rài', ru: 'Почем за килограмм?' },
    ],
  },
  {
    id: 'pattern-q6',
    pattern: 'Действие + ยังไง [yang-ngai]?',
    patternThai: '...ยังไง',
    transcription: '...yang-ngai?',
    meaning: 'Как? / Каким образом?',
    subCategory: 'question',
    subCategoryLabel: 'Вопросы и диалог',
    examples: [
      { thai: 'ไปยังไง',        trans: 'pai yang-ngai',       ru: 'Как туда добраться?' },
      { thai: 'ทำยังไง',        trans: 'tham yang-ngai',      ru: 'Как это делается?' },
      { thai: 'จ่ายเงินยังไง',  trans: 'jàai ngooen yang-ngai', ru: 'Как оплатить?' },
    ],
  },

  // ==========================================
  // 2. ПРОСЬБЫ И ЗАКАЗ (request) - 4 шаблона
  // ==========================================
  {
    id: 'pattern-r1',
    pattern: 'ขอ [khăaw] + Предмет / Действие',
    patternThai: 'ขอ...',
    transcription: 'khăaw...',
    meaning: 'Пожалуйста, дайте мне... / Можно мне...',
    subCategory: 'request',
    subCategoryLabel: 'Просьбы и заказ',
    examples: [
      { thai: 'ขอน้ำเปล่าแก้วหนึ่ง', trans: 'khăaw nám-bplào gâaew nèung', ru: 'Стакан простой воды, пожалуйста' },
      { thai: 'ขอเมนูหน่อยครับ',     trans: 'khăaw mee-nuu nòi khráp',     ru: 'Меню, пожалуйста' },
      { thai: 'ขอดูหน่อย',          trans: 'khăaw duu nòi',               ru: 'Дайте посмотреть, пожалуйста' },
    ],
  },
  {
    id: 'pattern-r2',
    pattern: 'ช่วย [chûay] + Глагол + หน่อย [nòi]',
    patternThai: 'ช่วย...หน่อย',
    transcription: 'chûay... nòi',
    meaning: 'Помогите, пожалуйста / сделайте...',
    subCategory: 'request',
    subCategoryLabel: 'Просьбы и заказ',
    examples: [
      { thai: 'ช่วยพูดช้าๆ หน่อย',  trans: 'chûay phûut cháa-cháa nòi', ru: 'Говорите помедленнее, пожалуйста' },
      { thai: 'ช่วยถ่ายรูปให้หน่อย', trans: 'chûay thàai-rûup hâi nòi',   ru: 'Сфотографируйте меня, пожалуйста' },
      { thai: 'ช่วยหยิบให้หน่อย',    trans: 'chûay yìp hâi nòi',          ru: 'Передайте / захватите мне, пожалуйста' },
    ],
  },
  {
    id: 'pattern-r3',
    pattern: 'เอา [ao] / ไม่เอา [mâi ao] + Предмет',
    patternThai: 'เอา... / ไม่เอา...',
    transcription: 'ao... / mâi ao...',
    meaning: 'Возьму это / Мне без...',
    subCategory: 'request',
    subCategoryLabel: 'Просьбы и заказ',
    examples: [
      { thai: 'เอาอันนี้ครับ',   trans: 'ao an-níi khráp',   ru: 'Возьму вот это' },
      { thai: 'ไม่เอาถุงครับ',   trans: 'mâi ao thŭng khráp', ru: 'Пакет не нужен' },
      { thai: 'เอาน้ำแข็งด้วย', trans: 'ao nám-khăeng dûay', ru: 'И со льдом, пожалуйста' },
    ],
  },
  {
    id: 'pattern-r4',
    pattern: 'ไม่ใส่ [mâi sài] + Ингредиент',
    patternThai: 'ไม่ใส่...',
    transcription: 'mâi sài...',
    meaning: 'Без... / Не добавляйте...',
    subCategory: 'request',
    subCategoryLabel: 'Просьбы и заказ',
    examples: [
      { thai: 'ไม่ใส่พริก',   trans: 'mâi sài phrík',   ru: 'Совсем без перца (не острое)' },
      { thai: 'ไม่ใส่น้ำตาล', trans: 'mâi sài nám-dtaan', ru: 'Без сахара' },
      { thai: 'ไม่ใส่ผงชูรส', trans: 'mâi sài phŏng-chuu-rót', ru: 'Без глутамата натрия' },
    ],
  },

  // ==========================================
  // 3. ВОЗМОЖНОСТЬ И УМЕНИЕ (ability) - 5 шаблонов
  // ==========================================
  {
    id: 'pattern-a1',
    pattern: 'Глагол + ได้ [dâi] / ไม่ได้ [mâi dâi]',
    patternThai: '...ได้ / ...ไม่ได้',
    transcription: '...dâi / ...mâi dâi',
    meaning: 'Могу / Не могу (обстоятельства / разрешение)',
    subCategory: 'ability',
    subCategoryLabel: 'Возможность и умение',
    examples: [
      { thai: 'กินเผ็ดได้',        trans: 'gin phèt dâi',        ru: 'Могу есть острое' },
      { thai: 'ไปไม่ได้ครับ',       trans: 'pai mâi dâi khráp',    ru: 'Не могу пойти (занят)' },
      { thai: 'สแกนจ่ายได้ไหม',     trans: 'sa-gaen jàai dâi măi', ru: 'Можно оплатить по QR-коду?' },
    ],
  },
  {
    id: 'pattern-a2',
    pattern: 'Глагол + ได้ไหม [dâi măi]?',
    patternThai: '...ได้ไหม',
    transcription: '...dâi măi?',
    meaning: 'Можно? / Получится? (вежливый вопрос)',
    subCategory: 'ability',
    subCategoryLabel: 'Возможность и умение',
    examples: [
      { thai: 'ลดราคาได้ไหม', trans: 'lót raa-khaa dâi măi', ru: 'Скинете цену?' },
      { thai: 'จอดตรงนี้ได้ไหม', trans: 'jàawt dtrong níi dâi măi', ru: 'Можно припарковаться здесь?' },
      { thai: 'ช่วยหน่อยได้ไหม', trans: 'chûay nòi dâi măi', ru: 'Можешь помочь?' },
    ],
  },
  {
    id: 'pattern-a3',
    pattern: 'Глагол + เป็น [bpen] / ไม่เป็น [mâi bpen]',
    patternThai: '...เป็น / ...ไม่เป็น',
    transcription: '...bpen / ...mâi bpen',
    meaning: 'Умею / Не умею (навык, опыт)',
    subCategory: 'ability',
    subCategoryLabel: 'Возможность и умение',
    examples: [
      { thai: 'พูดไทยเป็นนิดหน่อย', trans: 'phûut thai bpen nít-nòi', ru: 'Умею говорить по-тайски чуть-чуть' },
      { thai: 'ขับรถเป็นไหม',       trans: 'khàp rót bpen măi',      ru: 'Умеешь водить машину?' },
      { thai: 'ว่ายน้ำไม่เป็น',     trans: 'wâai-nám mâi bpen',      ru: 'Не умею плавать' },
    ],
  },
  {
    id: 'pattern-a4',
    pattern: 'ห้าม [hâam] + Глагол',
    patternThai: 'ห้าม...',
    transcription: 'hâam...',
    meaning: 'Нельзя / Запрещено!',
    subCategory: 'ability',
    subCategoryLabel: 'Возможность и умение',
    examples: [
      { thai: 'ห้ามจอดรถ',        trans: 'hâam jàawt rót',        ru: 'Парковка запрещена' },
      { thai: 'ห้ามสูบบุหรี่',      trans: 'hâam sùup bù-rìi',      ru: 'Курить запрещено' },
      { thai: 'ห้ามเล่นโทรศัพท์', trans: 'hâam lên thoo-ra-sàp', ru: 'Телефоны запрещены!' },
    ],
  },
  {
    id: 'pattern-a5',
    pattern: 'อย่า [yàa] + Глагол',
    patternThai: 'อย่า...',
    transcription: 'yàa...',
    meaning: 'Не надо... / Не делай...',
    subCategory: 'ability',
    subCategoryLabel: 'Возможность и умение',
    examples: [
      { thai: 'อย่าคิดมาก',   trans: 'yàa khít mâak',   ru: 'Не бери в голову / не парься' },
      { thai: 'อย่าไปสาย',    trans: 'yàa pai săai',    ru: 'Не опаздывай' },
      { thai: 'อย่าลืมนะ',    trans: 'yàa luem ná',     ru: 'Не забудь, ладно?' },
    ],
  },

  // ==========================================
  // 4. ЖЕЛАНИЯ И НЕОБХОДИМОСТЬ (desire) - 4 шаблона
  // ==========================================
  {
    id: 'pattern-d1',
    pattern: 'อยาก [yàak] + Глагол',
    patternThai: 'อยาก...',
    transcription: 'yàak...',
    meaning: 'Хочу сделать (действие)',
    subCategory: 'desire',
    subCategoryLabel: 'Желания и необходимость',
    examples: [
      { thai: 'อยากกลับบ้าน', trans: 'yàak glàp bâan', ru: 'Хочу домой' },
      { thai: 'อยากไปเที่ยว', trans: 'yàak pai thîao',  ru: 'Хочу съездить отдохнуть' },
      { thai: 'อยากลองกิน',   trans: 'yàak laawng gin', ru: 'Хочу попробовать это блюдо' },
    ],
  },
  {
    id: 'pattern-d2',
    pattern: 'อยากได้ [yàak dâi] + Предмет',
    patternThai: 'อยากได้...',
    transcription: 'yàak dâi...',
    meaning: 'Хочу получить / иметь (предмет)',
    subCategory: 'desire',
    subCategoryLabel: 'Желания и необходимость',
    examples: [
      { thai: 'อยากได้อันนี้',   trans: 'yàak dâi an-níi',   ru: 'Хочу вот эту вещь' },
      { thai: 'อยากได้ส่วนลด', trans: 'yàak dâi sùan-lót', ru: 'Хочу скидку' },
      { thai: 'อยากได้สีดำ',    trans: 'yàak dâi sǐi dam',   ru: 'Хочу черный цвет' },
    ],
  },
  {
    id: 'pattern-d3',
    pattern: 'ต้อง [dtâawng] + Глагол',
    patternThai: 'ต้อง...',
    transcription: 'dtâawng...',
    meaning: 'Надо / Должен / Обязан',
    subCategory: 'desire',
    subCategoryLabel: 'Желания и необходимость',
    examples: [
      { thai: 'ต้องไปแล้ว',       trans: 'dtâawng pai láeo',       ru: 'Пора идти' },
      { thai: 'ต้องจ่ายเท่าไหร่', trans: 'dtâawng jàai thâo-rài', ru: 'Сколько надо заплатить?' },
      { thai: 'ต้องรอนานไหม',    trans: 'dtâawng raaw naan măi',  ru: 'Надо долго ждать?' },
    ],
  },
  {
    id: 'pattern-d4',
    pattern: 'ไม่ต้อง [mâi dtâawng] + Глагол',
    patternThai: 'ไม่ต้อง...',
    transcription: 'mâi dtâawng...',
    meaning: 'Не нужно / Не обязательно',
    subCategory: 'desire',
    subCategoryLabel: 'Желания и необходимость',
    examples: [
      { thai: 'ไม่ต้องรีบ', trans: 'mâi dtâawng rîip', ru: 'Не спеши / без спешки' },
      { thai: 'ไม่ต้องทอน', trans: 'mâi dtâawng thaawn', ru: 'Сдачи не надо' },
      { thai: 'ไม่ต้องเกรงใจ', trans: 'mâi dtâawng greeng-jai', ru: 'Не стесняйся / чувствуй себя как дома' },
    ],
  },

  // ==========================================
  // 5. ВРЕМЯ И АСПЕКТЫ (tense) - 5 шаблонов
  // ==========================================
  {
    id: 'pattern-t1',
    pattern: 'กำลัง [gam-lang] + Глагол + อยู่ [yùu]',
    patternThai: 'กำลัง...อยู่',
    transcription: 'gam-lang... yùu',
    meaning: 'Делаю прямо сейчас (Present Continuous)',
    subCategory: 'tense',
    subCategoryLabel: 'Время и аспекты',
    examples: [
      { thai: 'กำลังกินข้าวอยู่', trans: 'gam-lang gin khâao yùu', ru: 'Прямо сейчас обедаю' },
      { thai: 'กำลังไปครับ',      trans: 'gam-lang pai khráp',     ru: 'Уже еду / в пути' },
      { thai: 'กำลังทำงานอยู่',   trans: 'gam-lang tham-ngaan yùu', ru: 'Сейчас работаю' },
    ],
  },
  {
    id: 'pattern-t2',
    pattern: 'Действие + แล้ว [láeo]',
    patternThai: '...แล้ว',
    transcription: '...láeo',
    meaning: 'Уже сделал (завершенность)',
    subCategory: 'tense',
    subCategoryLabel: 'Время и аспекты',
    examples: [
      { thai: 'เข้าใจแล้ว', trans: 'khâo-jai láeo', ru: 'Уже понял' },
      { thai: 'อิ่มแล้ว',   trans: 'ìm láeo',        ru: 'Уже наелся' },
      { thai: 'เสร็จแล้ว',  trans: 'sèt láeo',       ru: 'Уже готово' },
    ],
  },
  {
    id: 'pattern-t3',
    pattern: 'ยังไม่ [yang mâi] + Глагол',
    patternThai: 'ยังไม่...',
    transcription: 'yang mâi...',
    meaning: 'Еще не сделал (not yet)',
    subCategory: 'tense',
    subCategoryLabel: 'Время и аспекты',
    examples: [
      { thai: 'ยังไม่หิว',   trans: 'yang mâi hĭu',   ru: 'Еще не проголодался' },
      { thai: 'ยังไม่เสร็จ', trans: 'yang mâi sèt',   ru: 'Еще не готово' },
      { thai: 'ยังไม่เคยไป', trans: 'yang mâi khooei pai', ru: 'Еще ни разу там не был' },
    ],
  },
  {
    id: 'pattern-t4',
    pattern: 'เคย [khooei] + Глагол',
    patternThai: 'เคย...',
    transcription: 'khooei...',
    meaning: 'Доводилось / Бывал раньше (опыт)',
    subCategory: 'tense',
    subCategoryLabel: 'Время и аспекты',
    examples: [
      { thai: 'เคยไปเมืองไทยไหม', trans: 'khooei pai mueang thai măi', ru: 'Бывал раньше в Таиланде?' },
      { thai: 'ไม่เคยลอง',        trans: 'mâi khooei laawng',        ru: 'Никогда такого не пробовал' },
      { thai: 'เคยเจอกันแล้ว',    trans: 'khooei jooe gan láeo',     ru: 'Мы уже встречались раньше' },
    ],
  },
  {
    id: 'pattern-t5',
    pattern: 'เดี๋ยวจะ [dĭao jà] + Глагол',
    patternThai: 'เดี๋ยวจะ...',
    transcription: 'dĭao jà...',
    meaning: 'Сейчас вот-вот сделаю',
    subCategory: 'tense',
    subCategoryLabel: 'Время и аспекты',
    examples: [
      { thai: 'เดี๋ยวจะไป',    trans: 'dĭao jà pai',     ru: 'Сейчас пойду' },
      { thai: 'เดี๋ยวจะโทรหา', trans: 'dĭao jà thoo hăa', ru: 'Сейчас перезвоню' },
      { thai: 'เดี๋ยวจะกลับ',  trans: 'dĭao jà glàp',    ru: 'Скоро вернусь' },
    ],
  },

  // ==========================================
  // 6. ОЦЕНКА, СТЕПЕНЬ И СРАВНЕНИЕ (degree) - 4 шаблона
  // ==========================================
  {
    id: 'pattern-deg1',
    pattern: 'ชอบ [châawp] / ไม่ชอบ [mâi châawp] + Объект',
    patternThai: 'ชอบ... / ไม่ชอบ...',
    transcription: 'châawp... / mâi châawp...',
    meaning: 'Нравится / Не нравится',
    subCategory: 'degree',
    subCategoryLabel: 'Оценка и степень',
    examples: [
      { thai: 'ชอบอาหารไทย',   trans: 'châawp aa-hăan thai', ru: 'Люблю тайскую еду' },
      { thai: 'ไม่ชอบอากาศร้อน', trans: 'mâi châawp aa-gàat ráawn', ru: 'Не люблю сильную жару' },
      { thai: 'ชอบอันนี้มาก',   trans: 'châawp an-níi mâak',  ru: 'Очень нравится вот это' },
    ],
  },
  {
    id: 'pattern-deg2',
    pattern: 'Прилагательное + เกินไป [gooen-pai]',
    patternThai: '...เกินไป',
    transcription: '...gooen-pai',
    meaning: 'Слишком / Чересчур',
    subCategory: 'degree',
    subCategoryLabel: 'Оценка и степень',
    examples: [
      { thai: 'แพงเกินไป', trans: 'phaeng gooen-pai', ru: 'Слишком дорого' },
      { thai: 'เผ็ดเกินไป', trans: 'phèt gooen-pai',   ru: 'Слишком остро' },
      { thai: 'ไกลเกินไป', trans: 'glai gooen-pai',   ru: 'Слишком далеко' },
    ],
  },
  {
    id: 'pattern-deg3',
    pattern: 'Качество + มาก [mâak] / นิดหน่อย [nít-nòi]',
    patternThai: '...มาก / ...นิดหน่อย',
    transcription: '...mâak / ...nít-nòi',
    meaning: 'Очень... / Чуть-чуть...',
    subCategory: 'degree',
    subCategoryLabel: 'Оценка и степень',
    examples: [
      { thai: 'อร่อยมาก',       trans: 'a-ròi mâak',        ru: 'Очень вкусно' },
      { thai: 'เหนื่อยมาก',     trans: 'nùeay mâak',       ru: 'Очень устал' },
      { thai: 'เข้าใจนิดหน่อย', trans: 'khâo-jai nít-nòi', ru: 'Понимаю самую малость' },
    ],
  },
  {
    id: 'pattern-deg4',
    pattern: 'Качество + กว่า [gwàa]',
    patternThai: '...กว่า',
    transcription: '...gwàa',
    meaning: 'Более..., чем... (сравнение)',
    subCategory: 'degree',
    subCategoryLabel: 'Оценка и степень',
    examples: [
      { thai: 'ดีกว่า',   trans: 'dee gwàa',   ru: 'Лучше' },
      { thai: 'ถูกกว่า',  trans: 'thùuk gwàa', ru: 'Дешевле' },
      { thai: 'ใหญ่กว่า', trans: 'yài gwàa',   ru: 'Больше по размеру' },
    ],
  },

  // ==========================================
  // 7. ЛОГИКА И СОЮЗЫ (connector) - 4 шаблона
  // ==========================================
  {
    id: 'pattern-c1',
    pattern: 'A + แต่ว่า [dtàae-wâa] + B',
    patternThai: 'แต่ว่า...',
    transcription: 'dtàae-wâa...',
    meaning: 'Но / однако',
    subCategory: 'connector',
    subCategoryLabel: 'Логика и союзы',
    examples: [
      { thai: 'อยากไป แต่ว่าไม่มีเวลา', trans: 'yàak pai, dtàae-wâa mâi mee wee-laa', ru: 'Хочу пойти, но нет времени' },
      { thai: 'อร่อย แต่ว่าเผ็ด',         trans: 'a-ròi, dtàae-wâa phèt',              ru: 'Вкусно, но остро' },
      { thai: 'ถูก แต่ว่าดี',             trans: 'thùuk, dtàae-wâa dee',                ru: 'Дешево, но качественно' },
    ],
  },
  {
    id: 'pattern-c2',
    pattern: 'Результат + เพราะว่า [phraw-wâa] + Причина',
    patternThai: 'เพราะว่า...',
    transcription: 'phraw-wâa...',
    meaning: 'Потому что (причина)',
    subCategory: 'connector',
    subCategoryLabel: 'Логика и союзы',
    examples: [
      { thai: 'มาสาย เพราะว่ารถติด',  trans: 'maa săai, phraw-wâa rót dtìt', ru: 'Опоздал, потому что пробка' },
      { thai: 'ชอบ เพราะว่าสนุก',      trans: 'châawp, phraw-wâa sa-nùk',    ru: 'Нравится, потому что весело' },
      { thai: 'เหนื่อย เพราะว่าร้อน', trans: 'nùeay, phraw-wâa ráawn',      ru: 'Устал, потому что жара' },
    ],
  },
  {
    id: 'pattern-c3',
    pattern: 'ถ้า [thâa] + Условие + ก็ [gâaw] + Результат',
    patternThai: 'ถ้า... ก็...',
    transcription: 'thâa... gâaw...',
    meaning: 'Если..., то... (условие)',
    subCategory: 'connector',
    subCategoryLabel: 'Логика и союзы',
    examples: [
      { thai: 'ถ้าว่าง ก็ไปด้วยกัน', trans: 'thâa wâang, gâaw pai dûay-gan', ru: 'Если свободен — пойдем вместе' },
      { thai: 'ถ้าฝนตก ก็ไม่ไป',     trans: 'thâa fŏn dtok, gâaw mâi pai',   ru: 'Если пойдет дождь — не пойду' },
      { thai: 'ถ้าหิว ก็กินข้าว',    trans: 'thâa hĭu, gâaw gin khâao',      ru: 'Если проголодался — поешь' },
    ],
  },
  {
    id: 'pattern-c4',
    pattern: 'Действие 1 + แล้วก็ [láeo-gâaw] + Действие 2',
    patternThai: 'แล้วก็...',
    transcription: 'láeo-gâaw...',
    meaning: 'А затем / а потом (последовательность)',
    subCategory: 'connector',
    subCategoryLabel: 'Логика и союзы',
    examples: [
      { thai: 'กินข้าว แล้วก็ไปทำงาน', trans: 'gin khâao, láeo-gâaw pai tham-ngaan', ru: 'Поем, а потом пойду на работу' },
      { thai: 'ไปตลาด แล้วก็กลับบ้าน', trans: 'pai dtà-làat, láeo-gâaw glàp bâan',   ru: 'Схожу на рынок, а потом домой' },
      { thai: 'อาบน้ำ แล้วก็นอน',       trans: 'àap nám, láeo-gâaw naawn',            ru: 'Приму душ, а затем лягу спать' },
    ],
  },

  // ==========================================
  // 8. ФИНАЛЬНЫЕ ЧАСТИЦЫ (particle) - 3 шаблона
  // ==========================================
  {
    id: 'pattern-p1',
    pattern: 'Фраза + นะ [ná]',
    patternThai: '...นะ',
    transcription: '...ná',
    meaning: 'Мягкое «ладно? / хорошо?»',
    subCategory: 'particle',
    subCategoryLabel: 'Эмоции и частицы',
    examples: [
      { thai: 'รอนี่นะ',   trans: 'raaw nîi ná',  ru: 'Жди здесь, ладно?' },
      { thai: 'ระวังนะ',   trans: 'ra-wang ná',   ru: 'Осторожнее, слышишь?' },
      { thai: 'ตั้งใจนะ',  trans: 'dtâng-jai ná', ru: 'Постарайся, хорошо?' },
    ],
  },
  {
    id: 'pattern-p2',
    pattern: 'Фраза + สิ [sì]',
    patternThai: '...สิ',
    transcription: '...sì',
    meaning: 'Побуждение «давай же! / ну!»',
    subCategory: 'particle',
    subCategoryLabel: 'Эмоции и частицы',
    examples: [
      { thai: 'เร็วๆ สิ',  trans: 'reo-reo sì',  ru: 'Давай быстрее!' },
      { thai: 'ลองดูสิ',   trans: 'laawng duu sì', ru: 'Ну попробуй же!' },
      { thai: 'บอกมาสิ',   trans: 'bàawk maa sì',  ru: 'Ну скажи уже!' },
    ],
  },
  {
    id: 'pattern-p3',
    pattern: 'Фраза + หรอ / เหรอ [răaw]?',
    patternThai: '...หรอ',
    transcription: '...răaw?',
    meaning: 'Удивление «серьёзно? / правда?»',
    subCategory: 'particle',
    subCategoryLabel: 'Эмоции и частицы',
    examples: [
      { thai: 'จริงหรอ',  trans: 'jing răaw',    ru: 'Серьёзно? Да ладно?' },
      { thai: 'ชอบหรอ',   trans: 'châawp răaw',  ru: 'Правда нравится?' },
      { thai: 'ไม่ไปหรอ', trans: 'mâi pai răaw', ru: 'Правда не пойдешь?' },
    ],
  },
];
