import { useMemo, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './BertrandParadox.css';
import './GameTheory.css';

type Move = 0 | 1; // 0 = cooperate, 1 = defect

// Axelrod's scores: PAYOFF[mine][theirs]
const PAYOFF = [
  [3, 0],
  [5, 1],
];
const ROUNDS = 200;
// Averaging a few tournaments keeps the random strategies and noise from reshuffling the ranking every run
const REPEATS = 5;
const NOISES = [0, 0.01, 0.05, 0.1];
const GENERATIONS = 100;

interface Strategy {
  id: string;
  name: { vi: string; en: string };
  desc: { vi: string; en: string };
  move: (mine: Move[], theirs: Move[]) => Move;
}

const last = (h: Move[]) => h[h.length - 1];
const chance = (p: number) => Math.random() < p;

const STRATEGIES: Strategy[] = [
  {
    id: 'tft',
    name: { vi: 'Ăn miếng trả miếng', en: 'Tit for Tat' },
    desc: { vi: 'Hợp tác ván đầu, sau đó làm đúng điều đối thủ vừa làm.', en: 'Cooperates first, then copies the opponent’s last move.' },
    move: (_m, t) => (t.length ? last(t) : 0),
  },
  {
    id: 'gtft',
    name: { vi: 'Ăn miếng trả miếng rộng lượng', en: 'Generous Tit for Tat' },
    desc: { vi: 'Như Ăn miếng trả miếng, nhưng khi bị phản bội vẫn có 10% khả năng bỏ qua và hợp tác.', en: 'Like Tit for Tat, but forgives a defection 10% of the time.' },
    move: (_m, t) => (t.length && last(t) === 1 && !chance(0.1) ? 1 : 0),
  },
  {
    id: 'pavlov',
    name: { vi: 'Pavlov', en: 'Pavlov' },
    desc: { vi: 'Thắng thì giữ, thua thì đổi: lặp lại nước cũ nếu đối thủ vừa hợp tác, đổi nước nếu đối thủ vừa phản bội.', en: 'Win-stay, lose-shift: repeats its move if the opponent cooperated, switches if not.' },
    move: (m, t) => (!m.length ? 0 : last(t) === 0 ? last(m) : ((1 - last(m)) as Move)),
  },
  {
    id: 'grudger',
    name: { vi: 'Thù dai', en: 'Grudger' },
    desc: { vi: 'Hợp tác cho tới khi bị phản bội một lần, sau đó phản bội mãi mãi.', en: 'Cooperates until the opponent defects once, then defects forever.' },
    move: (_m, t) => (t.includes(1) ? 1 : 0),
  },
  {
    id: 'allc',
    name: { vi: 'Luôn hợp tác', en: 'Always cooperate' },
    desc: { vi: 'Hợp tác ở mọi ván, bất kể đối thủ làm gì.', en: 'Cooperates every round, whatever happens.' },
    move: () => 0,
  },
  {
    id: 'alld',
    name: { vi: 'Luôn phản bội', en: 'Always defect' },
    desc: { vi: 'Phản bội ở mọi ván. Đây là chiến lược trội nếu chỉ chơi một ván.', en: 'Defects every round, the dominant move in a one-shot game.' },
    move: () => 1,
  },
  {
    id: 'random',
    name: { vi: 'Ngẫu nhiên', en: 'Random' },
    desc: { vi: 'Mỗi ván tung đồng xu, hợp tác hay phản bội đều 50%.', en: 'Flips a coin every round.' },
    move: () => (chance(0.5) ? 1 : 0),
  },
  {
    id: 'joss',
    name: { vi: 'Lén lút', en: 'Joss' },
    desc: { vi: 'Như Ăn miếng trả miếng, nhưng mỗi khi định hợp tác lại có 10% khả năng lén phản bội để kiếm thêm điểm.', en: 'Like Tit for Tat, but sneaks in a defection 10% of the time it would cooperate.' },
    move: (_m, t) => (t.length && last(t) === 1 ? 1 : chance(0.1) ? 1 : 0),
  },
];

// Plays one match and returns each side's average score per round; noise flips a move after it is chosen
const playMatch = (a: Strategy, b: Strategy, noise: number): [number, number] => {
  const ha: Move[] = [];
  const hb: Move[] = [];
  let sa = 0;
  let sb = 0;
  for (let r = 0; r < ROUNDS; r++) {
    let ma = a.move(ha, hb);
    let mb = b.move(hb, ha);
    if (chance(noise)) ma = (1 - ma) as Move;
    if (chance(noise)) mb = (1 - mb) as Move;
    ha.push(ma);
    hb.push(mb);
    sa += PAYOFF[ma][mb];
    sb += PAYOFF[mb][ma];
  }
  return [sa / ROUNDS, sb / ROUNDS];
};

// Round robin including a match against its own twin, as in Axelrod's tournaments.
// Returns m[i][j] = average points per round of player i against player j
const runTournament = (players: Strategy[], noise: number) => {
  const m = players.map(() => players.map(() => 0));
  for (let rep = 0; rep < REPEATS; rep++) {
    players.forEach((a, i) => {
      for (let j = i; j < players.length; j++) {
        const [sa, sb] = playMatch(a, players[j], noise);
        m[i][j] += sa / REPEATS;
        if (j !== i) m[j][i] += sb / REPEATS;
      }
    });
  }
  return m;
};

// Axelrod's ecological simulation: each generation, a strategy's share grows in proportion
// to its average score against the current population
const evolve = (m: number[][]) => {
  let shares = m.map(() => 1 / m.length);
  for (let g = 0; g < GENERATIONS; g++) {
    const fitness = m.map(row => row.reduce((sum, v, j) => sum + v * shares[j], 0));
    const mean = fitness.reduce((sum, f, i) => sum + f * shares[i], 0);
    shares = shares.map((p, i) => (p * fitness[i]) / mean);
  }
  return shares;
};

const LABELS = {
  vi: {
    players: 'Chiến lược tham gia',
    noise: 'Nhiễu',
    rerun: 'Chạy lại',
    modes: ['Đấu vòng tròn', `Tiến hóa ${GENERATIONS} thế hệ`],
    perRound: 'điểm trung bình mỗi ván',
    needTwo: 'Chọn ít nhất hai chiến lược.',
    hint: 'Bấm vào một dòng để xem chiến lược đó chơi thế nào.',
    footer: [
      `Mỗi trận ${ROUNDS} ván. Điểm là trung bình mỗi ván, tối đa 5, hợp tác trọn vẹn là 3.`,
      `Ban đầu mỗi chiến lược chiếm một phần bằng nhau. Mỗi thế hệ, chiến lược nào được điểm cao trước quần thể hiện tại thì đông lên. Con số là tỉ lệ trong quần thể sau ${GENERATIONS} thế hệ.`,
    ],
  },
  en: {
    players: 'Strategies',
    noise: 'Noise',
    rerun: 'Run again',
    modes: ['Round robin', `Evolution, ${GENERATIONS} generations`],
    perRound: 'average points per round',
    needTwo: 'Pick at least two strategies.',
    hint: 'Click a row to see how that strategy plays.',
    footer: [
      `${ROUNDS} rounds per match. Scores are points per round: 5 at most, 3 for full cooperation.`,
      `Every strategy starts with an equal share. Each generation, strategies that score well against the current population grow. Numbers are population shares after ${GENERATIONS} generations.`,
    ],
  },
};

const GameTheoryAxelrod = () => {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'vi';
  const t = LABELS[lang];

  const [active, setActive] = useState<string[]>(() => STRATEGIES.map(s => s.id));
  const [noise, setNoise] = useState(0);
  const [run, setRun] = useState(0);
  const [focus, setFocus] = useState<string | null>(null);
  const [mode, setMode] = useState(0);

  const results = useMemo(() => {
    void run; // only bumped to force a fresh tournament when the reader asks for one
    const players = STRATEGIES.filter(s => active.includes(s.id));
    if (players.length < 2) return null;
    const m = runTournament(players, noise);
    return { players, scores: m.map(row => row.reduce((a, b) => a + b, 0) / row.length), shares: evolve(m) };
  }, [active, noise, run]);

  // Bars are scaled to the best possible value: 5 points per round, or the whole population
  const ranking = results
    ? results.players
        .map((s, i) => (mode === 0 ? { s, value: results.scores[i], bar: results.scores[i] / 5 } : { s, value: results.shares[i], bar: results.shares[i] }))
        .sort((x, y) => y.value - x.value)
    : [];

  const toggle = (id: string) => setActive(a => (a.includes(id) ? a.filter(x => x !== id) : [...a, id]));
  const shown = STRATEGIES.find(s => s.id === focus) ?? ranking[0]?.s;

  return (
    <div className="bp-container gt-stack gt-column">
      <div className="gt-ax-controls">
        <span className="gt-legend">{t.players}</span>
        <div className="bp-tabs">
          {STRATEGIES.map(s => (
            <button
              key={s.id}
              className={`bp-tab ${active.includes(s.id) ? 'bp-tab-active' : ''}`}
              aria-pressed={active.includes(s.id)}
              onClick={() => toggle(s.id)}
            >
              {s.name[lang]}
            </button>
          ))}
        </div>
        <span className="gt-legend">{t.noise}</span>
        <div className="bp-tabs">
          {NOISES.map(n => (
            <button key={n} className={`bp-tab ${n === noise ? 'bp-tab-active' : ''}`} onClick={() => setNoise(n)}>
              {n * 100}%
            </button>
          ))}
          <button className="bp-btn bp-btn-ghost gt-ax-rerun" onClick={() => setRun(r => r + 1)}>{t.rerun}</button>
        </div>
        <div className="bp-tabs gt-ax-modes">
          {t.modes.map((label, i) => (
            <button key={i} className={`bp-tab ${i === mode ? 'bp-tab-active' : ''}`} onClick={() => setMode(i)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {ranking.length ? (
        <ol className="gt-ax-board" aria-label={t.perRound}>
          {ranking.map(({ s, value, bar }, i) => (
            <li key={s.id}>
              <button className={`gt-ax-row ${shown?.id === s.id ? 'gt-ax-row-focus' : ''}`} onClick={() => setFocus(s.id)}>
                <span className="gt-ax-rank">{i + 1}</span>
                <span className="gt-ax-name">{s.name[lang]}</span>
                <span className="gt-ax-bar">
                  <span style={{ width: `${bar * 100}%` }} />
                </span>
                <span className="bp-val">{mode === 0 ? value.toFixed(2) : `${(value * 100).toFixed(value < 0.001 ? 1 : 0)}%`}</span>
              </button>
            </li>
          ))}
        </ol>
      ) : (
        <p className="bp-hint">{t.needTwo}</p>
      )}

      <div className="gt-result" aria-live="polite">
        {shown && ranking.length > 0 && (
          <span>
            <strong>{shown.name[lang]}:</strong> {shown.desc[lang]}
          </span>
        )}
        <span className="gt-legend">
          {t.hint} {t.footer[mode]}
        </span>
      </div>
    </div>
  );
};

export default GameTheoryAxelrod;
