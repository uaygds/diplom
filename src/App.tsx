import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Wrapper from "./components/Wrapper/Wrapper";
import MainPage from "./components/pages/MainPage/MainPage";
import CharactesPage from "./components/pages/CharactersPage/CharactersPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Wrapper>
          <Routes>
            <Route path="*" element={<MainPage />}></Route>
            <Route path="/characters" element={<CharactesPage />}></Route>
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
