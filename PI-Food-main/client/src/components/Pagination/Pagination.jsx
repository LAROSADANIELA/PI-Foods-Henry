import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./pagination.module.css";

export default function Pagination({ page, onClickNextPage, onClickPrevPage }) {
  return (
    <div className="pagination">
      {page > 1 && (
        <IoIosArrowBack className={styles.prev} onClick={onClickPrevPage} />
      )}
      <span>{page}</span>
      {page < 11 && (
        <IoIosArrowForward className={styles.next} onClick={onClickNextPage} />
      )}
    </div>
  );
}
