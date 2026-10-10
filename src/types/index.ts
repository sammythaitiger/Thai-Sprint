export type Language = 'ru' | 'en';

export type PhraseCategory =
  | 'school_discipline'
  | 'school_lesson'
  | 'school_colleagues'
  | 'family_home'
  | 'family_kids'
  | 'street_food'
  | 'questions_greeting'
  | 'questions_plans'
  | 'questions_choice'
  | 'questions_people'
  | 'questions_clarify'
  | 'questions_needs';

export interface Phrase {
  id: string;
  thai: string;
  transcription: string;
  translation: string;
  category: PhraseCategory;
  categoryLabel: string;
}

export interface Word {
  thai: string;
  transcription: string;
  meaning: string;
}

export type TabType = 'lessons' | 'reading' | 'trainer' | 'numbers' | 'dictionary' | 'patterns' | 'media';

export * from './reading';

export interface CategoryFilter {
  value: string | null;
  label: string;
}

export interface PatternItem {
  id: string;
  pattern: string;          // Формула паттерна (например: "ต้อง + [Действие]")
  patternThai: string;      // Тайская связка (например: "ต้อง...")
  transcription: string;    // Фонетика связки (dtâawng...)
  meaning: string;          // Функция/Перевод ("Надо / Должен сделать...")
  subCategory: 'question' | 'request' | 'ability' | 'desire' | 'tense' | 'degree' | 'connector' | 'particle' | 'modal';
  subCategoryLabel: string;
  examples: {
    thai: string;
    trans: string;
    ru: string;
  }[];
}

export type WordCategory =
  | 'school_noun'
  | 'school_people'
  | 'school_verb'
  | 'school_adj'
  | 'school_place'
  | 'number_time'
  | 'daily_verb'
  | 'daily_noun'
  | 'food_health'
  | 'grammar_particle'
  | 'city_transport'
  | 'feelings_dialogue';

export interface WordItem {
  id: string;
  thai: string;
  transcription: string;
  translation: string;
  category: WordCategory;
  categoryLabel: string;
}

export type QuizType =
  | 'choose_translation'  // Тайский -> Русский перевод
  | 'reverse_translation' // Русский -> Выбор тайской фразы
  | 'audio_match'         // Аудио -> Выбор значения
  | 'fill_blank'          // Заполни пропуск в предложении
  | 'order_words'         // Сборка фразы из плашек
  | 'culture_situation';  // Ситуация в классе и этикет

export interface QuizQuestion {
  id: string;
  type: QuizType;
  question: string;
  audioText?: string;
  thaiPrompt?: string;
  transPrompt?: string;
  options?: string[];
  correctIndex?: number;
  scrambledWords?: string[]; // for order_words
  correctOrder?: string[];   // for order_words
  blankSentence?: {
    thai: string;
    trans: string;
  }; // for fill_blank: e.g. { thai: "นั่งลง ___ ครับ", trans: "nâng long ___ khráp" }
  explanation: string;
}

export interface DialogueLine {
  speaker: string; // 'Староста', 'Учитель', 'Ученик', 'Коллега', 'Дочка'
  thai: string;
  trans: string;
  ru: string;
}

export interface Lesson {
  day: number;
  title: string;
  theme: string;
  grammarNote: string;
  culturalTip?: string;
  teacherTip?: string; // Практический совет учителю по дисциплине и работе в тайской школе
  classroomDialogue?: DialogueLine[]; // Живой диалог для отработки на уроке
  wordIds: string[];
  phraseIds: string[];
  patternId?: string;
  quiz: QuizQuestion[];
}
