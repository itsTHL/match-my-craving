import MessageField from "@/components/MessageField";
import Messages from "@/components/Messages";
import RecipeCard from "@/components/RecipeCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
  const [recipeNum, setRecipeNum] = useState(0);
  console.log("recipeNum is: ", recipeNum);

  // const [allRecipesData, setAllRecipesData] = useState([]);

  // GETTING COMBINED RECIPES IDS IN ONE ARRAY
  if (matchingSession && matchingSession.combinedRecipes) {
    const { combinedRecipes } = matchingSession;
    if (!combinedRecipes) {
      return null;
    }
    console.log("Do we have all recipes? ", combinedRecipes);

    if (!isReady) return <h2>Not ready...</h2>;
    if (isLoading) return <h2>Loading...</h2>;
    if (error) return <h2>Errorrrrrr!</h2>;

    return (
      <>
        <h1>Welcome to the matching session!</h1>
        <RecipeCard id={combinedRecipes[recipeNum]} />
        <button type="button" onClick={() => setRecipeNum(recipeNum + 1)}>
          Try me!
        </button>
        {/* <Messages existingMessages={existingMessages} roomId={id} />
      <MessageField roomId={id} /> */}
        {/* {allRecipesData.map((recipe) => (
        <div key={recipe.id}>{recipe.title}</div>
      ))}{" "} */}
      </>
    );
  }
}

// ARCHIVE

//   // BASIC FUNCTION TO FETCH RECIPE DATA
//   async function fetchRecipeData(recipeId) {
//     try {
//       const response = await fetch(`/api/recipes/${recipeId}`);
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching message data:", error);
//       return null;
//     }
//   }

//   // FUNCTION THAT MAPS OVER COMBINED RECIPE ARRAY AND FETCHING THE RECIPE DATA FOR EVERY ID IN THE ARRAY
//   // stores all the promises in new variable
//   async function fetchAllRecipesData() {
//     const promises = combinedRecipes.map((recipeId) =>
//       fetchRecipeData(recipeId)
//     );
//     const allRecipesData = await Promise.all(promises);
//     return allRecipesData;
//   }

//   async function handleRecipeData() {
//     const allRecipesData = await fetchAllRecipesData();
//     console.log("All recipes data:", allRecipesData);
//     return allRecipesData;
//   }

//   handleRecipeData();

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     const data = await handleRecipeData();
//   //     setAllRecipesData(data);
//   //   };
//   //   fetchData();
//   // }, []);
// }
