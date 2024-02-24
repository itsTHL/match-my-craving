import useSWR from "swr";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Login from "@/components/Login";

export default function MyRecipes() {
  const { data: session } = useSession();
  console.log("session in my recipes: ", session);

  // const router = useRouter();
  // const { isReady } = router;
  // const { id } = router.query;
  // console.log("id from router: ", id);

  const id = session.user.id;
  console.log("do i have an id? ", id);

  const { data: user, isLoading, error } = useSWR(`/api/${id}`);

  console.log("fetched data on my recipes: ", user);

  const { recipes } = user;
  console.log("recipes? ", recipes);

  // if (!isReady) return <h2>Not ready...</h2>;
  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error!</h2>;

  return (
    <>
      {session ? (
        <>
          {/* <h1>Hey {data.name}!</h1>
          {data.recipes.length !== 0 ? (
            data.recipes.map((recipe) => {
              return (
                <>
                  <h3>{recipe.title}</h3>
                  <p>{recipe.comment ? recipe.comment : null}</p>
                </>
              );
            })
          ) : (
            <h2>You have not added any recipes yet. Wanna start now?</h2>
          )} */}
          <ul>
            <li>1</li>
            <li>2</li>
          </ul>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
