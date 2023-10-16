import { Link } from "react-router-dom";
import styles from "./poster.module.css";
import { ForCharacters, ForEpisodes } from "../../../../redux/postersRedux";
import axios from "axios";
import { useEffect, useState } from "react";

const Poster = ({ character }: { character: ForCharacters }) => {
  const [currentEpisode, setCurrentEpisode] = useState<string>("");
  useEffect(() => {
    (async (id: string) => {
      const response = await axios.get<ForEpisodes>(
        `https://rickandmortyapi.com/api/episode/${id}`
      );
      setCurrentEpisode(response.data.name);
    })(character.episode[0].split("/")[5]);
  }, [character.episode]);

  return (
    <div className={styles.poster}>
      <div className={styles.posterImg}>
        <img className={styles.imgItem} src={character.image} alt="" />
      </div>
      <div className={styles.posterInfo}>
        <div className={styles.info}>
          <Link to={`/character/${character.id}`} className={styles.name}>
            {character.name}
          </Link>
          <div className={styles.status}>
            <div
              className={
                character.status === "Alive"
                  ? styles.statusIconAlive
                  : styles.statusIconDead
              }
            ></div>
            <div>
              {character.status === "Alive" ? "Alive" : "Dead"}-
              {character.species}
            </div>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.description}>Last known location:</div>
          <Link to="" className={styles.location}>
            {character.location.name}
          </Link>
        </div>
        <div className={styles.info}>
          <div className={styles.description}>First seen in:</div>
          <span className={styles.firstSeen}>{currentEpisode}</span>
        </div>
      </div>
    </div>
  );
};

export default Poster;
