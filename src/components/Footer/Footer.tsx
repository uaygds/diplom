import styles from "./footer.module.css";
import { useAppSelector } from "../../redux/hook";
import CustomLink from "../CustomLink/CustomLink";

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
        <CustomLink to="/characters">CHARACTERS: {countCharacters}</CustomLink>
        <CustomLink to="/locations">LOCATIONS: {countLocations}</CustomLink>
        <CustomLink to="/episodes">EPISODES: {countEpisodes}</CustomLink>
      </div>
      <div className={styles.links}>
        <CustomLink to="https://github.com/uaygds/diplom">git</CustomLink>
        <CustomLink to="https://t.me/smillingknight">support</CustomLink>
      </div>
      <CustomLink to="https://t.me/smillingknight">
        <span className={styles.by}>by</span>
        <span className={styles.authorName}> Nik Nikolaev</span>
      </CustomLink>
    </div>
  );
};

export default Footer;
