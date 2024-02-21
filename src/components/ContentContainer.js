import styles from "./ContentContainer.module.css";

export default function ContentContainer({ children }) {
  return <div className={`${styles.content_container}`}>{children}</div>;
}
