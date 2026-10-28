import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './BertrandParadox.css';
import './ProbabilityIllusions.css';

type Dataset = 'powers' | 'fibonacci' | 'growth' | 'uniform' | 'custom';

const DATASETS: Dataset[] = ['powers', 'fibonacci', 'growth', 'uniform', 'custom'];
const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const BENFORD = DIGITS.map(d => Math.log10(1 + 1 / d));
const SIZE = 1000;

// Leading digit from log10 of the value, so huge numbers like 2^1000 never overflow
const digitFromLog = (lg: number) => Math.min(9, Math.floor(10 ** (lg - Math.floor(lg) + 1e-12)));

const firstDigit = (x: number) => (x > 0 && isFinite(x) ? digitFromLog(Math.log10(x)) : 0);

const generate = (dataset: Dataset): number[] => {
  if (dataset === 'powers') return Array.from({ length: SIZE }, (_, i) => digitFromLog((i + 1) * Math.LOG10E * Math.LN2));
  if (dataset === 'fibonacci') {
    // F(1000) is about 4e208, still inside double range; only the leading digit matters
    const fib = [1, 1];
    while (fib.length < SIZE) fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
    return fib.map(firstDigit);
  }
  if (dataset === 'growth') {
    // Towns that start between 100 and 1000 people and change by a random rate each year for 100 years
    return Array.from({ length: SIZE }, () => {
      let pop = 100 + Math.random() * 900;
      for (let year = 0; year < 100; year++) pop *= 0.8 + Math.random() * 0.45;
      return firstDigit(pop);
    });
  }
  return Array.from({ length: SIZE }, () => firstDigit(1 + Math.floor(Math.random() * 9999)));
};

const parseNumbers = (raw: string) =>
  (raw.match(/\d[\d.,]*/g) ?? [])
    .map(s => Number(s.replace(/[.,]/g, '')))
    .map(firstDigit)
    .filter(d => d > 0);

const LABELS = {
  vi: {
    powers: 'Lũy thừa của 2',
    fibonacci: 'Fibonacci',
    growth: 'Dân số thị trấn',
    uniform: 'Ngẫu nhiên đều',
    custom: 'Số của bạn',
    hint: {
      powers: `Chữ số đầu của 2¹, 2², …, 2^${SIZE}.`,
      fibonacci: `Chữ số đầu của ${SIZE} số Fibonacci đầu tiên.`,
      growth: `${SIZE} thị trấn khởi đầu từ 100 đến 1000 dân, mỗi năm tăng hoặc giảm một tỉ lệ ngẫu nhiên, sau 100 năm.`,
      uniform: `${SIZE} số chọn đều từ 1 đến 9999. Tập này KHÔNG theo Benford.`,
      custom: 'Dán vào bất kỳ dãy số nào: giá cổ phiếu, hoá đơn tiền điện, dân số các tỉnh, số vàng của người chơi…',
    },
    placeholder: 'Ví dụ: 1250 87 34000 412 9.8 ...',
    regenerate: 'Tạo lại',
    count: 'Số lượng',
    mad: 'Độ lệch trung bình (MAD)',
    conformity: ['Rất khớp Benford', 'Khớp chấp nhận được', 'Khớp yếu', 'Không theo Benford'],
    theory: 'Benford',
    data: 'Dữ liệu',
  },
  en: {
    powers: 'Powers of 2',
    fibonacci: 'Fibonacci',
    growth: 'Town populations',
    uniform: 'Uniform random',
    custom: 'Your numbers',
    hint: {
      powers: `Leading digits of 2¹, 2², …, 2^${SIZE}.`,
      fibonacci: `Leading digits of the first ${SIZE} Fibonacci numbers.`,
      growth: `${SIZE} towns starting with 100 to 1000 people, growing or shrinking by a random rate each year, after 100 years.`,
      uniform: `${SIZE} numbers drawn uniformly from 1 to 9999. This set does NOT follow Benford.`,
      custom: 'Paste any list of numbers: stock prices, utility bills, city populations, player gold…',
    },
    placeholder: 'e.g. 1250 87 34000 412 9.8 ...',
    regenerate: 'Regenerate',
    count: 'Count',
    mad: 'Mean absolute deviation (MAD)',
    conformity: ['Close conformity', 'Acceptable conformity', 'Marginal conformity', 'Nonconformity'],
    theory: 'Benford',
    data: 'Data',
  },
};

