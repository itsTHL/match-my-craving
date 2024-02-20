import styles from "./Login.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Login() {
  const { data: session } = useSession();
  console.log("session is: ", session);

  if (session) {
    return (
      <>
        <div>Hey {session.user.name}!</div>
        <button onClick={() => signOut("google")}>Sign out</button>
      </>
    );
  } else {
    return (
      <>
        <div className={`${styles.index__container}`}>
          <h2>You are not signed in.</h2>
          <Image
            src="/salad.jpg"
            alt="photo of a salad"
            width="100"
            height="100"
          />
          <h2>Sign in with Google</h2>
          <button onClick={() => signIn("google")}>Sign in</button>
          {/* <UserForm /> */}
        </div>
      </>
    );
  }
}
