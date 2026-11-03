import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './BertrandParadox.css';
import './GameTheory.css';

const BOTS = 3;
const MAX = 100;
// Equilibrium shading for first price with n bidders and uniform values: bid = (n - 1) / n of the value
const SHADE = BOTS / (BOTS + 1);

type Mode = 0 | 1; // 0 = first price, 1 = second price

interface Draw {
  value: number;
  bots: number[]; // bots' private values
}

interface Round extends Draw {
  bid: number;
}

const draw = (): Draw => ({
  value: Math.floor(Math.random() * (MAX + 1)),
  bots: Array.from({ length: BOTS }, () => Math.floor(Math.random() * (MAX + 1))),
});

const botBids = (d: Draw, mode: Mode) => d.bots.map(v => (mode === 0 ? Math.round(v * SHADE) : v));

// Ties go to the bots, so the reader only wins by strictly outbidding them
const settle = (d: Draw, bid: number, mode: Mode) => {
  const others = botBids(d, mode);
  const top = Math.max(...others);
  const win = bid > top;
  const price = win ? (mode === 0 ? bid : top) : 0;
  return { others, win, price, profit: win ? d.value - price : 0 };
};

const total = (rounds: Round[], mode: Mode, bidOf: (r: Round) => number) =>
  rounds.reduce((s, r) => s + settle(r, bidOf(r), mode).profit, 0);

const LABELS = {
  vi: {
    modes: ['Kín, giá thứ nhất', 'Kín, giá thứ hai'],
    rule: [
      'Giá cao nhất thắng và trả đúng giá mình đặt. Bot đặt 3/4 giá trị của chúng.',
      'Giá cao nhất thắng nhưng chỉ trả giá cao thứ hai. Bot đặt đúng giá trị của chúng.',
    ],
    value: 'Món đồ đáng giá với bạn',
    bid: 'Giá bạn đặt',
    place: 'Đặt giá',
    last: 'Ván vừa rồi',
    you: 'Bạn',
    bot: (i: number) => `Bot ${i}`,
    worth: (v: number) => `giá trị ${v}`,
    won: (p: number, g: number) => `Bạn thắng, trả ${p}, lãi ${g}.`,
    lost: (p: number) => `Bạn thua. Người thắng trả ${p}.`,
    rounds: 'Số ván',
    profit: 'Tổng lãi của bạn',
    truthful: 'Nếu luôn đặt đúng giá trị',
    shaded: 'Nếu luôn đặt 3/4 giá trị',
    reset: 'Chơi lại luật này',
  },
  en: {
    modes: ['Sealed, first price', 'Sealed, second price'],
    rule: [
      'Highest bid wins and pays its own bid. Bots bid 3/4 of their value.',
      'Highest bid wins but pays the second-highest bid. Bots bid their true value.',
    ],
    value: 'Your value for the item',
    bid: 'Your bid',
    place: 'Place bid',
    last: 'Last round',
    you: 'You',
    bot: (i: number) => `Bot ${i}`,
    worth: (v: number) => `value ${v}`,
    won: (p: number, g: number) => `You win, pay ${p}, profit ${g}.`,
    lost: (p: number) => `You lose. The winner pays ${p}.`,
    rounds: 'Rounds',
    profit: 'Your total profit',
    truthful: 'If you always bid your value',
    shaded: 'If you always bid 3/4 of your value',
    reset: 'Reset this format',
  },
};

const GameTheoryAuction = () => {
  const { language } = useLanguage();
  const t = LABELS[language === 'en' ? 'en' : 'vi'];

  const [mode, setMode] = useState<Mode>(0);
  // Each format keeps its own history and the next pre-drawn round
  const [books, setBooks] = useState(() => [0, 1].map(() => ({ rounds: [] as Round[], next: draw() })));
  const [bid, setBid] = useState(50);

  const { rounds, next: current } = books[mode];
  const last = rounds[rounds.length - 1];
  const lastResult = last && settle(last, last.bid, mode);

  const update = (fn: (b: { rounds: Round[]; next: Draw }) => { rounds: Round[]; next: Draw }) =>
    setBooks(all => all.map((b, i) => (i === mode ? fn(b) : b)));

  const place = () => update(b => ({ rounds: [...b.rounds, { ...b.next, bid }], next: draw() }));
  const reset = () => update(b => ({ ...b, rounds: [] }));

  return (
    <div className="bp-container gt-stack gt-column">
      <div className="bp-tabs">
        {t.modes.map((label, i) => (
          <button key={i} className={`bp-tab ${i === mode ? 'bp-tab-active' : ''}`} onClick={() => setMode(i as Mode)}>
            {label}
          </button>
        ))}
      </div>
      <p className="bp-hint">{t.rule[mode]}</p>

      <div className="gt-au-bid">
        <div className="bp-stat-row">
          <span>{t.value}</span>
          <span className="bp-val bp-accent gt-au-value">{current.value}</span>
        </div>
        <label className="gt-au-slider">
          <span>{t.bid}: <strong className="bp-val">{bid}</strong></span>
          <input type="range" min={0} max={MAX} value={bid} onChange={e => setBid(Number(e.target.value))} />
        </label>
        <div className="bp-buttons">
          <button className="bp-btn" onClick={place}>{t.place}</button>
        </div>
      </div>

      {last && lastResult && (
        <div className="gt-au-last" aria-live="polite">
          <span className="gt-legend">{t.last}</span>
          <ul>
            <li className={lastResult.win ? 'gt-au-winner' : ''}>
              <span>{t.you} <small>({t.worth(last.value)})</small></span>
              <span className="bp-val">{last.bid}</span>
            </li>
            {lastResult.others.map((b, i) => {
              const winner = !lastResult.win && b === Math.max(...lastResult.others) && lastResult.others.indexOf(b) === i;
              return (
                <li key={i} className={winner ? 'gt-au-winner' : ''}>
                  <span>{t.bot(i + 1)} <small>({t.worth(last.bots[i])})</small></span>
                  <span className="bp-val">{b}</span>
                </li>
              );
            })}
          </ul>
          <strong className={lastResult.win ? (lastResult.profit >= 0 ? 'gt-better' : 'gt-worse') : ''}>
            {lastResult.win
              ? t.won(lastResult.price, lastResult.profit)
              : t.lost(mode === 0 ? Math.max(...lastResult.others) : [...lastResult.others, last.bid].sort((a, b) => b - a)[1])}
          </strong>
        </div>
      )}

      <div className="bp-stats">
        <div className="bp-stat-row">
          <span>{t.rounds}</span>
          <span className="bp-val">{rounds.length}</span>
        </div>
        <div className="bp-stat-row">
          <span>{t.profit}</span>
          <span className="bp-val bp-accent">{total(rounds, mode, r => r.bid)}</span>
        </div>
        <div className="bp-stat-row">
          <span>{t.truthful}</span>
          <span className="bp-val">{total(rounds, mode, r => r.value)}</span>
        </div>
        <div className="bp-stat-row">
          <span>{t.shaded}</span>
          <span className="bp-val">{total(rounds, mode, r => Math.round(r.value * SHADE))}</span>
        </div>
      </div>

      <div className="bp-buttons">
        <button className="bp-btn bp-btn-ghost" onClick={reset} disabled={!rounds.length}>{t.reset}</button>
      </div>
    </div>
  );
};

export default GameTheoryAuction;
