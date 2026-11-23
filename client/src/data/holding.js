// "What you can sustain" — the second axis of the diagnostic.
// The archetype layers measure what draws a person. These questions measure
// what they can actually hold over time, asked about past behaviour
// (biodata style), which is harder to answer from self-image than
// "how persistent are you?". Each option carries a dimension and a level 0–3.

export const DIMENSIONS = {
  delay:    { he: 'סבלנות לתמורה מאוחרת', en: 'Patience for delayed payoff' },
  persist:  { he: 'התמדה בלי מסגרת חיצונית', en: 'Persistence without outside structure' },
  exposure: { he: 'נכונות להיחשף בפומבי', en: 'Willingness to be publicly visible' },
  people:   { he: 'אנרגיה ממגע רב עם אנשים', en: 'Energy from heavy contact with people' },
  autonomy: { he: 'יכולת לתפקד בלי לוח זמנים שמישהו אחר קובע', en: 'Ability to function without a schedule set by others' },
  risk:     { he: 'עמידות לאי־ודאות בהכנסה', en: 'Tolerance for uncertain income' },
  sell:     { he: 'נוחות לבקש כסף מזרים', en: 'Comfort asking strangers for money' },
};

const LABELS = { he: ['א', 'ב', 'ג', 'ד'], en: ['A', 'B', 'C', 'D'] };

function hq(id, dim, he, en) {
  const opts = (lang, list) => list.map((text, level) => ({
    label: LABELS[lang][level], text, type: `${dim}:${level}`,
  }));
  return {
    id, stage: 6, dim,
    he: { text: he.q, options: opts('he', he.o) },
    en: { text: en.q, options: opts('en', en.o) },
  };
}

