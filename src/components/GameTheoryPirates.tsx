import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './BertrandParadox.css';
import './GameTheory.css';

const GOLD = 100;
const SIZES = [2, 3, 4, 5, 6, 7, 8];
const NAMES = 'ABCDEFGH';

interface Stage {
  alloc: number[]; // index 0 is the proposer, then the remaining pirates by rank
  bought: number[]; // indices into alloc whose votes the proposer pays for
}

// Backward induction: with n pirates left, the proposer needs ceil(n/2) votes including their own,
// and buys the cheapest ones, paying 1 coin more than each pirate would get if the proposer drowned
const solve = (total: number): Stage[] => {
  const stages: Stage[] = [{ alloc: [GOLD], bought: [] }];
  for (let n = 2; n <= total; n++) {
    const prev = stages[n - 2].alloc;
    const need = Math.ceil(n / 2) - 1;
    const cheapest = prev
      .map((amount, i) => ({ amount, i: i + 1 }))
      .sort((a, b) => a.amount - b.amount || b.i - a.i)
      .slice(0, need);
    const alloc = Array(n).fill(0);
    cheapest.forEach(c => (alloc[c.i] = c.amount + 1));
    alloc[0] = GOLD - alloc.reduce((s, v) => s + v, 0);
    stages.push({ alloc, bought: cheapest.map(c => c.i).sort((a, b) => a - b) });
  }
  return stages;
};

const LABELS = {
  vi: {
    count: 'Số cướp biển',
    left: (n: number) => `Còn ${n}`,
    next: 'Bước tiếp',
    all: 'Hiện hết',
    reset: 'Làm lại',
    alone: (p: string) => `Chỉ còn ${p}. ${p} lấy cả ${GOLD} đồng.`,
    self: (p: string, n: number) => `Còn ${n} tên, ${p} đề xuất. Chỉ cần ${Math.ceil(n / 2)} phiếu, phiếu của ${p} là đủ, nên ${p} lấy hết.`,
    buy: (p: string, n: number, names: string, keep: number) =>
      `Còn ${n} tên, ${p} đề xuất và cần ${Math.ceil(n / 2)} phiếu. Ở hàng ngay trên, ${names} được ít nhất, nên mua phiếu của họ rẻ nhất: mỗi người hơn mức đó 1 đồng. ${p} giữ ${keep} đồng.`,
    legend: 'Viền đậm: người đề xuất. Viền cam: phiếu được mua.',
    and: 'và',
  },
  en: {
    count: 'Pirates',
    left: (n: number) => `${n} left`,
    next: 'Next step',
    all: 'Show all',
    reset: 'Restart',
    alone: (p: string) => `Only ${p} is left and keeps all ${GOLD} coins.`,
    self: (p: string, n: number) => `${n} left, ${p} proposes. ${Math.ceil(n / 2)} vote is enough, so ${p} keeps everything.`,
    buy: (p: string, n: number, names: string, keep: number) =>
      `${n} left, ${p} proposes and needs ${Math.ceil(n / 2)} votes. In the row above, ${names} get the least, so their votes are cheapest: one coin more than that each. ${p} keeps ${keep}.`,
    legend: 'Bold border: proposer. Orange border: bought vote.',
    and: 'and',
  },
};

// "C, E and G"
const joinNames = (list: string[], and: string) =>
  list.length < 2 ? list.join('') : `${list.slice(0, -1).join(', ')} ${and} ${list[list.length - 1]}`;

const GameTheoryPirates = () => {
  const { language } = useLanguage();
  const t = LABELS[language === 'en' ? 'en' : 'vi'];

  const [total, setTotal] = useState(5);
  const [step, setStep] = useState(1);
  const stages = solve(total);
  const names = NAMES.slice(0, total).split('');

  const pick = (n: number) => {
    setTotal(n);
    setStep(1);
  };

  // Stage n covers the last n pirates; the proposer is pirate total - n
  const current = stages[step - 1];
  const proposer = names[total - step];
  const explain =
    step === 1
      ? t.alone(proposer)
      : current.bought.length === 0
        ? t.self(proposer, step)
        : t.buy(proposer, step, joinNames(current.bought.map(i => names[total - step + i]), t.and), current.alloc[0]);

  return (
    <div className="bp-container gt-stack gt-column">
      <div className="gt-pir-top">
        <span className="gt-legend">{t.count}</span>
        <div className="bp-tabs">
          {SIZES.map(n => (
            <button key={n} className={`bp-tab ${n === total ? 'bp-tab-active' : ''}`} onClick={() => pick(n)}>
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="gt-pirates" style={{ gridTemplateColumns: `auto repeat(${total}, minmax(0, 1fr))` }}>
        <div />
        {names.map(name => <div key={name} className="gt-head">{name}</div>)}
        {stages.slice(0, step).flatMap((stage, s) => {
          const n = s + 1;
          return [
            <div key={`l${n}`} className={`gt-head gt-head-row ${n === step ? 'gt-head-hit' : ''}`}>{t.left(n)}</div>,
            ...names.map((name, p) => {
              const i = p - (total - n);
              if (i < 0) return <div key={name + n} className="gt-pir gt-pir-out">–</div>;
              const cls = i === 0 ? 'gt-pir-prop' : stage.bought.includes(i) ? 'gt-pir-bought' : '';
              return <div key={name + n} className={`gt-pir ${cls}`}>{stage.alloc[i]}</div>;
            }),
          ];
        })}
      </div>

      <div className="gt-result" aria-live="polite">
        <span>{explain}</span>
        <span className="gt-legend">{t.legend}</span>
      </div>

      <div className="bp-buttons">
        <button className="bp-btn" onClick={() => setStep(s => s + 1)} disabled={step === total}>{t.next}</button>
        <button className="bp-btn bp-btn-ghost" onClick={() => setStep(total)} disabled={step === total}>{t.all}</button>
        <button className="bp-btn bp-btn-ghost" onClick={() => setStep(1)} disabled={step === 1}>{t.reset}</button>
      </div>
    </div>
  );
};

export default GameTheoryPirates;
