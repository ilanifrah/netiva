import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useQuiz } from '../context/QuizContext.jsx';
import { T } from '../data/translations.js';
import { ARCHETYPES } from '../data/archetypes.js';
import { questions as QUESTIONS } from '../data/questions.js';
import { matchPayload, explainElimination } from '../data/match.js';
import ParticleField from '../components/ParticleField.jsx';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';

const ANALYTICS_URL = '/api/analytics';

const HE_SCORE_LABELS = {
  sage: 'החכם', builder: 'הבונה', creator: 'היוצר',
  connector: 'המחבר', hunter: 'הצייד',
};

function fireAnalytics({ archetypeKey, scores, language, answers, name, email, plan, topPath }) {
  try {
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const date = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;
    const time = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

    const startRaw = localStorage.getItem('netiva_quiz_start');
    const completionMinutes = startRaw
      ? Math.round((Date.now() - parseInt(startRaw, 10)) / 60000)
      : null;
    localStorage.removeItem('netiva_quiz_start');

    const archetypeName = ARCHETYPES[archetypeKey]?.he?.name ?? archetypeKey;
    const heScores = Object.fromEntries(
      Object.entries(scores).map(([k, v]) => [HE_SCORE_LABELS[k] ?? k, v])
    );

    const answerLabels = {};
    if (answers) {
      for (const [qId, type] of Object.entries(answers)) {
        const q = QUESTIONS.find(q => q.id === parseInt(qId, 10));
        if (q) {
          const opt = q.he.options.find(o => o.type === type);
          if (opt) answerLabels[qId] = opt.label;
        }
      }
    }

    fetch(ANALYTICS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date,
        time,
        name:   name || null,
        email:  email || null,
        plan:   plan || null,
        archetype: archetypeName,
        scores: { ...scores, ...heScores },
        ...Object.fromEntries(Object.entries(scores).map(([k, v]) => [`ציון ${(HE_SCORE_LABELS[k] ?? k).replace(/^ה/, '')}`, v])),
        ...Object.fromEntries(Object.entries(scores).map(([k, v]) => [(HE_SCORE_LABELS[k] ?? k).replace(/^ה/, ''), v])),
        topPath: topPath || null,
        language: language === 'he' ? 'עברית' : 'English',
        completionMinutes,
        answers: answerLabels,
      }),
    }).catch(() => {});
  } catch (_) {}
}

const BASE_TYPES = ['sage', 'builder', 'creator', 'connector', 'hunter'];

const COMBO_COMPONENTS = {
  visionary: ['sage', 'hunter'],
  alchemist: ['sage', 'creator'],
  sovereign: ['builder', 'connector'],
};

