import ContentContainer from "./ContentContainer";
import styles from "./UserForm.module.css";
import { useRouter } from "next/router";
import FoodPref from "./FoodPref";

export default function UserForm() {
  const router = useRouter();
  const { id } = router.query;

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
        <button type="submit">Add to recipes</button>
      </form>
    </ContentContainer>
  );
}

// FOLLOWING CODE AS REFERENCE FOR LATER --> NEED TO ADJUST RENDERED TEXTS DYNAMICALLY DEPENDING ON ADDING- OR EDIT-MODE

// import ContentContainer from "./ContentContainer";
// import styles from "./UserForm.module.css";
// import { useRouter } from "next/router";
// import { useSession } from "next-auth/react";

// export default function UserForm({ onSubmit }) {
//   const router = useRouter();
//   const { id } = router.query;
//   const { data: session } = useSession();

//   async function handleSubmitRecipe(event) {
//     event.preventDefault();

//     const formData = new FormData(event.target);
//     const newRecipe = Object.fromEntries(formData);

//     const response = await fetch(`/api/${id}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newRecipe),
//     });

//     if (response.ok) {
//       console.log("Recipe added");

//       event.target.reset();
//       console.log("event target: ", event.target);
//       router.push(`/`); // CHANGE TO RECIPE DETAILS PAGE LATER!!!
//     } else {
//       console.error("Recipe not added, try again");
//     }
//   }

//   return (
//     <ContentContainer>
//       <form className={`${styles.form}`} onSubmit={handleSubmitRecipe}>
//         <label htmlFor='imageupload"'>
//           {/* Pretending that there's an image upload field here */}
//           <div className={`${styles.imgupload_placeholder}`}>IMAGE UPLOAD</div>
//         </label>
//         <label htmlFor="title">
//           <input
//             type="text"
//             name="title"
//             id="title"
//             className={`${styles.input__text}`}
//             placeholder="What's the name of your dish?"
//             required
//           ></input>
//         </label>
//         <label htmlFor="comment">
//           <input
//             type="text"
//             name="comment"
//             id="comment"
//             className={`${styles.input__text}`}
//             placeholder="Wanna add some notes?"
//           ></input>
//         </label>
//         <fieldset className={`${styles.fieldset}`}>
//           <legend>Any food preference we want to consider?</legend>

//           <label htmlFor="vegetarian">
//             <input
//               type="radio"
//               id="vegetarian"
//               name="vegetarian"
//               value="vegetarian"
//               className={`${styles.input__radio}`}
//             />
//             vegetarian 🥬
//           </label>

//           <label htmlFor="vegan">
//             <input
//               type="radio"
//               id="vegan"
//               name="vegan"
//               value="vegan"
//               className={`${styles.input__radio}`}
//             />
//             vegan 🥬🥬
//           </label>

//           <label htmlFor="nopref">
//             <input
//               type="radio"
//               id="nopref"
//               name="nopref"
//               value="nopref"
//               className={`${styles.input__radio}`}
//             />
//             none
//           </label>
//         </fieldset>
//         <button type="submit">Add to recipes</button>
//       </form>
//     </ContentContainer>
//   );
// }
