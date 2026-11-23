// Matching engine: knock out paths the person is unlikely to sustain,
// then rank the rest by (what draws them) × (what they can hold).
import { PATHS } from './paths.js';
import { DIMENSIONS, holdEvidence } from './holding.js';

const BASE = ['sage', 'builder', 'creator', 'connector', 'hunter'];
const KNOCKOUT_GAP = 1.5;   // need − have at or above this rules a path out
const UNKNOWN = 1.5;        // assumed level when a dimension was not answered

export function hoursFromProfile(text = '') {
  if (/20\+|יותר/.test(text)) return 25;
  if (/10[–-]20/.test(text)) return 15;
  if (/5[–-]10/.test(text)) return 8;
  if (text) return 5;
  return null;
}

export function matchPaths({ scores = {}, hold = {}, hoursText = '' }) {
  const total = BASE.reduce((s, t) => s + (scores[t] || 0), 0) || 1;
  const share = Object.fromEntries(BASE.map(t => [t, (scores[t] || 0) / total]));
  const maxShare = Math.max(...Object.values(share)) || 1;
  const hours = hoursFromProfile(hoursText);

  const ranked = []; const eliminated = [];
  for (const path of PATHS) {
    const interest = Object.entries(path.draw).reduce((s, [t, w]) => s + w * (share[t] || 0), 0) / maxShare;
    const gaps = []; let penalty = 0; const dims = Object.entries(path.demands);
    for (const [dim, need] of dims) {
      const have = hold[dim] ?? UNKNOWN;
      const gap = Math.max(0, need - have);
      penalty += gap;
      if (gap > 0) gaps.push({ dim, need, have, gap });
    }
    const holdFit = dims.length ? 1 - penalty / (3 * dims.length) : 1;
    const reasons = gaps.filter(g => g.gap >= KNOCKOUT_GAP).map(g => ({ kind: 'dim', ...g }));
    if (hours != null && hours < path.hours * 0.6) reasons.push({ kind: 'hours', need: path.hours, have: hours });
    const score = 0.55 * interest + 0.45 * holdFit;
    const row = { path, score, interest, holdFit, gaps, reasons };
    (reasons.length ? eliminated : ranked).push(row);
  }
  ranked.sort((a, b) => b.score - a.score);
  // The meaningful eliminations are the ones the person is drawn to.
  eliminated.sort((a, b) => b.interest - a.interest);
  return { top: ranked.slice(0, 3), eliminated: eliminated.slice(0, 3), all: ranked };
}

// Plain-language reason lines, with the person's own answer as evidence.
export function explainElimination(row, answers, lang = 'he') {
  return row.reasons.map(r => {
    if (r.kind === 'hours') {
      return lang === 'he'
        ? `צריך בערך ${r.need} שעות בשבוע כדי שיזוז, ויש לך כ־${r.have}.`
        : `It needs about ${r.need} hours a week to move; you have about ${r.have}.`;
    }
    const name = DIMENSIONS[r.dim][lang] ?? DIMENSIONS[r.dim].he;
    const ev = holdEvidence(answers, r.dim, lang)[0];
    return lang === 'he'
      ? `דורש הרבה ${name}${ev ? `, ועל השאלה "${ev.question}" ענית: "${ev.answer}"` : ''}.`
      : `It needs a lot of ${name.toLowerCase()}${ev ? `, and to "${ev.question}" you answered: "${ev.answer}"` : ''}.`;
  });
}

// Compact payload for the report prompt.
export function matchPayload(result, answers, lang = 'he') {
  const name = p => p[lang] ?? p.he;
  return {
    top: result.top.map(r => ({
      id: r.path.id, name: name(r.path), months: r.path.months, hours: r.path.hours,
      note: r.path.note?.[lang] ?? null,
      fit: Math.round(r.score * 100),
      weakSpots: r.gaps.map(g => DIMENSIONS[g.dim][lang]),
    })),
    eliminated: result.eliminated.map(r => ({
      id: r.path.id, name: name(r.path), reasons: explainElimination(r, answers, lang),
    })),
  };
}
