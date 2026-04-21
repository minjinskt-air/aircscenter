import { useState, useCallback, useRef } from 'react';
import ChatMessages from './ChatMessages';
import QuickButtons from './QuickButtons';
import InputBar from './InputBar';
import styles from './ChatOverlay.module.css';
import { agentConfig } from '../config/agentConfig';

function now() {
  const d = new Date();
  return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
}

const mockReplies = [
  "물론이죠! 핸드폰 알려주시면 바로 조회해 드릴게요 📦",
  "확인해봤어요! 오늘 오후 3~5시 사이 도착 예정이에요 🚚✨",
  "추가로 궁금하신 게 있으신가요? 편하게 물어보세요!",
  "도움이 되면 좋겠어요! air와 함께해 주셔서 감사해요 😊",
];

let replyIdx = 0;

export default function ChatOverlay({ onTalkingChange, onEmojiSpawn }) {
  const [messages, setMessages] = useState([
    { id: 1, text: '안녕하세요! air 전담 상담사 아리아예요 ✨<br>편하게 말씀해 주세요!', isUser: false, time: '9:41' },
    { id: 2, text: '주문 배송 언제 오나요?', isUser: true, time: '9:42' },
    { id: 3, text: '잠깐만요, 확인해드릴게요 😊<br>핸드폰이나 연락처 적어 주실 수 있을까요?', isUser: false, time: '9:42' },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const msgIdRef = useRef(4);

  const addMsg = useCallback((text, isUser) => {
    setMessages(prev => [...prev, { id: msgIdRef.current++, text, isUser, time: now() }]);
    if (!isUser) onEmojiSpawn?.();
  }, [onEmojiSpawn]);

  const handleSend = useCallback((text) => {
    addMsg(text, true);
    setIsTyping(true);

    const delay = 900 + Math.random() * 600;
    setTimeout(() => {
      setIsTyping(false);
      onTalkingChange?.(true);
      const reply = mockReplies[replyIdx % mockReplies.length];
      replyIdx++;
      addMsg(reply, false);
      const dur = Math.min(reply.length * 90, 3500);
      setTimeout(() => onTalkingChange?.(false), dur);
    }, delay);
  }, [addMsg, onTalkingChange]);

  return (
    <div className={styles.chatOverlay}>
      <QuickButtons buttons={agentConfig.quickButtons} onSend={handleSend} />
      <ChatMessages messages={messages} isTyping={isTyping} />
      <InputBar onSend={handleSend} />
    </div>
  );
}
