export type LearningLevel = 'beginner' | 'intermediate' | 'advanced';

export type DailyGoal = 'casual' | 'regular' | 'serious'; // 5m (15 XP), 15m (30 XP), 30m (60 XP)

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  greeting: string;
  speechLocale: string;
  scriptType: string;
  region?: 'Europe' | 'Asia' | 'Americas' | 'Africa' | 'Middle East' | 'Oceania';
}

export interface UserProfile {
  id: string;
  email?: string;
  name: string;
  avatar: string;
  nativeLanguage: string; // e.g. 'hi' (Hindi)
  targetLanguage: string; // e.g. 'en' (English)
  level: LearningLevel;
  dailyGoal: DailyGoal;
  xp: number;
  streak: number;
  hearts: number; // 0 to 5
  gems: number; // in-app currency
  isPro?: boolean;
  lastActiveDate: string; // YYYY-MM-DD
  completedLessons: string[]; // lesson ids
  favoriteWords: string[]; // vocab word ids
  masteredWords: string[]; // vocab word ids
  completedQuizzes: {
    quizId: string;
    score: number;
    total: number;
    date: string;
  }[];
  isGuest: boolean;
}

export type ExerciseType =
  | 'multiple-choice'
  | 'fill-in-blank'
  | 'word-match'
  | 'sentence-translation'
  | 'speech-pronounce';

export interface MatchPair {
  id: string;
  hindi: string;
  english: string;
}

export interface InteractiveExercise {
  id: string;
  type: ExerciseType;
  promptHindi: string;
  promptEnglish?: string;
  audioPrompt?: string;
  explanationHindi: string;
  // For multiple-choice & fill-in-blank
  options?: string[];
  correctOptionIndex?: number;
  // For sentence translation
  targetSentence?: string;
  wordBank?: string[]; // Scrambled words for user to assemble
  correctWordSequence?: string[];
  // For word-match
  matchPairs?: MatchPair[];
  // Hints
  phoneticHint?: string;
  grammarNote?: string;
}

export interface DuolingoLesson {
  id: string;
  unit: number;
  unitTitle: string;
  unitHindi: string;
  unitColor: string;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  icon: string;
  xpReward: number;
  levelRequired: number;
  exercises: InteractiveExercise[];
}

export interface PathNode {
  id: string;
  lessonId: string;
  title: string;
  titleHindi: string;
  icon: string;
  unit: number;
  type: 'lesson' | 'chest' | 'trophy' | 'practice';
  rewardGems?: number;
  rewardXp?: number;
}

export interface VocabWord {
  id: string;
  word: string;
  romanization?: string;
  partOfSpeech: string;
  category: 'basics' | 'food' | 'travel' | 'people' | 'time' | 'actions' | 'work';
  translations: Record<string, string>;
  exampleSentence: {
    target: string;
    romanization?: string;
    translations: Record<string, string>;
  };
  level: LearningLevel;
}

export interface GrammarLesson {
  id: string;
  title: string;
  titleHindi: string;
  level: LearningLevel;
  summary: string;
  hindiExplanation: string;
  formula: string;
  examples: {
    english: string;
    hindi: string;
    breakdown: string;
  }[];
  commonMistakes: {
    incorrect: string;
    correct: string;
    whyHindi: string;
  }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  isDemo?: boolean;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  requiredMetric: 'xp' | 'lessons' | 'streak' | 'words' | 'quizzes';
  requiredValue: number;
  unlockedAt?: string;
}

export interface LessonStep {
  id: string;
  targetPhrase: string;
  romanization?: string;
  translations: Record<string, string>;
  explanation: Record<string, string>;
  audioText: string;
  exampleSentence?: {
    target: string;
    romanization?: string;
    translations: Record<string, string>;
  };
  tip?: Record<string, string>;
}

export interface Lesson {
  id: string;
  unit: number;
  title: Record<string, string>;
  description: Record<string, string>;
  category: 'greetings' | 'dining' | 'travel' | 'daily' | 'culture';
  level: LearningLevel;
  targetLanguage: string;
  steps: LessonStep[];
  xpReward: number;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'listening' | 'sentence-completion';
  questionPrompt: Record<string, string>;
  targetText?: string;
  audioText?: string;
  options: {
    id: string;
    text: string;
    romanization?: string;
  }[];
  correctOptionId: string;
  explanation: Record<string, string>;
  level: LearningLevel;
}

export interface Quiz {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  targetLanguage: string;
  level: LearningLevel;
  xpReward: number;
  questions: QuizQuestion[];
}

