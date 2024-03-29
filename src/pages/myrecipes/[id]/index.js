import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Login from "@/components/Login";
import Link from "next/link";
import RecipeForm from "@/components/RecipeForm";
import { useState } from "react";
import RecipeCard from "@/components/RecipeCard";

export default function RecipeDetailsPage() {
  const { data: session } = useSession();
  const [recipeForm, setRecipeForm] = useState(false);

  const router = useRouter();
  const { isReady } = router;

  const { id } = router.query;

  const {
    data: recipe,
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/recipes/${id}`);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>Error!</h2>;
  }
  if (!isReady) {
    return <h2>Not ready...</h2>;
  }

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
      toggleRecipeForm();
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
          <RecipeCard id={id} />
          <button type="button">
            <Link href="/myrecipes">Back to all Cravings</Link>
          </button>
          <button type="button" onClick={toggleRecipeForm}>
            {recipeForm ? "Discard changes" : "Edit"}
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
