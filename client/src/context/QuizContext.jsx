import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { SESSION_QUESTIONS as QUESTIONS, classifyArchetype, STAGE_LABELS, layerProfile } from '../data/questions.js';

const QuizContext = createContext(null);

const INITIAL_SCORES = { sage: 0, builder: 0, creator: 0, connector: 0, hunter: 0 };
const EMPTY_PROFILE  = { age: '', occupation: '', experience: '', hours: '' };

export function QuizProvider({ children }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers]           = useState({});
  const [scores, setScores]             = useState({ ...INITIAL_SCORES });
  const [archetype, setArchetype]       = useState(null);
  const [sessionId, setSessionId]       = useState(null);
  const [userName, setUserName]         = useState('');
  const [email, setEmail]               = useState('');
  const [plan, setPlan]                 = useState(null);
  const [profile, setProfile]           = useState({ ...EMPTY_PROFILE });
  const [openAnswers, setOpenAnswers]   = useState([]);
  const [completed, setCompleted]       = useState(false);

  const totalQuestions = QUESTIONS.length;
  const currentQuestion = QUESTIONS[currentIndex] ?? null;
  const progress = totalQuestions > 0 ? currentIndex / totalQuestions : 0;

  // Detect completion after the last answer is recorded
  useEffect(() => {
    if (totalQuestions > 0 && currentIndex >= totalQuestions && !completed) {
      setArchetype(classifyArchetype(scores));
      setCompleted(true);
    }
  }, [currentIndex, totalQuestions]);

  // All functional updates — no captured state in closure, so no stale closure risk
  const answerQuestion = useCallback((questionId, optionType) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionType }));
    setScores(prev => ({ ...prev, [optionType]: (prev[optionType] ?? 0) + 1 }));
    setCurrentIndex(prev => prev + 1);
  }, []);

  const addOpenAnswer = useCallback((question, answer) => {
    setOpenAnswers(prev => [...prev, { question, answer }]);
  }, []);

  const goBack = useCallback(() => {
    setCurrentIndex(prev => {
      if (prev === 0) return 0;
      const prevQuestion = QUESTIONS[prev - 1];
      setAnswers(ans => {
        const prevAnswer = ans[prevQuestion.id];
        if (prevAnswer) {
          setScores(sc => ({ ...sc, [prevAnswer]: Math.max(0, (sc[prevAnswer] ?? 0) - 1) }));
        }
        const next = { ...ans };
        delete next[prevQuestion.id];
        return next;
      });
      return prev - 1;
    });
  }, []);

  // Question/answer pairs in readable text, for the report prompt
  const answerTexts = useCallback((lang = 'he') => {
    return QUESTIONS
      .filter(q => answers[q.id])
      .map(q => {
        const block = q[lang] ?? q.he;
        const opt = block.options.find(o => o.type === answers[q.id]);
        const layer = (STAGE_LABELS[lang] ?? STAGE_LABELS.he)[q.stage];
        return opt ? { layer, question: block.text, answer: opt.text, type: opt.type } : null;
      })
      .filter(Boolean);
  }, [answers]);

  // Top type per layer, with the layer name in the given language
  const layers = useCallback((lang = 'he') => {
    return layerProfile(answers).map(l => ({ ...l, layer: (STAGE_LABELS[lang] ?? STAGE_LABELS.he)[l.stage] }));
  }, [answers]);

  function reset() {
    setCurrentIndex(0);
    setAnswers({});
    setScores({ ...INITIAL_SCORES });
    setArchetype(null);
    setSessionId(null);
    setOpenAnswers([]);
    setCompleted(false);
  }

  return (
    <QuizContext.Provider value={{
      currentIndex, currentQuestion, totalQuestions, progress,
      answers, scores, archetype, sessionId, setSessionId,
      userName, setUserName,
      email, setEmail,
      plan, setPlan,
      profile, setProfile,
      openAnswers, addOpenAnswer,
      answerTexts, layers,
      completed,
      answerQuestion, goBack, reset,
    }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuiz must be used inside QuizProvider');
  return ctx;
}
