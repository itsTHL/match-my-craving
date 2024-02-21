import useSWR from "swr";
import { useRouter } from "next/router";
import UserForm from "@/components/UserForm";
import ContentContainer from "@/components/ContentContainer";

export default function NewRecipe() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data, isLoading, error } = useSWR(`/api/${id}`);

  console.log("fetched data on my recipes: ", data);

  if (!isReady) return <h2>Not ready...</h2>;
  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error!</h2>;

  return (
    <>
      <UserForm />
    </>
  );
}
