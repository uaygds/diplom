import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import styles from "./characters.module.css";
import {
  thunkGetCharacters,
  thunkGetEpisodes,
  thunkGetLocations,
} from "../../../redux/postersRedux";
import Pagination from "../../Pagination/Pagination";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";
import { usePageSearchParams } from "../../../hooks/usePageSearchParams";
import { Link } from "react-router-dom";
const CharactersPage = () => {
  const { page, setPage } = usePageSearchParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(thunkGetCharacters(page));
    dispatch(thunkGetEpisodes());
    dispatch(thunkGetLocations());
  }, [dispatch, page]);
  const characters = useAppSelector((store) => store.posters.characters);

  const pages = useAppSelector(
    (store) => store.posters.dataCharacters?.info.pages
  );
  if (!characters.length) {
    return <LoadingIndicator />;
  }

  const mapped = characters.map((character) => {
    return (
      <div className={styles.character} key={character.id}>
        <img className={styles.characterImg} src={character.image} alt="" />
        <div className={styles.characterInfo}>
          <Link
            className={styles.characterName}
            to={`/character/${character.id}`}
          >
            {character.name}
          </Link>
          <span
            className={
              character.status === "Alive"
                ? styles.statusIconAlive
                : styles.statusIconDead
            }
          ></span>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className={styles.characters}>{mapped}</div>
      <div className={styles.pagination}>
        <Pagination handleClick={setPage} countPages={pages ? pages : 1} />
      </div>
    </>
  );
};

export default CharactersPage;
