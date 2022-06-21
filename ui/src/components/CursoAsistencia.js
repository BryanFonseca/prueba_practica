import React from "react";
import { API_BASE_URL } from "../globals";
import useHttp from "../hooks/use-http";

const CursoAsistencia = ({ nombre, id }) => {
  const { sendRequest: ingresarRequest } = useHttp();
  const { sendRequest: salirRequest } = useHttp();
  const ingresarHandler = () => {
    ingresarRequest({
      method: "POST",
      url: `${API_BASE_URL}/asistencia/crear/`,
      body: {
        tipo: "entrada",
        hora: "14:00",
        fecha: "2022-06-05",
        cursoId: id,
      },
    }).then(() => {
      alert("Entrada registrada con éxito.");
    });
  };
  const salirHandler = () => {
    salirRequest({
      method: "POST",
      url: `${API_BASE_URL}/asistencia/crear/`,
      body: {
        tipo: "salida",
        hora: "15:00",
        fecha: "2022-06-05",
        cursoId: id,
      },
    }).then(() => {
      alert("Salida registrada con éxito.");
    });
  };
  return (
    <div>
      <h3>{nombre}</h3>
      <button onClick={ingresarHandler}>Registrar ingreso</button>
      <button onClick={salirHandler}>Registrar salida</button>
    </div>
  );
};

export default CursoAsistencia;
