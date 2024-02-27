import MessageField from "@/components/MessageField";
import Messages from "@/components/Messages";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function MatchingSession() {
  const router = useRouter();
  const { isReady } = router;

  const { id } = router.query;

  const {
    data: matchingSession,
    isLoading,
    error,
  } = useSWR(`/api/matchingsessions/${id}`);

  if (!isReady) return <h2>Not ready...</h2>;
  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Errorrrrrr!</h2>;

  const { combinedRecipes } = matchingSession;
  console.log("Do we have all recipes? ", combinedRecipes);

  const fetchRecipeData = async (recipeId) => {
    try {
      const response = await fetch(`/api/recipes/${recipeId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching message data:", error);
      return null;
    }
  };

  const fetchAllRecipesData = async () => {
    const promises = combinedRecipes.map((recipeId) =>
      fetchRecipeData(recipeId)
    );
    const allRecipesData = await Promise.all(promises);
    return allRecipesData;
  };

  const handleRecipeData = async () => {
    const allRecipesData = await fetchAllRecipesData();
    console.log("All recipes data:", allRecipesData);
    // Handle the fetched data as needed
  };

  handleRecipeData();

  // const combinedRecipeDetails = combinedRecipes.map((recipe) => useSWR(`api/recipes/${recipe}`)
  // );
  // console.log(combinedRecipeDetails);

  return (
    <>
      <h1>Welcome to the matching session!</h1>
      {/* <Messages existingMessages={existingMessages} roomId={id} />
      <MessageField roomId={id} /> */}
    </>
  );
}
