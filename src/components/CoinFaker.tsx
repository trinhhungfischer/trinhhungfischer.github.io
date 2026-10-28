import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './BertrandParadox.css';
import './ProbabilityIllusions.css';

const LENGTH = 50;

type Face = 'S' | 'N';
type Level = 'strong' | 'mild';

interface Flag {
  level: Level;
  text: string;
}

// Accepts S/N (Vietnamese), H/T, or 0/1; anything else is ignored
const parse = (raw: string): Face[] =>
  raw
    .toUpperCase()
    .split('')
    .flatMap((ch): Face[] => (ch === 'S' || ch === 'H' || ch === '0' ? ['S'] : ch === 'N' || ch === 'T' || ch === '1' ? ['N'] : []))
    .slice(0, LENGTH);

const randomFlips = () => Array.from({ length: LENGTH }, () => (Math.random() < 0.5 ? 'S' : 'N')).join('');

// Longest run of equal faces, as [start, length]
const longestRun = (flips: Face[]): [number, number] => {
  let best: [number, number] = [0, flips.length ? 1 : 0];
  let start = 0;
  for (let i = 1; i <= flips.length; i++) {
    if (i === flips.length || flips[i] !== flips[start]) {
      if (i - start > best[1]) best = [start, i - start];
      start = i;
    }
  }
  return best;
};

const countSwitches = (flips: Face[]) => flips.slice(1).filter((f, i) => f !== flips[i]).length;

const LABELS = {
  vi: {
    placeholder: 'Gõ 50 kết quả, ví dụ: SNNSNSSN… (S = sấp, N = ngửa)',
    entered: 'Đã nhập',
    real: `Tung thật ${LENGTH} lần`,
    clear: 'Xoá',
    heads: 'Số mặt S / N',
    run: 'Chuỗi dài nhất',
    switches: 'Số lần đổi mặt',
    expected: 'chuỗi thật thường',
    needMore: (k: number) => `Nhập thêm ${k} kết quả nữa để máy chấm.`,
    verdict: { real: 'Trông như tung thật', mild: 'Hơi đáng ngờ…', fake: 'Bạn tự viết đúng không?' },
    noFlags: 'Không có dấu hiệu bất thường nào. Chuỗi này có chuỗi dài và nhịp đổi mặt giống đồng xu thật.',
    flags: {
      runShort: (r: number) => `Chuỗi dài nhất chỉ có ${r}. Đồng xu thật tung ${LENGTH} lần có 98% khả năng ra chuỗi từ 4 trở lên.`,
      switchHigh: (s: number) => `Đổi mặt ${s}/49 lần, quá thường xuyên. Đồng xu thật chỉ có khoảng 1% khả năng đổi từ 33 lần trở lên.`,
      switchMildHigh: (s: number) => `Đổi mặt ${s}/49 lần, hơi nhiều so với mức trung bình 24,5.`,
      switchLow: (s: number) => `Đổi mặt chỉ ${s}/49 lần, quá ít. Các mặt đang dồn thành khối.`,
      switchMildLow: (s: number) => `Đổi mặt ${s}/49 lần, hơi ít so với mức trung bình 24,5.`,
      unbalanced: (h: number) => `Có ${h} mặt S trên ${LENGTH}, lệch quá xa mức 25.`,
    },
  },
  en: {
    placeholder: 'Type 50 results, e.g. HTTHTHHT… (H = heads, T = tails)',
    entered: 'Entered',
    real: `Flip ${LENGTH} for real`,
    clear: 'Clear',
    heads: 'Heads / Tails',
    run: 'Longest run',
    switches: 'Switches',
    expected: 'real coins usually',
    needMore: (k: number) => `Enter ${k} more results to get a verdict.`,
    verdict: { real: 'Looks like real flips', mild: 'A bit suspicious…', fake: 'You made this up, right?' },
    noFlags: 'Nothing unusual. The runs and the switching rhythm look like a real coin.',
    flags: {
      runShort: (r: number) => `Longest run is only ${r}. A real coin flipped ${LENGTH} times has a 98% chance of a run of 4 or more.`,
      switchHigh: (s: number) => `${s}/49 switches is too many. A real coin switches 33+ times only about 1% of the time.`,
      switchMildHigh: (s: number) => `${s}/49 switches is a bit high against the 24.5 average.`,
      switchLow: (s: number) => `Only ${s}/49 switches. The faces are clumped into blocks.`,
      switchMildLow: (s: number) => `${s}/49 switches is a bit low against the 24.5 average.`,
      unbalanced: (h: number) => `${h} heads out of ${LENGTH} is too far from 25.`,
    },
  },
};

