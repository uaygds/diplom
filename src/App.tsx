import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Wrapper from "./components/Wrapper/Wrapper";
import MainPage from "./components/pages/MainPage/MainPage";
import CharactersPage from "./components/pages/CharactersPage/CharactersPage";
import LocationsPage from "./components/pages/LocationsPage/LocationsPage";
import EpisodesPage from "./components/pages/EpisodesPage/EpisodesPage";
import CharacterPage from "./components/pages/CharacterPage/CharacterPage";

function App() {
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
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
