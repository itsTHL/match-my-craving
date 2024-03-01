import RecipeCard from "@/components/RecipeCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { pusherClient } from "@/lib/pusher";
import MatchAlert from "@/components/MatchAlert";
import styles from "../../styles/matchingsession.module.css";

export default function MatchingSession() {
  // GETTING THE ID
  const router = useRouter();
  const { isReady } = router;
  const { id: sessionId } = router.query;

  // SETTING A STATE FOR RECIPE INDEX
  const [recipeIndex, setRecipeIndex] = useState(0);

  // FETCHING DATA FOR SPECIFIC MATCHING SESSION
  const {
    data: matchingSessionData,
    isLoading,
    error,
  } = useSWR(`/api/matchingsessions/${sessionId}`);

  console.log("matchingggg: ", matchingSessionData);

  // SETTING UP PUSHER CHANNEL
  useEffect(() => {
    if (!sessionId) {
      return;
    }

    pusherClient.subscribe(`${sessionId}`);

    pusherClient.bind(
      "match",
      (response) => {
        router.push(`/myrecipes/${response}`), alert("It's a match!");
      },
      pusherClient.unbind()
    );

    return () => {
      pusherClient.unsubscribe(`${sessionId}`);
    };
  }, [sessionId]);

  // GETTING COMBINED RECIPES IDS IN ONE ARRAY
  if (matchingSessionData && matchingSessionData.combinedRecipes) {
    const { combinedRecipes } = matchingSessionData;
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

      // if (response.status === 200) {
      //   // alert("It's a match!");
      //   router.push(`/myrecipes/${combinedRecipes[recipeIndex]}`);
      // } else if (response.status === 201) {
      //   null;
      // } else {
      //   console.error("Recipe could not be added to liked recipes.");
      // }
    }

    if (!isReady) return <h2>Not ready...</h2>;
    if (isLoading) return <h2>Loading...</h2>;
    if (error) return <h2>Errorrrrrr!</h2>;

    return (
      <>
        <div className={`${styles.matchingSession_container}`}>
          <h2>Welcome to the matching session!</h2>
        </div>

        <p>Copy this id and send it to your matching mates:</p>
        <p className={`${styles.id_p}`}>{sessionId}</p>

        <RecipeCard id={combinedRecipes[recipeIndex]} />
        <div className={`${styles.btn_container}`}>
          <button type="button" onClick={() => setRecipeIndex(recipeIndex + 1)}>
            Meh.
          </button>
          <button type="button" onClick={() => handleLikeRecipe(sessionId)}>
            Yum!
          </button>
        </div>
        {/* <MatchAlert /> */}
      </>
    );
  }
}
