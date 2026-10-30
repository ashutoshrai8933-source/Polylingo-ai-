import { GrammarLesson } from '../types';

export const GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    id: 'grammar-is-am-are',
    title: 'Using Is, Am, Are correctly',
    titleHindi: 'Is, Am, Are का सही इस्तेमाल (वर्तमान काल की पहचान)',
    level: 'beginner',
    summary: 'Master the foundation of English sentences without confusion',
    hindiExplanation: 'हिंदी के "हूँ", "है", "हैं", "हो" के लिए अंग्रेजी में is, am, are का प्रयोग होता है। जब वाक्य में कोई काम (क्रिया) नहीं हो रहा हो, केवल किसी व्यक्ति या वस्तु की स्थिति या पहचान बताई जा रही हो।',
    formula: 'Subject + is / am / are + Object / Adjective',
    examples: [
      {
        english: 'I am a student.',
        hindi: 'मैं एक विद्यार्थी हूँ।',
        breakdown: 'I (मैं) + am (हूँ) + a student',
      },
      {
        english: 'He is my friend.',
        hindi: 'वह मेरा दोस्त है।',
        breakdown: 'He (वह - एकवचन) + is (है) + my friend',
      },
      {
        english: 'They are very smart.',
        hindi: 'वे बहुत होशियार हैं।',
        breakdown: 'They (वे - बहुवचन) + are (हैं) + very smart',
      },
    ],
    commonMistakes: [
      {
        incorrect: 'I is ready.',
        correct: 'I am ready.',
        whyHindi: '"I" के साथ हमेशा "am" आता है, "is" कभी नहीं।',
      },
      {
        incorrect: 'They is playing.',
        correct: 'They are playing.',
        whyHindi: '"They" बहुवचन (Plural) है, इसलिए "are" लगेगा।',
      },
    ],
  },
  {
    id: 'grammar-has-have',
    title: 'Has vs Have (पास होना / संबंध)',
    titleHindi: 'Has और Have का अंतर (स्वामित्व और रिश्ते)',
    level: 'beginner',
    summary: 'Never confuse when to say I have vs He has',
    hindiExplanation: 'जब आपके पास कोई चीज़ हो, या आपके कोई रिश्तेदार/भाई-बहन हों, तो "Has" या "Have" का उपयोग करते हैं। He / She / It / Singular के साथ HAS लगता है। I / You / We / They / Plural के साथ HAVE लगता है।',
    formula: 'He/She/It + HAS | I/You/We/They + HAVE',
    examples: [
      {
        english: 'I have a car.',
        hindi: 'मेरे पास एक कार है।',
        breakdown: 'I + have + a car',
      },
      {
        english: 'She has two pens.',
        hindi: 'उसके पास दो कलम हैं।',
        breakdown: 'She (एकवचन) + has + two pens',
      },
      {
        english: 'We have a meeting today.',
        hindi: 'हमारी आज एक मीटिंग है।',
        breakdown: 'We (हम) + have + a meeting today',
      },
    ],
    commonMistakes: [
      {
        incorrect: 'He have a phone.',
        correct: 'He has a phone.',
        whyHindi: 'He, She, It के साथ हमेशा "has" का प्रयोग होता है।',
      },
    ],
  },
  {
    id: 'grammar-do-does',
    title: 'Do & Does in questions',
    titleHindi: 'Do और Does से सवाल पूछना और ना कहना',
    level: 'intermediate',
    summary: 'Ask questions like a native English speaker',
    hindiExplanation: 'रोज़ाना की आदतों वाले सवालों में वाक्य Do या Does से शुरू होता है। जब सवाल या नकारात्मक (Negative) वाक्य में Does आ जाता है, तो मुख्य क्रिया (main verb) से s/es हट जाता है!',
    formula: 'Do/Does + Subject + Verb (1st form) + ?',
    examples: [
      {
        english: 'Do you work here?',
        hindi: 'क्या आप यहाँ काम करते हैं?',
        breakdown: 'Do + you + work + here?',
      },
      {
        english: 'Does she speak Hindi?',
        hindi: 'क्या वह हिंदी बोलती है?',
        breakdown: 'Does + she + speak (बिना s के) + Hindi?',
      },
      {
        english: 'I do not like coffee.',
        hindi: 'मुझे कॉफी पसंद नहीं है।',
        breakdown: 'I + do not (don\'t) + like coffee',
      },
    ],
    commonMistakes: [
      {
        incorrect: 'Does she speaks English?',
        correct: 'Does she speak English?',
        whyHindi: 'जब Does आ गया, तो verb में दोबारा "s" नहीं लगाते (speaks नहीं, speak होगा)।',
      },
    ],
  },
  {
    id: 'grammar-prepositions',
    title: 'In, On, At (स्थान और समय के लिए)',
    titleHindi: 'In, On, At प्रीपोजीशन का सरल नियम',
    level: 'beginner',
    summary: 'The Golden Triangle rule for time and location',
    hindiExplanation: 'समय के लिए: घड़ी का निश्चित समय (At 5 PM), दिन या तारीख (On Monday, On 15th August), महीना, साल या मौसम (In June, In 2026, In summer)। स्थान के लिए: विशिष्ट बिंदु (At the door), सतह (On the table), बंद स्थान/शहर (In Delhi, In the room)।',
    formula: 'At (Specific) -> On (Day/Surface) -> In (Bigger/Enclosed)',
    examples: [
      {
        english: 'I will call you at 7 o\'clock.',
        hindi: 'मैं आपको 7 बजे फोन करूँगा।',
        breakdown: 'निश्चित समय -> At',
      },
      {
        english: 'We meet on Sundays.',
        hindi: 'हम रविवार को मिलते हैं।',
        breakdown: 'वार/दिन -> On',
      },
      {
        english: 'He lives in Jaipur.',
        hindi: 'वह जयपुर में रहता है।',
        breakdown: 'बड़ा शहर/देश -> In',
      },
    ],
    commonMistakes: [
      {
        incorrect: 'I was born in Monday.',
        correct: 'I was born on Monday.',
        whyHindi: 'दिनों (Monday, Tuesday...) के साथ हमेशा "On" आता है।',
      },
    ],
  },
];
