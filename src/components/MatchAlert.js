import styles from "./MatchAlert.module.css";

export default function MatchAlert() {
  return (
    <div className={`${styles.matchAlert}`}>
      <h1>It&apos;s a match! 🎉</h1>
    </div>
  );
}
