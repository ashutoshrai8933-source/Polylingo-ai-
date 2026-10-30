// Web Speech API Utilities: Synthesis (TTS) & Recognition (STT)

export interface SpeechCapabilities {
  supportsSpeechSynthesis: boolean;
  supportsSpeechRecognition: boolean;
  availableVoicesCount: number;
}

// Cached voices list
let cachedVoices: SpeechSynthesisVoice[] = [];

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  const loadVoices = () => {
    try {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        cachedVoices = v;
      }
    } catch (e) {
      // Ignore voice loading errors
    }
  };

  loadVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

export function checkSpeechCapabilities(): SpeechCapabilities {
  const supportsSpeechSynthesis = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const supportsSpeechRecognition =
    typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  let availableVoicesCount = cachedVoices.length;
  if (supportsSpeechSynthesis && availableVoicesCount === 0) {
    try {
      const v = window.speechSynthesis.getVoices();
      availableVoicesCount = v.length;
    } catch (e) {
      availableVoicesCount = 0;
    }
  }

  return {
    supportsSpeechSynthesis,
    supportsSpeechRecognition,
    availableVoicesCount,
  };
}

export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  if (cachedVoices.length > 0) return cachedVoices;
  try {
    cachedVoices = window.speechSynthesis.getVoices();
  } catch (e) {
    cachedVoices = [];
  }
  return cachedVoices;
}

let activeTimeoutId: any = null;

export function speakText(
  text: string,
  locale: string = 'en-US',
  rate: number = 1.0,
  onEnd?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser environment.');
    if (onEnd) onEnd();
    return false;
  }

  try {
    // Clear any previous watchdog timer
    if (activeTimeoutId) {
      clearTimeout(activeTimeoutId);
      activeTimeoutId = null;
    }

    // Stop previous utterance
    window.speechSynthesis.cancel();

    // Clean markdown symbols or HTML artifacts before speaking
    const cleanText = text
      .replace(/[*_#`~[\]()]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      if (onEnd) onEnd();
      return false;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = locale;
    utterance.rate = Math.max(0.6, Math.min(1.5, rate));
    utterance.pitch = 1.0;

    // Pick best matching voice
    const voices = getAvailableVoices();
    if (voices.length > 0) {
      const primaryLangCode = locale.split('-')[0].toLowerCase();
      // 1. Exact match e.g. 'es-ES'
      let matched = voices.find((v) => v.lang.toLowerCase() === locale.toLowerCase());
      // 2. Prefix match e.g. starts with 'es-'
      if (!matched) {
        matched = voices.find((v) => v.lang.toLowerCase().startsWith(primaryLangCode));
      }
      if (matched) {
        utterance.voice = matched;
      }
    }

    let hasEnded = false;
    const finish = () => {
      if (hasEnded) return;
      hasEnded = true;
      if (activeTimeoutId) {
        clearTimeout(activeTimeoutId);
        activeTimeoutId = null;
      }
      if (onEnd) onEnd();
    };

    utterance.onend = finish;
    utterance.onerror = (e) => {
      console.warn('Speech synthesis error event:', e);
      finish();
    };

    // Watchdog timer in case browser fails to trigger onend
    const estimatedDurationMs = Math.max(2500, (cleanText.length / 10) * 1000);
    activeTimeoutId = setTimeout(() => {
      finish();
    }, estimatedDurationMs);

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn('Speech synthesis playback error:', err);
    if (onEnd) onEnd();
    return false;
  }
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      if (activeTimeoutId) {
        clearTimeout(activeTimeoutId);
        activeTimeoutId = null;
      }
      window.speechSynthesis.cancel();
    } catch (e) {
      // Ignore
    }
  }
}

export function isSpeaking(): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  return window.speechSynthesis.speaking;
}

export function createSpeechRecognizer(
  locale: string = 'en-US',
  onResult: (transcript: string) => void,
  onError: (error: string) => void,
  onEnd: () => void
): any | null {
  if (typeof window === 'undefined') return null;

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return null;
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.lang = locale;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        currentTranscript += event.results[i][0].transcript;
      }
      onResult(currentTranscript);
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition error:', event.error);
      onError(event.error || 'Speech recognition encountered an issue');
    };

    recognition.onend = () => {
      onEnd();
    };

    return recognition;
  } catch (err: any) {
    console.warn('Failed to initialize speech recognition:', err);
    return null;
  }
}

// Convenient alias for speakText
export const speakPhrase = speakText;

// High-level one-shot speech recognition helper
export function startSpeechRecognition(
  locale: string = 'en-US',
  onResult: (transcript: string) => void,
  onError?: (error: string) => void
): () => void {
  const recognizer = createSpeechRecognizer(
    locale,
    (transcript) => onResult(transcript),
    (err) => onError && onError(err),
    () => {}
  );

  if (recognizer) {
    try {
      recognizer.start();
      return () => {
        try {
          recognizer.stop();
        } catch (e) {}
      };
    } catch (e) {
      console.warn('Could not start recognizer:', e);
    }
  }

  if (onError) onError('Speech recognition not supported in this browser');
  return () => {};
}

