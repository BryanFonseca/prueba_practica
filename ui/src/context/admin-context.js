import { createContext, useState, useReducer, useEffect } from "react";
import useHttp from "../hooks/use-http";
import { API_BASE_URL } from "../globals";

// fill up for autocompletion help
const AdminContext = createContext({});

const cursosReducer = (state, action) => {
  if (action.type === "REPLACE") {
    return [...action.payload];
  }
  if (action.type === "DELETE") {
    const filtered = state.filter((curso) => curso.id !== action.payload.id);
    return filtered;
  }
  if (action.type === "ADD") {
    return [action.payload, ...state];
  }
  return {
    ...state,
  };
};

export const AdminContextProvider = (props) => {
  const [cursos, dispatchCursosAction] = useReducer(cursosReducer, []);
  const [asistencia, setAsistencia] = useState([]);
  const { sendRequest } = useHttp();

  useEffect(() => {
    sendRequest({
      method: "GET",
      url: `${API_BASE_URL}/cursos/all`,
    }).then(({ data: cursos }) => {
      dispatchCursosAction({ type: "REPLACE", payload: cursos });
    });
  }, []);

  useEffect(() => {
    sendRequest({
      method: "GET",
      url: `${API_BASE_URL}/asistencia/all`,
    }).then(({ data: asistencias }) => {
      setAsistencia(asistencias);
    });
  }, []);

  return (
    <AdminContext.Provider
      value={{
        cursos,
        dispatchCursosAction,
        asistencia,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
