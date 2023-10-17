import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import styles from "./characters.module.css";
import {
  thunkGetCharacters,
  thunkGetEpisodes,
  thunkGetLocations,
} from "../../../redux/postersRedux";
import Pagination from "../../Pagination/Pagination";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";
import { useCustomSearchParams } from "../../../hooks/useCustomSearchParams";
import { Link, useSearchParams } from "react-router-dom";
import Search from "../../Search/Search";
const CharactersPage = () => {
  const [inputValue, setInputValue] = useState("");
  const { page, setPage } = useCustomSearchParams();
  const [params, setParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const handleSetParams = () => {};

  useEffect(() => {
    dispatch(
      thunkGetCharacters({ page: params.get("page"), name: params.get("name") })
    );
    dispatch(thunkGetEpisodes());
    dispatch(thunkGetLocations());
  }, [dispatch, params, page]);
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
      <Search
        placeholder="Character..."
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setParams({ page: page, name: inputValue });
        }}
      />
      <div>{inputValue}</div>
      <div className={styles.characters}>{mapped}</div>
      <div className={styles.pagination}>
        <Pagination handleClick={setPage} countPages={pages ? pages : 1} />
      </div>
    </>
  );
};

export default CharactersPage;
