import Head from "next/head";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/index.module.css";
import Login from "@/components/Login";
import ContentContainer from "@/components/ContentContainer";

export default function Home() {
  const { data: session } = useSession();
  console.log("session is: ", session);

  return (
    <>
      <Head>
        <title>Match my Craving</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <ContentContainer>
          {session ? (
            <>
              <Image
                src="/salad.jpg"
                alt="photo of a salad"
                width="150"
                height="150"
              />
              <h2>Hey {session.user.name}!</h2>
              <button>Start a Session</button>
              <button>
                <Link href="/myrecipes">Show my Recipes</Link>
              </button>
              <button>Add new Recipe</button>
              <button onClick={() => signOut("google")}>Sign out</button>
            </>
          ) : (
            <Login />
          )}
        </ContentContainer>
      </main>
    </>
  );
}
