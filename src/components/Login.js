import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
import styles from "./Login.module.css";

export default function Login() {
  return (
    <>
      <Image
        src="/MMC_Logo_Black.png"
        alt="MMC Logo"
        width="300"
        height="200"
        className={`${styles.logo}`}
      />
      <h2 className={`${styles.heading}`}>You are not signed in.</h2>
      <button onClick={() => signIn("google")}>Sign in now</button>
    </>
  );
}
