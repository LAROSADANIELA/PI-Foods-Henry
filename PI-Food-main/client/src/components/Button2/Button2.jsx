import styles from "./button2.module.css";
export default function Button2({ label }) {
  return <button className={styles.btn}>{label}</button>;
}
