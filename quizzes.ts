import { Quiz } from '../types';

export const SAMPLE_QUIZZES: Record<string, Quiz[]> = {
  es: [
    {
      id: 'quiz-es-1',
      targetLanguage: 'es',
      level: 'beginner',
      xpReward: 25,
      title: {
        en: 'Spanish Essentials & Everyday Etiquette',
        hi: 'स्पैनिश बुनियादी बातें और दैनिक शिष्टाचार',
        es: 'Esenciales de Español y Cortesía',
        fr: 'Essentiels d’Espagnol et Politesse',
        de: 'Spanische Grundlagen und Höflichkeit',
        ja: 'スペイン語の基本と日常マナー',
      },
      description: {
        en: 'Test your grasp of greetings, introductions, and polite conversation.',
        hi: 'अभिवादन, परिचय और विनम्र बातचीत पर अपनी समझ की जांच करें।',
        es: 'Pon a prueba tus conocimientos de saludos y presentaciones.',
        fr: 'Testez vos connaissances en salutations et formules de politesse.',
        de: 'Testen Sie Ihr Wissen über Begrüßungen und Vorstellungen.',
        ja: '挨拶や自己紹介、丁寧な会話の理解度をテストしましょう。',
      },
      questions: [
        {
          id: 'q-es-1-1',
          type: 'multiple-choice',
          questionPrompt: {
            en: 'What is the correct Spanish phrase for "Nice to meet you"?',
            hi: '"आपसे मिलकर खुशी हुई" के लिए सही स्पेनिश वाक्यांश क्या है?',
            es: '¿Cuál es la frase correcta para "Mucho gusto"?',
            fr: 'Quelle est la phrase correcte pour "Enchanté" ?',
            de: 'Was ist der richtige spanische Ausdruck für "Freut mich"?',
            ja: '「はじめまして・お会いできて光栄です」を表す正しいスペイン語はどれですか？',
          },
          targetText: 'Mucho gusto',
          options: [
            { id: 'opt-1', text: 'Por favor' },
            { id: 'opt-2', text: 'Mucho gusto' },
            { id: 'opt-3', text: 'Hasta luego' },
            { id: 'opt-4', text: 'Buenas noches' },
          ],
          correctOptionId: 'opt-2',
          explanation: {
            en: '"Mucho gusto" literally translates to "much pleasure" and is standard for "nice to meet you". "Por favor" means please, and "Hasta luego" means see you later.',
            hi: '"Mucho gusto" का शाब्दिक अर्थ "बड़ी खुशी" है और यह "आपसे मिलकर खुशी हुई" के लिए प्रयुक्त होता है। "Por favor" का अर्थ कृपया और "Hasta luego" का अर्थ फिर मिलेंगे है।',
            es: '"Mucho gusto" se usa al conocer a alguien por primera vez.',
            fr: '"Mucho gusto" signifie littéralement "grand plaisir" et correspond à "enchanté".',
            de: '"Mucho gusto" bedeutet wörtlich "große Freude" bzw. "freut mich".',
            ja: '「Mucho gusto」は「お会いできて光栄です」という定番の挨拶です。「Por favor」はお願いします、「Hasta luego」はまたねという意味です。',
          },
          level: 'beginner',
        },
        {
          id: 'q-es-1-2',
          type: 'multiple-choice',
          questionPrompt: {
            en: 'How do you politely ask for the bill at a restaurant?',
            hi: 'रेस्टोरेंट में विनम्रता से बिल कैसे मांगते हैं?',
            es: '¿Cómo pides educadamente la cuenta en un restaurante?',
            fr: 'Comment demander poliment l’addition au restaurant ?',
            de: 'Wie bittet man im Restaurant höflich um die Rechnung?',
            ja: 'レストランで丁寧にお会計をお願いするにはどう言いますか？',
          },
          targetText: 'La cuenta, por favor',
          options: [
            { id: 'opt-1', text: 'La cuenta, por favor' },
            { id: 'opt-2', text: 'De nada, amigo' },
            { id: 'opt-3', text: '¿Dónde está el baño?' },
            { id: 'opt-4', text: 'Buenos días' },
          ],
          correctOptionId: 'opt-1',
          explanation: {
            en: '"La cuenta, por favor" directly means "The check, please". "¿Dónde está el baño?" asks for the restroom.',
            hi: '"La cuenta, por favor" का सीधा अर्थ है "बिल, कृपया"। "¿Dónde está el baño?" का अर्थ है "शौचालय कहाँ है?"।',
            es: '"La cuenta, por favor" es la frase adecuada y universal.',
            fr: '"La cuenta, por favor" signifie "L’addition, s’il vous plaît".',
            de: '"La cuenta, por favor" bedeutet "Die Rechnung, bitte".',
            ja: '「La cuenta, por favor」が「お会計をお願いします」です。',
          },
          level: 'beginner',
        },
        {
          id: 'q-es-1-3',
          type: 'multiple-choice',
          questionPrompt: {
            en: 'Which word means "breakfast" in Spanish?',
            hi: 'स्पैनिश में "नाश्ता" के लिए कौन सा शब्द है?',
            es: '¿Qué palabra significa "desayuno"?',
            fr: 'Quel mot signifie "petit-déjeuner" ?',
            de: 'Welches Wort bedeutet "Frühstück"?',
            ja: 'スペイン語で「朝食」を意味する単語はどれですか？',
          },
          targetText: 'Desayuno',
          options: [
            { id: 'opt-1', text: 'Almuerzo' },
            { id: 'opt-2', text: 'Cena' },
            { id: 'opt-3', text: 'Desayuno' },
            { id: 'opt-4', text: 'Postre' },
          ],
          correctOptionId: 'opt-3',
          explanation: {
            en: '"Desayuno" is breakfast. "Almuerzo" is lunch, "Cena" is dinner, and "Postre" is dessert.',
            hi: '"Desayuno" नाश्ता है। "Almuerzo" दोपहर का भोजन है, "Cena" रात का खाना है, और "Postre" मिठाई है।',
            es: '"Desayuno" es la primera comida del día.',
            fr: '"Desayuno" désigne le premier repas de la journée.',
            de: '"Desayuno" ist das Frühstück, "Almuerzo" das Mittagessen.',
            ja: '「Desayuno」が朝食です。「Almuerzo」は昼食、「Cena」は夕食、「Postre」はデザートです。',
          },
          level: 'beginner',
        },
      ],
    },
  ],

  ja: [
    {
      id: 'quiz-ja-1',
      targetLanguage: 'ja',
      level: 'beginner',
      xpReward: 25,
      title: {
        en: 'Japanese Basics & Essential Etiquette',
        hi: 'जापानी मूल बातें और शिष्टाचार',
        es: 'Básicos del Japonés y Cortesía',
        fr: 'Bases du Japonais et Politesse',
        de: 'Japanische Grundlagen und Etikette',
        ja: '日本語の基礎とマナー',
      },
      description: {
        en: 'Test essential Japanese phrases: greetings, gratitude, and introductions.',
        hi: 'महत्वपूर्ण जापानी वाक्यांशों का परीक्षण करें: अभिवादन, कृतज्ञता और परिचय।',
        es: 'Comprueba tu dominio de las frases básicas en japonés.',
        fr: 'Testez vos connaissances des salutations en japonais.',
        de: 'Überprüfen Sie grundlegende japanische Phrasen.',
        ja: '挨拶、感謝、自己紹介の基本フレーズを振り返りましょう。',
      },
      questions: [
        {
          id: 'q-ja-1-1',
          type: 'multiple-choice',
          questionPrompt: {
            en: 'What does "Arigatou gozaimasu" mean?',
            hi: '"Arigatou gozaimasu" का क्या अर्थ है?',
            es: '¿Qué significa "Arigatou gozaimasu"?',
            fr: 'Que signifie "Arigatou gozaimasu" ?',
            de: 'Was bedeutet "Arigatou gozaimasu"?',
            ja: '「ありがとうございます」はどういう意味ですか？',
          },
          targetText: 'ありがとうございます',
          options: [
            { id: 'opt-1', text: 'Good morning' },
            { id: 'opt-2', text: 'Thank you very much (polite)' },
            { id: 'opt-3', text: 'Goodbye' },
            { id: 'opt-4', text: 'Excuse me' },
          ],
          correctOptionId: 'opt-2',
          explanation: {
            en: '"Arigatou gozaimasu" is the standard polite way to express deep gratitude in Japanese.',
            hi: '"Arigatou gozaimasu" जापानी में आभार व्यक्त करने का सबसे आदरणीय तरीका है।',
            es: '"Arigatou gozaimasu" es la forma educada de dar las gracias.',
            fr: '"Arigatou gozaimasu" est la façon polie de remercier.',
            de: '"Arigatou gozaimasu" ist das höfliche "Vielen Dank".',
            ja: '相手に敬意を表す丁寧なお礼の言葉です。',
          },
          level: 'beginner',
        },
      ],
    },
  ],
};

