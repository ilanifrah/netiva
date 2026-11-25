// server/routes/diagnostic.js
import express from 'express';
import Anthropic from '@anthropic-ai/sdk';

const router = express.Router();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
// Newer models can return non-text blocks first; join every text block.
const textOf = r => (r?.content || []).filter(b => b.type === 'text').map(b => b.text).join('').trim();


const GOOGLE_SHEETS_WEBHOOK = 'https://script.google.com/macros/s/AKfycbzbcpw9bt2FUX6AljDeNVlLyBzfl8K6wTNNTPv38M69uA38Z-vgvnktLH14prZvNNhj/exec';

const DIAGNOSTIC_SYSTEM_PROMPT = `
אתה מנוע האבחון של ORACLE.
תפקידך לנהל שיחה אבחונית דינמית ואדפטיבית.

8 ארכיטיפים לזיהוי:
החכם, הבונה, היוצר, המחבר, הציד, הריבון, האלכימאי, החוזה

בכל סיבוב תקבל היסטוריית שאלות ותשובות ומאגר שאלות זמינות.
החזר JSON בלבד בפורמט הזה:
{
  "action": "next_question" או "conclude",
  "question": {
    "id": "string",
    "text": "שאלה בעברית",
    "source": "bank" או "generated",
    "rationale": "למה בחרת שאלה זו"
  },
  "archetypeScores": {
    "החכם": 0.0,
    "הבונה": 0.0,
    "היוצר": 0.0,
    "המחבר": 0.0,
    "הציד": 0.0,
    "הריבון": 0.0,
    "האלכימאי": 0.0,
    "החוזה": 0.0
  },
  "spiralLevel": "orange",
  "confidence": 0.0,
  "primaryArchetype": null
}

כללים:
- מינימום 20 שאלות, מקסימום 60
- אל תחזור על שאלה שנשאלה
- אחרי 20 שאלות אם confidence מעל 0.85 אפשר להסיק מסקנה
- החזר JSON בלבד ללא הקדמות
`;

