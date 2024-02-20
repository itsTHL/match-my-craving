import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/index.module.css";
import UserForm from "@/components/UserForm";
import { useSession, signIn, signOut } from "next-auth/react";

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
        <div>
          <Image
            src="/salad.jpg"
            alt="photo of a salad"
            width="100"
            height="100"
          />
          <h2>Sign in with Google</h2>
          <button onClick={() => signIn("google")}>Sign in</button>
          <button onClick={() => signOut("google")}>Sign out</button>
          {/* <UserForm /> */}
        </div>
      </main>
    </>
  );
}
