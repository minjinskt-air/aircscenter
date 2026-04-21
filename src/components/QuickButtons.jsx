import styles from './QuickButtons.module.css';

export default function QuickButtons({ buttons, onSend }) {
  return (
    <div className={styles.quickBtns}>
      {buttons.map((btn, i) => (
        <button
          key={i}
          className={styles.qbtn}
          onClick={() => onSend(btn.message)}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}
