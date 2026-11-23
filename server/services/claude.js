import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODEL = 'claude-sonnet-5-5';

function formatIncomePaths(paths) {
  return paths.map((p, i) =>
    `${i + 1}. ${p.name}\n   למה מתאים: ${p.why}\n   זמן לכסף ראשון: ${p.timeToFirstIncome}\n   פעולה ראשונה: ${p.firstAction}`
  ).join('\n\n');
}

// Everything we know about this specific person, plus the rules that keep
// the report concrete and honest. Appended to the base prompt for every plan.
const TYPE_NAMES = {
  he: { sage: 'החכם', builder: 'הבונה', creator: 'היוצר', connector: 'המחבר', hunter: 'הציד' },
  en: { sage: 'Sage', builder: 'Builder', creator: 'Creator', connector: 'Connector', hunter: 'Hunter' },
};

function buildPersonalBlock({ profile, qa, openAnswers, layers, language }) {
  const he = language !== 'en';
  const names = he ? TYPE_NAMES.he : TYPE_NAMES.en;
  const p = profile || {};
  const na = he ? 'לא צוין' : 'not given';
  const qaLines = (qa || [])
    .map((x, i) => `${i + 1}. [${x.layer || ''}] ${String(x.question).slice(0, 220)} → ${String(x.answer).slice(0, 220)}`)
    .join('\n');
  const openLines = (openAnswers || [])
    .map((x, i) => he
      ? `שאלה פתוחה ${i + 1}: ${String(x.question).slice(0, 300)}\nתשובה: ${String(x.answer).slice(0, 1200)}`
      : `Open question ${i + 1}: ${String(x.question).slice(0, 300)}\nAnswer: ${String(x.answer).slice(0, 1200)}`)
    .join('\n\n');
  const layerLines = (layers || [])
    .map(l => `• ${l.layer}: ${names[l.top] || l.top} (${l.strength}/8)`)
    .join('\n');

  if (he) return `
פרופיל המשתמש:
• גיל: ${p.age || na}
• עיסוק היום: ${p.occupation || na}
• ניסיון או כישרון שכבר שילמו לו עליו: ${p.experience || na}
• שעות פנויות בשבוע: ${p.hours || na}

השאלון בנוי משש שכבות, כל אחת ניגשת מזווית אחרת: זרימה, הגוף, זיכרון מוקדם, הצל, האדם בין אנשים, ובחירה תחת אילוץ.
הטיפוס החזק בכל שכבה:
${layerLines || 'לא נשלח'}

התשובות שלו (בסוגריים: השכבה):
${qaLines || 'לא נשלחו'}

${openLines ? `התשובות הפתוחות שלו, במילים שלו:\n${openLines}` : ''}

כללי דיוק — גוברים על כל הוראה אחרת בהמשך:
1. פתח את הדוח בסעיף "## הכיוון שלך", לפני כל שאר הכותרות. בו: מקצוע, תפקיד או מסלול הכנסה אחד בשם מפורש ומעשי (לדוגמה: "עורך וידאו לעסקים קטנים", "בונה אוטומציות AI למשרדים"), ולא שם הארכיטיפ.
2. נמק את הכיוון בשלוש תשובות ספציפיות שלו מהרשימה. צטט את המילים שלו.
3. מיד אחריו כתוב סעיף "## הצמתים שלך": בחר שתי שכבות שבהן הטיפוס החזק שונה (למשל, בזרימה הוא יוצר אבל בצל הוא ציד). הסבר מה הפער אומר עליו, במשפטים קונקרטיים, ואיך הוא משפיע על הכיוון. אם כל השכבות מסכימות, אמור זאת וכתוב מה זה מחזק.
4. התאם לגיל, לעיסוק, לניסיון ולשעות הפנויות. עם עד 5 שעות בשבוע, אל תציע מסלול שדורש 30. אם יש ניסיון שכבר שילמו עליו, התחל ממנו.
5. הצג את הכיוון כהשערה לבדיקה: סיים את הסעיף הראשון ב"בדיקה לשבוע הקרוב", פעולה אחת זולה שתוך 7 ימים תראה אם הכיוון נכון.
6. אסור: משפטים שמתאימים לכל אדם ("לפעמים אתה מטיל ספק בעצמך"), משפטי מוטיבציה, "אתה אדם ייחודי ומורכב", חזרה על רעיון, הבטחות הכנסה. כל משפט צריך להישען על תשובה שלו.
7. עברית טבעית ויומיומית בגוף שני זכר, לא תרגום.
8. עיגון מחקרי לבחירת המקצוע: חמשת הטיפוסים תואמים את מודל ההתעניינות של הולנד (RIASEC), שהוא המודל עם התמיכה המחקרית החזקה ביותר לבחירת תחום עבודה: החכם = Investigative, הבונה = Realistic ו-Conventional, היוצר = Artistic, המחבר = Social, הציד = Enterprising. בחר מקצוע שמתאים לשני הטיפוסים החזקים יחד (קוד הולנד של שתי אותיות), כמו שמסווגים אותו במאגר O*NET, וכתוב במשפט אחד את הקוד ולמה המקצוע מתאים לו.`;

  return `
User profile:
• Age: ${p.age || na}
• Current occupation: ${p.occupation || na}
• Experience people have already paid for: ${p.experience || na}
• Free hours per week: ${p.hours || na}

The questionnaire has six layers, each from a different angle: flow, the body, early memory, the shadow, the person among others, and choice under constraint.
Strongest type per layer:
${layerLines || 'not sent'}

Their answers (layer in brackets):
${qaLines || 'not sent'}

${openLines ? `Their open answers, in their own words:\n${openLines}` : ''}

Accuracy rules — these override any instruction that follows:
1. Open the report with a "## Your direction" section, before all other headings: one named, practical profession, role or income path (e.g. "video editor for small businesses", "AI automation builder for offices"), not the archetype name.
2. Back it with three of their specific answers. Quote their words.
3. Right after it write "## Your junctions": pick two layers whose strongest type differs (e.g. Creator in flow but Hunter in the shadow). Explain concretely what the gap says about them and how it shapes the direction. If all layers agree, say so and what that strengthens.
4. Fit the age, occupation, experience and free hours. With up to 5 hours a week, don't propose a path that needs 30. If they have paid experience, start from it.
5. Present the direction as a hypothesis: end the first section with "Test for this week" — one cheap action that shows within 7 days whether the direction is right.
6. Forbidden: statements that fit anyone ("at times you doubt yourself"), motivational lines, "you are unique and complex", repetition, income promises. Every sentence must rest on one of their answers.
7. Plain, natural English.
8. Research anchor for the occupation: the five types map onto Holland's RIASEC interest model, the best-supported model for choosing a field of work: Sage = Investigative, Builder = Realistic and Conventional, Creator = Artistic, Connector = Social, Hunter = Enterprising. Pick an occupation that fits the two strongest types together (a two-letter Holland code), as O*NET classifies it, and state the code and why it fits in one sentence.`;
}

