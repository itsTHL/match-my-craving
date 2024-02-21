import useSWR from "swr";
import { useSession } from "next-auth/react";

export default function MyRecipes() {
  const { data, isLoading, error } = useSWR(`/api/myrecipes`);

  console.log(data);

  const { data: session } = useSession();
  console.log("session in all recipes is: ", session);

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error!</h2>;

  return (
    <>
      <h1>Nothing to see here. ... yet! 😉</h1>
      <h2>Soon you will be able to see your collection of recipes here.</h2>
    </>
  );
}
