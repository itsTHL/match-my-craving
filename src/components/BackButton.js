import { useRouter } from "next/router";
import styles from "./BackButton.module.css";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={`${styles.back_btn}`}
    >
      &larr;
    </button>
  );
}
