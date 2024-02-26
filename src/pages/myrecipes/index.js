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
                  <Link key={recipe._id} href={`/myrecipes/${recipe._id}`}>
                    <li className={`${styles.recipe_listItem}`}>
                      <div className={`${styles.recipe_card}`}>
                        {/* THIS BUTTON NEEDS TO BE Z-INDEX 2! */}
                        <button
                          className={`${styles.delete_btn}`}
                          type="button"
                        >
                          ❌
                        </button>
                        {/* <div className={`${styles.img_container}`}> */}
                        <Image
                          src="/salad.jpg"
                          alt="photo of a salad"
                          width="500"
                          height="500"
                          // fill={true}
                        />
                        {/* </div> */}
                        <h4>{recipe.title}</h4>
                      </div>
                    </li>
                  </Link>
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
