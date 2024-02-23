import React from "react";
import ContentContainer from "./ContentContainer";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <main className={`${styles.main}`}>
        <ContentContainer>{children}</ContentContainer>
      </main>
    </>
  );
}
