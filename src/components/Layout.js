import ContentContainer from "./ContentContainer";
import NavBar from "./NavBar";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <main className={`${styles.main}`}>
        <NavBar />
        <ContentContainer>{children}</ContentContainer>
      </main>
    </>
  );
}
