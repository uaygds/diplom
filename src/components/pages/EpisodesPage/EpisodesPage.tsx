import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  thunkGetCharacters,
  thunkGetEpisodes,
  thunkGetLocations,
} from "../../../redux/postersRedux";
import styles from "./episodesPage.module.css";

import Pagination from "../../Pagination/Pagination";
import { useCustomSearchParams } from "../../../hooks/useCustomSearchParams";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";

const EpisodesPage = () => {
  const { page, setPage } = useCustomSearchParams();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(thunkGetCharacters({ page: "", search: "" }));
    dispatch(thunkGetEpisodes(page));
    dispatch(thunkGetLocations());
  }, [dispatch, page]);
  const episodes = useAppSelector((store) => store.posters.episodes);
  const pages = useAppSelector(
    (store) => store.posters.dataEpisodes?.info.pages
  );
  if (!episodes.length) {
    return <LoadingIndicator />;
  }
  const mapped = episodes.map((episode) => {
    return <li key={episode.id}>{episode.name}</li>;
  });
  return (
    <div className={styles.episodePage}>
      <ul>{mapped}</ul>
      <div className={styles.pagination}>
        <Pagination handleClick={setPage} countPages={pages ? pages : 1} />
      </div>
    </div>
  );
};

export default EpisodesPage;
