import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import styles from "./charactersPage.module.css";
import {
  thunkGetCharacters,
  thunkGetCharactersWithParams,
  thunkGetEpisodes,
  thunkGetLocations,
} from "../../../redux/postersRedux";
import Pagination from "../../Pagination/Pagination";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";
import { Link, useSearchParams } from "react-router-dom";
import Search from "../../Search/Search";
import CustomInputAndLabel from "../../CustomInputAndLabel/CustomInputAndLabel";
import ArrowButton from "../../svgComponents/ArrowButton/ArrowButton";
const CharactersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") === "alive"
      ? {
          statusFilterAlive: true,
          statusFilterDead: false,
          statusFilterUnknown: false,
        }
      : searchParams.get("status") === "dead"
      ? {
          statusFilterAlive: false,
          statusFilterDead: true,
          statusFilterUnknown: false,
        }
      : searchParams.get("status") === "unknown"
      ? {
          statusFilterAlive: false,
          statusFilterDead: false,
          statusFilterUnknown: true,
        }
      : {
          statusFilterAlive: false,
          statusFilterDead: false,
          statusFilterUnknown: false,
        }
  );
  const [genderFilter, setGenderFilter] = useState(
    searchParams.get("gender") === "male"
      ? {
          genderFilterMale: true,
          genderFilterFemale: false,
          genderFilterGenderless: false,
          genderFilterUnknown: false,
        }
      : searchParams.get("gender") === "female"
      ? {
          genderFilterMale: false,
          genderFilterFemale: true,
          genderFilterGenderless: false,
          genderFilterUnknown: false,
        }
      : searchParams.get("gender") === "genderless"
      ? {
          genderFilterMale: false,
          genderFilterFemale: false,
          genderFilterGenderless: true,
          genderFilterUnknown: false,
        }
      : searchParams.get("gender") === "unknown"
      ? {
          genderFilterMale: false,
          genderFilterFemale: false,
          genderFilterGenderless: false,
          genderFilterUnknown: true,
        }
      : {
          genderFilterMale: false,
          genderFilterFemale: false,
          genderFilterGenderless: false,
          genderFilterUnknown: false,
        }
  );

  const name = searchParams.get("name");
  const status = searchParams.get("status");
  const gender = searchParams.get("gender");
  const [filterMenu, setFilterMenu] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(name ? name : "");
  const dispatch = useAppDispatch();

  useEffect(() => {
    setInputValue(name === null ? "" : name);
    dispatch(thunkGetCharacters());
    dispatch(thunkGetCharactersWithParams({ params: searchParams }));
    dispatch(thunkGetEpisodes({ params: undefined }));
    dispatch(thunkGetLocations({ params: undefined }));
  }, [dispatch, searchParams, name]);
  const characters = useAppSelector(
    (store) => store.posters.charactersWithParams
  );
  const resetFilter = () => {
    setGenderFilter({
      genderFilterMale: false,
      genderFilterFemale: false,
      genderFilterGenderless: false,
      genderFilterUnknown: false,
    });
    setStatusFilter({
      statusFilterAlive: false,
      statusFilterDead: false,
      statusFilterUnknown: false,
    });
    setSearchParams({});
  };
  const pages = useAppSelector(
    (store) => store.posters.dataCharactersWithParams?.info.pages
  );
  if (!characters.length) {
    return <LoadingIndicator />;
  }

  const mappedCharacters = characters.map((character) => {
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
          <div
            className={
              character.status === "Alive"
                ? styles.statusIconAlive
                : character.status === "Dead"
                ? styles.statusIconDead
                : styles.statusIconUnknown
            }
          ></div>
        </div>
      </div>
    );
  });
  return (
    <div>
      <div
        className={styles.Filter}
        style={{ right: filterMenu ? "0px" : "-200px" }}
      >
        <button
          className={styles.filterButton}
          onClick={() => setFilterMenu(!filterMenu)}
        >
          <ArrowButton />
        </button>
        <div className={styles.filterStatus}>
          <h1>Status:</h1>
          <div>
            <CustomInputAndLabel
              title="Alive"
              id="alive"
              name="status"
              checked={statusFilter.statusFilterAlive}
              onChange={() => {
                setStatusFilter({
                  statusFilterAlive: true,
                  statusFilterDead: false,
                  statusFilterUnknown: false,
                });
                searchParams.set("status", "alive");
                setSearchParams(searchParams);
              }}
            />
          </div>
          <div>
            <CustomInputAndLabel
              title="Dead"
              id="dead"
              name="status"
              checked={statusFilter.statusFilterDead}
              onChange={() => {
                setStatusFilter({
                  statusFilterAlive: false,
                  statusFilterDead: true,
                  statusFilterUnknown: false,
                });
                searchParams.set("status", "dead");
                setSearchParams(searchParams);
              }}
            />
          </div>
          <div>
            <CustomInputAndLabel
              title="Unknown"
              id="unknown"
              name="status"
              checked={statusFilter.statusFilterUnknown}
              onChange={() => {
                setStatusFilter({
                  statusFilterAlive: false,
                  statusFilterDead: false,
                  statusFilterUnknown: true,
                });
                searchParams.set("status", "unknown");
                setSearchParams(searchParams);
              }}
            />
          </div>
        </div>
        <div className={styles.filterStatus}>
          <h1>Gender:</h1>
          <div>
            <CustomInputAndLabel
              title="Male"
              id="male"
              name="gender"
              checked={genderFilter.genderFilterMale}
              onChange={() => {
                setGenderFilter({
                  genderFilterMale: true,
                  genderFilterFemale: false,
                  genderFilterGenderless: false,
                  genderFilterUnknown: false,
                });
                searchParams.set("gender", "male");
                setSearchParams(searchParams);
              }}
            />
          </div>
          <div>
            <CustomInputAndLabel
              title="Female"
              id="female"
              name="gender"
              checked={genderFilter.genderFilterFemale}
              onChange={() => {
                setGenderFilter({
                  genderFilterMale: false,
                  genderFilterFemale: true,
                  genderFilterGenderless: false,
                  genderFilterUnknown: false,
                });
                searchParams.set("gender", "female");
                setSearchParams(searchParams);
              }}
            />
          </div>
          <div>
            <CustomInputAndLabel
              title="Genderless"
              id="genderless"
              name="gender"
              checked={genderFilter.genderFilterGenderless}
              onChange={() => {
                setGenderFilter({
                  genderFilterMale: false,
                  genderFilterFemale: false,
                  genderFilterGenderless: true,
                  genderFilterUnknown: false,
                });
                searchParams.set("gender", "genderless");
                setSearchParams(searchParams);
              }}
            />
          </div>
          <div>
            <CustomInputAndLabel
              title="Unknown"
              id="unknown"
              name="gender"
              checked={genderFilter.genderFilterUnknown}
              onChange={() => {
                setGenderFilter({
                  genderFilterMale: false,
                  genderFilterFemale: false,
                  genderFilterGenderless: false,
                  genderFilterUnknown: true,
                });
                searchParams.set("gender", "unknown");
                setSearchParams(searchParams);
              }}
            />
          </div>
        </div>
        <button
          onClick={() => {
            resetFilter();
          }}
        >
          Reset filter
        </button>
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
      <div className={styles.characters}>{mappedCharacters}</div>
      <div className={styles.pagination}>
        <Pagination
          handleClick={(page) => {
            searchParams.set("page", page.toString());
            name ? searchParams.set("name", name) : "";
            gender ? searchParams.set("gender", gender) : "";
            status ? searchParams.set("status", status) : "";
            setSearchParams(searchParams);
          }}
          countPages={pages ? pages : 1}
        />
      </div>
    </div>
  );
};

export default CharactersPage;
