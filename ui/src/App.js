import { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import AppContext from "./context/app-context";

function App() {
  const ctx = useContext(AppContext);
  console.log(ctx);
  return (
    <Switch>
      <Route path="/" exact>
        Main Page
      </Route>
    </Switch>
  );
}

export default App;
