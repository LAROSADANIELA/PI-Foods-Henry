import React from "react";
import style from "./notFound.module.css";

function NotFound() {
  return (
    <div className={style.conteiner}>
      <h2 className={style.p}>
        No recipe found, <br /> re-enter a name.
      </h2>
    </div>
  );
}

export default NotFound;
