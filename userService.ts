import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserProfile } from '../types';

const LOCAL_STORAGE_KEY = 'polylingo_user_profile_v2';

export const DEFAULT_GUEST_PROFILE: UserProfile = {
  id: 'guest_user',
  name: 'Learner',
  avatar: '🦉',
  nativeLanguage: 'hi',
  targetLanguage: 'en',
  level: 'beginner',
  dailyGoal: 'regular',
  xp: 40,
  streak: 3,
  hearts: 5,
  gems: 450,
  isPro: false,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessons: ['unit1-lesson1'],
  favoriteWords: ['w1', 'w2'],
  masteredWords: ['w1'],
  completedQuizzes: [],
  isGuest: true,
};

export function getLocalProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_GUEST_PROFILE, ...parsed };
    }
  } catch (e) {
    console.warn('Failed to parse local profile', e);
  }
  return DEFAULT_GUEST_PROFILE;
}

export function saveLocalProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.warn('Failed to save local profile', e);
  }
}

/**
 * Fetch or initialize user profile in Firestore
 */
export async function syncUserProfile(
  uid: string,
  email: string | null,
  displayName: string | null,
  photoURL: string | null
): Promise<UserProfile> {
  const userRef = doc(db, 'users', uid);
  try {
    const snap = await getDoc(userRef);
    const local = getLocalProfile();

    if (snap.exists()) {
      const firestoreData = snap.data() as UserProfile;
      const merged: UserProfile = {
        ...DEFAULT_GUEST_PROFILE,
        ...firestoreData,
        id: uid,
        email: email || firestoreData.email,
        name: displayName || firestoreData.name || 'PolyLingo Learner',
        isGuest: false,
      };
      saveLocalProfile(merged);
      return merged;
    } else {
      // First time sign in: transfer guest progress to Firestore
      const newProfile: UserProfile = {
        ...local,
        id: uid,
        email: email || '',
        name: displayName || local.name || 'PolyLingo Learner',
        avatar: photoURL ? '🦉' : local.avatar || '🦉',
        isGuest: false,
        lastActiveDate: new Date().toISOString().split('T')[0],
      };

      await setDoc(userRef, {
        uid: newProfile.id,
        email: newProfile.email || 'learner@polylingo.ai',
        displayName: newProfile.name,
        avatar: newProfile.avatar,
        nativeLanguage: newProfile.nativeLanguage,
        targetLanguage: newProfile.targetLanguage,
        xp: newProfile.xp,
        streak: newProfile.streak,
        hearts: newProfile.hearts,
        gems: newProfile.gems,
        isPro: Boolean(newProfile.isPro),
        completedLessons: newProfile.completedLessons,
        currentLevel: 1,
        lastActiveDate: newProfile.lastActiveDate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      saveLocalProfile(newProfile);
      return newProfile;
    }
  } catch (err) {
    console.warn('Firestore sync failed, falling back to local storage profile:', err);
    return getLocalProfile();
  }
}

/**
 * Update user progress (XP, streak, completed lessons, hearts, gems)
 */
export async function updateUserStats(
  profile: UserProfile,
  updates: Partial<UserProfile>
): Promise<UserProfile> {
  const updated: UserProfile = {
    ...profile,
    ...updates,
  };

  saveLocalProfile(updated);

  if (!profile.isGuest && profile.id && profile.id !== 'guest_user') {
    try {
      const userRef = doc(db, 'users', profile.id);
      await updateDoc(userRef, {
        xp: updated.xp,
        streak: updated.streak,
        hearts: updated.hearts,
        gems: updated.gems,
        completedLessons: updated.completedLessons,
        lastActiveDate: updated.lastActiveDate,
        updatedAt: new Date().toISOString(),
      });
    } catch (e) {
      console.warn('Failed to update stats in Firestore', e);
    }
  }

  return updated;
}
