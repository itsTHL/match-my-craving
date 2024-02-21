import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function MyRecipes() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  console.log("id from router: ", id);

  const { data, isLoading, error } = useSWR(`/api/${id}`);

  console.log(data);

  const { data: session } = useSession();
  console.log("session in all recipes is: ", session);

  if (!isReady) return <h2>Not ready...</h2>;
  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error!</h2>;

  return (
    <>
      <h1>Hey {session.user.name}!</h1>
    </>
  );
}
