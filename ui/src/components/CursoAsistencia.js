import React from "react";
import { API_BASE_URL } from "../globals";
import useHttp from "../hooks/use-http";

const CursoAsistencia = ({ nombre, id }) => {
  const { sendRequest: ingresarRequest } = useHttp();
  const { sendRequest: salirRequest } = useHttp();
  const ingresarHandler = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate();
    const fullDate = `${year}-${month}-${day}`;
    console.log(fullDate);
    const time = `${(date.getHours() + 1).toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    ingresarRequest({
      method: "POST",
      url: `${API_BASE_URL}/asistencia/crear/`,
      body: {
        tipo: "entrada",
        hora: time,
        fecha: fullDate,
        cursoId: id,
      },
    }).then(() => {
      alert("Entrada registrada con éxito.");
    });
  };
  const salirHandler = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate();
    const fullDate = `${year}-${month}-${day}`;
    console.log(fullDate);
    const time = `${(date.getHours() + 1).toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    console.log(time);
    salirRequest({
      method: "POST",
      url: `${API_BASE_URL}/asistencia/crear/`,
      body: {
        tipo: "salida",
        hora: time,
        fecha: fullDate,
        cursoId: id,
      },
    }).then(() => {
      alert("Salida registrada con éxito.");
    });
  };
  return (
    <li>
      <h3>{nombre}</h3>
      <button onClick={ingresarHandler}>Registrar ingreso</button>
      <button onClick={salirHandler}>Registrar salida</button>
    </li>
  );
};

export default CursoAsistencia;
