import useSWR from "swr";
import { useRouter } from "next/router";
import UserForm from "@/components/UserForm";
import { useSession } from "next-auth/react";

export default function NewRecipe() {
  const { data: session } = useSession();
  console.log("session in new recipe: ", session);

  const id = session.user.id;
  console.log("user id in new recipe? ", id);

  const router = useRouter();
  const { isReady } = router;
  if (!isReady) return <h2>Not ready...</h2>;
  // const { id } = router.query;

  // console.log("id in new recipe: ", id);

  // const { data, isLoading, error } = useSWR(`/api/${id}`);

  // console.log("fetched data on my recipes: ", data);

  // if (isLoading) return <h2>Loading...</h2>;
  // if (error) return <h2>Error!</h2>;

  async function handleSubmitRecipe(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newRecipe = Object.fromEntries(formData);

    const response = await fetch(`/api/users/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    });

    if (response.ok) {
      event.target.reset();
      console.log("response: ", response);
      router.push(`${response.url}`); // CHANGE TO RECIPE DETAILS PAGE LATER!!!
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