function buildHebrewPrompt({ plan, archetypeName, tagline, warningSign, scores, name, incomePathsBlock }) {
  const nameRef = name ? `${name}, ` : '';

  const base = `אתה Oracle — מנוע אבחון פסיכולוגי חד, ישיר ומדויק המתמחה בנתיבי יצירת הכנסה מקוונת.
המשתמש השלים מבדק אבחוני מקיף.${name ? `\nשם: ${name}` : ''}
ארכיטיפ: ${archetypeName} — ${tagline}
ציוני גלם: ${JSON.stringify(scores)}
${incomePathsBlock}

כללי כתיבה — חובה מוחלטת:
• כתוב בעברית גברית (זכר) בלבד — "אתה", "שלך", "תעשה", "שייך לך"
• סגנון: ישיר, חד, פסיכולוגי. ללא שבחים ריקים. ללא ניסוחים גנריים
• פנה ישירות למשתמש — "אתה רואה", "הכוח שלך", לא "ארכיטיפ זה" או "אנשים כאלה"
• כל עצה — ספציפית, עם פועל + מה + מתי. לא "חשוב על" או "שקול"`.trim();

  // ── Premium ────────────────────────────────────────────────
  if (plan === 'premium') {
    return `${base}

כתוב דוח פרמיום שלם. אורך: 2000–2500 מילים. השתמש בדיוק בכותרות הבאות (## לסעיף ראשי, ### לתת-סעיף):

## הפרופיל שלך: ${archetypeName}
${nameRef}[6–8 משפטים. מה הדפוס הפסיכולוגי העמוק שמניע אותך? איך אתה מייצר ערך בצורה שונה מאחרים? מה מערכת היחסים שלך עם כסף, יצירה ועצמאות? ספציפי — לא תיאור גנרי.]

## הכוחות שלך
[5 כוחות ייחודיים. עבור כל כוח:
**[שם הכוח]**: 2–3 משפטים — מה הכוח הספציפי ואיך בדיוק לנצל אותו ביצירת הכנסה מקוונת. לא תיאורטי — מעשי.]

## הצל שלך — ניתוח עמוק (Shadow / IFS / סומטי)
[5–6 משפטים. מה החלק הפנימי שמנהל את ההחלטות הכלכליות מבלי שתשים לב? איזה פצע מקורי מאחורי הדפוס? מה מרגיש בגוף ברגע שאתה נכנס לדפוס המעכב? איך נראה הקול הפנימי שמנהל את הסבוטאג'? כתוב כאילו אתה מכיר אותו עמוק — ישיר, לא שיפוטי, מדויק.]

## כל נתיבי ההכנסה — מדורגים לפי התאמה
[השתמש בנתיבים שסיפקתי כבסיס, הוסף נתיבים רלוונטיים נוספים, ודרג הכל לפי התאמה לארכיטיפ זה. עבור כל נתיב:]
### [שם הנתיב]
**למה זה מתאים לך**: [2 משפטים פסיכולוגיים וספציפיים]
**זמן לכסף ראשון**: [הזמן]
**הפעולה שלך עכשיו**: [משפט אחד. פועל ממשי + מה בדיוק + מתי. ניתן לביצוע השבוע. לא "תבדוק" — "שלח הודעה ל-X", "פרסם פוסט על Y ביום ד'", "צור עמוד Gumroad ב-Z ומחיר $XX"]

## תוכנית הפעולה שלך — 30 יום
### שבוע 1 — [כותרת תמטית]
- [פעולה 1 — ספציפית]
- [פעולה 2 — ספציפית]
- [פעולה 3 — ספציפית]
### שבוע 2 — [כותרת תמטית]
- [3 פעולות ספציפיות]
### שבוע 3 — [כותרת תמטית]
- [3 פעולות ספציפיות]
### שבוע 4 — [כותרת תמטית]
- [3 פעולות ספציפיות]

## המלצות כלים ופלטפורמות
[7–10 כלים ספציפיים — שמות מדויקים, לא קטגוריות. עבור כל כלי: שם + משפט אחד למה בדיוק הוא מתאים לארכיטיפ זה ולנתיב ההכנסה הראשי שלך.]

## הצעד שלך — עכשיו, היום
[משפט אחד. פעולה פיזית אחת שניתן לבצע תוך שעה. ספציפי לארכיטיפ ולנתיב הראשי. זה המשפט הכי חשוב בדוח.]

## הסימן שיגיד לך שיצאת מהנתיב
[משפט אחד: ההתנהגות הספציפית שמסמנת שאתה חרגת מהנתיב שלך. ${warningSign ? `בסיס: ${warningSign}` : ''}]`;
  }

  // ── Advanced ───────────────────────────────────────────────
  if (plan === 'advanced') {
    return `${base}

כתוב דוח מתקדם. אורך: 1000–1400 מילים. השתמש בדיוק בכותרות הבאות:

## הפרופיל שלך: ${archetypeName}
${nameRef}[5–6 משפטים. הדפוס הפסיכולוגי העמוק, איך אתה מייצר ערך, מה מניע אותך ביחס לכסף ועצמאות.]

## הכוחות שלך
[4 כוחות ייחודיים. עבור כל כוח:
**[שם הכוח]**: 2 משפטים — מה הכוח ואיך לנצל אותו ביצירת הכנסה מקוונת.]

## הדפוסים שמעכבים אותך
[3–4 משפטים. מה החסמים הספציפיים של ארכיטיפ זה? מה הפחד שמאחוריהם? מה המחיר שאתה משלם? ישיר ומדויק.]

## 7 נתיבי ההכנסה המדויקים לך
[השתמש ב-5 הנתיבים שסיפקתי והוסף 2 נוספים רלוונטיים לארכיטיפ זה. עבור כל נתיב:]
### [שם הנתיב]
**למה זה מתאים לך**: [2 משפטים ספציפיים לארכיטיפ]
**הפעולה שלך עכשיו**: [משפט אחד. פועל + מה + מתי. ניתן לביצוע השבוע.]

## 3 הצעדים הקונקרטיים שלך
### צעד 1 — [כותרת]
[תיאור ספציפי — מה בדיוק, מתי, ומה התוצאה המצופה.]
### צעד 2 — [כותרת]
[תיאור ספציפי.]
### צעד 3 — [כותרת]
[תיאור ספציפי.]

## הסימן שיגיד לך שיצאת מהנתיב
[משפט אחד: ההתנהגות הספציפית שמסמנת שאתה חרגת מהנתיב. ${warningSign ? `בסיס: ${warningSign}` : ''}]`;
  }

  // ── Basic ──────────────────────────────────────────────────
  return `${base}

כתוב דוח בסיסי. אורך: 400–500 מילים. השתמש בדיוק בכותרות הבאות:

## הארכיטיפ שלך: ${archetypeName}
${nameRef}[3–4 משפטים. מה הדפוס הפסיכולוגי הבסיסי שלך ואיך הוא מתבטא ביצירת הכנסה מקוונת. ספציפי ולא גנרי.]

## 3 נתיבי ההכנסה שהכי מתאימים לך
[השתמש ב-3 הנתיבים המתאימים ביותר מתוך הרשימה שסיפקתי. עבור כל נתיב:]
### [שם הנתיב]
[2 משפטים — למה מתאים לארכיטיפ שלך ספציפית.]
**הפעולה הראשונה**: [משפט אחד ספציפי — פועל + מה + מתי.]

## הצעד שלך — עכשיו
[משפט אחד. פעולה אחת שניתן לבצע היום. הכי חשוב בדוח.]`;
}

