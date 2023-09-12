import { useEffect, useState } from "react";
import "./App.css";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import LogIn from "./pages/LogIn/LogIn";
import Sucess from "./pages/LogIn/Sucess/Sucess";
import Posts from "./pages/Posts/Posts";
import Confirm from "./pages/Registration/Confirm/Confirm";
import Registration from "./pages/Registration/Registartion";
import Tab from "./pages/Tabs/Tabs";
import Wrapper from "./components/Wrapper/Wrapper";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContextSearchInput from "./ContextSearchInput";
import { Post } from "./pages/Post/Post";
import ContextTheme from "./ContextTheme";
import Activation from "./pages/Activation/Activation";
import { useAppDispatch } from "./redux/hook";
import { thunkSwitchAccessToken } from "./redux/users";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useAppDispatch();
  const refreshToken = localStorage.getItem("refreshToken");
  useEffect(() => {
    setInterval(async () => {
      dispatch(thunkSwitchAccessToken(refreshToken));
    }, 270000);
  });
  return (
    <>
      <ErrorBoundary>
        <ContextTheme.Provider
          value={{
            darkMode,
            setDarkMode: (darkMode: boolean) => {
              setDarkMode(darkMode);
            },
          }}
        >
          <ContextSearchInput.Provider
            value={{
              searchInput,
              setSearchInput: (newValue: string) => {
                setSearchInput(newValue);
              },
            }}
          >
            <BrowserRouter>
              <Wrapper>
                <Routes>
                  <Route path="/sucess" element={<Sucess />} />
                  <Route path="/reg" element={<Registration />} />
                  <Route path="/*">
                    <Route index element={<Posts />} />
                    <Route path=":id" element={<Post />} />
                  </Route>
                  <Route path="/login" element={<LogIn />} />
                  <Route
                    path="tabs"
                    element={<Tab title1="All" title2="Saved" title3="Liked" />}
                  />
                  <Route path="/confirm" element={<Confirm />} />
                  <Route path="/activation" element={<Activation />} />
                </Routes>
              </Wrapper>
            </BrowserRouter>
          </ContextSearchInput.Provider>
        </ContextTheme.Provider>
      </ErrorBoundary>
    </>
  );
}

export default App;