export const HOLD_QUESTIONS = [
  hq('h1', 'persist',
    { q: 'הפרויקט הכי ארוך שהתחלת לבד, בלי שאף אחד דרש ממך — כמה זמן החזקת בו?',
      o: ['פחות מחודש', 'חודש עד שלושה', 'שלושה חודשים עד שנה', 'יותר משנה, או שאני עדיין בו'] },
    { q: 'The longest project you started on your own, with nobody requiring it — how long did you keep at it?',
      o: ['Less than a month', 'One to three months', 'Three months to a year', 'Over a year, or I am still at it'] }),
  hq('h2', 'delay',
    { q: 'עבדת פעם הרבה זמן על משהו שעוד לא הכניס שקל. מה קרה?',
      o: ['לא קרה לי. אני צריך לראות תמורה מהר', 'עזבתי אחרי כמה שבועות כשלא היה החזר', 'החזקתי כמה חודשים ואז הפסקתי', 'החזקתי עד שזה התחיל להכניס, או שאני עדיין שם'] },
    { q: 'Have you ever worked a long time on something that had not earned anything yet? What happened?',
      o: ['Never. I need to see a return fast', 'I left after a few weeks with no return', 'I kept going a few months, then stopped', 'I kept going until it paid, or I am still there'] }),
  hq('h3', 'persist',
    { q: 'קורסים, אימונים או תחביבים שהתחלת בשנתיים האחרונות — מה מצבם היום?',
      o: ['את רובם נטשתי בשבועות הראשונים', 'חלק החזקתי חודש־חודשיים', 'את רובם סיימתי', 'כמה מהם אני מחזיק כבר שנים'] },
    { q: 'Courses, training or hobbies you started in the last two years — where are they now?',
      o: ['I dropped most in the first weeks', 'I kept some for a month or two', 'I finished most of them', 'I have kept some of them for years'] }),
  hq('h4', 'exposure',
    { q: 'מתי בפעם האחרונה פרסמת משהו אישי שלך — טקסט, וידאו, יצירה — לאנשים שאתה לא מכיר?',
      o: ['אף פעם, ואני לא רוצה', 'פעם או פעמיים, וזה היה לא נעים', 'מדי פעם, בלי בעיה מיוחדת', 'באופן קבוע. זה טבעי לי'] },
    { q: 'When did you last publish something personal — text, video, a creation — to people you do not know?',
      o: ['Never, and I do not want to', 'Once or twice, and it felt uncomfortable', 'Now and then, no big deal', 'Regularly. It comes naturally'] }),
  hq('h5', 'exposure',
    { q: 'מבקשים ממך לדבר דקה למצלמה ולפרסם את זה ברשת. מה קורה בגוף?',
      o: ['אני פשוט לא עושה את זה', 'אעשה, אבל עשר פעמים ובלחץ', 'קצת מתח, ואז זה זורם', 'כבר עשיתי את זה הרבה'] },
    { q: 'You are asked to talk to a camera for a minute and post it. What happens in your body?',
      o: ['I simply will not do it', 'I would, after ten takes and a lot of stress', 'Some tension, then it flows', 'I have done it many times'] }),
  hq('h6', 'people',
    { q: 'אחרי יום שלם של פגישות ושיחות עם אנשים — איך אתה בערב?',
      o: ['מרוקן לגמרי, צריך יום להתאושש', 'צריך ערב שקט לבד', 'עייף, אבל בטוב', 'טעון ורוצה עוד'] },
    { q: 'After a full day of meetings and conversations — how are you in the evening?',
      o: ['Completely drained, I need a day to recover', 'I need a quiet evening alone', 'Tired, but in a good way', 'Charged, wanting more'] }),
  hq('h7', 'autonomy',
    { q: 'בתקופה שאף אחד לא קבע לך לוח זמנים (חופש ארוך, בין עבודות) — מה קרה לימים שלך?',
      o: ['הם התפרקו', 'החזקתי חלק מהזמן', 'בניתי לעצמי סדר יום והחזקתי בו', 'אז אני בשיא שלי'] },
    { q: 'In a period when nobody set your schedule (long break, between jobs) — what happened to your days?',
      o: ['They fell apart', 'I held it together some of the time', 'I built my own routine and kept it', 'That is when I am at my best'] }),
  hq('h8', 'risk',
    { q: 'חודש שבו לא ידוע אם תיכנס הכנסה בכלל. מה קורה לך?',
      o: ['אני לא ישן בלילות', 'לחוץ, אבל מתפקד', 'מתכנן ופועל בקור רוח', 'זה דווקא מגרה אותי'] },
    { q: 'A month where you do not know if any income will come in. What happens to you?',
      o: ['I cannot sleep', 'Stressed, but functioning', 'I plan and act calmly', 'It actually excites me'] }),
  hq('h9', 'sell',
    { q: 'הפעם האחרונה שביקשת מאדם זר כסף על משהו שלך — שירות, מוצר, סדנה?',
      o: ['אף פעם, וזה מפחיד אותי', 'פעם, והיה לי קשה', 'כמה פעמים, זה בסדר', 'אני עושה את זה הרבה, בלי בעיה'] },
    { q: 'The last time you asked a stranger for money for something of yours — a service, product, workshop?',
      o: ['Never, and it scares me', 'Once, and it was hard', 'A few times, it is fine', 'I do it a lot, no problem'] }),
  hq('h10', 'delay',
    { q: 'מה ישאיר אותך לעבוד ביום שאין לך כוח?',
      o: ['כסף שנכנס השבוע', 'כסף שייכנס החודש', 'משהו שאני בונה לשנה הקרובה', 'משהו שאני בונה לשנים, גם אם עכשיו אין ממנו כלום'] },
    { q: 'What keeps you working on a day you have no energy?',
      o: ['Money coming in this week', 'Money coming in this month', 'Something I am building for the coming year', 'Something I am building for years, even if it pays nothing now'] }),
];

// Average level per dimension, 0–3. Missing dimensions are null.
export function holdProfile(answers) {
  const sums = {}; const counts = {};
  for (const q of HOLD_QUESTIONS) {
    const v = answers[q.id];
    if (typeof v !== 'string' || !v.includes(':')) continue;
    const [dim, level] = v.split(':');
    sums[dim] = (sums[dim] ?? 0) + Number(level);
    counts[dim] = (counts[dim] ?? 0) + 1;
  }
  const out = {};
  for (const d of Object.keys(DIMENSIONS)) out[d] = counts[d] ? sums[d] / counts[d] : null;
  return out;
}

// The answer text behind a dimension, for quoting in explanations.
export function holdEvidence(answers, dim, lang = 'he') {
  return HOLD_QUESTIONS
    .filter(q => q.dim === dim && answers[q.id])
    .map(q => {
      const block = q[lang] ?? q.he;
      const opt = block.options.find(o => o.type === answers[q.id]);
      return opt ? { question: block.text, answer: opt.text } : null;
    })
    .filter(Boolean);
}