const CoinFaker = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const t = LABELS[isEn ? 'en' : 'vi'];

  const [raw, setRaw] = useState('');
  const flips = parse(raw);
  const [runStart, runLength] = longestRun(flips);
  const switches = countSwitches(flips);
  const heads = flips.filter(f => f === 'S').length;
  const done = flips.length === LENGTH;

  // Thresholds are tail probabilities for a fair coin over 50 flips: a real sequence
  // gets a "strong" flag about 4% of the time and a "mild" one about 6%
  const flags: Flag[] = [];
  if (done) {
    if (runLength <= 3) flags.push({ level: 'strong', text: t.flags.runShort(runLength) });
    if (switches >= 33) flags.push({ level: 'strong', text: t.flags.switchHigh(switches) });
    else if (switches >= 31) flags.push({ level: 'mild', text: t.flags.switchMildHigh(switches) });
    else if (switches <= 16) flags.push({ level: 'strong', text: t.flags.switchLow(switches) });
    else if (switches <= 18) flags.push({ level: 'mild', text: t.flags.switchMildLow(switches) });
    if (heads <= 14 || heads >= 36) flags.push({ level: 'strong', text: t.flags.unbalanced(heads) });
  }
  const verdict = flags.some(f => f.level === 'strong') ? 'fake' : flags.length ? 'mild' : 'real';
  const face = (f: Face) => (isEn ? (f === 'S' ? 'H' : 'T') : f);

  return (
    <div className="bp-container pl-stack">
      <div className="pl-coin-top">
        <textarea
          className="pl-input"
          rows={2}
          placeholder={t.placeholder}
          value={raw}
          onChange={e => setRaw(e.target.value)}
          spellCheck={false}
        />
        <div className="bp-buttons">
          <button className="bp-btn" onClick={() => setRaw(isEn ? randomFlips().replace(/S/g, 'H').replace(/N/g, 'T') : randomFlips())}>{t.real}</button>
          <button className="bp-btn bp-btn-ghost" onClick={() => setRaw('')}>{t.clear}</button>
          <span className="bp-val pl-count">{t.entered}: {flips.length}/{LENGTH}</span>
        </div>
      </div>

      <div className="pl-strip">
        {Array.from({ length: LENGTH }, (_, i) => {
          const f = flips[i];
          const inRun = done && i >= runStart && i < runStart + runLength;
          return (
            <span key={i} className={`pl-flip ${f ? `pl-flip-${f}` : ''} ${inRun ? 'pl-flip-run' : ''}`}>
              {f ? face(f) : ''}
            </span>
          );
        })}
      </div>

      <div className="pl-coin-bottom">
        <div className="bp-stats pl-coin-stats">
          <div className="bp-stat-row">
            <span>{t.heads}</span>
            <span className="bp-val">{heads} / {flips.length - heads}</span>
          </div>
          <div className="bp-stat-row">
            <span>{t.run} <small className="pl-muted">({t.expected} 5–7)</small></span>
            <span className="bp-val">{runLength}</span>
          </div>
          <div className="bp-stat-row">
            <span>{t.switches} <small className="pl-muted">({t.expected} 20–29)</small></span>
            <span className="bp-val">{flips.length > 1 ? `${switches}/${flips.length - 1}` : '—'}</span>
          </div>
        </div>

        <div className={`pl-verdict ${done ? `pl-verdict-${verdict}` : ''}`}>
          {done ? (
            <>
              <strong>{t.verdict[verdict]}</strong>
              {flags.length === 0 ? (
                <p>{t.noFlags}</p>
              ) : (
                <ul>
                  {flags.map((f, i) => <li key={i}>{f.text}</li>)}
                </ul>
              )}
            </>
          ) : (
            <p>{t.needMore(LENGTH - flips.length)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinFaker;
