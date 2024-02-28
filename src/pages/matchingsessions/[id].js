import RecipeCard from "@/components/RecipeCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { pusherClient } from "@/lib/pusher";

export default function MatchingSession() {
  // GETTING THE ID
  const router = useRouter();
  const { isReady } = router;
  const { id: sessionId } = router.query;

  // SETTING A STATE FOR RECIPE INDEX
  const [recipeIndex, setRecipeIndex] = useState(0);

  // FETCHING DATA FOR SPECIFIC MATCHING SESSION
  const {
    data: matchingSession,
    isLoading,
    error,
  } = useSWR(`/api/matchingsessions/${sessionId}`);

  // SETTING UP PUSHER CHANNEL
  useEffect(() => {
    if (!sessionId) {
      return;
    }

    pusherClient.subscribe(`${sessionId}`);

    pusherClient.bind(
      "match",
      (response) => {
        console.log("response: ", response);
        alert("It's a match!");
      },
      pusherClient.unbind()
    );

    return () => {
      pusherClient.unsubscribe(`${sessionId}`);
    };
  }, [recipeIndex]);

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
        alert("It's a match!");
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
        <button type="button" onClick={() => handleLikeRecipe(sessionId)}>
          Yum!
        </button>
      </>
    );
  }
}
