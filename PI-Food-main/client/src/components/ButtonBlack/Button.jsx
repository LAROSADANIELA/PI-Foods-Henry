import React from "react";
import styles from "./button.module.css";

export default function Button({ label, onClick }) {
  return (
    <button onClick={onClick} className={styles.btn}>
      {label}
    </button>
  );
}
