import React from "react";
import { Link } from "react-router-dom";
import styles from "./cardDetails.module.css";
import Button from "../Button/Button";

export default function CardDetails({
  title,
  name,
  healthScore,
  image,
  types,
  summary,
  steps,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3>{title}</h3>
        <p>Health Score: {healthScore}</p>
        <ul>
          <li>{name}</li>
        </ul>
        <ul>
          <li>{types}</li>
        </ul>
        <p>{summary}</p>
        <p>{steps}</p>
        {/* <p>Released: {game.released}</p>
        <p>Genres:</p>
        <ul>
          {game.genres.map((g) => {
            return <li>{g.name}</li>;
          })}
        </ul>
        <p>Platforms:</p>
        <ul>
          {platform.map((name) => {
            return <li>{name}</li>;
          })}
        </ul> */}

        <Link to={"/home"}>
          <Button label="Back" />
        </Link>
      </div>
      <div>
        <img className={styles.img} src={image} alt="Imege"></img>
      </div>
    </div>
  );
}
