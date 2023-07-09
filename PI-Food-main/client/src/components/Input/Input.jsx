import React from "react";
import styles from "./input.module.css";

export default function Inputt({
  onChange,
  type,
  id,
  name,
  placeholder,
  value,
}) {
  return (
    <input
      onChange={onChange}
      className={styles.input}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
    ></input>
  );
}
