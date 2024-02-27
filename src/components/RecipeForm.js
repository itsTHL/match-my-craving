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
      onChange={(event) => onHandleChange(event)}
    >
      <h2>{create ? "Add a new recipe" : null}</h2>
      <label htmlFor='file"'>
        {/* Pretending that there's an image upload field here */}
        {/* <div className={`${styles.imgupload_placeholder}`}>IMAGE UPLOAD</div> */}
        <input type="file" name="file" id="title" />
      </label>
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
        {create ? "Add to recipes" : "Save changes"}
      </button>
    </form>
  );
}
