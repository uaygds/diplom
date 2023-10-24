import styles from "./customInputAndLabel.module.css";

const CustomInputAndLabel = ({
  id,
  name,
  title,
  onChange,
  checked,
}: {
  id: string;
  name: string;
  title: string;
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <div className={styles.filterStatus}>
      <label htmlFor={id}>{title}</label>
      <input
        id={id}
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomInputAndLabel;
