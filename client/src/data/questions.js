// Bilingual question bank — Hebrew + English (rewritten Nov 2026)
// 48 questions, 8 per layer. Every option is equally attractive (balanced
// social desirability) and maps to one of five base types. Money and work
// appear only in layer 6; the rest comes at the answer from the side:
// flow, the body, early memory, the shadow, the person among others.
// Option order is rotated per question so the letters carry no pattern.

export const STAGE_LABELS = {
  he: { 1: 'מה מושך אותך', 2: 'מה הגוף יודע', 3: 'מאיפה באת', 4: 'הצד המוצל', 5: 'אתה בין אנשים', 6: 'בחירה' },
  en: { 1: 'What draws you', 2: 'What the body knows', 3: 'Where you came from', 4: 'The shadow side', 5: 'You among others', 6: 'Choice' },
};

// Which school of thought each layer draws on (sent to the report)
export const LAYER_SOURCES = {
  1: 'Flow (Csikszentmihalyi)',
  2: 'Somatic markers (Damasio), felt sense (Gendlin)',
  3: 'Early memories (Adler), narrative identity (McAdams)',
  4: 'Shadow and projection (Jung), parts (IFS)',
  5: 'Group roles, attachment, third-person perspective',
  6: 'Forced trade-offs under constraint',
};

// Helper — get localized field
export function q(question, lang) {
  return lang === 'he' ? question.he : question.en;
}

