import styles from "./ContentContainer.module.css";
import BackButton from "./BackButton";
import Link from "next/link";
import Image from "next/image";

export default function ContentContainer({ children }) {
  return (
    <div className={`${styles.content_container}`}>
      <Link href="/">
        <Image
          src="/MMC_Logo_Black.png"
          alt="MMC Logo"
          width="220"
          height="200"
          className={`${styles.logo}`}
        />
      </Link>
      <BackButton />
      {children}
    </div>
  );
}
