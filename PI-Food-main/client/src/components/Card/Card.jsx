import React from "react";
import styles from "./card.module.css";

export default function Card({ image, title, name }) {
  return (
    <div className={styles.card}>
      <img src={image} alt="Gretis"></img>
      <p>{title}</p>
      <ul>
        <li>{name}</li>
      </ul>
    </div>
  );
}
