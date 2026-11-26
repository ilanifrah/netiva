import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

const CONTENT = {
  he: {
    title: 'תנאי שימוש ופרטיות',
    sections: [
      ['מה זה נתיבה', 'אבחון שמציע כיוון לבדיקה בתחום ההכנסה, על סמך התשובות שלך. הוא לא טיפול פסיכולוגי, לא ייעוץ פיננסי או תעסוקתי, ולא מבטיח הכנסה. ההחלטות שלך הן באחריותך.'],
      ['מה אנחנו אוספים', 'שם, אימייל, פרטי הפרופיל (גיל, עיסוק, ניסיון, שעות פנויות), התשובות לשאלון, והדירוג שאתה נותן לדוח.'],
      ['למה', 'כדי לכתוב לך את הדוח, ולשפר את דיוק האבחון לאורך זמן.'],
      ['מי מעבד את המידע', 'התשובות נשלחות לשירות הבינה המלאכותית של Anthropic לצורך כתיבת הדוח. הנתונים נשמרים בגיליון Google ובמסד נתונים של Supabase.'],
      ['מה לא נעשה', 'לא נמכור את המידע שלך ולא נעביר אותו לצד שלישי לשיווק.'],
      ['מחיקה', 'אפשר לבקש לראות או למחוק את המידע שלך בוואטסאפ: 054-4408024.'],
    ],
    back: 'חזרה',
  },
  en: {
    title: 'Terms & Privacy',
    sections: [
      ['What Netiva is', 'A diagnostic that suggests a direction to test for income, based on your answers. It is not therapy, not financial or career advice, and does not promise income. Your decisions are your own.'],
      ['What we collect', 'Name, email, profile details (age, occupation, experience, free hours), your answers, and the rating you give the report.'],
      ['Why', 'To write your report, and to improve the diagnostic\'s accuracy over time.'],
      ['Who processes it', 'Your answers are sent to Anthropic\'s AI service to write the report. Data is stored in a Google Sheet and a Supabase database.'],
      ['What we don\'t do', 'We won\'t sell your data or pass it to third parties for marketing.'],
      ['Deletion', 'You can ask to see or delete your data on WhatsApp: +972-54-4408024.'],
    ],
    back: 'Back',
  },
};

export default function Privacy() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const c = CONTENT[language] ?? CONTENT.he;
  const isRtl = language !== 'en';

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', padding: '48px 24px', display: 'flex', justifyContent: 'center' }}>
      <div className="bg-animated" />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, width: '100%' }}>
        <h1 style={{ fontSize: '1.8rem', color: 'var(--gold-400)', marginBottom: '24px' }}>{c.title}</h1>
        {c.sections.map(([h, p]) => (
          <section key={h} style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '6px' }}>{h}</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{p}</p>
          </section>
        ))}
        <button type="button" onClick={() => navigate(-1)} style={{ marginTop: '12px', background: 'none', border: 'none', color: 'var(--violet-400)', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem' }}>
          {c.back}
        </button>
      </div>
    </div>
  );
}
