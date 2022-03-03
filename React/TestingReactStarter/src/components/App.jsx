import { Route, Switch } from "react-router-dom";
import "./App.css";
import Search from "./Search";
import ContactDetails from "./ContactDetails";
import CreateContact from "./CreateContact";
import ErrorBoundary from "./ErrorBoundary";
import { UserProvider } from "../context/UserContext";

function App() {
  return (
    <>
      <UserProvider>
        <Switch>
          <Route path="/create">
            <CreateContact />
          </Route>
          <Route path="/:id">
            <ErrorBoundary>
              <ContactDetails />
            </ErrorBoundary>
          </Route>
          <Route path="/">
            <Search />
          </Route>
        </Switch>
      </UserProvider>
    </>
  );
}

export default App;
