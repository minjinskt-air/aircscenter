import { useRef } from 'react';
import styles from './InputBar.module.css';

export default function InputBar({ onSend }) {
  const inputRef = useRef(null);

  function handleSend() {
    const val = inputRef.current?.value.trim();
    if (!val) return;
    onSend(val);
    inputRef.current.value = '';
  }

  return (
    <div className={styles.inputBar}>
      <div className={styles.inputWrap}>
        <input
          ref={inputRef}
          className={styles.chatInput}
          type="text"
          placeholder="메시지 입력..."
          autoComplete="off"
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
        />
        <button className={styles.micBtn} aria-label="음성 입력">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        </button>
      </div>
      <button className={styles.sendBtn} onClick={handleSend} aria-label="전송">
        <svg viewBox="0 0 24 24" fill="white" width="19" height="19">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
        </svg>
      </button>
    </div>
  );
}
