import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button.jsx';

// Shown at two points in the questionnaire. The server writes one open
// question based on the answers so far; if that fails or is slow, a
// fixed fallback question keeps the flow moving.
const FALLBACK = {
  he: [
    'ספר על פעם אחת שעבדת על משהו ושכחת את הזמן. מה בדיוק עשית?',
    'מה אתה ממשיך לעשות בשביל אחרים בלי שמבקשים, כי אתה פשוט לא מסוגל שלא?',
  ],
  en: [
    'Describe one time you worked on something and lost track of time. What exactly were you doing?',
    'What do you keep doing for others without being asked, because you simply cannot not do it?',
  ],
};

const TEXT = {
  he: { loading: 'מנסח שאלה אישית בשבילך...', label: 'שאלה פתוחה', hint: 'משפט או שניים מספיקים. אין תשובה נכונה.', next: 'המשך', min: 'כתוב לפחות כמה מילים' },
  en: { loading: 'Writing a question for you...', label: 'Open question', hint: 'A sentence or two is enough. There is no right answer.', next: 'Continue', min: 'Write at least a few words' },
};

export default function OpenQuestion({ index, language, profile, answerTexts, onSubmit }) {
  const t = TEXT[language] ?? TEXT.he;
  const isRtl = language === 'he';
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer]     = useState('');
  const [error, setError]       = useState(null);

  useEffect(() => {
    let done = false;
    const fallback = (FALLBACK[language] ?? FALLBACK.he)[index] ?? FALLBACK.he[0];
    const timer = setTimeout(() => { if (!done) { done = true; setQuestion(fallback); } }, 15000);

    fetch('/api/diagnostic/open-question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index, language, profile, answers: answerTexts }),
    })
      .then(r => (r.ok ? r.json() : Promise.reject(new Error('bad status'))))
      .then(data => {
        if (done) return;
        done = true;
        setQuestion(typeof data.question === 'string' && data.question.trim() ? data.question.trim() : fallback);
      })
      .catch(() => { if (!done) { done = true; setQuestion(fallback); } })
      .finally(() => clearTimeout(timer));

    return () => { done = true; clearTimeout(timer); };
  }, [index]);

  function submit() {
    if (answer.trim().length < 8) { setError(t.min); return; }
    onSubmit(question, answer.trim());
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      dir={isRtl ? 'rtl' : 'ltr'}
      style={{ width: '100%' }}
    >
      <div style={{ color: 'var(--gold-400)', fontSize: '0.78rem', letterSpacing: '0.1em', marginBottom: '12px' }}>{t.label}</div>

      {!question ? (
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>{t.loading}</p>
      ) : (
        <>
          <h2 style={{ fontSize: 'clamp(1.05rem, 2.8vw, 1.4rem)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px', lineHeight: 1.55 }}>
            {question}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>{t.hint}</p>
          <textarea
            value={answer}
            onChange={e => { setAnswer(e.target.value); setError(null); }}
            rows={5}
            maxLength={1200}
            dir={isRtl ? 'rtl' : 'ltr'}
            style={{
              width: '100%', boxSizing: 'border-box', padding: '14px 16px',
              background: 'rgba(139, 92, 246, 0.07)',
              border: `1px solid ${error ? 'rgba(239,68,68,0.6)' : 'rgba(167,139,250,0.25)'}`,
              borderRadius: 'var(--radius-md)', color: 'var(--text-primary)',
              fontFamily: 'inherit', fontSize: '1rem', lineHeight: 1.6, resize: 'vertical', outline: 'none',
            }}
          />
          {error && <p style={{ color: 'rgba(239,68,68,0.85)', fontSize: '0.8rem', margin: '6px 0 0' }}>{error}</p>}
          <div style={{ marginTop: '18px' }}>
            <Button type="button" variant="gold" size="lg" fullWidth onClick={submit}>{t.next}</Button>
          </div>
        </>
      )}
    </motion.div>
  );
}
