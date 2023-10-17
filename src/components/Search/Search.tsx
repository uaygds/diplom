import { ChangeEvent } from "react";
import styles from "./search.module.css";

const Search = ({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={styles.searchDiv}>
      <input
        type="text"
        className={styles.searchInput}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
