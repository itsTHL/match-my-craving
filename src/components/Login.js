import { signIn } from "next-auth/react";
import styles from "./Login.module.css";

export default function Login() {
  return (
    <>
      <h2 className={`${styles.heading}`}>You are not signed in.</h2>
      <button onClick={() => signIn("google")}>Sign in now</button>
    </>
  );
}
