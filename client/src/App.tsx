import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import Header from "./components/Header/Header";
import Routing from "./Routing";
import Footer from "./components/Footer/Footer";
import "./App.scss"

const App = () => {
  const isBrowserDefaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const getDefaultTheme = () => {
    const localStorageTheme = localStorage.getItem('theme');
    const browserDefault = isBrowserDefaultDark ? 'dark' : 'light';
    return localStorageTheme || browserDefault;
  };

  const [theme, setTheme] = useState(getDefaultTheme());

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className={`theme-${theme}`}>
          <BrowserRouter>
            <Header />
            <Routing />
            {/* <Footer /> */}
          </BrowserRouter >
        </div>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
