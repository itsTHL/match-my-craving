import { signIn } from "next-auth/react";
import Image from "next/image";
import styles from "./Login.module.css";

export default function Login() {
  return (
    <>
      <h3>Sign in and start matching!</h3>

      <Image
        src="/Google_SI.png"
        alt="sign in with google button"
        width="700"
        height="160"
        onClick={() => signIn("google")}
        className={`${styles.google_SI}`}
      />
    </>
  );
}
