const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, 'thai-sprint');
const phrasesFile = path.join(projectDir, 'src/data/phrases.ts');
const wordsFile = path.join(projectDir, 'src/data/words.ts');
const breakdownsFile = path.join(projectDir, 'src/data/wordBreakdowns.ts');
const readingFile = path.join(projectDir, 'src/data/readingLessons.ts');
const numbersFile = path.join(projectDir, 'src/utils/thaiNumbers.ts');

const targets = [];
const seenIds = new Set();
const seenText = new Map();

function addTarget(id, text, type = 'phrase') {
  if (!id || !text) return;
  const cleanText = text.trim();
  if (!cleanText) return;
  if (seenIds.has(id)) {
    console.warn(`Duplicate ID: ${id}`);
    return;
  }
  seenIds.add(id);
  targets.push({ id, text: cleanText, type });
  if (!seenText.has(cleanText)) {
    seenText.set(cleanText, id);
  }
}

// 1. Phrases
const phrasesContent = fs.readFileSync(phrasesFile, 'utf8');
const phraseRegex = /{\s*id:\s*['"]([^'"]+)['"],\s*thai:\s*['"]([^'"]+)['"]/g;
let m;
while ((m = phraseRegex.exec(phrasesContent)) !== null) {
  addTarget(m[1], m[2], 'phrase');
}

// 2. Words
const wordsContent = fs.readFileSync(wordsFile, 'utf8');
const wordRegex = /{\s*id:\s*['"]([^'"]+)['"],\s*thai:\s*['"]([^'"]+)['"]/g;
while ((m = wordRegex.exec(wordsContent)) !== null) {
  addTarget(m[1], m[2], 'word');
}

// 3. School number phrases
const numbersContent = fs.readFileSync(numbersFile, 'utf8');
const snpRegex = /{\s*id:\s*['"](snp-[^'"]+)['"],[\s\S]*?thai:\s*['"]([^'"]+)['"]/g;
while ((m = snpRegex.exec(numbersContent)) !== null) {
  addTarget(m[1], m[2], 'school_number');
}

// 4. Digits (0 to 9)
const digits = [
  { id: 'digit-0', thai: 'ศูนย์' },
  { id: 'digit-1', thai: 'หนึ่ง' },
  { id: 'digit-2', thai: 'สอง' },
  { id: 'digit-3', thai: 'สาม' },
  { id: 'digit-4', thai: 'สี่' },
  { id: 'digit-5', thai: 'ห้า' },
  { id: 'digit-6', thai: 'หก' },
  { id: 'digit-7', thai: 'เจ็ด' },
  { id: 'digit-8', thai: 'แปด' },
  { id: 'digit-9', thai: 'เก้า' },
];
digits.forEach(d => addTarget(d.id, d.thai, 'digit'));

// 5. Numbers 1 to 100
// Thai number generator logic
const ONES = ['', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'];
function getThaiNum(n) {
  if (n === 0) return 'ศูนย์';
  if (n === 100) return 'หนึ่งร้อย';
  if (n < 10) return ONES[n];
  if (n === 10) return 'สิบ';
  if (n < 20) {
    const rem = n % 10;
    return rem === 1 ? 'สิบเอ็ด' : 'สิบ' + ONES[rem];
  }
  const tens = Math.floor(n / 10);
  const rem = n % 10;
  let tenStr = tens === 2 ? 'ยี่สิบ' : ONES[tens] + 'สิบ';
  if (rem === 0) return tenStr;
  if (rem === 1) return tenStr + 'เอ็ด';
  return tenStr + ONES[rem];
}

for (let i = 1; i <= 100; i++) {
  addTarget(`num-${i}`, getThaiNum(i), 'number');
}

// Common scale numbers
const scales = [
  { id: 'num-200', thai: 'สองร้อย' },
  { id: 'num-300', thai: 'สามร้อย' },
  { id: 'num-400', thai: 'สี่ร้อย' },
  { id: 'num-500', thai: 'ห้าร้อย' },
  { id: 'num-1000', thai: 'หนึ่งพัน' },
  { id: 'num-1500', thai: 'หนึ่งพันห้าร้อย' },
  { id: 'num-2000', thai: 'สองพัน' },
  { id: 'num-5000', thai: 'ห้าพัน' },
  { id: 'num-10000', thai: 'หนึ่งหมื่น' },
  { id: 'num-100000', thai: 'หนึ่งแสน' },
  { id: 'num-1000000', thai: 'หนึ่งล้าน' },
];
scales.forEach(s => addTarget(s.id, s.thai, 'number'));

// 6. Word breakdowns segments (if not already covered)
const breakdownsContent = fs.readFileSync(breakdownsFile, 'utf8');
const segRegex = /{\s*thai:\s*['"]([^'"]+)['"]/g;
let breakIdx = 1;
while ((m = segRegex.exec(breakdownsContent)) !== null) {
  const text = m[1].trim();
  if (!seenText.has(text)) {
    addTarget(`seg-${breakIdx++}`, text, 'segment');
  }
}

// 7. Reading lesson words/syllables (if not already covered)
const readingContent = fs.readFileSync(readingFile, 'utf8');
const readWordRegex = /thai:\s*['"]([^'"]+)['"]/g;
let drillIdx = 1;
while ((m = readWordRegex.exec(readingContent)) !== null) {
  const text = m[1].trim();
  // Filter out any pure punctuation or non-Thai
  if (/[\u0E00-\u0E7F]/.test(text) && !seenText.has(text)) {
    addTarget(`drill-${drillIdx++}`, text, 'reading_drill');
  }
}

console.log(`Total audio targets extracted: ${targets.length}`);
console.log(`Unique Thai texts: ${seenText.size}`);

fs.writeFileSync(
  path.join(__dirname, 'audio_targets.json'),
  JSON.stringify(targets, null, 2),
  'utf8'
);
console.log('Saved to audio_targets.json');
