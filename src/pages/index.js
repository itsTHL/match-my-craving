import Head from "next/head";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import styles from "@/styles/index.module.css";
import Login from "@/components/Login";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Match my Craving</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {!session ? (
        <>
          <section className={`${styles.intro_section}`}>
            <p>
              Tired of wondering what&apos;s for breakfast, lunch, brunch,
              dinner... ?
            </p>
            <p>
              <strong>Match my Craving</strong> to the rescue!
            </p>
            <p>
              It&apos;s like Tinder for food, but with guaranteed matches every
              time!
            </p>

            <p>
              Add your favorite cravings, start a matching session, get swiping
              and find the perfect meal.
            </p>
          </section>
          <Login />
        </>
      ) : (
        <>
          <h2 className={`${styles.greeting}`}>Hey {session.user.name}!</h2>
          <button>
            <Link href={`/letsmatch`}>Let&apos;s match!</Link>
          </button>
          <button>
            <Link href={`/myrecipes`}>Show my Cravings</Link>
          </button>
          <button>
            <Link href={`/newrecipe`}>Add new Craving</Link>
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
