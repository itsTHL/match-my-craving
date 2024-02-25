import React from "react";
import styles from "./FoodPref.module.css";

export default function FoodPref() {
  return (
    <fieldset className={`${styles.fieldset}`}>
      <legend>This dish is... </legend>

      <label htmlFor="vegetarian">
        <input
          type="radio"
          id="vegetarian"
          name="foodPref"
          value="vegetarian"
          className={`${styles.input__radio}`}
          defaultChecked
        />
        vegetarian 🥬
      </label>

      <label htmlFor="vegan">
        <input
          type="radio"
          id="vegan"
          name="foodPref"
          value="vegan"
          className={`${styles.input__radio}`}
        />
        vegan 🥬🥬
      </label>

      <label htmlFor="meat">
        <input
          type="radio"
          id="meat"
          name="foodPref"
          value="meat"
          className={`${styles.input__radio}`}
        />
        with meat 🥩
      </label>
    </fieldset>
  );
}
