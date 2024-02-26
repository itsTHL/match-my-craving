import Image from "next/image";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <nav className={`${styles.nav}`}>
      <button>Home</button>
      <Image
        src="/MMC_Logo_Black.png"
        alt="MMC Logo"
        width="150"
        height="100"
        className={`${styles.nav_logo}`}
      />
      <button>Back</button>
    </nav>
  );
}
