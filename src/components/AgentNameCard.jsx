import styles from './AgentNameCard.module.css';

export default function AgentNameCard({ characterName, role, isOnline }) {
  return (
    <div className={styles.agentNamecard}>
      <div className={styles.namecardAvatar}>
        <svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="19" cy="19" rx="17" ry="17" fill="#2d1f5e"/>
          <ellipse cx="19" cy="20" rx="10" ry="11" fill="#ffd6b8"/>
          <ellipse cx="14" cy="18" rx="4" ry="4.5" fill="white"/>
          <ellipse cx="15" cy="19" rx="2.5" ry="3" fill="#6040CC"/>
          <ellipse cx="24" cy="18" rx="4" ry="4.5" fill="white"/>
          <ellipse cx="25" cy="19" rx="2.5" ry="3" fill="#6040CC"/>
          <path d="M14 27 Q19 31 24 27" stroke="#e87a8a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M8 15 Q8 8 19 7 Q30 8 30 15" stroke="#1a1a1a" strokeWidth="3" fill="none"/>
        </svg>
      </div>
      <div className={styles.namecardText}>
        <div className={styles.name}>{characterName} (Aria)</div>
        <div className={styles.role}>
          {isOnline && <span className={styles.onlineDot} />}
          {role}
        </div>
      </div>
    </div>
  );
}
