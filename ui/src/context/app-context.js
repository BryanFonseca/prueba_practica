import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../globals";
import useHttp from "../hooks/use-http";
import AuthContext from "./auth-context";

// fill up for autocompletion help
const AppContext = createContext({});

export const AppContextProvider = (props) => {
  const authCtx = useContext(AuthContext);
  const [cursos, setCursos] = useState([]);
  const { sendRequest } = useHttp();
  useEffect(() => {
    sendRequest({
      method: "GET",
      url: `${API_BASE_URL}/cursos/usuario/${authCtx.userInfo.usuarioId}`,
    }).then(({ data: cursos }) => {
      setCursos(cursos);
    });
  }, []);
  return (
    <AppContext.Provider
      value={{
        cursos,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
