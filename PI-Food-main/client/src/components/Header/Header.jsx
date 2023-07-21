import React from "react";

import styles from "./header.module.css";
import image from "../../assets/img/logoHome.png";

export default function Header() {
  return (
    <div className={styles.header}>
      <a className={styles.logo} href="/home">
        {" "}
        <img src={image} alt="logo" width="300px" />
      </a>
    </div>
  );
}
