import { signIn } from "next-auth/react";
import Image from "next/image";
import styles from "./Login.module.css";

export default function Login() {
  return (
    <div className={`${styles.login_container}`}>
      <h3>Sign in and start matching!</h3>

      <Image
        src="/Google_SI.png"
        alt="sign in with google button"
        width="140"
        height="32"
        onClick={() => signIn("google")}
        className={`${styles.google_SI}`}
      />
    </div>
  );
}
