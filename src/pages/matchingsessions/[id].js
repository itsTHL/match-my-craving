import MessageField from "@/components/MessageField";
import Messages from "@/components/Messages";
import RecipeCard from "@/components/RecipeCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { pusherClient } from "@/lib/pusher";

export default function MatchingSession() {
  // GETTING THE ID
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  // SETTING A STATE FOR RECIPE INDEX
  const [recipeIndex, setRecipeIndex] = useState(0);

  // SETTING A STATE FOR MATCHES
  const [matches, setMatches] = useState([]);

  // FETCHING DATA FOR SPECIFIC MATCHING SESSION
  const {
    data: matchingSession,
    isLoading,
    error,
  } = useSWR(`/api/matchingsessions/${id}`);

  // SETTING UP PUSHER CHANNEL
  // useEffect(() => {
  //   if (!id) {
  //     return;
  //   }

  //   const channel = pusherClient.subscribe(`${id}`);

  //   // Update likedRecipes state with the received data
  //   // Here you should handle the received data as per your requirements
  //   channel.bind();

  //   channel.bind("matches", () => {
  //     alert("It's a match!");
  //   });

  //   return () => {
  //     pusherClient.unsubscribe(`${id}`);
  //   };
  // }, [id]);

  // GETTING COMBINED RECIPES IDS IN ONE ARRAY
  if (matchingSession && matchingSession.combinedRecipes) {
    const { combinedRecipes } = matchingSession;
    if (!combinedRecipes) {
      return null;
    }

    async function handleLikeRecipe(matchingSessionId) {
      const response = await fetch(
        `/api/matchingsessions/${matchingSessionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            likedRecipeId: combinedRecipes[recipeIndex],
          }),
        }
      );

      setRecipeIndex(recipeIndex + 1);

      if (response.status === 200) {
        console.log("It's a match!");
      } else if (response.status === 201) {
        null;
      } else {
        console.error("Recipe could not be added to liked recipes.");
      }
    }

    if (!isReady) return <h2>Not ready...</h2>;
    if (isLoading) return <h2>Loading...</h2>;
    if (error) return <h2>Errorrrrrr!</h2>;

    return (
      <>
        <h1>Welcome to the matching session!</h1>
        <RecipeCard id={combinedRecipes[recipeIndex]} />
        <button type="button" onClick={() => setRecipeIndex(recipeIndex + 1)}>
          Meh.
        </button>
        <button type="button" onClick={() => handleLikeRecipe(id)}>
          Yum!
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
