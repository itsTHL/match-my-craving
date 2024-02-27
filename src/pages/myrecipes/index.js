import useSWR from "swr";
import { useSession } from "next-auth/react";
import Login from "@/components/Login";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/myrecipes.module.css";
import { useRouter } from "next/router";

export default function MyRecipes() {
  const { data: session, status } = useSession();

  const {
    data: user,
    isLoading,
    error,
  } = useSWR(session?.user ? `/api/users/${session.user.id}` : null);

  const router = useRouter();

  if (status === "loading") {
    return null;
  }
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>Error!</h2>;
  }

  const { recipes } = user;

  async function handleDeleteRecipe(id) {
    const response = await fetch(`/api/recipes/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      await response.json();
      router.push("/myrecipes");
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  return (
    <>
      {session ? (
        <>
          <h1>My recipes</h1>
          <ul className={`${styles.recipe_list}`}>
            {recipes.length !== 0 ? (
              recipes.map((recipe) => {
                return (
                  <li key={recipe._id} className={`${styles.recipe_listItem}`}>
                    <button
                      className={`${styles.delete_btn}`}
                      type="button"
                      onClick={() => handleDeleteRecipe(recipe._id)}
                    >
                      ❌
                    </button>
                    <Link href={`/myrecipes/${recipe._id}`}>
                      <div className={`${styles.recipe_card}`}>
                        <Image
                          src="/salad.jpg"
                          alt="photo of a salad"
                          width="200"
                          height="100"
                        />

                        <h4>{recipe.title}</h4>
                      </div>
                    </Link>
                  </li>
                );
              })
            ) : (
              <h3>You have not added any recipes yet. Wanna start now?</h3>
            )}
          </ul>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
