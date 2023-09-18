import styles from "./button.module.css";

const Button = ({ title }: { title: string }) => {
  return <button className={styles.button}>{title}</button>;
};

export default Button;
