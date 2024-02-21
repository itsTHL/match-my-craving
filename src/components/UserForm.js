import ContentContainer from "./ContentContainer";
import styles from "./UserForm.module.css";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function UserForm({ onSubmit }) {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();

  async function handleSubmitRecipe(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newRecipe = Object.fromEntries(formData);

    const response = await fetch(`/api/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    });

    if (response.ok) {
      console.log("Recipe added");

      event.target.reset();
      console.log("event target: ", event.target);
      router.push(`/`); // CHANGE TO RECIPE DETAILS PAGE LATER!!!
    } else {
      console.error("Recipe not added, try again");
    }
  }

  return (
    <ContentContainer>
      <form className={`${styles.form}`} onSubmit={handleSubmitRecipe}>
        <label htmlFor='imageupload"'>
          {/* Pretending that there's an image upload field here */}
          <div className={`${styles.imgupload_placeholder}`}>IMAGE UPLOAD</div>
        </label>
        <label htmlFor="title">
          <input type="text" name="title" id="title" required></input>
        </label>
        <label htmlFor="comment">
          <input type="text" name="comment" id="comment"></input>
        </label>
        <button type="submit">Add to recipes</button>
      </form>
    </ContentContainer>
  );
}
