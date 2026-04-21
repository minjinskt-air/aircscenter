import styles from './VoiceIndicator.module.css';

const bars = [
  { h: 10, d: '0.9s', delay: '0s' },
  { h: 22, d: '0.8s', delay: '0.1s' },
  { h: 30, d: '1.0s', delay: '0.05s' },
  { h: 18, d: '0.75s', delay: '0.15s' },
  { h: 26, d: '0.95s', delay: '0.2s' },
  { h: 14, d: '0.85s', delay: '0.08s' },
  { h: 20, d: '1.05s', delay: '0.25s' },
];

export default function VoiceIndicator({ active }) {
  return (
    <div className={`${styles.voiceIndicator} ${active ? styles.active : ''}`}>
      {bars.map((b, i) => (
        <div
          key={i}
          className={styles.vbar}
          style={{ height: b.h, '--d': b.d, '--delay': b.delay }}
        />
      ))}
    </div>
  );
}
