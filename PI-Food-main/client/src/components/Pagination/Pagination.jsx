import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./pagination.module.css";

export default function Pagination({
  handlePrevClick,
  handleNextClick,
  button,
}) {
  // console.log(totalRecipes, "totalrecipes");

  return (
    <div className="pagination">
      <ul>
        <IoIosArrowBack className={styles.prev} onClick={handlePrevClick} />
        <>{button}</>
        <IoIosArrowForward className={styles.next} onClick={handleNextClick} />
      </ul>
    </div>
  );
}
