import { useRouter } from "next/router";
import UserForm from "@/components/UserForm";
import useSWR from "swr";

export default function EditRecipe() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  console.log("user or recipe id? ", id);

  if (!isReady) {
    return <h2>Not ready...</h2>;
  }

  async function handleEditRecipe(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const editedRecipe = Object.fromEntries(formData);

    const response = await fetch(`/api/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedRecipe),
    });
    if (response.ok) {
      event.target.reset();
      router.push(`/myrecipes/${id}`);
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  return (
    <>
      <UserForm onHandleSubmit={handleEditRecipe} create={false} />
    </>
  );
}