export const questions = [
  { id: 1, stage: 1,
    he: { text: "נשאר לך ערב שלם בלי תוכנית ובלי טלפון. מה הידיים שלך מוצאות לעשות?", options: [
      { label: 'א', text: "לקרוא משהו ולהישאר עם שאלה אחת שנפתחה", type: 'sage' },
      { label: 'ב', text: "לתקן, לסדר או לשפר משהו בבית", type: 'builder' },
      { label: 'ג', text: "לכתוב, לצייר או לבשל משהו שלא היה קודם", type: 'creator' },
      { label: 'ד', text: "להתקשר למישהו ולדבר איתו עד מאוחר", type: 'connector' },
      { label: 'ה', text: "לתכנן משהו חדש ולבדוק אם אפשר להתחיל מחר", type: 'hunter' },
    ]},
    en: { text: "You have a whole evening with no plans and no phone. What do your hands find to do?", options: [
      { label: 'A', text: "Read something and stay with one question it opened", type: 'sage' },
      { label: 'B', text: "Fix, organize or improve something at home", type: 'builder' },
      { label: 'C', text: "Write, draw or cook something that didn't exist before", type: 'creator' },
      { label: 'D', text: "Call someone and talk until late", type: 'connector' },
      { label: 'E', text: "Plan something new and check if it can start tomorrow", type: 'hunter' },
    ]},
  },

  { id: 2, stage: 1,
    he: { text: "בפעם האחרונה ששכחת לאכול כי היית שקוע — מה עשית?", options: [
      { label: 'א', text: "יצרתי משהו והמשכתי ללטש את הצורה שלו", type: 'creator' },
      { label: 'ב', text: "הייתי בשיחה שלא רציתי שתיגמר", type: 'connector' },
      { label: 'ג', text: "רדפתי אחרי מטרה שהייתה כמעט בהישג יד", type: 'hunter' },
      { label: 'ד', text: "חקרתי נושא וקפצתי ממקור למקור", type: 'sage' },
      { label: 'ה', text: "הרכבתי או ארגנתי משהו עד שעבד", type: 'builder' },
    ]},
    en: { text: "The last time you forgot to eat because you were absorbed — what were you doing?", options: [
      { label: 'A', text: "Making something and refining its form", type: 'creator' },
      { label: 'B', text: "In a conversation I didn't want to end", type: 'connector' },
      { label: 'C', text: "Chasing a goal that was almost within reach", type: 'hunter' },
      { label: 'D', text: "Researching, jumping from source to source", type: 'sage' },
      { label: 'E', text: "Assembling or organizing something until it worked", type: 'builder' },
    ]},
  },

  { id: 3, stage: 1,
    he: { text: "ילד שואל אותך \"מה אתה הכי אוהב לעשות?\" ואין לך זמן לחשוב. מה יוצא לך מהפה?", options: [
      { label: 'א', text: "להצליח במשהו קשה", type: 'hunter' },
      { label: 'ב', text: "להבין איך דברים עובדים", type: 'sage' },
      { label: 'ג', text: "לבנות דברים", type: 'builder' },
      { label: 'ד', text: "להמציא", type: 'creator' },
      { label: 'ה', text: "להיות עם אנשים שאני אוהב", type: 'connector' },
    ]},
    en: { text: "A child asks \"what do you love doing most?\" and you have no time to think. What comes out?", options: [
      { label: 'A', text: "Pulling off something hard", type: 'hunter' },
      { label: 'B', text: "Understanding how things work", type: 'sage' },
      { label: 'C', text: "Building things", type: 'builder' },
      { label: 'D', text: "Inventing", type: 'creator' },
      { label: 'E', text: "Being with people I love", type: 'connector' },
    ]},
  },

  { id: 4, stage: 1,
    he: { text: "איזו מחמאה נשארת איתך הכי הרבה זמן?", options: [
      { label: 'א', text: "\"אפשר לסמוך עליך, זה פשוט עובד\"", type: 'builder' },
      { label: 'ב', text: "\"אף אחד לא היה חושב על זה ככה\"", type: 'creator' },
      { label: 'ג', text: "\"לידך הרגשתי בבית\"", type: 'connector' },
      { label: 'ד', text: "\"איך עשית את זה כל כך מהר?\"", type: 'hunter' },
      { label: 'ה', text: "\"הסברת לי את זה כך שסוף סוף הבנתי\"", type: 'sage' },
    ]},
    en: { text: "Which compliment stays with you the longest?", options: [
      { label: 'A', text: "\"You can be relied on — it just works\"", type: 'builder' },
      { label: 'B', text: "\"Nobody else would have thought of it that way\"", type: 'creator' },
      { label: 'C', text: "\"Next to you I felt at home\"", type: 'connector' },
      { label: 'D', text: "\"How did you do that so fast?\"", type: 'hunter' },
      { label: 'E', text: "\"You explained it so I finally understood\"", type: 'sage' },
    ]},
  },

  { id: 5, stage: 1,
    he: { text: "בחנות ספרים, לאיזה מדף אתה הולך קודם בלי לשים לב?", options: [
      { label: 'א', text: "ביוגרפיות, פסיכולוגיה, יחסים", type: 'connector' },
      { label: 'ב', text: "יזמות, ספורט, מסעות", type: 'hunter' },
      { label: 'ג', text: "מדע, פילוסופיה, היסטוריה", type: 'sage' },
      { label: 'ד', text: "עשה זאת בעצמך, טכנולוגיה, אדריכלות", type: 'builder' },
      { label: 'ה', text: "אמנות, עיצוב, שירה", type: 'creator' },
    ]},
    en: { text: "In a bookshop, which shelf do you drift to first without noticing?", options: [
      { label: 'A', text: "Biography, psychology, relationships", type: 'connector' },
      { label: 'B', text: "Entrepreneurship, sport, expeditions", type: 'hunter' },
      { label: 'C', text: "Science, philosophy, history", type: 'sage' },
      { label: 'D', text: "DIY, technology, architecture", type: 'builder' },
      { label: 'E', text: "Art, design, poetry", type: 'creator' },
    ]},
  },

  { id: 6, stage: 1,
    he: { text: "מה משעמם אותך הכי מהר?", options: [
      { label: 'א', text: "שיחה שנשארת על פני השטח", type: 'sage' },
      { label: 'ב', text: "ישיבות שלא נגמרות בהחלטה", type: 'builder' },
      { label: 'ג', text: "עבודה שחוזרת על עצמה כל יום אותו דבר", type: 'creator' },
      { label: 'ד', text: "יום שלם לבד מול משימות", type: 'connector' },
      { label: 'ה', text: "לחכות שמשהו יקרה", type: 'hunter' },
    ]},
    en: { text: "What bores you fastest?", options: [
      { label: 'A', text: "A conversation that stays on the surface", type: 'sage' },
      { label: 'B', text: "Meetings that end without a decision", type: 'builder' },
      { label: 'C', text: "Work that repeats itself every day", type: 'creator' },
      { label: 'D', text: "A whole day alone with tasks", type: 'connector' },
      { label: 'E', text: "Waiting for something to happen", type: 'hunter' },
    ]},
  },

  { id: 7, stage: 1,
    he: { text: "אתה נכנס לחדר מלא אנשים שאתה לא מכיר. לאן העיניים הולכות קודם?", options: [
      { label: 'א', text: "לפרטים — אור, בגדים, משהו יפה", type: 'creator' },
      { label: 'ב', text: "למי שעומד לבד", type: 'connector' },
      { label: 'ג', text: "למי שהכי חשוב פה", type: 'hunter' },
      { label: 'ד', text: "למי שמדבר על משהו מעניין", type: 'sage' },
      { label: 'ה', text: "לאיך החדר מאורגן ומה לא עובד בו", type: 'builder' },
    ]},
    en: { text: "You walk into a room full of strangers. Where do your eyes go first?", options: [
      { label: 'A', text: "To details — light, clothes, something beautiful", type: 'creator' },
      { label: 'B', text: "To whoever is standing alone", type: 'connector' },
      { label: 'C', text: "To whoever matters most here", type: 'hunter' },
      { label: 'D', text: "To whoever is talking about something interesting", type: 'sage' },
      { label: 'E', text: "To how the room is set up and what isn't working", type: 'builder' },
    ]},
  },

  { id: 8, stage: 1,
    he: { text: "כשמשהו שעשית מצליח, מה הכי מספק אותך?", options: [
      { label: 'א', text: "שהגעתי לשם ראשון", type: 'hunter' },
      { label: 'ב', text: "שהבנתי משהו שלא הבנתי קודם", type: 'sage' },
      { label: 'ג', text: "שזה ממשיך לעבוד גם בלעדיי", type: 'builder' },
      { label: 'ד', text: "שזה נושא את החתימה שלי", type: 'creator' },
      { label: 'ה', text: "שמישהו אחר הרוויח מזה", type: 'connector' },
    ]},
    en: { text: "When something you did succeeds, what satisfies you most?", options: [
      { label: 'A', text: "That I got there first", type: 'hunter' },
      { label: 'B', text: "That I understood something I didn't before", type: 'sage' },
      { label: 'C', text: "That it keeps working without me", type: 'builder' },
      { label: 'D', text: "That it carries my signature", type: 'creator' },
      { label: 'E', text: "That someone else benefited", type: 'connector' },
    ]},
  },

  { id: 9, stage: 2,
    he: { text: "מה גורם לך הכי מהר להרגיש כיווץ בבטן?", options: [
      { label: 'א', text: "בלגן שאף אחד לא לוקח עליו אחריות", type: 'builder' },
      { label: 'ב', text: "כשמבקשים ממני להעתיק משהו קיים", type: 'creator' },
      { label: 'ג', text: "מתח בין אנשים שאני אוהב", type: 'connector' },
      { label: 'ד', text: "לחכות בלי לדעת מתי זה ייגמר", type: 'hunter' },
      { label: 'ה', text: "מישהו שמדבר בביטחון על משהו שהוא לא מבין", type: 'sage' },
    ]},
    en: { text: "What makes your stomach tighten fastest?", options: [
      { label: 'A', text: "A mess nobody takes responsibility for", type: 'builder' },
      { label: 'B', text: "Being asked to copy something that already exists", type: 'creator' },
      { label: 'C', text: "Tension between people I love", type: 'connector' },
      { label: 'D', text: "Waiting without knowing when it ends", type: 'hunter' },
      { label: 'E', text: "Someone speaking confidently about what they don't understand", type: 'sage' },
    ]},
  },

  { id: 10, stage: 2,
    he: { text: "מה גורם לך לנשום עמוק ולהשתחרר?", options: [
      { label: 'א', text: "חיבוק או שיחה עם מישהו קרוב", type: 'connector' },
      { label: 'ב', text: "תנועה — לצאת לדרך, להזיע", type: 'hunter' },
      { label: 'ג', text: "שקט ומקום לחשוב", type: 'sage' },
      { label: 'ד', text: "רשימה שכולה מסומנת", type: 'builder' },
      { label: 'ה', text: "חומר בידיים — צבע, בצק, מילים", type: 'creator' },
    ]},
    en: { text: "What makes you breathe deep and let go?", options: [
      { label: 'A', text: "A hug or a talk with someone close", type: 'connector' },
      { label: 'B', text: "Movement — hitting the road, sweating", type: 'hunter' },
      { label: 'C', text: "Quiet and room to think", type: 'sage' },
      { label: 'D', text: "A list with everything ticked", type: 'builder' },
      { label: 'E', text: "Material in my hands — paint, dough, words", type: 'creator' },
    ]},
  },

  { id: 11, stage: 2,
    he: { text: "תיזכר בפעם האחרונה שהלב דפק לך מהתרגשות, לא מפחד. מה קרה שם?", options: [
      { label: 'א', text: "משהו התחבר לי פתאום בראש", type: 'sage' },
      { label: 'ב', text: "משהו שבניתי עבד בפעם הראשונה", type: 'builder' },
      { label: 'ג', text: "הצגתי משהו שיצרתי", type: 'creator' },
      { label: 'ד', text: "פגשתי מישהו חשוב לי", type: 'connector' },
      { label: 'ה', text: "הזדמנות נפתחה ממש מולי", type: 'hunter' },
    ]},
    en: { text: "Remember the last time your heart raced from excitement, not fear. What was happening?", options: [
      { label: 'A', text: "Something suddenly clicked in my head", type: 'sage' },
      { label: 'B', text: "Something I built worked for the first time", type: 'builder' },
      { label: 'C', text: "I showed something I made", type: 'creator' },
      { label: 'D', text: "I met someone who matters to me", type: 'connector' },
      { label: 'E', text: "An opportunity opened right in front of me", type: 'hunter' },
    ]},
  },

  { id: 12, stage: 2,
    he: { text: "אתה גמור מעייפות. מה עדיין מצליח להחזיר לך כוח?", options: [
      { label: 'א', text: "מוזיקה, או משהו יפה לעיניים", type: 'creator' },
      { label: 'ב', text: "הודעה ממישהו שאני אוהב", type: 'connector' },
      { label: 'ג', text: "דדליין או תחרות", type: 'hunter' },
      { label: 'ד', text: "רעיון חדש שמסקרן אותי", type: 'sage' },
      { label: 'ה', text: "לסגור עוד משימה אחת ולראות סדר", type: 'builder' },
    ]},
    en: { text: "You're exhausted. What can still bring your energy back?", options: [
      { label: 'A', text: "Music, or something beautiful to look at", type: 'creator' },
      { label: 'B', text: "A message from someone I love", type: 'connector' },
      { label: 'C', text: "A deadline or a competition", type: 'hunter' },
      { label: 'D', text: "A new idea that intrigues me", type: 'sage' },
      { label: 'E', text: "Closing one more task and seeing order", type: 'builder' },
    ]},
  },

  { id: 13, stage: 2,
    he: { text: "הגוף יודע לפני הראש. מתי הוא אמר לך \"לא\", ובדיעבד צדק?", options: [
      { label: 'א', text: "כשזה היה איטי ותקוע מדי", type: 'hunter' },
      { label: 'ב', text: "כשהסיפור שסיפרו לי לא היה הגיוני", type: 'sage' },
      { label: 'ג', text: "כשהתוכנית הייתה רעועה", type: 'builder' },
      { label: 'ד', text: "כשניסו לכפות עליי סגנון שאינו שלי", type: 'creator' },
      { label: 'ה', text: "כשהרגשתי שמישהו לא כן איתי", type: 'connector' },
    ]},
    en: { text: "The body knows before the head. When did it say \"no\" and turn out right?", options: [
      { label: 'A', text: "When it was too slow and stuck", type: 'hunter' },
      { label: 'B', text: "When the story I was told didn't add up", type: 'sage' },
      { label: 'C', text: "When the plan was shaky", type: 'builder' },
      { label: 'D', text: "When someone forced a style on me that wasn't mine", type: 'creator' },
      { label: 'E', text: "When I sensed someone wasn't honest with me", type: 'connector' },
    ]},
  },

  { id: 14, stage: 2,
    he: { text: "באיזה מקום אתה מרגיש שהגב שלך מתיישר מעצמו?", options: [
      { label: 'א', text: "בסדנה, במטבח מקצועי, ליד כלים", type: 'builder' },
      { label: 'ב', text: "בסטודיו עם אור ובלגן יצירתי", type: 'creator' },
      { label: 'ג', text: "סביב שולחן משותף מלא אנשים", type: 'connector' },
      { label: 'ד', text: "בשטח, במקום שמשתנה כל יום", type: 'hunter' },
      { label: 'ה', text: "בספרייה או בחדר שקט", type: 'sage' },
    ]},
    en: { text: "Where does your back straighten by itself?", options: [
      { label: 'A', text: "In a workshop, pro kitchen, near tools", type: 'builder' },
      { label: 'B', text: "In a studio with light and creative mess", type: 'creator' },
      { label: 'C', text: "Around a shared table full of people", type: 'connector' },
      { label: 'D', text: "Out in the field, somewhere that changes daily", type: 'hunter' },
      { label: 'E', text: "In a library or quiet room", type: 'sage' },
    ]},
  },

  { id: 15, stage: 2,
    he: { text: "מה הידיים שלך עושות כשאתה מקשיב למישהו מדבר?", options: [
      { label: 'א', text: "קרובות, נוגעות, מהנהנות", type: 'connector' },
      { label: 'ב', text: "לא נחות, רוצות לזוז", type: 'hunter' },
      { label: 'ג', text: "נחות בשקט, אני כולי בראש", type: 'sage' },
      { label: 'ד', text: "משחקות עם חפץ, מפרקות ומרכיבות", type: 'builder' },
      { label: 'ה', text: "משרבטות", type: 'creator' },
    ]},
    en: { text: "What do your hands do while you listen to someone?", options: [
      { label: 'A', text: "Stay close, touch, nod", type: 'connector' },
      { label: 'B', text: "Can't rest, want to move", type: 'hunter' },
      { label: 'C', text: "Rest still — I'm all in my head", type: 'sage' },
      { label: 'D', text: "Fiddle with an object, take it apart", type: 'builder' },
      { label: 'E', text: "Doodle", type: 'creator' },
    ]},
  },

  { id: 16, stage: 2,
    he: { text: "אחרי איזה יום אתה נרדם הכי מרוצה?", options: [
      { label: 'א', text: "יום שלמדתי בו משהו", type: 'sage' },
      { label: 'ב', text: "יום שסגרתי בו הרבה", type: 'builder' },
      { label: 'ג', text: "יום שיצרתי בו משהו חדש", type: 'creator' },
      { label: 'ד', text: "יום שהייתי טוב בו למישהו", type: 'connector' },
      { label: 'ה', text: "יום שהתקדמתי בו למטרה", type: 'hunter' },
    ]},
    en: { text: "After what kind of day do you fall asleep most content?", options: [
      { label: 'A', text: "A day I learned something", type: 'sage' },
      { label: 'B', text: "A day I closed a lot", type: 'builder' },
      { label: 'C', text: "A day I made something new", type: 'creator' },
      { label: 'D', text: "A day I was good to someone", type: 'connector' },
      { label: 'E', text: "A day I moved toward a goal", type: 'hunter' },
    ]},
  },

  { id: 17, stage: 3,
    he: { text: "הזיכרון הכי מוקדם שבו היית גאה בעצמך — מה עשית שם?", options: [
      { label: 'א', text: "ציירתי, שרתי או המצאתי משחק", type: 'creator' },
      { label: 'ב', text: "עזרתי למישהו או השלמתי בין חברים", type: 'connector' },
      { label: 'ג', text: "ניצחתי, או העזתי לעשות משהו מפחיד", type: 'hunter' },
      { label: 'ד', text: "שאלתי שאלה שהפתיעה את המבוגרים", type: 'sage' },
      { label: 'ה', text: "בניתי משהו לבד", type: 'builder' },
    ]},
    en: { text: "Your earliest memory of being proud of yourself — what were you doing?", options: [
      { label: 'A', text: "Drawing, singing or inventing a game", type: 'creator' },
      { label: 'B', text: "Helping someone or making peace between friends", type: 'connector' },
      { label: 'C', text: "Winning, or daring something scary", type: 'hunter' },
      { label: 'D', text: "Asking a question that surprised the adults", type: 'sage' },
      { label: 'E', text: "Building something by myself", type: 'builder' },
    ]},
  },

  { id: 18, stage: 3,
    he: { text: "כילד, לאיזה משחק חזרת שוב ושוב?", options: [
      { label: 'א', text: "מסחר בקלפים, תחרויות, הרפתקאות בחוץ", type: 'hunter' },
      { label: 'ב', text: "חידות, אנציקלופדיות, לשאול \"למה\"", type: 'sage' },
      { label: 'ג', text: "לגו, מחנות, לפרק מכשירים", type: 'builder' },
      { label: 'ד', text: "תחפושות, סיפורים, ציור", type: 'creator' },
      { label: 'ה', text: "משחקי \"משפחה\" ותפקידים עם חברים", type: 'connector' },
    ]},
    en: { text: "As a child, which game did you return to again and again?", options: [
      { label: 'A', text: "Trading cards, contests, outdoor adventures", type: 'hunter' },
      { label: 'B', text: "Riddles, encyclopedias, asking \"why\"", type: 'sage' },
      { label: 'C', text: "Lego, forts, taking gadgets apart", type: 'builder' },
      { label: 'D', text: "Dress-up, stories, drawing", type: 'creator' },
      { label: 'E', text: "Playing \"family\" and roles with friends", type: 'connector' },
    ]},
  },

  { id: 19, stage: 3,
    he: { text: "מה אמרו עליך בבית כשהיית קטן?", options: [
      { label: 'א', text: "\"אפשר לתת לו אחריות\"", type: 'builder' },
      { label: 'ב', text: "\"הוא בעולם משלו\"", type: 'creator' },
      { label: 'ג', text: "\"הוא חבר של כולם\"", type: 'connector' },
      { label: 'ד', text: "\"אי אפשר לעצור אותו\"", type: 'hunter' },
      { label: 'ה', text: "\"הוא כל הזמן שואל\"", type: 'sage' },
    ]},
    en: { text: "What did they say about you at home when you were small?", options: [
      { label: 'A', text: "\"You can give him responsibility\"", type: 'builder' },
      { label: 'B', text: "\"He's in his own world\"", type: 'creator' },
      { label: 'C', text: "\"He's everyone's friend\"", type: 'connector' },
      { label: 'D', text: "\"There's no stopping him\"", type: 'hunter' },
      { label: 'E', text: "\"He never stops asking\"", type: 'sage' },
    ]},
  },

  { id: 20, stage: 3,
    he: { text: "איזו דמות מסיפור או סרט ריגשה אותך הכי הרבה כנער?", options: [
      { label: 'א', text: "החבר הנאמן שמחזיק את הקבוצה", type: 'connector' },
      { label: 'ב', text: "הגיבור שיוצא למסע ומנצח", type: 'hunter' },
      { label: 'ג', text: "החכם או המורה", type: 'sage' },
      { label: 'ד', text: "הממציא שבונה משהו מכלום", type: 'builder' },
      { label: 'ה', text: "האמן שהלך בדרך שלו", type: 'creator' },
    ]},
    en: { text: "Which character from a story or film moved you most as a teenager?", options: [
      { label: 'A', text: "The loyal friend who holds the group together", type: 'connector' },
      { label: 'B', text: "The hero who sets out and wins", type: 'hunter' },
      { label: 'C', text: "The wise one or the teacher", type: 'sage' },
      { label: 'D', text: "The inventor who builds from nothing", type: 'builder' },
      { label: 'E', text: "The artist who went his own way", type: 'creator' },
    ]},
  },

  { id: 21, stage: 3,
    he: { text: "אם היית יכול לחזור לגיל 12 עם משפט אחד — מה היית אומר לעצמך?", options: [
      { label: 'א', text: "\"תמשיך לשאול, גם כשצוחקים עליך\"", type: 'sage' },
      { label: 'ב', text: "\"מה שאתה בונה יחזיק\"", type: 'builder' },
      { label: 'ג', text: "\"אל תתבייש במה ששונה בך\"", type: 'creator' },
      { label: 'ד', text: "\"האנשים הם האוצר\"", type: 'connector' },
      { label: 'ה', text: "\"תעז מוקדם יותר\"", type: 'hunter' },
    ]},
    en: { text: "If you could return to age 12 with one sentence — what would you tell yourself?", options: [
      { label: 'A', text: "\"Keep asking, even when they laugh\"", type: 'sage' },
      { label: 'B', text: "\"What you build will hold\"", type: 'builder' },
      { label: 'C', text: "\"Don't be ashamed of what's different in you\"", type: 'creator' },
      { label: 'D', text: "\"The people are the treasure\"", type: 'connector' },
      { label: 'E', text: "\"Dare sooner\"", type: 'hunter' },
    ]},
  },

  { id: 22, stage: 3,
    he: { text: "מתי בפעם הראשונה הרגשת שאתה בדיוק במקום הנכון?", options: [
      { label: 'א', text: "כשמישהו ראה באמת את מה שיצרתי", type: 'creator' },
      { label: 'ב', text: "בקבוצה, בתנועה, בקהילה", type: 'connector' },
      { label: 'ג', text: "כשהשגתי משהו לבד, בכוחות עצמי", type: 'hunter' },
      { label: 'ד', text: "מול מורה שפתח לי עולם", type: 'sage' },
      { label: 'ה', text: "כשקיבלתי אחריות על משהו אמיתי", type: 'builder' },
    ]},
    en: { text: "When did you first feel you were exactly in the right place?", options: [
      { label: 'A', text: "When someone truly saw what I made", type: 'creator' },
      { label: 'B', text: "In a group, a movement, a community", type: 'connector' },
      { label: 'C', text: "When I achieved something on my own", type: 'hunter' },
      { label: 'D', text: "With a teacher who opened a world for me", type: 'sage' },
      { label: 'E', text: "When I got responsibility for something real", type: 'builder' },
    ]},
  },

  { id: 23, stage: 3,
    he: { text: "איזו תקופה בחייך היית רוצה לחיות שוב?", options: [
      { label: 'א', text: "תקופה של אתגר וסיכון גדול", type: 'hunter' },
      { label: 'ב', text: "תקופה שלמדתי בה הכי הרבה", type: 'sage' },
      { label: 'ג', text: "תקופה שבניתי בה משהו מאפס", type: 'builder' },
      { label: 'ד', text: "תקופה שיצרתי בה בלי הפסקה", type: 'creator' },
      { label: 'ה', text: "תקופה שהייתי מוקף בה באנשים קרובים", type: 'connector' },
    ]},
    en: { text: "Which period of your life would you live again?", options: [
      { label: 'A', text: "A time of big challenge and risk", type: 'hunter' },
      { label: 'B', text: "When I learned the most", type: 'sage' },
      { label: 'C', text: "When I built something from zero", type: 'builder' },
      { label: 'D', text: "When I created nonstop", type: 'creator' },
      { label: 'E', text: "When I was surrounded by close people", type: 'connector' },
    ]},
  },

  { id: 24, stage: 3,
    he: { text: "איזה סיפור על עצמך אתה מספר הכי הרבה פעמים?", options: [
      { label: 'א', text: "על משהו שתיקנתי כשכולם ויתרו", type: 'builder' },
      { label: 'ב', text: "על משהו שהמצאתי", type: 'creator' },
      { label: 'ג', text: "על חבר שעזרתי לו או שעזר לי", type: 'connector' },
      { label: 'ד', text: "על סיכון שלקחתי והצליח", type: 'hunter' },
      { label: 'ה', text: "על משהו שהבנתי לפני כולם", type: 'sage' },
    ]},
    en: { text: "Which story about yourself do you tell most often?", options: [
      { label: 'A', text: "About something I fixed when everyone gave up", type: 'builder' },
      { label: 'B', text: "About something I invented", type: 'creator' },
      { label: 'C', text: "About a friend I helped, or who helped me", type: 'connector' },
      { label: 'D', text: "About a risk I took that paid off", type: 'hunter' },
      { label: 'E', text: "About something I understood before everyone", type: 'sage' },
    ]},
  },

  { id: 25, stage: 4,
    he: { text: "במי אתה מקנא בשקט, גם אם לא תודה בזה בקול?", options: [
      { label: 'א', text: "במי שמוקף באהבה ובקהילה", type: 'connector' },
      { label: 'ב', text: "במי שהעז לקפוץ, והצליח", type: 'hunter' },
      { label: 'ג', text: "במי שיודע המון, ואנשים מקשיבים לו", type: 'sage' },
      { label: 'ד', text: "במי שבנה משהו יציב שעובד", type: 'builder' },
      { label: 'ה', text: "במי שמתפרנס מהיצירה שלו", type: 'creator' },
    ]},
    en: { text: "Who do you quietly envy, even if you'd never say it?", options: [
      { label: 'A', text: "Someone surrounded by love and community", type: 'connector' },
      { label: 'B', text: "Someone who dared to jump and made it", type: 'hunter' },
      { label: 'C', text: "Someone who knows a lot and people listen", type: 'sage' },
      { label: 'D', text: "Someone who built something stable that works", type: 'builder' },
      { label: 'E', text: "Someone who lives from their creative work", type: 'creator' },
    ]},
  },

  { id: 26, stage: 4,
    he: { text: "איזו תכונה אצל אחרים מעצבנת אותך יותר ממה שהיא צריכה?", options: [
      { label: 'א', text: "שטחיות", type: 'sage' },
      { label: 'ב', text: "חוסר אמינות", type: 'builder' },
      { label: 'ג', text: "חיקוי", type: 'creator' },
      { label: 'ד', text: "קרירות", type: 'connector' },
      { label: 'ה', text: "היסוס", type: 'hunter' },
    ]},
    en: { text: "Which trait in others annoys you more than it should?", options: [
      { label: 'A', text: "Shallowness", type: 'sage' },
      { label: 'B', text: "Unreliability", type: 'builder' },
      { label: 'C', text: "Imitation", type: 'creator' },
      { label: 'D', text: "Coldness", type: 'connector' },
      { label: 'E', text: "Hesitation", type: 'hunter' },
    ]},
  },

  { id: 27, stage: 4,
    he: { text: "מה אתה דוחה שוב ושוב, למרות שמשהו בך יודע שזה שלך?", options: [
      { label: 'א', text: "להראות לעולם את מה שאני יוצר", type: 'creator' },
      { label: 'ב', text: "לבנות קהילה סביב משהו", type: 'connector' },
      { label: 'ג', text: "לקחת סיכון אמיתי", type: 'hunter' },
      { label: 'ד', text: "לכתוב או ללמד את מה שאני יודע", type: 'sage' },
      { label: 'ה', text: "להקים מערכת משלי", type: 'builder' },
    ]},
    en: { text: "What do you keep postponing, though part of you knows it's yours?", options: [
      { label: 'A', text: "Showing the world what I make", type: 'creator' },
      { label: 'B', text: "Building a community around something", type: 'connector' },
      { label: 'C', text: "Taking a real risk", type: 'hunter' },
      { label: 'D', text: "Writing or teaching what I know", type: 'sage' },
      { label: 'E', text: "Setting up a system of my own", type: 'builder' },
    ]},
  },

  { id: 28, stage: 4,
    he: { text: "איזה פחד עוצר אותך הכי הרבה?", options: [
      { label: 'א', text: "שאפספס את הרגע", type: 'hunter' },
      { label: 'ב', text: "שיגלו שאני לא יודע מספיק", type: 'sage' },
      { label: 'ג', text: "שמה שאבנה יקרוס", type: 'builder' },
      { label: 'ד', text: "שיגידו שזה לא מקורי או לא טוב", type: 'creator' },
      { label: 'ה', text: "שאאכזב מישהו או שאשאר לבד", type: 'connector' },
    ]},
    en: { text: "Which fear stops you most?", options: [
      { label: 'A', text: "That I'll miss the moment", type: 'hunter' },
      { label: 'B', text: "That they'll find out I don't know enough", type: 'sage' },
      { label: 'C', text: "That what I build will collapse", type: 'builder' },
      { label: 'D', text: "That they'll say it's unoriginal or not good", type: 'creator' },
      { label: 'E', text: "That I'll let someone down or end up alone", type: 'connector' },
    ]},
  },

  { id: 29, stage: 4,
    he: { text: "איזו ביקורת עליך פוגעת הכי הרבה, כי יש בה קצת אמת?", options: [
      { label: 'א', text: "\"אתה נוקשה\"", type: 'builder' },
      { label: 'ב', text: "\"אתה לא גומר דברים\"", type: 'creator' },
      { label: 'ג', text: "\"אתה מרצה את כולם\"", type: 'connector' },
      { label: 'ד', text: "\"אתה לא מתמיד\"", type: 'hunter' },
      { label: 'ה', text: "\"אתה חושב יותר מדי ועושה מעט\"", type: 'sage' },
    ]},
    en: { text: "Which criticism hurts most, because it's partly true?", options: [
      { label: 'A', text: "\"You're rigid\"", type: 'builder' },
      { label: 'B', text: "\"You don't finish things\"", type: 'creator' },
      { label: 'C', text: "\"You try to please everyone\"", type: 'connector' },
      { label: 'D', text: "\"You don't stick with it\"", type: 'hunter' },
      { label: 'E', text: "\"You think too much and do too little\"", type: 'sage' },
    ]},
  },

  { id: 30, stage: 4,
    he: { text: "איזה חלק בך אתה משאיר בבית כשאתה יוצא לעבודה?", options: [
      { label: 'א', text: "מי שצריך שיאהבו אותו", type: 'connector' },
      { label: 'ב', text: "מי שרוצה לנצח בכל מחיר", type: 'hunter' },
      { label: 'ג', text: "מי ששואל שאלות גדולות מדי", type: 'sage' },
      { label: 'ד', text: "מי שרוצה שליטה מלאה", type: 'builder' },
      { label: 'ה', text: "מי שרוצה לשבור את הכללים", type: 'creator' },
    ]},
    en: { text: "Which part of you do you leave at home when you go to work?", options: [
      { label: 'A', text: "The one who needs to be loved", type: 'connector' },
      { label: 'B', text: "The one who wants to win at any cost", type: 'hunter' },
      { label: 'C', text: "The one who asks questions too big", type: 'sage' },
      { label: 'D', text: "The one who wants full control", type: 'builder' },
      { label: 'E', text: "The one who wants to break the rules", type: 'creator' },
    ]},
  },

  { id: 31, stage: 4,
    he: { text: "אם היית יכול למחוק תכונה אחת שלך, איזו?", options: [
      { label: 'א', text: "ספקנות שמשתקת אותי", type: 'sage' },
      { label: 'ב', text: "הצורך שהכול יהיה מושלם לפני שמתחילים", type: 'builder' },
      { label: 'ג', text: "מצבי רוח שעולים ויורדים", type: 'creator' },
      { label: 'ד', text: "הקושי להגיד לא", type: 'connector' },
      { label: 'ה', text: "חוסר סבלנות", type: 'hunter' },
    ]},
    en: { text: "If you could erase one trait of yours, which?", options: [
      { label: 'A', text: "Doubt that paralyzes me", type: 'sage' },
      { label: 'B', text: "Needing everything perfect before starting", type: 'builder' },
      { label: 'C', text: "Moods that rise and fall", type: 'creator' },
      { label: 'D', text: "Struggling to say no", type: 'connector' },
      { label: 'E', text: "Impatience", type: 'hunter' },
    ]},
  },

  { id: 32, stage: 4,
    he: { text: "מה משהו בך יודע שהוא נכון, אבל עוד לא אמרת בקול?", options: [
      { label: 'א', text: "שאני יוצר, לא \"גם עושה\"", type: 'creator' },
      { label: 'ב', text: "שאני צריך אנשים סביבי כדי לפרוח", type: 'connector' },
      { label: 'ג', text: "שאני רוצה הרבה יותר ממה שיש לי", type: 'hunter' },
      { label: 'ד', text: "שיש לי מה ללמד", type: 'sage' },
      { label: 'ה', text: "שאני יכול לבנות משהו גדול", type: 'builder' },
    ]},
    en: { text: "What does part of you know is true, but you haven't said out loud?", options: [
      { label: 'A', text: "That I'm a creator, not a hobbyist", type: 'creator' },
      { label: 'B', text: "That I need people around me to thrive", type: 'connector' },
      { label: 'C', text: "That I want far more than I have", type: 'hunter' },
      { label: 'D', text: "That I have something to teach", type: 'sage' },
      { label: 'E', text: "That I could build something big", type: 'builder' },
    ]},
  },

  { id: 33, stage: 5,
    he: { text: "בקבוצה שמנסה לפתור בעיה, איזה תפקיד נופל עליך בלי שבחרת?", options: [
      { label: 'א', text: "מי שדוחף להחלטה", type: 'hunter' },
      { label: 'ב', text: "מי ששואל את השאלה הנכונה", type: 'sage' },
      { label: 'ג', text: "מי שמחלק משימות ומסדר תהליך", type: 'builder' },
      { label: 'ד', text: "מי שמביא רעיון לא צפוי", type: 'creator' },
      { label: 'ה', text: "מי שדואג שכולם יישמעו", type: 'connector' },
    ]},
    en: { text: "In a group solving a problem, which role lands on you without choosing?", options: [
      { label: 'A', text: "The one who pushes for a decision", type: 'hunter' },
      { label: 'B', text: "The one who asks the right question", type: 'sage' },
      { label: 'C', text: "The one who splits tasks and sets the process", type: 'builder' },
      { label: 'D', text: "The one with the unexpected idea", type: 'creator' },
      { label: 'E', text: "The one who makes sure everyone is heard", type: 'connector' },
    ]},
  },

  { id: 34, stage: 5,
    he: { text: "חבר בא אליך עם בעיה. מה אתה עושה קודם?", options: [
      { label: 'א', text: "מציע תוכנית מעשית", type: 'builder' },
      { label: 'ב', text: "מסתכל על זה מזווית אחרת לגמרי", type: 'creator' },
      { label: 'ג', text: "מקשיב, בלי לתקן", type: 'connector' },
      { label: 'ד', text: "עוזר לו לפעול עכשיו", type: 'hunter' },
      { label: 'ה', text: "שואל עד שאני מבין את השורש", type: 'sage' },
    ]},
    en: { text: "A friend comes to you with a problem. What do you do first?", options: [
      { label: 'A', text: "Offer a practical plan", type: 'builder' },
      { label: 'B', text: "Look at it from a completely different angle", type: 'creator' },
      { label: 'C', text: "Listen, without fixing", type: 'connector' },
      { label: 'D', text: "Help him act now", type: 'hunter' },
      { label: 'E', text: "Ask until I understand the root", type: 'sage' },
    ]},
  },

  { id: 35, stage: 5,
    he: { text: "ויכוח מתחמם סביבך. מה אתה עושה בדרך כלל?", options: [
      { label: 'א', text: "מרגיע ודואג שאף אחד לא ייפגע", type: 'connector' },
      { label: 'ב', text: "אומר את דעתי ולא נסוג", type: 'hunter' },
      { label: 'ג', text: "מנסה להבין מה כל צד באמת אומר", type: 'sage' },
      { label: 'ד', text: "מחזיר לעובדות ולמה שצריך לקרות", type: 'builder' },
      { label: 'ה', text: "מכניס הומור או זווית חדשה", type: 'creator' },
    ]},
    en: { text: "An argument heats up around you. What do you usually do?", options: [
      { label: 'A', text: "Calm things so nobody gets hurt", type: 'connector' },
      { label: 'B', text: "Say my piece and hold my ground", type: 'hunter' },
      { label: 'C', text: "Try to grasp what each side really means", type: 'sage' },
      { label: 'D', text: "Bring it back to facts and what needs to happen", type: 'builder' },
      { label: 'E', text: "Bring humor or a new angle", type: 'creator' },
    ]},
  },

  { id: 36, stage: 5,
    he: { text: "מה הכי קשה לך לבקש מאנשים?", options: [
      { label: 'א', text: "שיקשיבו לי עד הסוף", type: 'sage' },
      { label: 'ב', text: "עזרה — אני מעדיף לעשות לבד", type: 'builder' },
      { label: 'ג', text: "משוב כן על מה שיצרתי", type: 'creator' },
      { label: 'ד', text: "משהו בשביל עצמי", type: 'connector' },
      { label: 'ה', text: "זמן וסבלנות", type: 'hunter' },
    ]},
    en: { text: "What's hardest for you to ask of people?", options: [
      { label: 'A', text: "To hear me out to the end", type: 'sage' },
      { label: 'B', text: "Help — I'd rather do it myself", type: 'builder' },
      { label: 'C', text: "Honest feedback on what I made", type: 'creator' },
      { label: 'D', text: "Something for myself", type: 'connector' },
      { label: 'E', text: "Time and patience", type: 'hunter' },
    ]},
  },

  { id: 37, stage: 5,
    he: { text: "עם מי אתה הכי נהנה לעבוד?", options: [
      { label: 'א', text: "עם מקוריים, קצת משוגעים", type: 'creator' },
      { label: 'ב', text: "עם חמים, שאכפת להם", type: 'connector' },
      { label: 'ג', text: "עם שאפתנים ומהירים", type: 'hunter' },
      { label: 'ד', text: "עם חכמים שמאתגרים אותי", type: 'sage' },
      { label: 'ה', text: "עם אמינים שעומדים בזמנים", type: 'builder' },
    ]},
    en: { text: "Who do you most enjoy working with?", options: [
      { label: 'A', text: "Original people, a little crazy", type: 'creator' },
      { label: 'B', text: "Warm people who care", type: 'connector' },
      { label: 'C', text: "Ambitious, fast people", type: 'hunter' },
      { label: 'D', text: "Smart people who challenge me", type: 'sage' },
      { label: 'E', text: "Reliable people who meet deadlines", type: 'builder' },
    ]},
  },

  { id: 38, stage: 5,
    he: { text: "אדם זר מדבר איתך חצי שעה. מה הוא כנראה יזכור עליך?", options: [
      { label: 'א', text: "את האנרגיה", type: 'hunter' },
      { label: 'ב', text: "שאמרתי משהו שגרם לו לחשוב", type: 'sage' },
      { label: 'ג', text: "שהצעתי לו פתרון מעשי", type: 'builder' },
      { label: 'ד', text: "שאני שונה ומעניין", type: 'creator' },
      { label: 'ה', text: "שהרגיש שהקשבתי לו באמת", type: 'connector' },
    ]},
    en: { text: "A stranger talks with you for half an hour. What will he likely remember about you?", options: [
      { label: 'A', text: "The energy", type: 'hunter' },
      { label: 'B', text: "That I said something that made him think", type: 'sage' },
      { label: 'C', text: "That I offered a practical solution", type: 'builder' },
      { label: 'D', text: "That I'm different and interesting", type: 'creator' },
      { label: 'E', text: "That he felt truly heard", type: 'connector' },
    ]},
  },

  { id: 39, stage: 5,
    he: { text: "צריך מישהו שיוביל. מתי אתה מרגיש הכי טוב להרים יד?", options: [
      { label: 'א', text: "כשיש תוכנית ברורה", type: 'builder' },
      { label: 'ב', text: "כשיש חופש לעשות אחרת", type: 'creator' },
      { label: 'ג', text: "כשחשוב שכולם ירגישו שייכים", type: 'connector' },
      { label: 'ד', text: "תמיד — תנו לי את ההגה", type: 'hunter' },
      { label: 'ה', text: "כשאפשר ללמד", type: 'sage' },
    ]},
    en: { text: "Someone needs to lead. When do you feel best raising your hand?", options: [
      { label: 'A', text: "When there's a clear plan", type: 'builder' },
      { label: 'B', text: "When there's freedom to do it differently", type: 'creator' },
      { label: 'C', text: "When everyone needs to feel they belong", type: 'connector' },
      { label: 'D', text: "Always — give me the wheel", type: 'hunter' },
      { label: 'E', text: "When I can teach", type: 'sage' },
    ]},
  },

  { id: 40, stage: 5,
    he: { text: "מה היית רוצה שיגידו עליך בעוד 20 שנה?", options: [
      { label: 'א', text: "\"הוא קירב בין אנשים\"", type: 'connector' },
      { label: 'ב', text: "\"הוא העז כשאחרים פחדו\"", type: 'hunter' },
      { label: 'ג', text: "\"הוא שינה את הדרך שבה חשבנו\"", type: 'sage' },
      { label: 'ד', text: "\"הוא בנה משהו שעדיין עומד\"", type: 'builder' },
      { label: 'ה', text: "\"הוא השאיר משהו יפה\"", type: 'creator' },
    ]},
    en: { text: "What would you want said about you in 20 years?", options: [
      { label: 'A', text: "\"He brought people together\"", type: 'connector' },
      { label: 'B', text: "\"He dared when others were afraid\"", type: 'hunter' },
      { label: 'C', text: "\"He changed how we think\"", type: 'sage' },
      { label: 'D', text: "\"He built something that still stands\"", type: 'builder' },
      { label: 'E', text: "\"He left something beautiful\"", type: 'creator' },
    ]},
  },

  { id: 41, stage: 6,
    he: { text: "נשארו לך רק שעתיים פנויות בשבוע. במה תשקיע אותן?", options: [
      { label: 'א', text: "ללמוד משהו לעומק", type: 'sage' },
      { label: 'ב', text: "לבנות פרויקט צד", type: 'builder' },
      { label: 'ג', text: "ליצור, בלי מטרה", type: 'creator' },
      { label: 'ד', text: "להיות עם אנשים, להתנדב", type: 'connector' },
      { label: 'ה', text: "לבדוק הזדמנות", type: 'hunter' },
    ]},
    en: { text: "You have only two free hours a week. Where do they go?", options: [
      { label: 'A', text: "Learning something in depth", type: 'sage' },
      { label: 'B', text: "Building a side project", type: 'builder' },
      { label: 'C', text: "Creating, with no goal", type: 'creator' },
      { label: 'D', text: "Being with people, volunteering", type: 'connector' },
      { label: 'E', text: "Checking out an opportunity", type: 'hunter' },
    ]},
  },

  { id: 42, stage: 6,
    he: { text: "שתי הצעות עבודה, אותו שכר בדיוק. איזו תיקח?", options: [
      { label: 'א', text: "עבודה יצירתית עם חופש", type: 'creator' },
      { label: 'ב', text: "עבודה עם אנשים ולמענם", type: 'connector' },
      { label: 'ג', text: "בונוסים לפי ביצועים", type: 'hunter' },
      { label: 'ד', text: "מחקר או הוראה", type: 'sage' },
      { label: 'ה', text: "להקים מערכת מאפס", type: 'builder' },
    ]},
    en: { text: "Two job offers, exactly the same pay. Which do you take?", options: [
      { label: 'A', text: "Creative work with freedom", type: 'creator' },
      { label: 'B', text: "Work with and for people", type: 'connector' },
      { label: 'C', text: "Performance-based bonuses", type: 'hunter' },
      { label: 'D', text: "Research or teaching", type: 'sage' },
      { label: 'E', text: "Setting up a system from scratch", type: 'builder' },
    ]},
  },

  { id: 43, stage: 6,
    he: { text: "על מה הכי קשה לך לוותר?", options: [
      { label: 'א', text: "על אתגר וצמיחה", type: 'hunter' },
      { label: 'ב', text: "על זמן לחשוב וללמוד", type: 'sage' },
      { label: 'ג', text: "על שליטה ויציבות", type: 'builder' },
      { label: 'ד', text: "על חופש יצירתי", type: 'creator' },
      { label: 'ה', text: "על האנשים סביבי", type: 'connector' },
    ]},
    en: { text: "What's hardest for you to give up?", options: [
      { label: 'A', text: "Challenge and growth", type: 'hunter' },
      { label: 'B', text: "Time to think and learn", type: 'sage' },
      { label: 'C', text: "Control and stability", type: 'builder' },
      { label: 'D', text: "Creative freedom", type: 'creator' },
      { label: 'E', text: "The people around me", type: 'connector' },
    ]},
  },

  { id: 44, stage: 6,
    he: { text: "אם הכסף לא היה משנה — מה היית עושה ביום שני בבוקר?", options: [
      { label: 'א', text: "בונה ומשפר", type: 'builder' },
      { label: 'ב', text: "יוצר", type: 'creator' },
      { label: 'ג', text: "מלווה אנשים", type: 'connector' },
      { label: 'ד', text: "מקים משהו חדש", type: 'hunter' },
      { label: 'ה', text: "חוקר ומלמד", type: 'sage' },
    ]},
    en: { text: "If money didn't matter — what would you do on Monday morning?", options: [
      { label: 'A', text: "Building and improving", type: 'builder' },
      { label: 'B', text: "Creating", type: 'creator' },
      { label: 'C', text: "Accompanying people", type: 'connector' },
      { label: 'D', text: "Starting something new", type: 'hunter' },
      { label: 'E', text: "Researching and teaching", type: 'sage' },
    ]},
  },

  { id: 45, stage: 6,
    he: { text: "קיבלת סכום כסף במתנה, בתנאי שתשקיע אותו בעצמך. על מה?", options: [
      { label: 'א', text: "מסע או מפגש עם אנשים", type: 'connector' },
      { label: 'ב', text: "ניסוי עסקי קטן", type: 'hunter' },
      { label: 'ג', text: "לימודים או קורס עמוק", type: 'sage' },
      { label: 'ד', text: "ציוד וכלים", type: 'builder' },
      { label: 'ה', text: "פרויקט יצירה", type: 'creator' },
    ]},
    en: { text: "You get money as a gift, on condition you invest it in yourself. On what?", options: [
      { label: 'A', text: "A journey or gathering with people", type: 'connector' },
      { label: 'B', text: "A small business experiment", type: 'hunter' },
      { label: 'C', text: "Deep study or a course", type: 'sage' },
      { label: 'D', text: "Equipment and tools", type: 'builder' },
      { label: 'E', text: "A creative project", type: 'creator' },
    ]},
  },

  { id: 46, stage: 6,
    he: { text: "מה תהיה הצלחה מבחינתך בעוד שנה?", options: [
      { label: 'א', text: "שיכירו בי כמי שמבין לעומק", type: 'sage' },
      { label: 'ב', text: "שיהיה לי משהו יציב שעובד", type: 'builder' },
      { label: 'ג', text: "שיכירו בקול שלי", type: 'creator' },
      { label: 'ד', text: "לעבוד עם אנשים שאני אוהב", type: 'connector' },
      { label: 'ה', text: "קפיצה גדולה קדימה", type: 'hunter' },
    ]},
    en: { text: "What would success look like for you a year from now?", options: [
      { label: 'A', text: "Being recognized as someone who truly understands", type: 'sage' },
      { label: 'B', text: "Having something stable that works", type: 'builder' },
      { label: 'C', text: "My voice being recognized", type: 'creator' },
      { label: 'D', text: "Working with people I love", type: 'connector' },
      { label: 'E', text: "A big leap forward", type: 'hunter' },
    ]},
  },

  { id: 47, stage: 6,
    he: { text: "החלטה גדולה מולך. על מה אתה סומך בסוף?", options: [
      { label: 'א', text: "על אינטואיציה ותחושת יופי", type: 'creator' },
      { label: 'ב', text: "על מה שאומרים אנשים שאני סומך עליהם", type: 'connector' },
      { label: 'ג', text: "על הבטן, ולזוז מהר", type: 'hunter' },
      { label: 'ד', text: "על ניתוח ומידע", type: 'sage' },
      { label: 'ה', text: "על תוכנית וניסיון", type: 'builder' },
    ]},
    en: { text: "A big decision is in front of you. What do you trust in the end?", options: [
      { label: 'A', text: "Intuition and a sense of beauty", type: 'creator' },
      { label: 'B', text: "What people I trust say", type: 'connector' },
      { label: 'C', text: "My gut, and moving fast", type: 'hunter' },
      { label: 'D', text: "Analysis and information", type: 'sage' },
      { label: 'E', text: "Planning and experience", type: 'builder' },
    ]},
  },

  { id: 48, stage: 6,
    he: { text: "משפט אחד שהיית תולה מעל השולחן שלך:", options: [
      { label: 'א', text: "\"מי שמעז, מנצח\"", type: 'hunter' },
      { label: 'ב', text: "\"תבין לפני שתפעל\"", type: 'sage' },
      { label: 'ג', text: "\"מה שנבנה טוב, מחזיק\"", type: 'builder' },
      { label: 'ד', text: "\"תעשה את זה בדרך שלך\"", type: 'creator' },
      { label: 'ה', text: "\"אף אחד לא מגיע לבד\"", type: 'connector' },
    ]},
    en: { text: "One sentence you'd hang above your desk:", options: [
      { label: 'A', text: "\"Who dares, wins\"", type: 'hunter' },
      { label: 'B', text: "\"Understand before you act\"", type: 'sage' },
      { label: 'C', text: "\"What's built well, holds\"", type: 'builder' },
      { label: 'D', text: "\"Do it your way\"", type: 'creator' },
      { label: 'E', text: "\"Nobody gets there alone\"", type: 'connector' },
    ]},
  },

];

