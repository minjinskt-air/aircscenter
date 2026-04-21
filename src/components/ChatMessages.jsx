import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import styles from './ChatMessages.module.css';

export default function ChatMessages({ messages, isTyping }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className={styles.chatMessages}>
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          text={msg.text}
          isUser={msg.isUser}
          time={msg.time}
        />
      ))}

      {isTyping && (
        <div className={styles.typingRow}>
          <div className={styles.typingBubble}>
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
