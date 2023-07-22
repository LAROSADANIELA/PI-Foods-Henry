import styles from "./button2.module.css";
export default function Button2({ label, onClick }) {
  return (
    <button className={styles.btn} onClick={onClick}>
      {label}
    </button>
  );
}
