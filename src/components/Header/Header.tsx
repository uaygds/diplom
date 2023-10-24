import { Link } from "react-router-dom";
import Button from "../Button/Button";
import styles from "../Header/header.module.css";
import RickAndMortyMainIcon from "../svgComponents/RickAndMortyMainIcon";

const Header = () => {
  console.log("hd");

  return (
    <div className={styles.header}>
      <div className={styles.nav}>
        <Link to="/" className={styles.mainLink}>
          <RickAndMortyMainIcon />
        </Link>
        <div className={styles.navMenu}>
          <Link className={styles.navElement} to="/episodes">
            Episodes
          </Link>
          <Link className={styles.navElement} to="/characters">
            Characters
          </Link>
          <Link className={styles.navElement} to="/locations">
            Locations
          </Link>
          <Link className={styles.navElement} to="">
            About
          </Link>
        </div>
        <Button title="Sign In" />
      </div>
    </div>
  );
};

export default Header;
