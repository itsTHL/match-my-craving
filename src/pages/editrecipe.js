import useSWR from "swr";
import { useRouter } from "next/router";
import UserForm from "@/components/UserForm";

export default function EditRecipe() {
  // const router = useRouter();
  // const { isReady } = router;
  // const { id } = router.query;

  // const { data, isLoading, error } = useSWR(`/api/${id}`);

  // console.log("fetched data on my recipes: ", data);

  // if (!isReady) return <h2>Not ready...</h2>;
  // if (isLoading) return <h2>Loading...</h2>;
  // if (error) return <h2>Error!</h2>;

  const router = useRouter();
  const { isReady } = router;
  if (!isReady) return <h2>Not ready...</h2>;
  const { id } = router.query;

  async function handleEdit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const editedRecipe = Object.fromEntries(formData);
    const response = await fetch(`/api/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedRecipe),
    });
    if (response.ok) {
      mutate();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  return (
    <>
      <UserForm onHandleSubmit={handleEdit} create={false} />
    </>
  );
}
