import { UserProfile, AchievementBadge } from '../types';

const STORAGE_KEY = 'polylingo_user_profile_v1';

export const INITIAL_ACHIEVEMENTS: AchievementBadge[] = [
  {
    id: 'first-step',
    title: 'First Step',
    description: 'Complete your first language lesson',
    icon: '🌱',
    requiredMetric: 'lessons',
    requiredValue: 1,
  },
  {
    id: 'streak-3',
    title: 'Consistent Learner',
    description: 'Maintain a 3-day study streak',
    icon: '🔥',
    requiredMetric: 'streak',
    requiredValue: 3,
  },
  {
    id: 'vocab-collector',
    title: 'Word Collector',
    description: 'Save or master 5 vocabulary words',
    icon: '📖',
    requiredMetric: 'words',
    requiredValue: 5,
  },
  {
    id: 'quiz-champ',
    title: 'Quiz Champion',
    description: 'Score over 80% on any practice quiz',
    icon: '🏆',
    requiredMetric: 'quizzes',
    requiredValue: 1,
  },
  {
    id: 'xp-100',
    title: 'Centurion',
    description: 'Earn 100 XP points in PolyLingo AI',
    icon: '⚡',
    requiredMetric: 'xp',
    requiredValue: 100,
  },
];

export const DEFAULT_PROFILE: UserProfile = {
  id: 'guest_user',
  name: 'Polyglot Explorer',
  avatar: '🦉',
  nativeLanguage: 'hi',
  targetLanguage: 'en',
  level: 'beginner',
  dailyGoal: 'regular',
  xp: 45,
  streak: 2,
  hearts: 5,
  gems: 450,
  isPro: false,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessons: ['es-1'],
  favoriteWords: ['es-v-1', 'es-v-2'],
  masteredWords: ['es-v-1'],
  completedQuizzes: [
    {
      quizId: 'quiz-es-1',
      score: 3,
      total: 3,
      date: new Date().toISOString().split('T')[0],
    },
  ],
  isGuest: true,
};

export function loadUserProfile(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PROFILE, ...parsed };
  } catch (e) {
    console.error('Failed to parse user profile from localStorage:', e);
    return DEFAULT_PROFILE;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save user profile to localStorage:', e);
  }
}

export function addXP(profile: UserProfile, amount: number): UserProfile {
  const today = new Date().toISOString().split('T')[0];
  const newXP = profile.xp + amount;

  let newStreak = profile.streak;
  if (profile.lastActiveDate !== today) {
    // Check if yesterday
    const lastDate = new Date(profile.lastActiveDate);
    const currDate = new Date(today);
    const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }
  }

  const updated: UserProfile = {
    ...profile,
    xp: newXP,
    streak: Math.max(1, newStreak),
    lastActiveDate: today,
  };
  saveUserProfile(updated);
  return updated;
}

export function toggleLessonCompletion(profile: UserProfile, lessonId: string, xpReward: number = 20): UserProfile {
  const isCompleted = profile.completedLessons.includes(lessonId);
  let updatedLessons: string[];
  let updatedXP = profile.xp;

  if (isCompleted) {
    updatedLessons = profile.completedLessons.filter((id) => id !== lessonId);
  } else {
    updatedLessons = [...profile.completedLessons, lessonId];
    updatedXP += xpReward;
  }

  const updated: UserProfile = {
    ...profile,
    completedLessons: updatedLessons,
    xp: updatedXP,
    lastActiveDate: new Date().toISOString().split('T')[0],
  };
  saveUserProfile(updated);
  return updated;
}

export function toggleFavoriteWord(profile: UserProfile, wordId: string): UserProfile {
  const isFav = profile.favoriteWords.includes(wordId);
  const updatedFavs = isFav
    ? profile.favoriteWords.filter((id) => id !== wordId)
    : [...profile.favoriteWords, wordId];

  const updated: UserProfile = {
    ...profile,
    favoriteWords: updatedFavs,
  };
  saveUserProfile(updated);
  return updated;
}

export function toggleMasteredWord(profile: UserProfile, wordId: string): UserProfile {
  const isMastered = profile.masteredWords.includes(wordId);
  const updatedMastered = isMastered
    ? profile.masteredWords.filter((id) => id !== wordId)
    : [...profile.masteredWords, wordId];

  const updated: UserProfile = {
    ...profile,
    masteredWords: updatedMastered,
  };
  saveUserProfile(updated);
  return updated;
}
