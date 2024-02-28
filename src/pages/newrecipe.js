import { useRouter } from "next/router";
import RecipeForm from "@/components/RecipeForm";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function NewRecipe() {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  //Triggers when the file input changes (ex: when a file is selected)

  function handleChange(changeEvent) {
    if (!changeEvent.target.files || changeEvent.target.files.length === 0) {
      console.error("No files selected.");
      return;
    }
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  // MY CODE FROM HERE
  //

  const { data: session, status } = useSession();
  console.log("session in new recipe: ", session);

  const router = useRouter();
  const { isReady } = router;

  if (status === "loading") {
    return null;
  }
  if (!isReady) {
    return <h2>Not ready...</h2>;
  }

  async function handleSubmitRecipe(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    // const fileInput = Array.from(event.target.elements).find(
    //   ({ name }) => name === "file"
    // );

    const fileInput = event.target.elements["file"];

    const newRecipe = Object.fromEntries(formData);

    newRecipe.image = imageSrc;

    const recipeResponse = await fetch(
      session?.user ? `/api/users/${session.user.id}` : null,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      }
    );

    if (recipeResponse.ok) {
      event.target.reset();
      console.log("recipe response: ", recipeResponse);
      router.push(`${recipeResponse.url}`);

      if (fileInput && fileInput.files.length > 0) {
        const imageFormData = new FormData();
        imageFormData.append("file", fileInput.files[0]);
        // Append Cloudinary upload preset if required
        imageFormData.append("upload_preset", "wesbhypg");

        const imageData = await fetch(
          "https://api.cloudinary.com/v1_1/dhlpyg6wk/image/upload",
          {
            method: "POST",
            body: imageFormData,
          }
        ).then((r) => r.json());

        setImageSrc(imageData.secure_url);
        setUploadData(imageData);
      } else {
        console.error("Recipe not added, try again");
      }
    }
  }
  //   const imageFormData = new FormData();
  //   for (const file of fileInput.files) {
  //     imageFormData.append("file", file);
  //   }

  //   const imageData = await fetch(
  //     "https://api.cloudinary.com/v1_1/dhlpyg6wk/image/upload",
  //     {
  //       method: "POST",
  //       body: imageFormData,
  //     }
  //   ).then((r) => r.json());

  //   // formData.append("upload_preset", "wesbhypg");

  //   setImageSrc(imageData.secure_url);
  //   setUploadData(imageData);
  // }

  return (
    <>
      <RecipeForm
        onHandleSubmit={handleSubmitRecipe}
        onHandleChange={handleChange}
        create={true}
      />
    </>
  );
}
