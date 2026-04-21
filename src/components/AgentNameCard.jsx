import styles from './AgentNameCard.module.css';
import avatarImg from '../assets/avatar.png';

export default function AgentNameCard({ characterName, role, isOnline }) {
  return (
    <div className={styles.agentNamecard}>
      <div className={styles.namecardAvatar}>
        <img src={avatarImg} alt="아리아 아바타" className={styles.avatarImg} />
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
