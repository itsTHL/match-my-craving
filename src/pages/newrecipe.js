import { useRouter } from "next/router";
import RecipeForm from "@/components/RecipeForm";
import { useSession } from "next-auth/react";

export default function NewRecipe() {
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
    const newRecipe = Object.fromEntries(formData);

    const response = await fetch(
      session?.user ? `/api/users/${session.user.id}` : null,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      }
    );

    if (response.ok) {
      event.target.reset();
      console.log("response: ", response);
      router.push(`${response.url}`);
    } else {
      console.error("Recipe not added, try again");
    }
  }

  return (
    <>
      <RecipeForm onHandleSubmit={handleSubmitRecipe} create={true} />
    </>
  );
}
