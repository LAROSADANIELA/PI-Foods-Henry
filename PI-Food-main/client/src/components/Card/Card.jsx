import React from "react";
import styles from "./card.module.css";

export default function Card({ image, title, name, healthScore }) {
  return (
    <div className={styles.card}>
      <section className={styles.section}>
        <img src={image} alt="food"></img>
      </section>

      <div className={styles.tex}>
        <h5>{title}</h5>
        <p className={styles.score}>Health Score:&nbsp;{healthScore}</p>
        <ul>
          <li>{name}&nbsp;&nbsp;</li>
        </ul>
      </div>
    </div>
  );
}
