import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Wrapper from "./components/Wrapper/Wrapper";
import MainPage from "./components/pages/MainPage/MainPage";
import CharactersPage from "./components/pages/CharactersPage/CharactersPage";
import LocationsPage from "./components/pages/LocationsPage/LocationsPage";
import EpisodesPage from "./components/pages/EpisodesPage/EpisodesPage";
import CharacterPage from "./components/pages/CharacterPage/CharacterPage";
import SignInPage from "./components/pages/SignInPage/SignInPage";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { loadUsers } from "./redux/usersRedux";
import { useEffect } from "react";
import {
  thunkGetCharacters,
  thunkGetEpisodes,
  thunkGetLocations,
} from "./redux/postersRedux";
import FavouritesPage from "./components/pages/FavoritesPage/FavoutiresPage";
import LogInPage from "./components/pages/LogInPage/LogInPage";

function App() {
  const usersData = localStorage.getItem("users");
  const dispatch = useAppDispatch();
  useEffect(() => {
    const users =
      usersData !== "" ? (usersData == null ? [] : JSON.parse(usersData)) : [];
    dispatch(thunkGetCharacters());
    dispatch(thunkGetEpisodes({ params: undefined }));
    dispatch(thunkGetLocations({ params: undefined }));
    dispatch(loadUsers(users));
  }, [usersData, dispatch]);

  const loginCheck = useAppSelector((store) => store.users.login);

  return (
    <>
      <BrowserRouter>
        <Wrapper>
          <Routes>
            <Route path="*" element={<MainPage />}></Route>
            <Route path="/characters" element={<CharactersPage />}></Route>
            <Route path="/locations" element={<LocationsPage />}></Route>
            <Route path="/episodes" element={<EpisodesPage />}></Route>
            <Route path="/character/:id" element={<CharacterPage />}></Route>
            <Route path="/signin" element={<SignInPage />}></Route>
            {loginCheck ? (
              ""
            ) : (
              <Route path="/login" element={<LogInPage />}></Route>
            )}
            {loginCheck ? (
              <Route path="/favourites" element={<FavouritesPage />}></Route>
            ) : (
              ""
            )}
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
