import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Login from "@/components/Login";
import Link from "next/link";

export default function RecipeDetailsPage() {
  const { data: session } = useSession();

  const router = useRouter();
  const { id } = router.query;
  console.log("is this the correct id? ", id);

  const { data: recipe, isLoading, error } = useSWR(`/api/recipes/${id}`);

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error!</h2>;

  console.log("recipe in recipe details page: ", recipe);

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
          <button type="button">Edit Recipe</button>
        </>
      )}
    </>
  );
}
