import { useState } from 'react';

// One question at the end of the report: how accurate was it?
// This is the only honest way to know if the diagnostic works.
const TEXT = {
  he: { q: 'עד כמה הדוח הזה מדויק לגביך?', low: 'בכלל לא', high: 'מדויק מאוד', thanks: 'תודה. זה עוזר לנו לדייק את האבחון.' },
  en: { q: 'How accurate is this report about you?', low: 'Not at all', high: 'Very accurate', thanks: 'Thank you. This helps us sharpen the diagnostic.' },
};

export default function AccuracyRating({ language, archetype, plan }) {
  const t = TEXT[language] ?? TEXT.he;
  const [sent, setSent] = useState(null);

  function rate(n) {
    setSent(n);
    const now = new Date();
    const pad = x => String(x).padStart(2, '0');
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'accuracy',
        date: `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`,
        time: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
        archetype, plan,
        accuracy: n,
        language: language === 'he' ? 'עברית' : 'English',
      }),
    }).catch(() => {});
  }

  return (
    <div dir={language === 'he' ? 'rtl' : 'ltr'} style={{
      margin: '0 auto 28px', maxWidth: 520, textAlign: 'center',
      padding: '20px', borderRadius: '16px',
      background: 'rgba(139, 92, 246, 0.06)', border: '1px solid rgba(139, 92, 246, 0.2)',
    }}>
      {sent ? (
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{t.thanks}</p>
      ) : (
        <>
          <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '14px' }}>{t.q}</p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', direction: 'ltr' }}>
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} type="button" onClick={() => rate(n)} style={{
                width: 44, height: 44, borderRadius: '50%', cursor: 'pointer',
                border: '1px solid rgba(167,139,250,0.35)', background: 'rgba(139,92,246,0.1)',
                color: 'var(--text-primary)', fontSize: '1rem', fontFamily: 'inherit',
              }}>{n}</button>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 260, margin: '8px auto 0', color: 'var(--text-muted)', fontSize: '0.78rem', direction: 'ltr' }}>
            <span>{language === 'he' ? t.low : t.low}</span><span>{t.high}</span>
          </div>
        </>
      )}
    </div>
  );
}
