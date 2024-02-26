import styles from "./UserForm.module.css";
import { useRouter } from "next/router";
import FoodPref from "./FoodPref";

export default function UserForm({ onHandleSubmit, create, defaultData }) {
  return (
    <form
      className={`${styles.form}`}
      onSubmit={(event) => onHandleSubmit(event)}
    >
      <h2>{create ? "Add a new recipe" : "Edit this recipe"}</h2>
      <label htmlFor='imageupload"'>
        {/* Pretending that there's an image upload field here */}
        <div className={`${styles.imgupload_placeholder}`}>IMAGE UPLOAD</div>
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
