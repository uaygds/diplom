import { useParams } from "react-router-dom";
import styles from "./characterPage.module.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { useEffect } from "react";
import {
  thunkGetCharacter,
  thunkGetCharacters,
  thunkGetEpisodes,
  thunkGetLocations,
} from "../../../redux/postersRedux";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";

const CharacterPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(thunkGetCharacters());
    dispatch(thunkGetEpisodes());
    dispatch(thunkGetLocations());
    dispatch(thunkGetCharacter(id));
  }, [dispatch, id]);

  const character = useAppSelector((store) => store.posters.character);
  if (!character) {
    <LoadingIndicator />;
  }

  return (
    <div className={styles.characterPage}>
      <div>
        <img src={character?.image} alt="" />
      </div>
      <div>
        <div className={styles.infoElement}>Name: {character?.name}</div>
        <div className={styles.infoElement}>Gender: {character?.gender}</div>
        <div className={styles.infoElement}>Species: {character?.species}</div>
        <div className={styles.infoElement}>Status: {character?.status}</div>
        <div className={styles.infoElement}>
          Location: {character?.location.name}
        </div>
        <div className={styles.infoElement}>
          Origin: {character?.origin.name}
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
