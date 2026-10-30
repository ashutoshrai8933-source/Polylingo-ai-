import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

// Initialize GoogleGenAI if key is present
const hasApiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
let aiClient: GoogleGenAI | null = null;

if (hasApiKey) {
  aiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
      model: 'gemini-3.8-flash',
    });
  });

  // Direct download endpoints for repository source zip
  const sendZip = (_req: express.Request, res: express.Response) => {
    const zipPath = path.resolve(__dirname, 'polylingo-ai-source.zip');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/zip');
    res.download(zipPath, 'polylingo-ai-source.zip', (err) => {
      if (err) {
        res.status(404).send('Source zip not found');
      }
    });
  };

  app.get('/api/download-source', sendZip);
  app.get('/download', sendZip);
  app.get('/polylingo-ai-source.zip', sendZip);

  // AI Tutor chat endpoint
  app.post('/api/tutor', async (req, res) => {
    try {
      const {
        message,
        nativeLanguage = { code: 'en', name: 'English' },
        targetLanguage = { code: 'es', name: 'Spanish' },
        level = 'beginner',
        history = [],
        mode = 'general',
      } = req.body;

      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Message is required' });
        return;
      }

      // Check if real AI can be used
      if (aiClient && process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
        try {
          const systemInstruction = `You are PolyLingo AI, a world-class, warm, and motivating language tutor.
The student's native language is ${nativeLanguage.name} (${nativeLanguage.code}).
The student is learning ${targetLanguage.name} (${targetLanguage.code}) at the "${level}" level.
Current practice mode: "${mode}".

Instructions:
1. Explain language concepts, grammar nuances, and cultural contexts primarily in the student's native language (${nativeLanguage.name}) so they grasp the explanation effortlessly.
2. Provide phrases, dialogues, and vocabulary in the target language (${targetLanguage.name}), accompanied by phonetic pronunciation/romanization where helpful (especially for non-Latin scripts like Japanese, Hindi, Arabic, Korean, Chinese).
3. If the user sent target-language text, analyze it:
   - Celebrate good usage!
   - Highlight any mistakes gently.
   - Show the corrected sentence in ${targetLanguage.name}.
   - Explain why that correction is natural in ${nativeLanguage.name}.
4. Provide a mini follow-up question or short sentence for the student to translate or answer back in ${targetLanguage.name}.
5. Keep answers focused, beautifully formatted with clean bullet points or bold text, and under 250 words.`;

          // Format previous conversation history if available
          const contents = [];
          if (Array.isArray(history) && history.length > 0) {
            for (const item of history.slice(-6)) {
              if (item.role && item.text) {
                contents.push({
                  role: item.role === 'assistant' || item.role === 'model' ? 'model' : 'user',
                  parts: [{ text: item.text }],
                });
              }
            }
          }

          // Add the current user query
          contents.push({
            role: 'user',
            parts: [{ text: message }],
          });

          const response = await aiClient.models.generateContent({
            model: 'gemini-3.8-flash',
            contents,
            config: {
              systemInstruction,
              temperature: 0.7,
              topP: 0.9,
            },
          });

          const replyText = response.text || '';
          res.json({
            reply: replyText,
            isDemo: false,
          });
          return;
        } catch (apiErr: any) {
          console.warn('Gemini API call returned error, falling back to smart demo responder:', apiErr?.message || apiErr);
          // Fall through to smart demo generator
        }
      }

      // Context-aware smart demo responses if API key is not yet set or offline
      const demoReply = generateDemoTutorResponse(message, nativeLanguage.name, targetLanguage.name, level, mode);
      res.json({
        reply: demoReply,
        isDemo: true,
        notice: 'Demo mode active. To activate live Gemini 3.8 Flash responses, configure GEMINI_API_KEY.',
      });
    } catch (err: any) {
      console.error('Tutor error:', err);
      res.status(500).json({
        error: 'Failed to generate tutor response',
        details: err?.message || 'Internal server error',
      });
    }
  });

  // Pronunciation feedback endpoint
  app.post('/api/pronunciation-feedback', async (req, res) => {
    try {
      const { expectedText, spokenText, nativeLanguage = 'English', targetLanguage = 'Spanish' } = req.body;

      if (!expectedText || !spokenText) {
        res.status(400).json({ error: 'expectedText and spokenText are required' });
        return;
      }

      const normalizedExpected = expectedText.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, '');
      const normalizedSpoken = spokenText.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, '');

      // Simple character & token similarity for fast feedback
      const expectedWords = normalizedExpected.split(/\s+/);
      const spokenWords = normalizedSpoken.split(/\s+/);

      let matchedWords = 0;
      for (const word of spokenWords) {
        if (expectedWords.includes(word)) {
          matchedWords++;
        }
      }

      const rawAccuracy = Math.round((matchedWords / Math.max(expectedWords.length, spokenWords.length)) * 100);
      const accuracy = Math.min(100, Math.max(0, normalizedExpected === normalizedSpoken ? 100 : rawAccuracy));

      let feedbackTips = '';
      if (accuracy >= 90) {
        feedbackTips = `Outstanding pronunciation! Your speech matched the ${targetLanguage} phrase almost perfectly.`;
      } else if (accuracy >= 65) {
        feedbackTips = `Good attempt! You got most of the words right. Listen closely to the native audio and emphasize clear syllable rhythm.`;
      } else {
        feedbackTips = `Keep practicing! Try breaking the sentence down into 2-word chunks and speaking a little slower.`;
      }

      res.json({
        accuracy,
        expectedText,
        spokenText,
        feedbackTips,
        isDemo: true,
        caveat: 'Browser speech recognition scores are an interactive guide. For full accuracy, compare your audio directly with native speaker playback.',
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to analyze speech' });
    }
  });

  // Setup Vite or static serving
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PolyLingo AI server active on port ${PORT}`);
  });
}

// Helper to provide helpful offline/demo responses when GEMINI_API_KEY is not supplied
function generateDemoTutorResponse(
  message: string,
  nativeLang: string,
  targetLang: string,
  level: string,
  mode: string
): string {
  const lower = message.toLowerCase();

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('namaste') || lower.includes('hola') || lower.includes('bonjour')) {
    return `👋 **Welcome to your ${targetLang} tutoring session!**\n\nI am your PolyLingo AI assistant. Because your native language is set to **${nativeLang}**, I will explain all grammar rules, vocabulary nuances, and cultural expressions in ${nativeLang} so you feel 100% confident.\n\nAt the **${level}** level, our focus today is building natural conversational flow.\n\n💡 **Quick Practice Question:**\nHow would you introduce yourself in ${targetLang}? Try typing: *"My name is..."* in ${targetLang}!`;
  }

  if (lower.includes('grammar') || lower.includes('rule') || lower.includes('tense')) {
    return `📘 **${targetLang} Grammar Insight (Explained in ${nativeLang}):**\n\nWhen constructing sentences in ${targetLang}, sentence order and verb conjugation change based on the subject (I, you, he/she, they).\n\n• **Tip 1:** Notice how verb endings shift to match the speaker.\n• **Tip 2:** Unlike in English or ${nativeLang}, subject pronouns are often dropped if the verb conjugation already makes the subject clear!\n\n✨ **Try this:** Write a simple 3-word sentence in ${targetLang} describing what you are doing right now, and I will check your grammar.`;
  }

  if (lower.includes('difference') || lower.includes('mean') || lower.includes('what is')) {
    return `🔍 **Vocabulary & Nuance Breakdown:**\n\nGreat question! In ${targetLang}, words often carry contextual warmth depending on who you are speaking with (formal vs informal register).\n\n• **Formal contexts:** Used with elders, teachers, or professional colleagues.\n• **Casual contexts:** Used with close friends, peers, and family.\n\nIn ${nativeLang}, we also have similar respectful vs casual distinctions. Can you tell me if you want to use this phrase in a business setting or casual travel?`;
  }

  return `✨ **PolyLingo Tutor Feedback for ${targetLang} (${level}):**\n\nYou asked: *"${message}"*\n\nHere is how to think about this in ${targetLang}:\n1. In natural conversation, speakers prioritize rhythmic intonation and clear vowel sounds.\n2. In ${nativeLang}, we might formulate this thought directly, but in ${targetLang}, a native speaker would typically say:\n   👉 **Practice Phrase:** Listen to the pronunciation in our Speaking Practice tab to hear the native rhythm!\n\n🎯 **Your turn:** Try answering or using one new word in your next message!`;
}

startServer();
