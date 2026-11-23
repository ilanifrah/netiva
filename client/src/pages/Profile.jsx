import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useQuiz } from '../context/QuizContext.jsx';
import ParticleField from '../components/ParticleField.jsx';
import Button from '../components/ui/Button.jsx';

const TEXT = {
  he: {
    title: 'רגע לפני שמתחילים',
    subtitle: 'ארבע שאלות קצרות. הן עוזרות לדוח להתאים את הכיוון לחיים האמיתיים שלך, ולא רק לאישיות.',
    age: 'גיל',
    occupation: 'במה אתה עובד היום?',
    occupationPh: 'למשל: מורה, שכיר בהייטק, בין עבודות',
    experience: 'במה יש לך ניסיון או כישרון שאנשים כבר שילמו לך עליו, או ביקשו ממך עזרה בו?',
    experiencePh: 'למשל: עיצוב, מכירות, בישול, אקסל, הדרכה',
    hours: 'כמה שעות בשבוע אתה יכול להקדיש לכיוון חדש?',
    choose: 'בחר',
    submit: 'המשך לשאלון',
    required: 'שדה חובה',
    ages: ['18–24', '25–34', '35–44', '45–54', '55+'],
    hoursOpts: ['עד 5 שעות', '5–10 שעות', '10–20 שעות', 'יותר מ-20 שעות'],
  },
  en: {
    title: 'Before we start',
    subtitle: 'Four short questions. They help the report fit your real life, not just your personality.',
    age: 'Age',
    occupation: 'What do you do today?',
    occupationPh: 'e.g. teacher, salaried in tech, between jobs',
    experience: 'What have people already paid you for, or asked your help with?',
    experiencePh: 'e.g. design, sales, cooking, Excel, teaching',
    hours: 'How many hours a week can you give a new direction?',
    choose: 'Choose',
    submit: 'Continue to the questions',
    required: 'Required',
    ages: ['18–24', '25–34', '35–44', '45–54', '55+'],
    hoursOpts: ['Up to 5 hours', '5–10 hours', '10–20 hours', '20+ hours'],
  },
};

export default function Profile() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { profile, setProfile } = useQuiz();
  const t = TEXT[language] ?? TEXT.he;
  const isRtl = language === 'he';

  const [form, setForm]     = useState(profile);
  const [errors, setErrors] = useState({});

  function update(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    for (const k of ['age', 'occupation', 'hours']) {
      if (!String(form[k] ?? '').trim()) errs[k] = t.required;
    }
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setProfile({
      age: form.age,
      occupation: form.occupation.trim(),
      experience: (form.experience ?? '').trim(),
      hours: form.hours,
    });
    navigate('/quiz');
  }

  const field = hasError => ({
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(139, 92, 246, 0.07)',
    border: `1px solid ${hasError ? 'rgba(239,68,68,0.6)' : 'rgba(167,139,250,0.25)'}`,
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-primary)',
    fontFamily: 'inherit',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box',
  });
  const label = { display: 'block', color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 500, marginBottom: '8px', lineHeight: 1.5 };
  const err = msg => msg ? <p style={{ color: 'rgba(239,68,68,0.85)', fontSize: '0.8rem', margin: '6px 0 0' }}>{msg}</p> : null;

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', overflow: 'hidden' }}>
      <div className="bg-animated" />
      <ParticleField />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 500 }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1 style={{
            fontFamily: isRtl ? 'var(--font-he)' : 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 700,
            background: 'linear-gradient(135deg, var(--gold-400) 20%, var(--violet-400))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '10px',
          }}>
            {t.title}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>{t.subtitle}</p>
        </div>

        <div style={{ background: 'rgba(139, 92, 246, 0.06)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '18px', padding: '28px', backdropFilter: 'blur(12px)' }}>
          <form onSubmit={handleSubmit} dir={isRtl ? 'rtl' : 'ltr'} noValidate>
            <div style={{ marginBottom: '18px' }}>
              <label style={label}>{t.age}</label>
              <select value={form.age} onChange={e => update('age', e.target.value)} style={field(!!errors.age)}>
                <option value="">{t.choose}</option>
                {t.ages.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              {err(errors.age)}
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={label}>{t.occupation}</label>
              <input type="text" value={form.occupation} onChange={e => update('occupation', e.target.value)} placeholder={t.occupationPh} maxLength={120} style={field(!!errors.occupation)} />
              {err(errors.occupation)}
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={label}>{t.experience}</label>
              <input type="text" value={form.experience} onChange={e => update('experience', e.target.value)} placeholder={t.experiencePh} maxLength={200} style={field(false)} />
            </div>

            <div style={{ marginBottom: '26px' }}>
              <label style={label}>{t.hours}</label>
              <select value={form.hours} onChange={e => update('hours', e.target.value)} style={field(!!errors.hours)}>
                <option value="">{t.choose}</option>
                {t.hoursOpts.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
              {err(errors.hours)}
            </div>

            <Button type="submit" variant="gold" size="lg" fullWidth>{t.submit}</Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
