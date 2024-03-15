import Routing from "./Rutiranje";
import UserMenu from "./components/ProfilPrijava/ProfilPrijava";
import { BrowserRouter } from "react-router-dom";
import "./App.scss"

const App = () => {
  return (
    <BrowserRouter>
      <UserMenu />
      <Routing />
    </BrowserRouter>
  );
};

export default App;