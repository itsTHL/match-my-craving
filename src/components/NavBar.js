import Image from "next/image";
import styles from "./NavBar.module.css";
import BackButton from "./BackButton";

export default function NavBar() {
  return (
    <nav className={`${styles.nav}`}>
      <Image
        src="/MMC_Logo_Black.png"
        alt="MMC Logo"
        width="200"
        height="150"
        className={`${styles.nav_logo}`}
      />
      <BackButton />
    </nav>
  );
}
