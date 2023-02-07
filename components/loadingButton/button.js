import React from "react";
import Loader from "./loader.js";
import styles from "./button.module.css";

const loadingText = "loading...";

const Button = ({
  text,
  loading = false,
  disabled,
  className,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={styles.submit_btn + " " + className}
      disabled={disabled}
    >
      {!loading ? (
        text
      ) : (
        <span>
          <Loader className={styles.spinner} /> {loadingText}
        </span>
      )}
    </button>
  );
};

export default Button;
