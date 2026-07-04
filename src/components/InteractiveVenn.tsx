import { useState } from 'react';
import './InteractiveVenn.css';

const InteractiveVenn = () => {
  const [pA, setPA] = useState(0.48);
  const [pB, setPB] = useState(0.45);
  const [pAB, setPAB] = useState(0.20);

  const handlePAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setPA(val);
    if (pAB > val) setPAB(val);
  };

  const handlePBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setPB(val);
    if (pAB > val) setPAB(val);
  };

  const handlePABChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setPAB(val);
  };

  const pAUB = (pA + pB - pAB).toFixed(2);
  const maxPAB = Math.min(pA, pB);

  // --- DYNAMIC VENN CALCULATIONS ---
  // Max radius when probability is 1.0
  const BASE_R = 80; 
  // Area is proportional to probability => r = BASE_R * sqrt(P)
  const rA = BASE_R * Math.sqrt(pA);
  const rB = BASE_R * Math.sqrt(pB);

  // Distance between centers
  // When intersection is 0, they should be separated: distance = rA + rB + 10
  // When intersection is max (one fully inside another), they should be concentric: distance = 0
  const dMax = rA + rB + 10;
  const dMin = 0;
  
  let d = dMax;
  if (maxPAB > 0) {
    d = dMax - (dMax - dMin) * (pAB / maxPAB);
  }

  // Calculate center coordinates
  const centerX = 150;
  const cxA = centerX - d / 2;
  const cxB = centerX + d / 2;

  return (
    <div className="interactive-venn-container">
      <div className="iv-left">
        <div className="iv-formulas">
          <p className="iv-formula-main">
            P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
          </p>
          <p className="iv-formula-sub">
            P(A ∪ B) = {pA.toFixed(2)} + {pB.toFixed(2)} - {pAB.toFixed(2)} = <strong style={{ color: '#fff', fontStyle: 'normal' }}>{pAUB}</strong>
          </p>
        </div>

        <div className="iv-controls">
          <div className="iv-control-row">
            <label>P(A)</label>
            <span className="iv-val">{pA.toFixed(2)}</span>
            <input type="range" min="0" max="1" step="0.01" value={pA} onChange={handlePAChange} />
          </div>
          <div className="iv-control-row">
            <label>P(B)</label>
            <span className="iv-val">{pB.toFixed(2)}</span>
            <input type="range" min="0" max="1" step="0.01" value={pB} onChange={handlePBChange} />
          </div>
          <div className="iv-control-row">
            <label>P(A ∩ B)</label>
            <span className="iv-val">{pAB.toFixed(2)}</span>
            <input type="range" min="0" max={maxPAB} step="0.01" value={pAB} onChange={handlePABChange} />
          </div>
        </div>
      </div>

      <div className="iv-right">
        <svg viewBox="0 0 300 200" width="100%" height="100%">
          <circle cx={cxA} cy="100" r={rA} className="iv-circle-a" />
          <circle cx={cxB} cy="100" r={rB} className="iv-circle-b" />
          
          {/* Labels */}
          {pA > 0 && <text x={cxA - rA/2} y="105" className="iv-text-large">A</text>}
          {pB > 0 && <text x={cxB + rB/2} y="105" className="iv-text-large">B</text>}
          {pAB > 0 && <text x={centerX} y="105" className="iv-text-small">{pAB.toFixed(2)}</text>}
        </svg>
      </div>
    </div>
  );
};

export default InteractiveVenn;
