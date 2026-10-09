export type Finger =
  | 'left-pinky'
  | 'left-ring'
  | 'left-middle'
  | 'left-index'
  | 'right-index'
  | 'right-middle'
  | 'right-ring'
  | 'right-pinky';

export type Tone = 'mid' | 'low' | 'falling' | 'high' | 'rising';
export type ConsonantClass = 'mid' | 'high' | 'low';
export type SyllableType = 'live' | 'dead';

export interface KeyDefinition {
  thai: string;
  char?: string; // alias for thai
  qwerty: string;
  qwertyKey?: string; // alias for qwerty
  keyCode?: string;
  shift?: boolean;
  finger: Finger;
  hand: 'left' | 'right';
  name: { ru: string; en: string };
  role: 'consonant' | 'vowel' | 'tone_mark' | 'special';
  consonantClass?: ConsonantClass;
  sound: string;
}

export interface ReadingWord {
  thai: string;
  transcription: string;
  translation: { ru: string; en: string };
  tone: Tone;
  class?: ConsonantClass;
  syllableType?: SyllableType;
  expectedSequence?: string[];
  typingSteps?: string[];
  explanation?: { ru: string; en: string };
}

export interface ContinuousTextSegment {
  thai: string;
  transcription: string;
  translation: { ru: string; en: string };
}

export interface ContinuousTextConfig {
  fullText: string;
  segments: ContinuousTextSegment[];
  transcription: string;
  translation: { ru: string; en: string };
}

export interface ToneComparison {
  description: { ru: string; en: string };
  words: {
    thai: string;
    tone: Tone;
    trans: string;
    meaning: { ru: string; en: string };
  }[];
}

export interface ReadingLesson {
  id: number; // 1..41
  lessonCode: string; // "1.1", "1.2", ..., "11.5"
  chapter: number; // 1..11
  day: number; // 1..11
  stageTitle: { ru: string; en: string };
  chapterToneRule: { ru: string; en: string };
  title: { ru: string; en: string };
  subtitle: { ru: string; en: string };
  toneRule: { ru: string; en: string };
  typingRule: { ru: string; en: string };
  theoryNote: { ru: string; en: string };
  ruleSummary: { ru: string; en: string };
  keys: KeyDefinition[];
  drills: string[]; // isolated typing drills
  vocabulary: ReadingWord[];
  toneComparison?: ToneComparison;
  isContinuousText?: boolean;
  continuousText?: ContinuousTextConfig;
}

export interface WordContext {
  expectedWord: string;
  typedSoFar: string;
  expectedChar: string;
}
