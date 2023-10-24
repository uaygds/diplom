import { Link } from "react-router-dom";
import { ForCharacters } from "../../redux/postersRedux";
import styles from "./characterCard.module.css";

const CharacterCard = ({
  character,
  OnClick,
}: {
  character: ForCharacters;
  OnClick: () => void;
}) => {
  return (
    <>
      <div className={styles.character} key={character.id} onClick={OnClick}>
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
    </>
  );
};

export default CharacterCard;
