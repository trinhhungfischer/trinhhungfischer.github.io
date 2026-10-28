import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './BertrandParadox.css';

type Method = 'endpoints' | 'radius' | 'midpoint' | 'straw';

interface Chord {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  long: boolean;
}

// Unit circle; a chord is "long" when it beats the inscribed triangle's side (√3)
const SIDE = Math.sqrt(3);
const MAX_DRAWN = 300;

const THEORY: Record<Method, number> = { endpoints: 1 / 3, radius: 1 / 2, midpoint: 1 / 4, straw: 1 / 2 };
const METHODS: Method[] = ['endpoints', 'radius', 'midpoint', 'straw'];

const LABELS = {
  vi: {
    endpoints: 'Hai đầu mút',
    radius: 'Bán kính',
    midpoint: 'Trung điểm',
    straw: 'Ném que rơm',
    hint: {
      endpoints: 'Chọn ngẫu nhiên 2 điểm trên đường tròn rồi nối lại.',
      radius: 'Chọn ngẫu nhiên 1 bán kính, chọn 1 điểm trên bán kính đó, kẻ dây vuông góc qua điểm.',
      midpoint: 'Chọn ngẫu nhiên 1 điểm trong hình tròn làm trung điểm của dây.',
      straw: 'Thả que từ xa xuống một vùng sàn rộng, chỉ giữ lại những que cắt qua hình tròn.',
    },
    throw1: 'Ném 1 dây',
    throw100: 'Ném 100 dây',
    reset: 'Làm lại',
    thrown: 'Số dây đã ném',
    longer: 'Dài hơn cạnh tam giác',
    theory: 'Lý thuyết',
  },
  en: {
    endpoints: 'Random endpoints',
    radius: 'Random radius',
    midpoint: 'Random midpoint',
    straw: 'Toss straws',
    hint: {
      endpoints: 'Pick 2 random points on the circle and join them.',
      radius: 'Pick a random radius, a random point on it, and draw the chord perpendicular through that point.',
      midpoint: 'Pick a random point inside the disk as the chord midpoint.',
      straw: 'Drop straws from afar onto a wide floor and keep only those that cross the circle.',
    },
    throw1: 'Throw 1 chord',
    throw100: 'Throw 100 chords',
    reset: 'Reset',
    thrown: 'Chords thrown',
    longer: 'Longer than triangle side',
    theory: 'Theory',
  },
};

// Chord through distance d from center, perpendicular to direction angle phi
const chordFromMidpoint = (d: number, phi: number): Chord => {
  const half = Math.sqrt(Math.max(0, 1 - d * d));
  const mx = d * Math.cos(phi);
  const my = d * Math.sin(phi);
  const tx = -Math.sin(phi);
  const ty = Math.cos(phi);
  return {
    x1: mx + tx * half,
    y1: my + ty * half,
    x2: mx - tx * half,
    y2: my - ty * half,
    long: 2 * half > SIDE,
  };
};

const randomChord = (method: Method): Chord => {
  if (method === 'endpoints') {
    const a = Math.random() * 2 * Math.PI;
    const b = Math.random() * 2 * Math.PI;
    return {
      x1: Math.cos(a),
      y1: Math.sin(a),
      x2: Math.cos(b),
      y2: Math.sin(b),
      long: 2 * Math.abs(Math.sin((a - b) / 2)) > SIDE,
    };
  }
  if (method === 'straw') {
    // A straw is a line through a uniform point of a floor much wider than the circle, with a uniform angle.
    // Its signed distance p to the circle center is what decides the chord.
    for (;;) {
      const x = 60 * Math.random() - 30;
      const y = 60 * Math.random() - 30;
      const theta = Math.random() * Math.PI;
      const p = x * Math.sin(theta) - y * Math.cos(theta);
      if (Math.abs(p) < 1) {
        const phi = p >= 0 ? theta - Math.PI / 2 : theta + Math.PI / 2;
        return chordFromMidpoint(Math.abs(p), phi);
      }
    }
  }
  if (method === 'radius') {
    return chordFromMidpoint(Math.random(), Math.random() * 2 * Math.PI);
  }
  // Uniform point in the disk by rejection sampling
  let x: number, y: number;
  do {
    x = 2 * Math.random() - 1;
    y = 2 * Math.random() - 1;
  } while (x * x + y * y > 1);
  return chordFromMidpoint(Math.sqrt(x * x + y * y), Math.atan2(y, x));
};

const R = 90; // drawing radius in SVG units
const C = 100; // drawing center

const BertrandChords = () => {
  const { language } = useLanguage();
  const t = LABELS[language === 'en' ? 'en' : 'vi'];

  const [method, setMethod] = useState<Method>('endpoints');
  const [chords, setChords] = useState<Chord[]>([]);
  const [total, setTotal] = useState(0);
  const [longCount, setLongCount] = useState(0);

  const throwChords = (n: number) => {
    const fresh = Array.from({ length: n }, () => randomChord(method));
    setChords(prev => [...prev, ...fresh].slice(-MAX_DRAWN));
    setTotal(prev => prev + n);
    setLongCount(prev => prev + fresh.filter(c => c.long).length);
  };

  const reset = () => {
    setChords([]);
    setTotal(0);
    setLongCount(0);
  };

  const switchMethod = (m: Method) => {
    setMethod(m);
    reset();
  };

  // Inscribed equilateral triangle, one vertex at the top
  const triangle = [0, 1, 2]
    .map(i => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / 3;
      return `${C + R * Math.cos(a)},${C + R * Math.sin(a)}`;
    })
    .join(' ');

  const ratio = total > 0 ? longCount / total : 0;

  return (
    <div className="bp-container">
      <div className="bp-left">
        <div className="bp-tabs">
          {METHODS.map(m => (
            <button
              key={m}
              className={`bp-tab ${method === m ? 'bp-tab-active' : ''}`}
              onClick={() => switchMethod(m)}
            >
              {t[m]}
            </button>
          ))}
        </div>

        <p className="bp-hint">{t.hint[method]}</p>

        <div className="bp-stats">
          <div className="bp-stat-row">
            <span>{t.thrown}</span>
            <span className="bp-val">{total}</span>
          </div>
          <div className="bp-stat-row">
            <span>{t.longer}</span>
            <span className="bp-val bp-accent">{total > 0 ? ratio.toFixed(3) : '—'}</span>
          </div>
          <div className="bp-stat-row">
            <span>{t.theory}</span>
            <span className="bp-val">{THEORY[method].toFixed(3)}</span>
          </div>
        </div>

        <div className="bp-buttons">
          <button className="bp-btn" onClick={() => throwChords(1)}>{t.throw1}</button>
          <button className="bp-btn" onClick={() => throwChords(100)}>{t.throw100}</button>
          <button className="bp-btn bp-btn-ghost" onClick={reset}>{t.reset}</button>
        </div>
      </div>

      <div className="bp-right">
        <svg viewBox="0 0 200 200" width="100%" height="100%">
          <circle cx={C} cy={C} r={R} className="bp-circle" />
          {method === 'midpoint' && <circle cx={C} cy={C} r={R / 2} className="bp-guide" />}
          <polygon points={triangle} className="bp-triangle" />
          {chords.map((c, i) => (
            <line
              key={i}
              x1={C + R * c.x1}
              y1={C + R * c.y1}
              x2={C + R * c.x2}
              y2={C + R * c.y2}
              className={c.long ? 'bp-chord-long' : 'bp-chord-short'}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default BertrandChords;