// Nigrini's first-digit MAD bands
const conformityLevel = (mad: number) => (mad < 0.006 ? 0 : mad < 0.012 ? 1 : mad < 0.015 ? 2 : 3);

const BAR_W = 26;
const CHART_H = 140;
const MAX_P = 0.35;

const BenfordLaw = () => {
  const { language } = useLanguage();
  const t = LABELS[language === 'en' ? 'en' : 'vi'];

  const [dataset, setDataset] = useState<Dataset>('powers');
  const [digits, setDigits] = useState(() => generate('powers'));
  const [raw, setRaw] = useState('');

  const switchDataset = (d: Dataset) => {
    setDataset(d);
    if (d !== 'custom') setDigits(generate(d));
  };

  const data = dataset === 'custom' ? parseNumbers(raw) : digits;
  const freq = DIGITS.map(d => (data.length ? data.filter(x => x === d).length / data.length : 0));
  const mad = data.length ? freq.reduce((s, f, i) => s + Math.abs(f - BENFORD[i]), 0) / 9 : 0;
  const y = (p: number) => CHART_H - (Math.min(p, MAX_P) / MAX_P) * CHART_H;

  const theoryLine = BENFORD.map((p, i) => `${20 + i * 32 + BAR_W / 2},${y(p) + 10}`).join(' ');

  return (
    <div className="bp-container">
      <div className="bp-left">
        <div className="bp-tabs">
          {DATASETS.map(d => (
            <button key={d} className={`bp-tab ${dataset === d ? 'bp-tab-active' : ''}`} onClick={() => switchDataset(d)}>
              {t[d]}
            </button>
          ))}
        </div>

        <p className="bp-hint">{t.hint[dataset]}</p>

        {dataset === 'custom' && (
          <textarea
            className="pl-input"
            rows={4}
            placeholder={t.placeholder}
            value={raw}
            onChange={e => setRaw(e.target.value)}
            spellCheck={false}
          />
        )}

        <div className="bp-stats">
          <div className="bp-stat-row">
            <span>{t.count}</span>
            <span className="bp-val">{data.length}</span>
          </div>
          <div className="bp-stat-row">
            <span>{t.mad}</span>
            <span className="bp-val bp-accent">{data.length ? mad.toFixed(4) : '—'}</span>
          </div>
          {data.length > 0 && (
            <div className="bp-stat-row">
              <span />
              <span className={`pl-badge pl-badge-${conformityLevel(mad)}`}>{t.conformity[conformityLevel(mad)]}</span>
            </div>
          )}
        </div>

        {(dataset === 'growth' || dataset === 'uniform') && (
          <div className="bp-buttons">
            <button className="bp-btn" onClick={() => setDigits(generate(dataset))}>{t.regenerate}</button>
          </div>
        )}
      </div>

      <div className="bp-right pl-column">
        <svg viewBox={`0 0 310 ${CHART_H + 34}`} width="100%">
          {DIGITS.map((d, i) => {
            const x = 20 + i * 32;
            return (
              <g key={d}>
                <rect x={x} y={y(freq[i]) + 10} width={BAR_W} height={CHART_H - y(freq[i])} rx={2} className="pl-bar" />
                <text x={x + BAR_W / 2} y={CHART_H + 26} className="pl-axis pl-center">{d}</text>
                {data.length > 0 && (
                  <text x={x + BAR_W / 2} y={y(freq[i]) + 6} className="pl-axis pl-center">{Math.round(freq[i] * 100)}</text>
                )}
              </g>
            );
          })}
          <polyline points={theoryLine} className="pl-theory-line" />
          {BENFORD.map((p, i) => (
            <circle key={i} cx={20 + i * 32 + BAR_W / 2} cy={y(p) + 10} r={3} className="pl-theory-dot" />
          ))}
        </svg>
        <div className="pl-legend">
          <span><i className="pl-key pl-key-bar" /> {t.data} (%)</span>
          <span><i className="pl-key pl-key-line" /> {t.theory}</span>
        </div>
      </div>
    </div>
  );
};

export default BenfordLaw;
