import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={`${styles.header}`}>
      <Link href="/">
        <Image
          src="/MMC_Logo_Black.png"
          alt="MMC Logo"
          width="220"
          height="200"
          className={`${styles.logo}`}
        />
      </Link>
    </header>
  );
}
