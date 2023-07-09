import React from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";
import image from "../../assets/img/logoHome.png";
import { HiSearch } from "react-icons/hi";

export default function Header({ value, onChange }) {
  return (
    <div className={styles.header}>
      <a className={styles.logo} href="/home">
        {" "}
        <img src={image} alt="logo" width="300px" />
      </a>
      <nav>
        <ul className={styles.nav__links}>
          <div className={styles.searchbox}>
            <input
              className={styles.searchtxt}
              type="text"
              name=""
              placeholder="Search"
              value={value}
              onChange={onChange}
            ></input>
            <a className={styles.searchbtn} href="/">
              <HiSearch />
            </a>
          </div>
          <Link to={"/create"} className={styles.li}>
            <button onClick className={styles.button} href="/add">
              Create
            </button>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
