import Head from "next/head";
import styles from "@/styles/index.module.css";
import UserForm from "@/components/UserForm";
import Login from "@/components/Login";

export default function Home() {
  return (
    <>
      <Head>
        <title>Match my Craving</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <Login />
      </main>
    </>
  );
}
