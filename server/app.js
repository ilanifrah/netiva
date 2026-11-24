import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import quizRouter      from './routes/quiz.js';
import reportRouter    from './routes/report.js';
import paymentRouter   from './routes/payment.js';
import analyticsRouter from './routes/analytics.js';
import diagnosticRouter from './routes/diagnostic.js';
import { errorHandler } from './middleware/errorHandler.js';

const app  = express();

// Trust Railway/Vercel proxy so express-rate-limit can read the real client IP
app.set('trust proxy', 1);

// ── Security ──────────────────────────────────────────────
app.use(helmet());
const allowedOrigins = process.env.ALLOWED_ORIGIN
  ? process.env.ALLOWED_ORIGIN.split(',').map(o => o.trim())
  : ['http://localhost:5173', 'http://localhost:4173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Stripe webhook needs raw body — mount BEFORE express.json()
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());

// Rate limiting
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
}));

// ── Routes ────────────────────────────────────────────────
app.use('/api/quiz',      quizRouter);
app.use('/api/report',    reportRouter);
app.use('/api/payment',   paymentRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/diagnostic', diagnosticRouter);

// Probe: one tiny model call per model, returns only status and error text (never the key).
app.get('/api/health/ai', async (_req, res) => {
  const { default: Anthropic } = await import('@anthropic-ai/sdk');
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const out = {};
  for (const model of ['claude-haiku-5-5', 'claude-sonnet-5-5']) {
    const t0 = Date.now();
    try {
      const r = await client.messages.create({ model, max_tokens: 5, messages: [{ role: 'user', content: 'hi' }] });
      out[model] = `ok ${Date.now() - t0}ms`;
    } catch (e) {
      out[model] = `error ${e.status ?? ''}: ${String(e.message).slice(0, 200)}`;
    }
  }
  res.json(out);
});

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    ts: new Date().toISOString(),
    // Booleans only — never echo secret values.
    env: {
      anthropic: Boolean(process.env.ANTHROPIC_API_KEY),
      supabase:  Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY),
    },
  });
});

// ── Error handler ──────────────────────────────────────────
app.use(errorHandler);

export default app;
