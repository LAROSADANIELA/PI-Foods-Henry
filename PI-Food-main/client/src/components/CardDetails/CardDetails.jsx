import React from "react";
import { Link } from "react-router-dom";
import Button from "../buttonBlack/Button";
import styles from "./cardDetails.module.css";

export default function CardDetails({
  title,
  name,
  healthScore,
  image,
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
        <p
        // dangerouslySetInnerHTML={{ __html:  }}
        >
          {summary}
        </p>
        <p>
          Steps <br /> {steps}
        </p>
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
