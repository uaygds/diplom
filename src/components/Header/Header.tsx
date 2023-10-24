import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import styles from "../Header/header.module.css";
import RickAndMortyMainIcon from "../svgComponents/RickAndMortyMainIcon";
import { useAppSelector } from "../../redux/hook";

const Header = () => {
  const navigate = useNavigate();
  const redirect = (to: string) => {
    navigate(`${to}`);
  };

  const checkLogin = useAppSelector((store) => store.users.login);

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
          {checkLogin ? (
            <Link className={styles.navElement} to="/favourites">
              Favourites
            </Link>
          ) : null}
        </div>
        {checkLogin ? (
          <Button
            onClick={() => {
              redirect("/");
            }}
            title="Log Out"
          />
        ) : (
          <Button
            onClick={() => {
              redirect("/signup");
            }}
            title="Sign Up"
          />
        )}
      </div>
    </div>
  );
};

export default Header;
