import styles from './MessageBubble.module.css';

export default function MessageBubble({ text, isUser, time }) {
  return (
    <div className={`${styles.msgRow} ${isUser ? styles.user : styles.agent}`}>
      {isUser ? (
        <>
          <span className={styles.msgTime}>{time}</span>
          <div className={`${styles.bubble} ${styles.bubbleUser}`}>{text}</div>
        </>
      ) : (
        <>
          <div className={`${styles.bubble} ${styles.bubbleAgent}`}
            dangerouslySetInnerHTML={{ __html: text }}
          />
          <span className={styles.msgTime}>{time}</span>
        </>
      )}
    </div>
  );
}
