import React from "react";
import styles from "./pagination.module.css";
export default function Pagination({
  handlePrevClick,
  handleNextClick,
  nroPage,
}) {
  return (
    <div className={styles.conteiner}>
      <div className={styles.prev}>
        <button onClick={handlePrevClick}>PREV</button>
      </div>
      <div className={styles.nroPage}>{nroPage}</div>
      <div className={styles.prev}>
        <button onClick={handleNextClick}>NEXT</button>
      </div>
    </div>
  );
}
