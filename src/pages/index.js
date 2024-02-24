import Head from "next/head";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/index.module.css";
import Login from "@/components/Login";

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

      {session ? (
        <>
          <Image
            src="/salad.jpg"
            alt="photo of a salad"
            width="150"
            height="150"
          />
          <h2>Hey {session.user.name}!</h2>
          {/* <button>
            <Link href={`/${session.user.id}/startsession`}>
              Start a Session
            </Link>
          </button>
          <button>
            <Link href={`/${session.user.id}/myrecipes`}>Show my Recipes</Link>
          </button>
          <button>
            <Link href={`/${session.user.id}/newrecipe`}>Add new Recipe</Link>
          </button> */}

          <button>
            <Link href={`/startsession`}>Start a Session</Link>
          </button>
          <button>
            <Link href={`/myrecipes`}>Show my Recipes</Link>
          </button>
          <button>
            <Link href={`/newrecipe`}>Add new Recipe</Link>
          </button>
          <button
            onClick={() => signOut("google")}
            className={`${styles.signout_btn}`}
          >
            Sign out
          </button>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
