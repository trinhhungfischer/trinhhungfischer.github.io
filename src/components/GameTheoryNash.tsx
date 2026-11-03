import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './BertrandParadox.css';
import './GameTheory.css';

// payoffs[row][col] = [you, hung]; both players share the same two strategy names
type Matrix = [number, number][][];

interface Preset {
  name: { vi: string; en: string };
  moves: { vi: [string, string]; en: [string, string] };
  note: { vi: string; en: string };
  payoffs: Matrix;
}

const PRESETS: Preset[] = [
  {
    name: { vi: 'Song đề tù nhân', en: "Prisoner's dilemma" },
    moves: { vi: ['Im lặng', 'Khai'], en: ['Silent', 'Confess'] },
    note: { vi: 'Một cân bằng, và nó tệ hơn (Im lặng, Im lặng) với cả hai.', en: 'One equilibrium, and both players prefer (Silent, Silent) to it.' },
    payoffs: [[[-1, -1], [-10, 0]], [[0, -10], [-5, -5]]],
  },
  {
    name: { vi: 'Hẹn hò', en: 'Battle of the sexes' },
    moves: { vi: ['Bóng đá', 'Xem phim'], en: ['Football', 'Movie'] },
    note: { vi: 'Hai cân bằng, mỗi người thích một cái.', en: 'Two equilibria, and each player prefers a different one.' },
    payoffs: [[[2, 1], [0, 0]], [[0, 0], [1, 2]]],
  },
  {
    name: { vi: 'Săn hươu', en: 'Stag hunt' },
    moves: { vi: ['Hươu', 'Thỏ'], en: ['Stag', 'Hare'] },
    note: { vi: 'Hai cân bằng. Cả hai thích (Hươu, Hươu), nhưng (Thỏ, Thỏ) an toàn hơn.', en: 'Two equilibria. Both prefer (Stag, Stag), but (Hare, Hare) is safer.' },
    payoffs: [[[4, 4], [0, 3]], [[3, 0], [3, 3]]],
  },
  {
    name: { vi: 'Con gà', en: 'Chicken' },
    moves: { vi: ['Né', 'Lao thẳng'], en: ['Swerve', 'Straight'] },
    note: { vi: 'Hai cân bằng, ở cả hai đều có một người né.', en: 'Two equilibria, and in both exactly one player swerves.' },
    payoffs: [[[0, 0], [-1, 1]], [[1, -1], [-10, -10]]],
  },
  {
    name: { vi: 'Chẵn lẻ', en: 'Matching pennies' },
    moves: { vi: ['Sấp', 'Ngửa'], en: ['Heads', 'Tails'] },
    note: { vi: 'Ở ô nào cũng có một người muốn đổi ý. Hẹn gặp ở Tập 3.', en: 'Someone always wants to switch. See you in part 3.' },
    payoffs: [[[1, -1], [-1, 1]], [[-1, 1], [1, -1]]],
  },
];

const IDX = [0, 1];

const LABELS = {
  vi: {
    you: 'Bạn',
    hung: 'Hùng',
    caption: 'Payoff (Bạn, Hùng)',
    reset: 'Đặt lại số',
    found: 'Cân bằng Nash:',
    none: 'Không có cân bằng Nash thuần túy.',
    legend: 'Số gạch chân: phản ứng tốt nhất. Ô viền cam: cân bằng Nash. Bấm vào số để sửa.',
    youPayoff: 'payoff của Bạn',
    hungPayoff: 'payoff của Hùng',
  },
  en: {
    you: 'You',
    hung: 'Hùng',
    caption: 'Payoff (You, Hùng)',
    reset: 'Reset numbers',
    found: 'Nash equilibria:',
    none: 'No pure Nash equilibrium.',
    legend: 'Underlined: best response. Orange cell: Nash equilibrium. Click a number to edit it.',
    youPayoff: 'your payoff',
    hungPayoff: "Hùng's payoff",
  },
};

