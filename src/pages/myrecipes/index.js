import useSWR from "swr";
import { useSession } from "next-auth/react";
import Login from "@/components/Login";
import Link from "next/link";
import Image from "next/image";

export default function MyRecipes() {
  const { data: session, status } = useSession();
  console.log("session in my recipes: ", session);

  // const id = session.user.id;
  // console.log("do i have an id? ", id);

  const {
    data: user,
    isLoading,
    error,
  } = useSWR(session?.user ? `/api/users/${session.user.id}` : null);

  if (status === "loading") {
    return null;
  }
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>Error!</h2>;
  }

  console.log("found user on my recipes: ", user);

  const { recipes } = user;
  console.log("recipes? ", recipes);

  return (
    <>
      {session ? (
        <>
          <h1>Hey {user.name}!</h1>
          <ul>
            {recipes.length !== 0 ? (
              recipes.map((recipe) => {
                return (
                  <Link key={recipe._id} href={`/myrecipes/${recipe._id}`}>
                    <li>
                      <div>
                        {/* THIS BUTTON NEEDS TO BE Z-INDEX 2! */}
                        <button type="button">❌</button>
                        <Image
                          src="/salad.jpg"
                          alt="photo of a salad"
                          width="100"
                          height="100"
                        />
                        <h3>{recipe.title}</h3>
                        <p>{recipe.comment ? recipe.comment : null}</p>
                      </div>
                    </li>
                  </Link>
                );
              })
            ) : (
              <h3>You have not added any recipes yet. Wanna start now?</h3>
            )}
          </ul>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
