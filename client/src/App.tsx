import Routing from "./Rutiranje";
import { BrowserRouter } from "react-router-dom";
import "./App.scss"

const App = () => {
  return (
    <BrowserRouter>
       <Routing />
    </BrowserRouter>
  );
};

export default App;