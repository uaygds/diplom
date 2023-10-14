import styles from "./footer.module.css";
import { useAppSelector } from "../../redux/hook";
import { Link } from "react-router-dom";

const Footer = () => {
  const countCharacters = useAppSelector(
    (store) => store.posters.dataCharacters?.info.count
  );
  const countEpisodes = useAppSelector(
    (store) => store.posters.dataEpisodes?.info.count
  );
  const countLocations = useAppSelector(
    (store) => store.posters.dataLocations?.info.count
  );
  return (
    <div className={styles.footer}>
      <div className={styles.stat}>
        <Link to="/characters" className={styles.statElement}>
          CHARACTERS: {countCharacters}
        </Link>
        <Link to="/locations" className={styles.statElement}>
          LOCATIONS: {countLocations}
        </Link>
        <Link to="/episodes" className={styles.statElement}>
          EPISODES: {countEpisodes}
        </Link>
      </div>
      <div className={styles.links}>
        <a className={styles.linkItem} href="#!">
          git
        </a>
        <a className={styles.linkItem} href="#!">
          support
        </a>
      </div>
      <a className={styles.author} href="#!">
        <span className={styles.by}>by</span>
        <span className={styles.authorName}> Nik Nikolaev</span>
      </a>
    </div>
  );
};

export default Footer;
