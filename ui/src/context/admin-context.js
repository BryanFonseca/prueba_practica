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
  const [docentes, setDocentes] = useState([]);
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

  useEffect(() => {
    sendRequest({
      method: "GET",
      url: `${API_BASE_URL}/usuarios/profesores/all`,
    }).then(({ data: usuarios }) => {
      // aquí técnicamente los usuarios no son solo docentes, pero de cualquier manera se filtrará con id
      setDocentes(usuarios);
    });
  }, []);

  return (
    <AdminContext.Provider
      value={{
        cursos,
        dispatchCursosAction,
        asistencia,
        docentes,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
