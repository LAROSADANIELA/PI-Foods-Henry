import { HiSearch } from "react-icons/hi";
import { Link } from "react-router-dom";
import styles from "./filters.module.css";

export default function Inputs({ value, onchange, onClick, placeholder }) {
  return (
    <>
      <div className={styles.nav__links}>
        <div className={styles.searchbox}>
          <input
            className={styles.searchtxt}
            type="text"
            name="title"
            placeholder="Search your recipe"
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
      </div>
    </>
  );
}