function buildEnglishPrompt({ plan, archetypeName, tagline, warningSign, scores, name, incomePathsBlock }) {
  const nameRef = name ? `${name}, ` : '';

  const base = `You are Oracle — a precise, psychologically sophisticated diagnostic engine specializing in online income paths.
The user has completed a comprehensive assessment.${name ? `\nName: ${name}` : ''}
Archetype: ${archetypeName} — ${tagline}
Raw scores: ${JSON.stringify(scores)}
${incomePathsBlock}

Writing rules:
• Address the user directly in second person: "you", "your"
• Style: direct, sharp, psychologically precise. No empty praise. No generic advice
• Every recommendation: specific verb + what + when. Not "think about" — actual actions`.trim();

  // ── Premium ────────────────────────────────────────────────
  if (plan === 'premium') {
    return `${base}

Write a complete Premium Report. Length: 2000–2500 words. Use these exact headers:

## Your Archetype: ${archetypeName}
${nameRef}[6–8 sentences. Deep psychological pattern, how you create value differently, your relationship with money and independence. Specific — not generic.]

## Your Strengths
[5 strengths. Format: **Strength Name**: 2–3 sentences on how to leverage it for online income.]

## Your Shadow — Deep Analysis (Shadow / IFS / Somatic)
[5–6 sentences. What internal part runs your financial decisions without your awareness? What original wound is beneath the pattern? What do you feel in your body when you enter the sabotaging pattern? What does the inner voice say? Write as if you know them deeply — direct, non-judgmental, precise.]

## All Your Income Paths — Ranked by Fit
[Use the provided paths as a base, add additional relevant ones, rank all by fit for this archetype. For each path:]
### [Path Name]
**Why this fits you**: [2 psychologically specific sentences]
**Time to first income**: [time]
**Your action now**: [One sentence. Specific verb + what + when. Doable this week.]

## Your 30-Day Action Plan
### Week 1 — [Thematic title]
- [Specific action 1]
- [Specific action 2]
- [Specific action 3]
### Week 2 — [Thematic title]
- [3 specific actions]
### Week 3 — [Thematic title]
- [3 specific actions]
### Week 4 — [Thematic title]
- [3 specific actions]

## Tool & Platform Recommendations
[7–10 specific named tools — not categories. For each: name + one sentence on why it specifically fits this archetype and primary income path.]

## Your Move — Right Now, Today
[One sentence. One physical action doable within the hour. This is the most important sentence in the report.]

## The Warning Sign
[One sentence: the specific behavior that signals you're off your path. ${warningSign || ''}]`;
  }

  // ── Advanced ───────────────────────────────────────────────
  if (plan === 'advanced') {
    return `${base}

Write an Advanced Report. Length: 1000–1400 words. Use these exact headers:

## Your Profile: ${archetypeName}
${nameRef}[5–6 sentences. Deep psychological pattern, how you create value, relationship with money and independence.]

## Your Strengths
[4 strengths. **Strength Name**: 2 sentences on how to leverage it for online income.]

## What Holds You Back
[3–4 sentences. Specific blocks for this archetype, the fear behind them, the price you pay.]

## Your 7 Precise Income Paths
[Use the 5 provided paths plus 2 additional relevant ones. For each:]
### [Path Name]
**Why this fits you**: [2 specific sentences]
**Your action now**: [One sentence. Verb + what + when. Doable this week.]

## Your 3 Concrete Steps
### Step 1 — [Title]
[Specific: what exactly, when, expected result.]
### Step 2 — [Title]
[Specific description.]
### Step 3 — [Title]
[Specific description.]

## The Warning Sign
[One sentence. ${warningSign || ''}]`;
  }

  // ── Basic ──────────────────────────────────────────────────
  return `${base}

Write a Basic Report. Length: 400–500 words. Use these exact headers:

## Your Archetype: ${archetypeName}
${nameRef}[3–4 sentences. Core psychological pattern and how it shows up in online income creation. Specific, not generic.]

## Your 3 Best-Fit Income Paths
[Use the 3 best-matching paths from the list provided. For each:]
### [Path Name]
[2 sentences — why it fits your archetype specifically.]
**First action**: [One specific sentence — verb + what + when.]

## Your Move — Right Now
[One sentence. One action doable today. The most important sentence in this report.]`;
}

