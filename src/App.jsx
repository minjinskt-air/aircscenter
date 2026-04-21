import { useState, useCallback, useRef, useEffect } from 'react';
import VtuberScreen from './components/VtuberScreen';
import AgentNameCard from './components/AgentNameCard';
import VoiceIndicator from './components/VoiceIndicator';
import ChatOverlay from './components/ChatOverlay';
import { useCallTimer } from './hooks/useCallTimer';
import { agentConfig } from './config/agentConfig';
import styles from './App.module.css';

function useStatusTime() {
  const [time, setTime] = useState(() => {
    const d = new Date();
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  });
  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date();
      setTime(`${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`);
    }, 60000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const EMOJIS = ['✨', '😊', '💙', '🎵', '⭐'];

export default function App() {
  const [isTalking, setIsTalking] = useState(false);
  const [emojis, setEmojis] = useState([]);
  const emojiIdRef = useRef(0);
  const callTimer = useCallTimer();
  const statusTime = useStatusTime();

  const handleEmojiSpawn = useCallback(() => {
    const id = emojiIdRef.current++;
    const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    const left = 80 + Math.random() * 200;
    setEmojis(prev => [...prev, { id, emoji, left }]);
    setTimeout(() => setEmojis(prev => prev.filter(e => e.id !== id)), 2100);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.phone}>

        {/* 버튜버 배경 + 캐릭터 */}
        <VtuberScreen isTalking={isTalking} />

        {/* 음성 표시 */}
        <VoiceIndicator active={isTalking} />

        {/* 이모지 팝 */}
        {emojis.map(e => (
          <div
            key={e.id}
            className={styles.emojiPop}
            style={{ left: e.left, bottom: 320 }}
          >
            {e.emoji}
          </div>
        ))}

        {/* STATUS BAR */}
        <div className={styles.statusBar}>
          <span className={styles.statusTime}>{statusTime}</span>
          <div className={styles.statusIcons}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="#1A1D27">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
            </svg>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="#1A1D27">
              <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
            </svg>
          </div>
        </div>

        {/* TOP NAV */}
        <div className={styles.topNav}>
          <button className={styles.navBack} aria-label="뒤로">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1D27" strokeWidth="2.5" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <div className={styles.navInfo}>
            <div className={styles.navName}>air 고객센터</div>
            <div className={styles.navSub}>
              상담사 : {agentConfig.name}&nbsp;·&nbsp;상담시간 : <span>{callTimer}</span>
            </div>
          </div>
          <div className={styles.liveBadge}>
            <div className={styles.liveDot} />
            LIVE
          </div>
        </div>

        {/* 상담사 이름카드 */}
        <AgentNameCard
          characterName={agentConfig.characterName}
          role={agentConfig.role}
          isOnline={agentConfig.isOnline}
        />

        {/* 채팅 오버레이 */}
        <ChatOverlay
          onTalkingChange={setIsTalking}
          onEmojiSpawn={handleEmojiSpawn}
        />
      </div>
    </div>
  );
}
