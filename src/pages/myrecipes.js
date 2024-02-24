import useSWR from "swr";
import { useSession } from "next-auth/react";
import Login from "@/components/Login";
import Link from "next/link";

export default function MyRecipes() {
  const { data: session } = useSession();
  console.log("session in my recipes: ", session);

  const id = session.user.id;
  console.log("do i have an id? ", id);

  const { data: user, isLoading, error } = useSWR(`/api/${id}`);

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error!</h2>;

  console.log("fetched data on my recipes: ", user);

  const { recipes } = user;
  console.log("recipes? ", recipes);

  return (
    <>
      {session ? (
        <>
          <h1>Hey {user.name}!</h1>
          <ul>
            {recipes.length !== 0 ? (
              recipes.map((recipe) => {
                return (
                  <li key={recipe._id}>
                    <Link href="/">
                      <h3>{recipe.title}</h3>
                      <p>{recipe.comment ? recipe.comment : null}</p>
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
