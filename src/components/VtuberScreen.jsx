import { useEffect, useRef } from 'react';
import styles from './VtuberScreen.module.css';

// Aurora blobs
const auroras = [
  { w: 300, h: 300, top: -80, left: -60, color: 'rgba(160,180,255,0.45)', d: '9s', delay: '0s' },
  { w: 250, h: 250, top: 100, right: -80, color: 'rgba(100,140,255,0.35)', d: '7s', delay: '2s' },
  { w: 200, h: 200, bottom: 200, left: 20, color: 'rgba(180,160,255,0.3)', d: '11s', delay: '1s' },
];

const lightRays = [
  { left: '30%', height: '60%', d: '5s', delay: '0s' },
  { left: '55%', height: '45%', d: '6s', delay: '2s' },
  { left: '75%', height: '55%', d: '4.5s', delay: '1s' },
];

export default function VtuberScreen({ isTalking }) {
  const particlesRef = useRef(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    const colors = [
      'rgba(100,120,255,0.4)', 'rgba(0,110,255,0.3)',
      'rgba(140,100,255,0.3)', 'rgba(180,200,255,0.5)',
    ];
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 5 + 2;
      p.className = styles.particle;
      p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random() * 100}%;
        bottom:${Math.random() * 40}%;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        --d:${4 + Math.random() * 5}s;
        --delay:${Math.random() * 4}s;
      `;
      container.appendChild(p);
    }
    return () => { container.innerHTML = ''; };
  }, []);

  // lips path switches when talking
  const lipsD = isTalking
    ? 'M164 268 Q172 285 180 287 Q188 285 196 268'
    : 'M164 268 Q172 278 180 279 Q188 278 196 268';
  const mouthOpacity = isTalking ? '0.9' : '0';

  return (
    <div className={styles.vtuberBg}>
      {/* Aurora */}
      {auroras.map((a, i) => (
        <div
          key={i}
          className={styles.aurora}
          style={{
            width: a.w, height: a.h,
            top: a.top, left: a.left, right: a.right, bottom: a.bottom,
            background: `radial-gradient(circle, ${a.color}, transparent)`,
            '--d': a.d, '--delay': a.delay,
          }}
        />
      ))}

      {/* Particles */}
      <div className={styles.bgParticles} ref={particlesRef} />

      {/* Light rays */}
      {lightRays.map((r, i) => (
        <div
          key={i}
          className={styles.lightRay}
          style={{ left: r.left, top: 0, height: r.height, '--d': r.d, '--delay': r.delay }}
        />
      ))}

      {/* Character */}
      <div className={styles.vtuberCharacter}>
        <div className={styles.charGlow} />
        <svg
          viewBox="0 0 360 640"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: 360, height: 640, filter: 'drop-shadow(0 0 30px rgba(120,80,255,0.4))' }}
        >
          {/* 머리카락 뒷쪽 (롱헤어) */}
          <path d="M100 160 Q80 300 90 500 Q100 580 130 600 Q100 400 105 200Z" fill="#1a1a1a"/>
          <path d="M260 160 Q280 300 270 500 Q260 580 230 600 Q260 400 255 200Z" fill="#1a1a1a"/>
          <path d="M90 200 Q60 350 70 520 Q80 580 110 590 Q85 400 95 220Z" fill="#111"/>
          <path d="M270 200 Q300 350 290 520 Q280 580 250 590 Q275 400 265 220Z" fill="#111"/>

          {/* 몸통 / 의상 */}
          <path d="M110 380 Q100 420 95 500 Q100 520 180 525 Q260 520 265 500 Q260 420 250 380 Q230 360 180 358 Q130 360 110 380Z" fill="#2d1f5e"/>
          {/* 옷깃 */}
          <path d="M155 360 L180 420 L205 360 Q195 372 180 375 Q165 372 155 360Z" fill="#e8e0ff"/>
          {/* 소매 왼쪽 */}
          <path d="M110 380 Q70 400 60 440 Q65 460 80 455 Q90 430 115 410Z" fill="#2d1f5e"/>
          {/* 소매 오른쪽 */}
          <path d="M250 380 Q290 400 300 440 Q295 460 280 455 Q270 430 245 410Z" fill="#2d1f5e"/>
          {/* 손 왼쪽 */}
          <ellipse cx="75" cy="458" rx="14" ry="10" fill="#ffd6b8" transform="rotate(-20 75 458)"/>
          {/* 손 오른쪽 */}
          <ellipse cx="285" cy="458" rx="14" ry="10" fill="#ffd6b8" transform="rotate(20 285 458)"/>
          {/* 보라빛 장식 */}
          <path d="M130 375 Q145 368 160 370 Q150 382 135 380Z" fill="#6040cc"/>
          <path d="M200 370 Q215 368 230 375 Q225 380 205 382Z" fill="#6040cc"/>
          {/* air 배지 */}
          <rect x="155" y="430" width="50" height="22" rx="11" fill="#006EFF" opacity="0.9"/>
          <text x="162" y="445" fontFamily="sans-serif" fontSize="13" fontWeight="800" fill="white">air</text>

          {/* 목 */}
          <rect x="165" y="330" width="30" height="35" rx="10" fill="#ffd6b8"/>

          {/* 얼굴 */}
          <ellipse cx="180" cy="230" rx="75" ry="82" fill="#ffd6b8"/>
          <ellipse cx="107" cy="240" rx="12" ry="14" fill="#ffd6b8"/>
          <ellipse cx="253" cy="240" rx="12" ry="14" fill="#ffd6b8"/>
          <ellipse cx="107" cy="240" rx="7" ry="9" fill="#ffb8a0"/>
          <ellipse cx="253" cy="240" rx="7" ry="9" fill="#ffb8a0"/>

          {/* 고양이 귀 */}
          <path d="M130 165 Q120 130 140 115 Q155 140 148 165Z" fill="#1a1a1a"/>
          <path d="M230 165 Q240 130 220 115 Q205 140 212 165Z" fill="#1a1a1a"/>
          <path d="M132 162 Q126 138 140 122 Q151 144 146 162Z" fill="#ff8fa3" opacity="0.7"/>
          <path d="M228 162 Q234 138 220 122 Q209 144 214 162Z" fill="#ff8fa3" opacity="0.7"/>

          {/* 머리카락 앞쪽 */}
          <path d="M108 185 Q110 155 140 145 Q160 140 180 140 Q200 140 220 145 Q250 155 252 185 Q240 165 180 162 Q120 165 108 185Z" fill="#1a1a1a"/>
          <path d="M118 175 Q122 150 140 148 Q130 165 125 182Z" fill="#1a1a1a"/>
          <path d="M242 175 Q238 150 220 148 Q230 165 235 182Z" fill="#1a1a1a"/>
          <path d="M148 148 Q155 135 168 140 Q158 152 152 168Z" fill="#111"/>
          <path d="M212 148 Q205 135 192 140 Q202 152 208 168Z" fill="#111"/>
          <path d="M172 140 Q180 130 188 140 Q185 155 180 158 Q175 155 172 140Z" fill="#111"/>

          {/* 눈썹 */}
          <path d="M140 200 Q153 193 166 198" stroke="#2a1a1a" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M194 198 Q207 193 220 200" stroke="#2a1a1a" strokeWidth="3" fill="none" strokeLinecap="round"/>

          {/* 눈 */}
          <ellipse cx="153" cy="218" rx="18" ry="19" fill="white"/>
          <ellipse cx="207" cy="218" rx="18" ry="19" fill="white"/>
          <ellipse cx="153" cy="220" rx="12" ry="13" fill="#6040CC"/>
          <ellipse cx="207" cy="220" rx="12" ry="13" fill="#6040CC"/>
          <ellipse cx="153" cy="221" rx="7" ry="8" fill="#3a2080"/>
          <ellipse cx="207" cy="221" rx="7" ry="8" fill="#3a2080"/>
          <circle cx="158" cy="215" r="4" fill="white" opacity="0.9"/>
          <circle cx="212" cy="215" r="4" fill="white" opacity="0.9"/>
          <circle cx="148" cy="224" r="2" fill="white" opacity="0.5"/>
          <circle cx="202" cy="224" r="2" fill="white" opacity="0.5"/>
          {/* 속눈썹 */}
          <path d="M135 204 Q138 200 142 203" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
          <path d="M164 203 Q168 199 172 202" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
          <path d="M188 202 Q192 198 196 202" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
          <path d="M218 203 Q222 199 226 202" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>

          {/* 볼 홍조 */}
          <ellipse cx="135" cy="240" rx="16" ry="10" fill="#ffb3c6" opacity="0.45"/>
          <ellipse cx="225" cy="240" rx="16" ry="10" fill="#ffb3c6" opacity="0.45"/>

          {/* 코 */}
          <path d="M177 250 Q180 255 183 250" stroke="#e8a090" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

          {/* 입 */}
          <path d="M164 268 Q172 264 180 266 Q188 264 196 268" stroke="#e87a8a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d={lipsD} fill="#ff8fa3" opacity="0.8"/>
          <path
            d="M168 270 Q180 276 192 270 Q188 274 180 275 Q172 274 168 270Z"
            fill="#c0506a"
            opacity={mouthOpacity}
          />

          {/* 헤드폰/장식구 */}
          <path d="M118 180 Q118 140 180 136 Q242 140 242 180" stroke="#4030a0" strokeWidth="8" fill="none" strokeLinecap="round"/>
          <ellipse cx="116" cy="185" rx="16" ry="18" fill="#5040b0"/>
          <ellipse cx="116" cy="185" rx="9" ry="11" fill="#6a50d0"/>
          <ellipse cx="244" cy="185" rx="16" ry="18" fill="#5040b0"/>
          <ellipse cx="244" cy="185" rx="9" ry="11" fill="#6a50d0"/>
          <circle cx="111" cy="179" r="3" fill="white" opacity="0.4"/>
          <circle cx="239" cy="179" r="3" fill="white" opacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}
