import styles from "./mainpage.module.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  ForCharacters,
  thunkGetCharacters,
  thunkGetEpisodes,
  thunkGetLocations,
} from "../../../redux/postersRedux";
import { useEffect } from "react";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";
import Poster from "./Poster/Poster";
import RickAndMortyBackgroundImage from "../../svgComponents/RickAndMortyBackgroundImage";

const MainPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(thunkGetCharacters()); //чтобы при переходе на главную всегда подругажались персонажи на мэйн
    dispatch(thunkGetEpisodes());
    dispatch(thunkGetLocations());
  }, [dispatch]);

  const characters = useAppSelector((store) => store.posters.characters);
  const episodes = useAppSelector((store) => store.posters.episodes);

  if (!characters.length || !episodes.length) {
    return <LoadingIndicator />;
  }

  const charactersOnMain = characters.slice(0, 6);

  const mappedPosters = charactersOnMain.map((character: ForCharacters) => {
    return (
      <div key={character.id}>
        <Poster character={character} />
      </div>
    );
  });

  return (
    <div className={styles.main}>
      <section className={styles.mainUp}>
        <h1 className={styles.title}>The Rick and Morty</h1>
        <RickAndMortyBackgroundImage />
      </section>
      <section className={styles.mainDown}>{mappedPosters}</section>
    </div>
  );
};

export default MainPage;
