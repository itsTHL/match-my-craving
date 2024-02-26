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

      <section className={`${styles.intro_section}`}>
        <p>
          Tired of wondering what&apos;s for dinner? Endless discussions about
          what to cook are stressing you out?
        </p>
        <p>
          <strong>Match my Craving</strong> to the rescue!
        </p>
        <p>
          Add your favorite recipes, swipe through your staple dishes and find
          the perfect meal for breakfast, lunch, brunch or dinner - whenever you
          want!
        </p>
        It&apos;s like Tinder for food, but with guaranteed matches every time!
      </section>

      {!session ? (
        <Login />
      ) : (
        <>
          <h2 className={`${styles.greeting}`}>Hey {session.user.name}!</h2>
          <button>
            <Link href={`/letsmatch`}>Start a Session</Link>
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
      )}
    </>
  );
}
