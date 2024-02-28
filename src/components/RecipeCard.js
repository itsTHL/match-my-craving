import Image from "next/image";
import useSWR from "swr";
import styles from "./RecipeCard.module.css";

export default function RecipeCard({ id }) {
  const { data: recipe, isLoading, error } = useSWR(`/api/recipes/${id}`);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>Error!</h2>;
  }

  return (
    <>
      <Image
        src="/salad.jpg"
        alt={`image of ${recipe.title}`}
        width="200"
        height="200"
        className={`${styles.detail_img}`}
      />
      <h2>{recipe.title}</h2>
      <p>{recipe.comment ? recipe.comment : null}</p>
    </>
  );
}
