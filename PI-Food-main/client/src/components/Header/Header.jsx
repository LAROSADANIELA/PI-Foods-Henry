import React from "react";

import image from "../../assets/img/logoHome.png";
import styles from "./header.module.css";

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
