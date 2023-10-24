import { ChangeEvent, RefObject, createRef, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import styles from "./characters.module.css";
import {
  thunkGetCharacters,
  thunkGetEpisodes,
  thunkGetLocations,
} from "../../../redux/postersRedux";
import Pagination from "../../Pagination/Pagination";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";
import { Link, useSearchParams } from "react-router-dom";
import Search from "../../Search/Search";
const CharactersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cb, setCB] = useState(
    searchParams.get("status") === "alive"
      ? { cb1: true, cb2: false, cb3: false }
      : searchParams.get("status") === "dead"
      ? { cb1: false, cb2: true, cb3: false }
      : searchParams.get("status") === "unknown"
      ? { cb1: false, cb2: false, cb3: true }
      : { cb1: false, cb2: false, cb3: false }
  );
  const name = searchParams.get("name");
  const [tab, setTab] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(name ? name : "");
  const menu = createRef<HTMLDivElement>();
  const button = createRef<HTMLButtonElement>();
  const dispatch = useAppDispatch();

  const closeMenu = (e: ChangeEvent<RefObject<HTMLButtonElement>>) => {
    //исправить типиздацию хз как
    if (e.target !== menu && e.target !== button.current) {
      setTab(false);
    }
  };

  useEffect(() => {
    setInputValue(name === null ? "" : name);
    dispatch(thunkGetCharacters({ params: searchParams }));
    dispatch(thunkGetEpisodes({ params: undefined }));
    dispatch(thunkGetLocations({ params: undefined }));
  }, [dispatch, searchParams, name]);
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
                : character.status === "Dead"
                ? styles.statusIconDead
                : styles.statusIconUnknown
            }
          ></span>
        </div>
      </div>
    );
  });
  return (
    <div onClick={closeMenu}>
      <div
        className={styles.Filter}
        ref={menu}
        style={{ right: tab ? "0px" : "-200px" }}
      >
        <button
          className={styles.filterButton}
          ref={button}
          onClick={() => setTab(!tab)}
        >
          open
        </button>
        <div className={styles.filterStatus}>
          <div>
            {" "}
            <label htmlFor="alive">Alive</label>
            <input
              id="alive"
              type="radio"
              name="status"
              checked={cb.cb1}
              onChange={() => {
                setCB({ cb1: true, cb2: false, cb3: false });
                setSearchParams({ status: cb.cb1 ? "" : "alive" });
              }}
            />
          </div>
          <div>
            {" "}
            <label htmlFor="dead">Dead</label>
            <input
              type="radio"
              name="status"
              id="dead"
              checked={cb.cb2}
              onChange={() => {
                setCB({ cb1: false, cb2: true, cb3: false });
                setSearchParams({ status: cb.cb2 ? "" : "dead" });
              }}
            />
          </div>
          <div>
            {" "}
            <label htmlFor="unknown">Unknown</label>
            <input
              id="unknown"
              type="radio"
              name="status"
              checked={cb.cb3}
              onChange={() => {
                setCB({ cb1: false, cb2: false, cb3: true });
                setSearchParams({ status: cb.cb3 ? "" : "unknown" });
              }}
            />
          </div>
        </div>
      </div>
      <Search
        placeholder="Character..."
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setSearchParams(
            e.target.value === "" ? "" : { name: e.target.value }
          );
        }}
      />
      <div className={styles.characters}>{mapped}</div>
      <div className={styles.pagination}>
        <Pagination
          handleClick={(page) => {
            setSearchParams(
              name
                ? { page: page.toString(), name: name }
                : { page: page.toString() }
            );
          }}
          countPages={pages ? pages : 1}
        />
      </div>
    </div>
  );
};

export default CharactersPage;
