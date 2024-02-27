import Image from "next/image";
import Link from "next/link";
import styles from "./NavBar.module.css";
import BackButton from "./BackButton";

export default function NavBar() {
  return (
    <nav className={`${styles.nav}`}>
      <BackButton />
      <Link href="/">
        <Image
          src="/MMC_Logo_Black.png"
          alt="MMC Logo"
          width="220"
          height="200"
          className={`${styles.nav_logo}`}
        />
      </Link>
    </nav>
  );
}
