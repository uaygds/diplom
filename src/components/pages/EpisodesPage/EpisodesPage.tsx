import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  thunkGetCharacters,
  thunkGetEpisodes,
  thunkGetLocations,
} from "../../../redux/postersRedux";
import styles from "./episodesPage.module.css";

import Pagination from "../../Pagination/Pagination";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";
import { useSearchParams } from "react-router-dom";

const EpisodesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(thunkGetCharacters({ params: undefined }));
    dispatch(thunkGetEpisodes({ params: searchParams }));
    dispatch(thunkGetLocations({ params: undefined }));
  }, [dispatch, searchParams]);
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
        <Pagination
          handleClick={(e) => {
            setSearchParams({ page: e.toString() });
          }}
          countPages={pages ? pages : 1}
        />
      </div>
    </div>
  );
};

export default EpisodesPage;
