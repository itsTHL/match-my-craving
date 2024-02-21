import Image from "next/image";
import { signIn, signOut } from "next-auth/react";

export default function Login() {
  return (
    <>
      <h2>You are not signed in.</h2>
      <Image src="/salad.jpg" alt="photo of a salad" width="150" height="150" />
      <h2>Sign in with Google</h2>
      <button onClick={() => signIn("google")}>Sign in</button>
    </>
  );
}
