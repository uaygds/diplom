import styles from "./arrowButton.module.css";
const ArrowButton = () => {
  return (
    <svg
      className={styles.svgButton}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g>
        <polygon points="12 6.414 19.293 13.707 20.707 12.293 12 3.586 3.293 12.293 4.707 13.707 12 6.414" />
        <polygon points="3.293 18.293 4.707 19.707 12 12.414 19.293 19.707 20.707 18.293 12 9.586 3.293 18.293" />
      </g>
    </svg>
  );
};

export default ArrowButton;