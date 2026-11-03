import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './BertrandParadox.css';
import './GameTheory.css';

type Move = 0 | 1 | 2; // rock, paper, scissors; m beats (m + 2) % 3

interface Round {
  you: Move;
  bot: Move;
  guess: Move;
  auto: boolean; // played by the uniform-random stand-in
}

const AUTO_ROUNDS = 50;
const ICONS = ['✊', '✋', '✌️'];

// +1 if a beats b, -1 if b beats a, 0 on a draw
const outcome = (a: Move, b: Move) => (a === b ? 0 : (a + 2) % 3 === b ? 1 : -1);
const randomMove = (): Move => Math.floor(Math.random() * 3) as Move;

const argmaxRandom = (counts: number[]): Move => {
  const best = Math.max(...counts);
  const ties = counts.flatMap((c, i) => (c === best ? [i] : []));
  return ties[Math.floor(Math.random() * ties.length)] as Move;
};

// Predicts the reader's next move from what followed the same (last move, last result) before,
// falling back to their overall frequencies; the bot then plays the counter
const predict = (rounds: Round[]): Move => {
  if (!rounds.length) return randomMove();
  const key = (r: Round) => `${r.you}${outcome(r.you, r.bot)}`;
  const ctx = key(rounds[rounds.length - 1]);
  const after = [0, 0, 0];
  const overall = [0, 0, 0];
  rounds.forEach((r, i) => {
    overall[r.you]++;
    if (i > 0 && key(rounds[i - 1]) === ctx) after[r.you]++;
  });
  return argmaxRandom(after.some(c => c > 0) ? after : overall);
};

const play = (rounds: Round[], you: Move, auto: boolean): Round[] => {
  const guess = predict(rounds);
  return [...rounds, { you, bot: ((guess + 1) % 3) as Move, guess, auto }];
};

const LABELS = {
  vi: {
    moves: ['Búa', 'Bao', 'Kéo'],
    waiting: 'Bot đã chọn xong. Đến lượt bạn.',
    result: (who: string) => ['Bot thắng.', 'Hòa.', `${who} thắng.`],
    line: (who: string, y: string, b: string) => `${who} ra ${y}, bot ra ${b}.`,
    guess: (who: string, g: string) => `Bot đã đoán ${who.toLowerCase()} sẽ ra ${g}.`,
    auto: `Để máy chơi ngẫu nhiên ${AUTO_ROUNDS} ván`,
    reset: 'Chơi lại',
    you: 'Bạn',
    random: 'Người chơi ngẫu nhiên',
    record: 'Thắng / Hòa / Thua',
    chart: 'Điểm của người chơi (thắng − thua) qua từng ván',
  },
  en: {
    moves: ['Rock', 'Paper', 'Scissors'],
    waiting: 'The bot has already chosen. Your turn.',
    result: (who: string) => ['Bot wins.', 'Draw.', who === 'You' ? 'You win.' : `${who} wins.`],
    line: (who: string, y: string, b: string) => `${who} played ${y.toLowerCase()}, the bot played ${b.toLowerCase()}.`,
    guess: (_who: string, g: string) => `The bot guessed ${g.toLowerCase()}.`,
    auto: `Let a random player take ${AUTO_ROUNDS} rounds`,
    reset: 'Reset',
    you: 'You',
    random: 'Random player',
    record: 'Win / Draw / Loss',
    chart: "Player's score (wins − losses) per round",
  },
};

const W = 300;
const H = 120;

const GameTheoryRps = () => {
  const { language } = useLanguage();
  const t = LABELS[language === 'en' ? 'en' : 'vi'];

  const [rounds, setRounds] = useState<Round[]>([]);

  const choose = (m: Move) => setRounds(r => play(r, m, false));
  const autoPlay = () =>
    setRounds(r => {
      let next = r;
      for (let i = 0; i < AUTO_ROUNDS; i++) next = play(next, randomMove(), true);
      return next;
    });

  const last = rounds[rounds.length - 1];
  const who = last?.auto ? t.random : t.you;
  const record = (auto: boolean) => {
    const res = rounds.filter(r => r.auto === auto).map(r => outcome(r.you, r.bot));
    return [1, 0, -1].map(v => res.filter(x => x === v).length);
  };

  // Running score, split into segments so human and random stretches get different colours
  let score = 0;
  const points = rounds.map(r => (score += outcome(r.you, r.bot)));
  const span = Math.max(5, ...points.map(Math.abs));
  const x = (i: number) => (rounds.length < 2 ? W / 2 : (i / (rounds.length - 1)) * W);
  const y = (v: number) => H / 2 - (v / span) * (H / 2 - 6);
  const segments: { auto: boolean; pts: string }[] = [];
  rounds.forEach((r, i) => {
    const pt = `${x(i).toFixed(1)},${y(points[i]).toFixed(1)}`;
    const seg = segments[segments.length - 1];
    if (seg && seg.auto === r.auto) seg.pts += ` ${pt}`;
    // Start each new segment at the previous point so the line stays continuous
    else segments.push({ auto: r.auto, pts: i ? `${x(i - 1).toFixed(1)},${y(points[i - 1]).toFixed(1)} ${pt}` : pt });
  });

  const [yw, yd, yl] = record(false);
  const [rw, rd, rl] = record(true);

  return (
    <div className="bp-container gt-stack gt-column">
      <div className="gt-rps-moves">
        {([0, 1, 2] as Move[]).map(m => (
          <button key={m} className="gt-rps-btn" onClick={() => choose(m)}>
            <span aria-hidden="true">{ICONS[m]}</span>
            {t.moves[m]}
          </button>
        ))}
      </div>

      <div className="gt-result" aria-live="polite">
        {last ? (
          <>
            <strong>
              {t.line(who, `${ICONS[last.you]} ${t.moves[last.you]}`, `${ICONS[last.bot]} ${t.moves[last.bot]}`)}{' '}
              {t.result(who)[outcome(last.you, last.bot) + 1]}
            </strong>
            <span>{t.guess(who, t.moves[last.guess])}</span>
          </>
        ) : (
          <span>{t.waiting}</span>
        )}
      </div>

      <div className="gt-rps-bottom">
        <svg className="gt-chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={t.chart}>
          <line x1="0" x2={W} y1={H / 2} y2={H / 2} className="gt-chart-zero" />
          {segments.map((s, i) => (
            <polyline key={i} points={s.pts} className={s.auto ? 'gt-line-auto' : 'gt-line-you'} />
          ))}
        </svg>

        <div className="bp-stats">
          <div className="bp-stat-row">
            <span className="gt-legend">{t.record}</span>
          </div>
          <div className="bp-stat-row">
            <span><i className="gt-swatch gt-swatch-you" />{t.you}</span>
            <span className="bp-val">{yw} / {yd} / {yl}</span>
          </div>
          <div className="bp-stat-row">
            <span><i className="gt-swatch gt-swatch-auto" />{t.random}</span>
            <span className="bp-val">{rw} / {rd} / {rl}</span>
          </div>
          <div className="bp-buttons">
            <button className="bp-btn" onClick={autoPlay}>{t.auto}</button>
            <button className="bp-btn bp-btn-ghost" onClick={() => setRounds([])} disabled={!rounds.length}>{t.reset}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameTheoryRps;