const clone = (m: Matrix): Matrix => m.map(row => row.map(cell => [cell[0], cell[1]] as [number, number]));

const GameTheoryNash = () => {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'vi';
  const t = LABELS[lang];

  const [presetIdx, setPresetIdx] = useState(0);
  const [payoffs, setPayoffs] = useState<Matrix>(() => clone(PRESETS[0].payoffs));
  const preset = PRESETS[presetIdx];
  const moves = preset.moves[lang];

  const choose = (i: number) => {
    setPresetIdx(i);
    setPayoffs(clone(PRESETS[i].payoffs));
  };

  const edit = (r: number, c: number, who: 0 | 1, raw: string) => {
    const v = Number(raw);
    if (raw === '' || raw === '-' || Number.isNaN(v)) return;
    setPayoffs(p => {
      const next = clone(p);
      next[r][c][who] = v;
      return next;
    });
  };

  // You best-respond within each column, Hùng within each row; ties underline both
  const youBest = (r: number, c: number) => payoffs[r][c][0] === Math.max(...IDX.map(i => payoffs[i][c][0]));
  const hungBest = (r: number, c: number) => payoffs[r][c][1] === Math.max(...IDX.map(j => payoffs[r][j][1]));
  const equilibria = IDX.flatMap(r => IDX.filter(c => youBest(r, c) && hungBest(r, c)).map(c => [r, c]));
  const edited = payoffs.some((row, r) => row.some((cell, c) => cell.some((v, w) => v !== preset.payoffs[r][c][w])));

  const input = (r: number, c: number, who: 0 | 1, best: boolean) => (
    <input
      key={`${presetIdx}-${r}${c}${who}-${payoffs[r][c][who]}`}
      className={`gt-num ${best ? 'gt-num-best' : ''}`}
      type="number"
      defaultValue={payoffs[r][c][who]}
      aria-label={`${t.you} ${moves[r]}, ${t.hung} ${moves[c]}: ${who === 0 ? t.youPayoff : t.hungPayoff}`}
      onBlur={e => edit(r, c, who, e.target.value)}
      onKeyDown={e => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
    />
  );

  return (
    <div className="bp-container gt-stack gt-column">
      <div className="bp-tabs">
        {PRESETS.map((p, i) => (
          <button key={i} className={`bp-tab ${i === presetIdx ? 'bp-tab-active' : ''}`} onClick={() => choose(i)}>
            {p.name[lang]}
          </button>
        ))}
      </div>

      <div className="gt-matrix gt-matrix-wide" aria-label={t.caption}>
        <div className="gt-corner">{t.caption}</div>
        {IDX.map(c => <div key={c} className="gt-head">{t.hung}: {moves[c]}</div>)}
        {IDX.map(r => [
          <div key={`h${r}`} className="gt-head gt-head-row">{t.you}: {moves[r]}</div>,
          ...IDX.map(c => {
            const ne = youBest(r, c) && hungBest(r, c);
            return (
              <div key={`${r}${c}`} className={`gt-cell gt-cell-edit ${ne ? 'gt-cell-hit' : ''}`}>
                ({input(r, c, 0, youBest(r, c))},&nbsp;{input(r, c, 1, hungBest(r, c))})
              </div>
            );
          }),
        ])}
      </div>

      <div className="gt-result" aria-live="polite">
        <strong>
          {equilibria.length
            ? `${t.found} ${equilibria.map(([r, c]) => `(${moves[r]}, ${moves[c]})`).join(', ')}`
            : t.none}
        </strong>
        {!edited && <span>{preset.note[lang]}</span>}
        <span className="gt-legend">{t.legend}</span>
      </div>

      {edited && (
        <div className="bp-buttons">
          <button className="bp-btn bp-btn-ghost" onClick={() => choose(presetIdx)}>{t.reset}</button>
        </div>
      )}
    </div>
  );
};

export default GameTheoryNash;
