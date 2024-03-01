import styles from "./RecipeForm.module.css";
import { useRouter } from "next/router";
import FoodPref from "./FoodPref";

export default function RecipeForm({
  onHandleSubmit,
  onHandleChange,
  create,
  defaultData,
}) {
  return (
    <form
      className={`${styles.form}`}
      onSubmit={(event) => onHandleSubmit(event)}
    >
      <h2>{create ? "Add a new Craving" : null}</h2>

      {create ? (
        <label htmlFor='file"'>
          <input
            type="file"
            name="image"
            id="image"
            onChange={(event) => onHandleChange(event)}
          />
        </label>
      ) : null}
      <label htmlFor="title">
        <input
          type="text"
          name="title"
          id="title"
          className={`${styles.input__text}`}
          placeholder="What's the name of your dish?"
          defaultValue={defaultData?.title}
          required
        ></input>
      </label>
      <label htmlFor="comment">
        <input
          type="text"
          name="comment"
          id="comment"
          className={`${styles.input__text}`}
          placeholder="Wanna add some notes?"
          defaultValue={defaultData?.comment}
        ></input>
      </label>
      <FoodPref />
      <button type="submit">
        {create ? "Add to Cravings" : "Save changes"}
      </button>
    </form>
  );
}
