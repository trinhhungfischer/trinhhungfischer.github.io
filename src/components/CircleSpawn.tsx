import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './BertrandParadox.css';

const COUNT = 800;
const R = 80;
const C = 100;

interface Point {
  x: number;
  y: number;
  inner: boolean;
}

// sqrtRadius = true spreads points evenly by area; false clusters them near the center
const spawn = (sqrtRadius: boolean): Point[] =>
  Array.from({ length: COUNT }, () => {
    const u = Math.random();
    const r = sqrtRadius ? Math.sqrt(u) : u;
    const a = Math.random() * 2 * Math.PI;
    return { x: C + R * r * Math.cos(a), y: C + R * r * Math.sin(a), inner: r < 0.5 };
  });

const LABELS = {
  vi: { naive: 'r = R · random()', fixed: 'r = R · √random()', inner: 'Trong vòng R/2', respawn: 'Spawn lại' },
  en: { naive: 'r = R · random()', fixed: 'r = R · √random()', inner: 'Inside R/2', respawn: 'Respawn' },
};

const SpawnPanel = ({ title, points, innerLabel }: { title: string; points: Point[]; innerLabel: string }) => {
  const inner = points.filter(p => p.inner).length;
  return (
    <div className="cs-panel">
      <code className="cs-title">{title}</code>
      <svg viewBox="0 0 200 200" width="100%">
        <circle cx={C} cy={C} r={R} className="bp-circle" />
        <circle cx={C} cy={C} r={R / 2} className="bp-guide" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={1.4} className={p.inner ? 'cs-dot-inner' : 'cs-dot'} />
        ))}
      </svg>
      <p className="cs-stat">
        {innerLabel}: <span className="bp-accent">{((inner / points.length) * 100).toFixed(1)}%</span>
      </p>
    </div>
  );
};

const CircleSpawn = () => {
  const { language } = useLanguage();
  const t = LABELS[language === 'en' ? 'en' : 'vi'];
  const [naive, setNaive] = useState(() => spawn(false));
  const [fixed, setFixed] = useState(() => spawn(true));

  const respawn = () => {
    setNaive(spawn(false));
    setFixed(spawn(true));
  };

  return (
    <div className="cs-container">
      <div className="cs-panels">
        <SpawnPanel title={t.naive} points={naive} innerLabel={t.inner} />
        <SpawnPanel title={t.fixed} points={fixed} innerLabel={t.inner} />
      </div>
      <button className="bp-btn" onClick={respawn}>{t.respawn}</button>
    </div>
  );
};

export default CircleSpawn;