function buildPrompt({ plan, archetype, scores, language, name, profile, qa, openAnswers, layers }) {
  const isHe = language === 'he';
  const archetypeName = isHe ? archetype.name_he : archetype.name_en;
  const tagline       = isHe ? archetype.tagline_he : archetype.tagline_en;
  const warningSign   = isHe ? archetype.warningSign_he : archetype.warningSign_en;

  const incomePathsBlock = archetype.incomePaths
    ? (isHe
        ? `\nנתיבי הכנסה מוכנים לארכיטיפ זה — השתמש בהם כבסיס:\n${formatIncomePaths(archetype.incomePaths)}`
        : `\nCurated income paths for this archetype — use as foundation:\n${archetype.incomePaths.map((p, i) =>
            `${i + 1}. ${p.name}\n   Why: ${p.why}\n   Time: ${p.timeToFirstIncome}\n   First action: ${p.firstAction}`
          ).join('\n\n')}`)
    : '';

  const personal = buildPersonalBlock({ profile, qa, openAnswers, layers, language });

  if (isHe) {
    return buildHebrewPrompt({ plan, archetypeName, tagline, warningSign, scores, name, incomePathsBlock: incomePathsBlock + '\n' + personal });
  }
  return buildEnglishPrompt({ plan, archetypeName, tagline, warningSign, scores, name, incomePathsBlock: incomePathsBlock + '\n' + personal });
}

export async function generateReport({ plan, archetype, scores, language, name, profile, qa, openAnswers, layers }) {
  const prompt = buildPrompt({ plan, archetype, scores, language, name, profile, qa, openAnswers, layers });

  const maxTokens = plan === 'premium' ? 4000 : plan === 'advanced' ? 2500 : 1200;

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    messages: [{ role: 'user', content: prompt }],
    system: 'אתה Oracle — מנוע אבחון פסיכולוגי מדויק. אף פעם לא משתמש בשבחים ריקים או בשפה מוטיבציונית גנרית. מנתח דפוסים ישירות ונותן כיוון ספציפי ופעולות ניתנות לביצוע. You are Oracle — a precise, psychologically sophisticated diagnostic engine. You never use empty praise or generic motivational language. You name patterns honestly and give specific, actionable direction.',
  });

  return message.content[0].text;
}