import { getLanguage } from './languages';

export function getQuizzesForLanguage(targetLangCode: string): Quiz[] {
  if (SAMPLE_QUIZZES[targetLangCode] && SAMPLE_QUIZZES[targetLangCode].length > 0) {
    return SAMPLE_QUIZZES[targetLangCode];
  }

  const lang = getLanguage(targetLangCode);
  const greeting = lang.greeting || 'Hello';

  return [
    {
      id: `quiz-${targetLangCode}-1`,
      targetLanguage: targetLangCode,
      level: 'beginner',
      xpReward: 25,
      title: {
        en: `${lang.name} Fundamentals & Greetings`,
        hi: `${lang.name} बुनियादी बातें और अभिवादन`,
        es: `Fundamentos de ${lang.name} y Saludos`,
        fr: `Bases et Salutations en ${lang.name}`,
        de: `Grundlagen und Begrüßungen auf ${lang.name}`,
        ja: `${lang.name}の基礎知識と挨拶`,
      },
      description: {
        en: `Test your grasp of essential ${lang.name} greetings, polite expressions, and everyday phrases.`,
        hi: `महत्वपूर्ण ${lang.name} अभिवादन, विनम्र भाव और दैनिक वाक्यों पर अपनी समझ की जांच करें।`,
        es: `Comprueba tus conocimientos básicos en ${lang.name}.`,
        fr: `Testez vos bases en ${lang.name}.`,
        de: `Überprüfen Sie Ihre Grundlagen auf ${lang.name}.`,
        ja: `${lang.name}の基本フレーズの理解度をテストしましょう。`,
      },
      questions: [
        {
          id: `q-${targetLangCode}-1`,
          type: 'multiple-choice',
          questionPrompt: {
            en: `What is the standard polite greeting in ${lang.name}?`,
            hi: `${lang.name} में मानक और आदरणीय अभिवादन क्या है?`,
            es: `¿Cuál es el saludo habitual en ${lang.name}?`,
            fr: `Quelle est la salutation standard en ${lang.name} ?`,
            de: `Wie lautet die Standardbegrüßung auf ${lang.name}?`,
            ja: `${lang.name}での標準的な挨拶はどれですか？`,
          },
          targetText: greeting,
          options: [
            { id: 'opt-1', text: greeting },
            { id: 'opt-2', text: 'Goodbye / Farewell' },
            { id: 'opt-3', text: 'Restroom' },
            { id: 'opt-4', text: 'Yesterday' },
          ],
          correctOptionId: 'opt-1',
          explanation: {
            en: `"${greeting}" is the authentic greeting used across ${lang.name}-speaking communities.`,
            hi: `"${greeting}" ${lang.name} भाषी समुदायों में उपयोग किया जाने वाला प्रामाणिक अभिवादन है।`,
            es: `"${greeting}" es el saludo principal y cortés en ${lang.name}.`,
            fr: `"${greeting}" est la salutation principale en ${lang.name}.`,
            de: `"${greeting}" ist die Standardbegrüßung auf ${lang.name}.`,
            ja: `「${greeting}」は${lang.name}圏で広く使われる挨拶です。`,
          },
          level: 'beginner',
        },
        {
          id: `q-${targetLangCode}-2`,
          type: 'multiple-choice',
          questionPrompt: {
            en: `When someone says "${greeting}", what is the most polite response?`,
            hi: `जब कोई "${greeting}" कहता है, तो सबसे विनम्र उत्तर क्या होगा?`,
            es: `Cuando alguien te saluda con "${greeting}", ¿qué respondes?`,
            fr: `Quelle est la réponse la plus polie à "${greeting}" ?`,
            de: `Wie antwortet man höflich auf "${greeting}"?`,
            ja: `「${greeting}」と言われた際、最も丁寧な返答はどれですか？`,
          },
          targetText: `${greeting}`,
          options: [
            { id: 'opt-1', text: 'Ignore and walk away' },
            { id: 'opt-2', text: `Return the greeting: "${greeting}" with a warm smile` },
            { id: 'opt-3', text: 'Ask for the bill' },
            { id: 'opt-4', text: 'Say "No"' },
          ],
          correctOptionId: 'opt-2',
          explanation: {
            en: `Returning the friendly greeting with a warm smile is the universal rule of conversational etiquette in ${lang.name}.`,
            hi: `मुस्कुराहट के साथ अभिवादन का उत्तर देना ${lang.name} में शिष्टाचार का सर्वोत्तम नियम है।`,
            es: `Devolver el saludo con una sonrisa cordial es la norma de cortesía universal.`,
            fr: `Répondre avec le même salut et un sourire est la politesse fondamentale.`,
            de: `Die Erwiderung der Begrüßung mit einem Lächeln ist stets die beste Antwort.`,
            ja: `笑顔で挨拶を返すことが最も親切で礼儀正しいコミュニケーションです。`,
          },
          level: 'beginner',
        },
      ],
    },
  ];
}
