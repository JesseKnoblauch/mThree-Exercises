import "./App.css";
import { Switch, Route } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import HomePage from "./pages/Homepage";

import WomensPage from "./pages/WomensPage";
import MensPage from "./pages/MensPage";
import SalePage from "./pages/SalePage";
import SeasonalCollection from "./pages/SeasonalCollection";

function App() {
  return (
    <>
      <NavigationBar />
      <Switch>
        <Route path="/men">
          <MensPage />
        </Route>
        <Route path="/women">
          <WomensPage />
        </Route>
        <Route path="/sale">
          <SalePage />
        </Route>
        <Route path="/seasonal">
          <SeasonalCollection />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
