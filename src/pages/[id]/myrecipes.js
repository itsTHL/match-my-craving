import useSWR from "swr";
import { useRouter } from "next/router";

export default function MyRecipes() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  console.log("id from router: ", id);

  const { data, isLoading, error } = useSWR(`/api/${id}`);

  console.log("fetched data on my recipes: ", data);

  if (!isReady) return <h2>Not ready...</h2>;
  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error!</h2>;

  return (
    <>
      <h1>Hey {data.name}!</h1>
      <h2>
        {data.recipes.length !== 0 ? (
          data.recipes.map((recipe) => {
            return (
              <>
                <h3>{recipe.title}</h3>
                <h4>{recipe.comment ? recipe.comment : null}</h4>
              </>
            );
          })
        ) : (
          <h2>You have not added any recipes yet. Wanna start now?</h2>
        )}
      </h2>
    </>
  );
}
