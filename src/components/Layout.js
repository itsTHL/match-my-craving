import ContentContainer from "./ContentContainer";
import NavBar from "./NavBar";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main className={`${styles.main}`}>
        <ContentContainer>{children}</ContentContainer>
      </main>
    </>
  );
}
