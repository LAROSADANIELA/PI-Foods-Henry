import React from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";
import image from "../../assets/img/logoHome.png";
import { HiSearch } from "react-icons/hi";

export default function Header({ value, onchange, onClick }) {
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
              name="title"
              placeholder="Search"
              value={value}
              onChange={onchange}
            ></input>
            <a className={styles.searchbtn} onClick={onClick}>
              <HiSearch />
            </a>
          </div>
          <Link to={"/create"} className={styles.li}>
            <button className={styles.button} href="/add">
              Create New Recipe!
            </button>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
