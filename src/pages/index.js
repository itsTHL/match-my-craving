import Head from "next/head";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {session ? (
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
      ) : (
        <Login />
      )}
    </>
  );
}
