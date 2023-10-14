import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import styles from "./locations.module.css";
import {
  thunkGetCharacters,
  thunkGetEpisodes,
  thunkGetLocations,
} from "../../../redux/postersRedux";
import Pagination from "../../Pagination/Pagination";

import { usePageSearchParams } from "../../../hooks/usePageSearchParams";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";

const LocationsPage = () => {
  const { page, setPage } = usePageSearchParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(thunkGetCharacters());
    dispatch(thunkGetEpisodes());
    dispatch(thunkGetLocations(page));
  }, [dispatch, page]);
  const locations = useAppSelector((store) => store.posters.locations);

  const pages = useAppSelector(
    (store) => store.posters.dataLocations?.info.pages
  );

  if (!locations.length) {
    return <LoadingIndicator />;
  }

  const mapped = locations.map((location) => {
    return <li key={location.id}>{location.name}</li>;
  });

  return (
    <div className={styles.locationPage}>
      <ul>{mapped}</ul>
      <div className={styles.pagination}>
        <Pagination handleClick={setPage} countPages={pages ? pages : 1} />
      </div>
    </div>
  );
};

export default LocationsPage;
