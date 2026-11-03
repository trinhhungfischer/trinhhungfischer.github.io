import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './BertrandParadox.css';
import './GameTheory.css';

const STARTS = [0.05, 0.25, 0.5, 0.75, 0.95];
const STEPS = 200;
const W = 300;
const H = 150;
const PAD = 6;

// Replicator dynamics: the hawk share grows when hawks out-earn doves against the current mix
const simulate = (start: number, v: number, c: number) => {
  // Step size shrinks with the payoff scale so large V or C cannot overshoot past 0 or 1
  const dt = 0.5 / Math.max(v, c, 1);
  const path = [start];
  let x = start;
  for (let i = 0; i < STEPS; i++) {
    const hawk = x * ((v - c) / 2) + (1 - x) * v;
    const dove = (1 - x) * (v / 2);
    x = Math.min(1, Math.max(0, x + dt * x * (1 - x) * (hawk - dove)));
    path.push(x);
  }
  return path;
};

const LABELS = {
  vi: {
    v: 'Giá trị nguồn lợi V',
    c: 'Cái giá khi bị thương C',
    axisY: 'Tỉ lệ diều hâu',
    axisX: 'Thế hệ',
    mixed: (pct: number) => `Cân bằng: V/C = ${pct}% diều hâu, ${100 - pct}% bồ câu.`,
    pure: 'Khi C ≤ V, đánh nhau vẫn đáng: diều hâu chiếm toàn bộ quần thể.',
    chart: 'Tỉ lệ diều hâu theo thời gian của năm quần thể có điểm xuất phát khác nhau',
  },
  en: {
    v: 'Resource value V',
    c: 'Cost of injury C',
    axisY: 'Hawk share',
    axisX: 'Generations',
    mixed: (pct: number) => `Equilibrium: V/C = ${pct}% hawks, ${100 - pct}% doves.`,
    pure: 'When C ≤ V, fighting is worth it: hawks take over the whole population.',
    chart: 'Hawk share over time for five populations with different starting points',
  },
};

const GameTheoryHawkDove = () => {
  const { language } = useLanguage();
  const t = LABELS[language === 'en' ? 'en' : 'vi'];

  const [v, setV] = useState(4);
  const [c, setC] = useState(10);
  const target = c > v ? v / c : 1;

  const x = (i: number) => (i / STEPS) * W;
  const y = (share: number) => PAD + (1 - share) * (H - 2 * PAD);

  return (
    <div className="bp-container gt-stack gt-column">
      <div className="gt-hd-sliders">
        <label className="gt-au-slider">
          <span>{t.v}: <strong className="bp-val">{v}</strong></span>
          <input type="range" min={1} max={10} value={v} onChange={e => setV(Number(e.target.value))} />
        </label>
        <label className="gt-au-slider">
          <span>{t.c}: <strong className="bp-val">{c}</strong></span>
          <input type="range" min={0} max={20} value={c} onChange={e => setC(Number(e.target.value))} />
        </label>
      </div>

      <div className="gt-hd-chart">
        <span className="gt-legend gt-hd-axis-y">{t.axisY}</span>
        <svg className="gt-chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={t.chart}>
          {[0, 0.5, 1].map(g => (
            <g key={g}>
              <line x1={0} x2={W} y1={y(g)} y2={y(g)} className="gt-hd-grid" />
              <text x={4} y={y(g) + (g === 1 ? 9 : -3)} className="gt-hd-tick">{g * 100}%</text>
            </g>
          ))}
          <line x1={0} x2={W} y1={y(target)} y2={y(target)} className="gt-chart-zero gt-hd-target" />
          {STARTS.map(s => (
            <polyline
              key={s}
              className="gt-line-you"
              points={simulate(s, v, c).map((share, i) => `${x(i).toFixed(1)},${y(share).toFixed(1)}`).join(' ')}
            />
          ))}
        </svg>
        <span className="gt-legend gt-hd-axis-x">{t.axisX} →</span>
      </div>

      <div className="gt-result" aria-live="polite">
        <strong>{c > v ? t.mixed(Math.round(target * 100)) : t.pure}</strong>
      </div>
    </div>
  );
};

export default GameTheoryHawkDove;
