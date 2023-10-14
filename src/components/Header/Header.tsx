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
          <a className={styles.navElement} href="#!">
            About
          </a>

          <a className={styles.navElement} href="#!">
            Favourites
          </a>
          <Button title="Sign In" />
        </div>
      </div>
    </div>
  );
};

export default Header;
