import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Login from "@/components/Login";
import Link from "next/link";
import RecipeForm from "@/components/RecipeForm";
import { useState } from "react";

export default function RecipeDetailsPage() {
  const { data: session } = useSession();

  const router = useRouter();
  const { isReady } = router;

  const { id } = router.query;
  console.log("is this the correct id? ", id);

  const {
    data: recipe,
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/recipes/${id}`);
  const [recipeForm, setRecipeForm] = useState(false);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>Error!</h2>;
  }
  if (!isReady) {
    return <h2>Not ready...</h2>;
  }

  console.log("recipe in recipe details page: ", recipe);

  const toggleRecipeForm = () => {
    setRecipeForm(!recipeForm); // Toggle the showForm state
  };

  async function handleEditRecipe(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const editedRecipe = Object.fromEntries(formData);

    const response = await fetch(`/api/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedRecipe),
    });
    if (response.ok) {
      event.target.reset();
      mutate();
      router.push(`/myrecipes/${id}`);
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  return (
    <>
      {!session ? (
        <Login />
      ) : (
        <>
          <Image src="/salad.jpg" alt="" width="150" height="150" />
          <h2>{recipe.title}</h2>
          <p>{recipe.comment ? recipe.comment : null}</p>
          <button type="button">
            <Link href="/myrecipes">Back to all recipes</Link>
          </button>
          <button type="button" onClick={toggleRecipeForm}>
            {recipeForm ? "Close" : "Edit"}
          </button>
          {recipeForm && (
            <RecipeForm
              onHandleSubmit={handleEditRecipe}
              create={false}
              defaultData={recipe}
            />
          )}
        </>
      )}
    </>
  );
}
