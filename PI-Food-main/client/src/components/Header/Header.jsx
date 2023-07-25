import React from "react";

import image from "../../assets/img/logoHome.png";
import styles from "./header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <img className={styles.logo} src={image} alt="logo" width="300px" />
      <a className={styles.home} href="/home">
        {"Home "}
      </a>
    </div>
  );
}
