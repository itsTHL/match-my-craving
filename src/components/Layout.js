import ContentContainer from "./ContentContainer";
import Header from "./Header";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <main className={`${styles.main}`}>
        <Header />
        <ContentContainer>{children}</ContentContainer>
      </main>
    </>
  );
}
