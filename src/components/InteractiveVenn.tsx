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
          <circle cx="110" cy="100" r="70" className="iv-circle-a" />
          <circle cx="190" cy="100" r="70" className="iv-circle-b" />
          <text x="70" y="105" className="iv-text-large">A</text>
          <text x="230" y="105" className="iv-text-large">B</text>
          <text x="150" y="105" className="iv-text-small">{pAB.toFixed(2)}</text>
        </svg>
      </div>
    </div>
  );
};

export default InteractiveVenn;
