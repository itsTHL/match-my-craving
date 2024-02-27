import useSWR from "swr";
import { useSession } from "next-auth/react";
import Login from "@/components/Login";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/myrecipes.module.css";

export default function MyRecipes() {
  const { data: session, status } = useSession();

  const {
    data: user,
    isLoading,
    error,
  } = useSWR(session?.user ? `/api/users/${session.user.id}` : null);

  if (status === "loading") {
    return null;
  }
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>Error!</h2>;
  }

  console.log("found user on my recipes: ", user);

  const { recipes } = user;
  console.log("recipes? ", recipes);

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
                      onClick={() => console.log("clicked")}
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
