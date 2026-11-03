import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './BertrandParadox.css';
import './GameTheory.css';

type Move = 0 | 1; // 0 = stay silent, 1 = confess

// Years in prison for the row player, indexed [you][hung]
const YEARS = [
  [1, 10],
  [0, 5],
];

interface Round {
  you: Move;
  hung: Move;
}

// Hùng picks uniformly at random, so no strategy can read him; confessing still wins every time
const draw = (): Move => (Math.random() < 0.5 ? 0 : 1);

const LABELS = {
  vi: {
    moves: ['Im lặng', 'Khai'],
    you: 'Bạn',
    hung: 'Hùng',
    caption: 'Số năm tù (Bạn, Hùng)',
    waiting: 'Hùng đã chọn xong. Đến lượt bạn.',
    result: (h: string, y: number) => `Hùng chọn ${h.toLowerCase()}. Bạn ngồi tù ${y} năm.`,
    other: (m: string, y: number) => `Nếu bạn chọn ${m.toLowerCase()}: ${y} năm.`,
    rounds: 'Số ván',
    total: 'Số năm tù của bạn',
    always: (m: string) => `Nếu ván nào cũng ${m.toLowerCase()}`,
    reset: 'Chơi lại',
  },
  en: {
    moves: ['Stay silent', 'Confess'],
    you: 'You',
    hung: 'Hùng',
    caption: 'Years in prison (You, Hùng)',
    waiting: 'Hùng has already chosen. Your turn.',
    result: (h: string, y: number) => `Hùng chose ${h.toLowerCase()}. You get ${y} year${y === 1 ? '' : 's'}.`,
    other: (m: string, y: number) => `Had you chosen ${m.toLowerCase()}: ${y} year${y === 1 ? '' : 's'}.`,
    rounds: 'Rounds',
    total: 'Your years in prison',
    always: (m: string) => `If you always ${m.toLowerCase()}`,
    reset: 'Reset',
  },
};

const GameTheoryPrisoner = () => {
  const { language } = useLanguage();
  const t = LABELS[language === 'en' ? 'en' : 'vi'];

  // Hùng's next move is drawn before the reader picks, so it lives next to the history
  const [game, setGame] = useState(() => ({ rounds: [] as Round[], hungNext: draw() }));
  const { rounds } = game;

  const play = (you: Move) => {
    setGame(g => ({ rounds: [...g.rounds, { you, hung: g.hungNext }], hungNext: draw() }));
  };

  const reset = () => {
    setGame({ rounds: [], hungNext: draw() });
  };

  const last = rounds[rounds.length - 1];
  const total = rounds.reduce((s, r) => s + YEARS[r.you][r.hung], 0);
  const ifAlways = (m: Move) => rounds.reduce((s, r) => s + YEARS[m][r.hung], 0);

  const cell = (you: Move, hung: Move) => {
    const hit = last && last.you === you && last.hung === hung;
    return (
      <div key={`${you}${hung}`} className={`gt-cell ${hit ? 'gt-cell-hit' : ''}`}>
        ({YEARS[you][hung]}, {YEARS[hung][you]})
      </div>
    );
  };

  return (
    <div className="bp-container gt-stack">
      <div className="gt-matrix" aria-label={t.caption}>
        <div className="gt-corner">{t.caption}</div>
        {([0, 1] as Move[]).map(h => (
          <div key={h} className={`gt-head ${last?.hung === h ? 'gt-head-hit' : ''}`}>{t.hung}: {t.moves[h]}</div>
        ))}
        {([0, 1] as Move[]).map(y => [
          <div key={`h${y}`} className={`gt-head gt-head-row ${last?.you === y ? 'gt-head-hit' : ''}`}>{t.you}: {t.moves[y]}</div>,
          cell(y, 0),
          cell(y, 1),
        ])}
      </div>

      <div className="gt-controls">
        <div className="bp-buttons">
          {([0, 1] as Move[]).map(m => (
            <button key={m} className="bp-btn" onClick={() => play(m)}>{t.moves[m]}</button>
          ))}
          <button className="bp-btn bp-btn-ghost" onClick={reset} disabled={!rounds.length}>{t.reset}</button>
        </div>

        <div className="gt-result" aria-live="polite">
          {last ? (
            <>
              <strong>{t.result(t.moves[last.hung], YEARS[last.you][last.hung])}</strong>
              <span className={YEARS[1 - last.you][last.hung] < YEARS[last.you][last.hung] ? 'gt-worse' : 'gt-better'}>
                {t.other(t.moves[1 - last.you], YEARS[1 - last.you][last.hung])}
              </span>
            </>
          ) : (
            <span>{t.waiting}</span>
          )}
        </div>

        <div className="bp-stats">
          <div className="bp-stat-row">
            <span>{t.rounds}</span>
            <span className="bp-val">{rounds.length}</span>
          </div>
          <div className="bp-stat-row">
            <span>{t.total}</span>
            <span className="bp-val bp-accent">{total}</span>
          </div>
          <div className="bp-stat-row">
            <span>{t.always(t.moves[1])}</span>
            <span className="bp-val">{ifAlways(1)}</span>
          </div>
          <div className="bp-stat-row">
            <span>{t.always(t.moves[0])}</span>
            <span className="bp-val">{ifAlways(0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameTheoryPrisoner;
