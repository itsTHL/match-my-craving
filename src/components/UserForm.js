import styles from "./UserForm.module.css";
import { useRouter } from "next/router";
import FoodPref from "./FoodPref";

export default function UserForm({ onHandleSubmit, create }) {
  // const router = useRouter();
  // const { id } = router.query;

  // async function handleSubmitRecipe(event) {
  //   event.preventDefault();

  //   const formData = new FormData(event.target);
  //   const newRecipe = Object.fromEntries(formData);

  //   const response = await fetch(`/api/${id}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newRecipe),
  //   });

  //   if (response.ok) {
  //     event.target.reset();
  //     console.log("event target: ", event.target);
  //     router.push(`/`); // CHANGE TO RECIPE DETAILS PAGE LATER!!!
  //   } else {
  //     console.error("Recipe not added, try again");
  //   }
  // }

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
        ></input>
      </label>
      <FoodPref />
      <button type="submit">
        {create ? "Add to recipes" : "Save changes"}
      </button>
    </form>
  );
}
