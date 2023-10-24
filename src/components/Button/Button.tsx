import styles from "./button.module.css";

const Button = ({ title, onClick }: { title: string; onClick: () => void }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