export default function Results() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { language } = useLanguage();
  const { archetype, sessionId, scores, userName, email, answers, plan, profile, openAnswers, answerTexts, layers, matches } = useQuiz();
  const s = T[language];

  const [revealed, setRevealed]     = useState(false);
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError]     = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (archetypeKey) fireAnalytics({ archetypeKey, scores, language, answers, name: userName, email, plan, topPath: (() => { try { return matches()?.top?.[0]?.path?.he ?? null; } catch { return null; } })() });
  }, []);

  const archetypeKey  = archetype;
  const archetypeData = archetypeKey ? ARCHETYPES[archetypeKey] : null;
  const info          = archetypeData ? archetypeData[language] : null;
  const sid           = sessionId || params.get('session');

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
  const comboKeys  = COMBO_COMPONENTS[archetypeKey] || [];

  function isHighlighted(key) {
    if (archetypeKey === key) return true;
    if (comboKeys.includes(key)) return true;
    return false;
  }

  async function handleGenerate() {
    if (!archetypeKey) { setGenError('Complete the quiz first.'); return; }
    setGenerating(true);
    setGenError(null);
    try {
      const res = await fetch('/api/report/free-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetypeKey,
          scores,
          language,
          plan:      plan || 'advanced',
          name:      userName || null,
          sessionId: sid || null,
          profile:     profile || null,
          qa:          answerTexts(language),
          layers:      layers(language),
          openAnswers: openAnswers || [],
          matches:     matchPayload(matches(), answers, language),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Server error');

      // Always pass content via state — eliminates any DB dependency
      navigate(`/report/${sid || 'free'}`, {
        state: { content: data.content, archetypeKey, plan: data.plan },
      });
    } catch (err) {
      setGenError(err.message);
      setGenerating(false);
    }
  }

  if (!archetypeData || !info) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: 'linear' }} style={{ fontSize: '2.5rem' }}>
          🔮
        </motion.div>
        <p style={{ color: 'var(--text-secondary)' }}>{s.loading}</p>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <div className="bg-animated" />
      <ParticleField />

      <div style={{ position: 'relative', zIndex: 1, padding: '60px 24px 120px', maxWidth: 820, margin: '0 auto' }}>

        {/* ── Archetype reveal ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          {/* Animated emoji with glow ring */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', inset: '-12px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)',
              }}
            />
            <motion.div
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
              transition={{ delay: 0.8, duration: 1.5, repeat: Infinity, repeatDelay: 4 }}
              style={{ fontSize: '5.5rem', display: 'inline-block', position: 'relative' }}
            >
              {archetypeData.emoji}
            </motion.div>
          </div>

          <p style={{ color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.75rem', marginBottom: '10px' }}>
            {s.resultsYouAre}
          </p>

          <h1 style={{
            fontFamily: language === 'he' ? 'var(--font-he)' : 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 6vw, 3.8rem)',
            fontWeight: 700,
            background: 'linear-gradient(135deg, var(--gold-400) 20%, var(--violet-400))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '10px',
            lineHeight: 1.1,
          }}>
            {info.name}
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', fontStyle: 'italic', marginBottom: '16px' }}>
            {info.tagline}
          </p>

          {archetypeData.isCombo && (
            <span style={{
              display: 'inline-block', padding: '4px 16px', borderRadius: '20px',
              background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.35)',
              color: 'var(--gold-400)', fontSize: '0.72rem', letterSpacing: '0.12em',
            }}>
              {language === 'he' ? 'ארכיטיפ משולב' : 'COMBO ARCHETYPE'}
            </span>
          )}
        </motion.div>

        {revealed && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

            {/* ── Matched paths: ranked, and what was ruled out ── */}
            {(() => {
              const m = matches();
              if (!m.top.length) return null;
              const he = language === 'he';
              const nm = p => p[language] ?? p.he;
              return (
                <Card glow style={{ marginBottom: '24px', padding: '24px', textAlign: he ? 'right' : 'left' }} dir={he ? 'rtl' : 'ltr'}>
                  <p style={{ color: 'var(--gold-400)', fontSize: '0.78rem', letterSpacing: '0.12em', marginBottom: '14px' }}>
                    {he ? 'המסלולים שהכי סביר שיחזיקו אצלך' : 'The paths most likely to hold for you'}
                  </p>
                  {m.top[0].score < 0.7 && (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '14px' }}>
                      {he ? 'אף מסלול בספרייה לא מתאים לך בחוזקה. אלה הקרובים ביותר, ושווה לבדוק אותם בזהירות.' : 'No path in the library fits you strongly. These are the closest, worth testing carefully.'}
                    </p>
                  )}
                  {m.top.map((r, i) => (
                    <div key={r.path.id} style={{ marginBottom: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', fontWeight: i === 0 ? 700 : 500, color: i === 0 ? 'var(--text-primary)' : 'var(--text-secondary)', fontSize: i === 0 ? '1.08rem' : '0.95rem' }}>
                        <span>{i + 1}. {nm(r.path)}</span>
                        <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                          {he ? `כ־${r.path.months} ח׳ עד הכנסה` : `~${r.path.months} mo to income`}
                        </span>
                      </div>
                      {r.path.note && (
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>⚠ {r.path.note[language] ?? r.path.note.he}</p>
                      )}
                    </div>
                  ))}
                  {m.eliminated.length > 0 && (
                    <>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', letterSpacing: '0.12em', margin: '20px 0 10px' }}>
                        {he ? 'מושך אותך, אבל כנראה לא יחזיק' : 'Draws you, but probably will not hold'}
                      </p>
                      {m.eliminated.map(r => (
                        <div key={r.path.id} style={{ marginBottom: '12px' }}>
                          <div style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', textDecoration: 'line-through', opacity: 0.8 }}>{nm(r.path)}</div>
                          {explainElimination(r, answers, language).map((line, k) => (
                            <p key={k} style={{ color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: 1.6 }}>{line}</p>
                          ))}
                        </div>
                      ))}
                    </>
                  )}
                </Card>
              );
            })()}

            {/* ── Description card ───────────────────────── */}
            <Card glow style={{ marginBottom: '24px', textAlign: language === 'he' ? 'right' : 'left' }} dir={language === 'he' ? 'rtl' : 'ltr'}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1.02rem' }}>
                {info.description}
              </p>
            </Card>

            {/* ── Layers: what each part of the questionnaire showed ── */}
            {(() => {
              const ls = layers(language);
              if (!ls.length) return null;
              const main = BASE_TYPES.reduce((a, b) => ((scores[b] || 0) > (scores[a] || 0) ? b : a), BASE_TYPES[0]);
              const name = k => ARCHETYPES[k]?.[language]?.name ?? k;
              const off = ls.filter(l => l.top !== main && l.strength >= 3);
              const he = language === 'he';
              return (
                <Card style={{ marginBottom: '24px', padding: '24px', textAlign: he ? 'right' : 'left' }} dir={he ? 'rtl' : 'ltr'}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', letterSpacing: '0.18em', marginBottom: '16px', textAlign: 'center' }}>
                    {he ? 'מה עלה בכל שכבה' : 'What each layer showed'}
                  </p>
                  {ls.map(l => (
                    <div key={l.stage} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '8px', color: l.top === main ? 'var(--text-secondary)' : 'var(--gold-400)' }}>
                      <span>{l.layer}</span>
                      <span>{name(l.top)} · {l.strength}/8</span>
                    </div>
                  ))}
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginTop: '14px' }}>
                    {off.length
                      ? (he
                          ? `הצומת שלך: ב${off.map(l => `"${l.layer}"`).join(' וב')} עולה ${off.map(l => name(l.top)).join(' / ')}, לא ${name(main)}. כאן התשובות שלך לא מסכימות זו עם זו, ושם בדרך כלל נמצא מה שלא אומרים בקול. הדוח המלא מפרק את הצומת הזה.`
                          : `Your junction: in ${off.map(l => `"${l.layer}"`).join(' and ')} the answers point to ${off.map(l => name(l.top)).join(' / ')}, not ${name(main)}. This is where your answers disagree with each other. The full report unpacks it.`)
                      : (he
                          ? `כל השכבות מצביעות על ${name(main)}. זה פרופיל עקבי במיוחד.`
                          : `Every layer points to ${name(main)}. This is an unusually consistent profile.`)}
                  </p>
                </Card>
              );
            })()}

            {/* ── Score breakdown bars ────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <Card style={{ marginBottom: '24px', padding: '24px' }}>
                <p style={{
                  color: 'var(--text-muted)', fontSize: '0.72rem',
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  marginBottom: '20px', textAlign: 'center',
                }}>
                  {language === 'he' ? 'פרופיל הארכיטיפים שלך' : 'Your Archetype Profile'}
                </p>

                {BASE_TYPES.map((key, idx) => {
                  const arch = ARCHETYPES[key];
                  const pct  = Math.round(((scores[key] || 0) / totalScore) * 100);
                  const hi   = isHighlighted(key);
                  return (
                    <div key={key} style={{ marginBottom: idx < BASE_TYPES.length - 1 ? '14px' : 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{
                          fontSize: '0.88rem',
                          color: hi ? 'var(--gold-400)' : 'var(--text-secondary)',
                          display: 'flex', alignItems: 'center', gap: '8px',
                          fontWeight: hi ? 600 : 400,
                        }}>
                          <span>{arch.emoji}</span>
                          <span>{arch[language]?.name}</span>
                        </span>
                        <span style={{ fontSize: '0.75rem', color: hi ? 'var(--gold-400)' : 'var(--text-muted)', minWidth: '34px', textAlign: 'right', fontWeight: hi ? 600 : 400 }}>
                          {pct}%
                        </span>
                      </div>
                      <div style={{ height: '7px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.9, delay: 0.3 + idx * 0.08, ease: 'easeOut' }}
                          style={{
                            height: '100%',
                            borderRadius: '4px',
                            background: hi
                              ? 'linear-gradient(90deg, var(--gold-400), var(--violet-400))'
                              : 'rgba(139, 92, 246, 0.3)',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </Card>
            </motion.div>

            {/* ── Key traits ─────────────────────────────── */}
            {info.firstMove && !(matches()?.top?.length) && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card style={{ marginBottom: '24px', borderLeft: '3px solid var(--gold-400)', padding: '20px 24px' }} dir={language === 'he' ? 'rtl' : 'ltr'}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '10px' }}>
                    {language === 'he' ? 'הצעד הראשון שלך' : 'Your First Move'}
                  </p>
                  <p style={{ color: 'var(--text-primary)', lineHeight: 1.7, fontSize: '0.97rem' }}>
                    {info.firstMove}
                  </p>
                </Card>
              </motion.div>
            )}

            {/* ── Warning sign ───────────────────────────── */}
            {info.warningSign && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card style={{ marginBottom: '28px', borderLeft: '3px solid rgba(239,68,68,0.6)', padding: '20px 24px' }} dir={language === 'he' ? 'rtl' : 'ltr'}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '10px' }}>
                    {language === 'he' ? 'סימן האזהרה שלך' : 'Your Warning Sign'}
                  </p>
                  <p style={{ color: 'rgba(239,68,68,0.85)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    {info.warningSign}
                  </p>
                </Card>
              </motion.div>
            )}

            {/* ── Generate CTA ───────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{ textAlign: 'center' }}
            >
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>
                {language === 'he'
                  ? 'הדוח המלא מחדד את הכיוון לנישה אחת, מסביר מה נפסל ולמה, ונותן ניסוי של 10 דקות לכל מסלול'
                  : 'The full report sharpens the direction into one niche, explains what was ruled out and why, and gives a 10-minute trial per path'}
              </p>
              <Button
                variant="gold"
                size="lg"
                fullWidth
                onClick={handleGenerate}
                disabled={generating}
              >
                {generating ? `🔮 ${s.reportLoading}` : s.generateReport}
              </Button>
              {genError && (
                <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '12px' }}>{genError}</p>
              )}
            </motion.div>

            {/* ── Upgrade prompt ──────────────────────────── */}
            {plan && plan !== 'premium' && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                style={{ marginTop: '32px' }}
              >
                <div style={{
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(245,158,11,0.05) 0%, rgba(139,92,246,0.07) 100%)',
                  border: '1px solid rgba(245,158,11,0.28)',
                  padding: '24px 28px',
                  direction: 'rtl',
                  textAlign: 'right',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Background glow */}
                  <div style={{
                    position: 'absolute', top: '-24px', right: '-24px',
                    width: '130px', height: '130px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }} />

                  <p style={{
                    color: 'var(--gold-400)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    marginBottom: '10px',
                  }}>
                    {plan === 'basic' ? 'שדרג לפלאן מתקדם' : 'שדרג לפרימיום'}
                  </p>

                  <p style={{
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-he)',
                    fontWeight: 600,
                    lineHeight: 1.55,
                    marginBottom: '8px',
                  }}>
                    {plan === 'basic'
                      ? 'שדרג למתקדם — שלם רק $7 נוספים וקבל דוח מעמיק מלא'
                      : 'שדרג לפרימיום — שלם רק $17 נוספים וקבל ניתוח פסיכולוגי עמוק + תכנית 30 יום'}
                  </p>

                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.84rem',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                  }}>
                    {plan === 'basic'
                      ? '7 נתיבי הכנסה עם הסברים · ניתוח כוחות וחסמים · 3 צעדי פעולה קונקרטיים'
                      : 'ניתוח צל / IFS / סומטי · תוכנית אישית 30 יום · כל הנתיבים מדורגים · המלצות כלים'}
                  </p>

                  <Button variant="gold" size="md" onClick={() => navigate('/plan')}>
                    שדרג עכשיו ✦
                  </Button>
                </div>
              </motion.div>
            )}

          </motion.div>
        )}
      </div>
    </div>
  );
}
