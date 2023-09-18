import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import styles from "./characters.module.css";
import { thunkGetCharacters } from "../../../redux/posters";

const CharactesPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(thunkGetCharacters());
  }, [dispatch]);

  const characters = useAppSelector((store) => store.posters.characters);
  console.log(characters);
  const mapped = characters.map((character) => {
    return (
      <div className={styles.character}>
        <img className={styles.characterImg} src={character.image} alt="" />
        <div className={styles.characterInfo}>
          <a className={styles.characterName} href={character.url}>
            {character.name}
          </a>
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
      <div className={styles.pagination}>1,2,3,4,5</div>
    </>
  );
};

export default CharactesPage;
