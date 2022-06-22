import { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AppContext, { AppContextProvider } from "./context/app-context";
import Login from "./pages/Login";
import Admin from "./pages/admin/Admin";
import Usuario from "./pages/Usuario";
import Layout from "./components/layout/Layout";
import Agregar from "./pages/admin/Agregar";
import AllCursos from "./pages/admin/AllCursos";
import AdminContext from "./context/admin-context";
import { AdminContextProvider } from "./context/admin-context";
import AuthContext from "./context/auth-context";
import Asistencia from "./pages/admin/Asistencia";

function App() {
  const { userInfo } = useContext(AuthContext);
  const adminCtx = useContext(AdminContext);
  return (
    <Switch>
      <Route path="/" exact>
        <Login />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Layout>
        {userInfo.isAdmin ? (
          <AdminContextProvider>
            <Route path="/admin/agregar">
              <Agregar />
            </Route>
            <Route path="/admin/asistencia">
              <Asistencia />
            </Route>
            <Route path="/admin/all">
              <AllCursos />
            </Route>
          </AdminContextProvider>
        ) : null}

        {userInfo.isAdmin === false && (
          <AppContextProvider>
            <Route path="/docente/">
              <Usuario />
            </Route>
          </AppContextProvider>
        )}
      </Layout>
    </Switch>
  );
}

export default App;
