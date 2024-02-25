import useSWR from "swr";
import { useRouter } from "next/router";
import UserForm from "@/components/UserForm";

export default function NewRecipe() {
  const router = useRouter();
  const { isReady } = router;
  if (!isReady) return <h2>Not ready...</h2>;
  const { id } = router.query;

  console.log("id in new recipe: ", id);

  // const { data, isLoading, error } = useSWR(`/api/${id}`);

  // console.log("fetched data on my recipes: ", data);

  // if (isLoading) return <h2>Loading...</h2>;
  // if (error) return <h2>Error!</h2>;

  async function handleSubmitRecipe(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newRecipe = Object.fromEntries(formData);

    const response = await fetch(`/api/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    });

    if (response.ok) {
      event.target.reset();
      console.log("event target: ", event.target);
      router.push(`/`); // CHANGE TO RECIPE DETAILS PAGE LATER!!!
    } else {
      console.error("Recipe not added, try again");
    }
  }

  return (
    <>
      <UserForm onHandleSubmit={handleSubmitRecipe} create={true} />
    </>
  );
}