router.post('/next-question', async (req, res) => {
  try {
    const { history, availableQuestions, questionCount, sessionId } = req.body;

    const userMessage = `
היסטוריית השיחה (${questionCount} שאלות עד כה):
${history.map((h, i) => `שאלה ${i+1}: ${h.question}\nתשובה: ${h.answer}`).join('\n\n')}

שאלות זמינות במאגר:
${availableQuestions.map(q => `ID: ${q.id} | שלב: ${q.stage ?? ''} | טקסט: ${q.he?.text ?? q.text}`).join('\n')}

${questionCount >= 20 ? 'ניתן להסיק מסקנה אם הביטחון גבוה' : `צריך עוד ${20 - questionCount} שאלות לפחות`}

החזר JSON בלבד.
`;

    const response = await client.messages.create({
      // These models think by default; thinking can use the whole token budget
      // and leave no text, so it is turned off for these short, direct outputs.
      thinking: { type: 'disabled' },
      model: 'claude-sonnet-5-5',
      max_tokens: 1024,
      system: DIAGNOSTIC_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }]
    });

    const raw = textOf(response);
    const clean = raw.replace(/```json|```/g, '').trim();
    const result = JSON.parse(clean);

    if (result.action === 'next_question' && result.question?.source === 'generated') {
      logNewQuestion(result.question, sessionId).catch(console.error);
    }

    res.json({ success: true, data: result });

  } catch (err) {
    console.error('[diagnostic/next-question]', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/diagnostic/open-question
// One short open question, written from the profile and the closed answers so far.
router.post('/open-question', async (req, res) => {
  try {
    const { index = 0, language = 'he', profile = {}, answers = [] } = req.body || {};
    const isHe = language !== 'en';
    const recent = (Array.isArray(answers) ? answers : []).slice(-20)
      .map((a, i) => `${i + 1}. ${String(a.question).slice(0, 200)} → ${String(a.answer).slice(0, 200)}`)
      .join('\n');
    const focus = index === 0
      ? (isHe ? 'מה מניע אותו באמת בעבודה, ואיפה התשובות שלו לא עקביות' : 'what really drives them at work, and where their answers are inconsistent')
      : (isHe ? 'מה עוצר אותו מכסף (הצל), ומה הוא מוכן לשנות בפועל' : 'what holds them back from money (the shadow), and what they will actually change');

    const prompt = isHe
      ? `אתה כותב שאלה פתוחה אחת לשאלון אבחון שמכוון אנשים למסלול הכנסה.
פרופיל: גיל ${profile.age || 'לא צוין'}, עיסוק: ${profile.occupation || 'לא צוין'}, ניסיון: ${profile.experience || 'לא צוין'}, שעות פנויות: ${profile.hours || 'לא צוין'}.
תשובות אחרונות:
${recent || 'אין עדיין'}

כתוב שאלה פתוחה אחת בלבד, שמטרתה לחשוף ${focus}.
כללים: עברית טבעית בגוף שני זכר, עד 25 מילים, על חוויה קונקרטית ("ספר על פעם ש..."), בלי מילים מקצועיות, שאלה אחת ולא שתיים.
החזר רק את השאלה עצמה, בלי מירכאות ובלי הקדמה.`
      : `Write one open question for a diagnostic that points people to an income path.
Profile: age ${profile.age || 'n/a'}, occupation: ${profile.occupation || 'n/a'}, experience: ${profile.experience || 'n/a'}, hours: ${profile.hours || 'n/a'}.
Recent answers:
${recent || 'none yet'}

Write exactly one open question that reveals ${focus}.
Rules: natural second person, max 25 words, about a concrete experience ("Tell me about a time..."), no jargon, one question only.
Return only the question.`;

    const response = await client.messages.create({
      // These models think by default; thinking can use the whole token budget
      // and leave no text, so it is turned off for these short, direct outputs.
      thinking: { type: 'disabled' },
      model: 'claude-haiku-5-5',
      max_tokens: 400,
      messages: [{ role: 'user', content: prompt }],
    });
    const question = textOf(response).replace(/^["'״]+|["'״]+$/g, '');
    if (!question) return res.status(502).json({ error: 'empty', stop: response.stop_reason, blocks: (response.content || []).map(b => b.type), usage: response.usage });
    res.json({ question });
  } catch (err) {
    console.error('[diagnostic/open-question]', err.message);
    res.status(500).json({ error: 'failed', detail: String(err.message).slice(0, 300) });
  }
});

router.post('/generate-report', async (req, res) => {
  try {
    const { plan, userName, userEmail, archetype, scores, spiralLevel, answers, sessionId, language } = req.body;

    const depthMap = {
      basis: 'קצר ותמציתי — 3 פסקאות',
      advanced: 'מעמיק — כולל דפוסים ודרכי פעולה',
      premium: 'מלא — כולל ניתוח צל, IFS, ומפת דרכים'
    };

    const prompt = `
אתה ORACLE. צור דוח אישי ${depthMap[plan] || depthMap.basis} עבור ${userName || 'המשתמש'}.
ארכיטיפ: ${archetype}
רמת ספירל: ${spiralLevel}
ציונים: ${JSON.stringify(scores)}

תשובות (${answers.length} שאלות):
${answers.map((a, i) => `${i+1}. ש: ${a.question}\nת: ${a.answer}`).join('\n\n')}

כתוב בעברית, בצורה עמוקה ואישית.
`;

    const response = await client.messages.create({
      // These models think by default; thinking can use the whole token budget
      // and leave no text, so it is turned off for these short, direct outputs.
      thinking: { type: 'disabled' },
      model: 'claude-sonnet-5-5',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }]
    });

    const report = textOf(response);

    logSession({ sessionId, userName, userEmail, plan, archetype, scores, spiralLevel, language: language || 'he', questionCount: answers.length, answers, completionTime: new Date().toISOString() }).catch(console.error);

    res.json({ success: true, report, archetype, scores });

  } catch (err) {
    console.error('[diagnostic/generate-report]', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

async function logSession(data) {
  try {
    await fetch(GOOGLE_SHEETS_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'session', ...data, answers: JSON.stringify(data.answers), scores: JSON.stringify(data.scores) })
    });
  } catch (err) {
    console.error('[logSession]', err);
  }
}

async function logNewQuestion(question, sessionId) {
  try {
    await fetch(GOOGLE_SHEETS_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'new_question', sheetTab: 'שאלות חדשות', sessionId, questionId: question.id, questionText: question.text, rationale: question.rationale, timestamp: new Date().toISOString(), status: 'pending_review' })
    });
  } catch (err) {
    console.error('[logNewQuestion]', err);
  }
}

export default router;