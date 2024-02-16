import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import UserForm from "@/components/UserForm";
import { useSession, signIn, signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Match my Craving</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div>
          <Image
            src="/salad.jpg"
            alt="photo of a salad"
            width="100"
            height="100"
          />
          <h2>Sign in with Google</h2>
          <button onClick={() => signIn("google")}>Sign in</button>
          <UserForm />
        </div>
      </main>
    </>
  );
}