export function classifyArchetype(scores) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  if (!sorted.length) return 'sage';
  const [first, second] = sorted;
  const gap = first[1] - (second?.[1] ?? 0);

  if (gap <= 4 && second?.[0]) {
    const pair = [first[0], second[0]].sort().join('+');
    const combos = {
      'hunter+sage':       'visionary',
      'creator+sage':      'alchemist',
      'connector+sage':    'alchemist',
      'builder+connector': 'sovereign',
      'builder+hunter':    'visionary',
      'connector+creator': 'sovereign',
    };
    if (combos[pair]) return combos[pair];
  }
  return first[0];
}

// All 48 questions are used in every session.
export const SESSION_QUESTIONS = questions;

// Points (by number of answered closed questions) where one
// AI-written open question is inserted — roughly 40% and 75%.
export const OPEN_QUESTION_AT = [19, 36];

// Top type per layer — where layers disagree is a junction worth naming.
export function layerProfile(answers) {
  const byStage = {};
  for (const qu of questions) {
    const t = answers[qu.id];
    if (!t) continue;
    byStage[qu.stage] ??= {};
    byStage[qu.stage][t] = (byStage[qu.stage][t] ?? 0) + 1;
  }
  return Object.entries(byStage).map(([stage, counts]) => {
    const [top, n] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    return { stage: Number(stage), top, strength: n, counts };
  });
}
