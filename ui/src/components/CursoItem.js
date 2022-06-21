import React, { useContext } from "react";
import AdminContext from "../context/admin-context";
import { API_BASE_URL } from "../globals";
import useHttp from "../hooks/use-http";
import classes from "./CursoItem.module.css";

const CursoItem = ({
  id,
  nombre,
  horaInicio,
  horaSalida,
  nombreDocente,
  docenteId,
}) => {
  const adminCtx = useContext(AdminContext);
  const { sendRequest } = useHttp();
  const eliminarHandler = () => {
    sendRequest({
      method: "DELETE",
      url: `${API_BASE_URL}/cursos/eliminar`,
      body: {
        cursoId: id,
      },
    }).then((data) => {
      adminCtx.dispatchCursosAction({ type: "DELETE", payload: { id } });
    });
  };

  return (
    <li className={classes.cursoContainer}>
      <div className={classes.info}>
        <h3>{nombre}</h3>
        <p>{`De ${horaInicio} hasta ${horaSalida}`}</p>
        <p>{`Dictado por ${nombreDocente}`}</p>
      </div>
      <div>
        <button>Editar</button>
        <button onClick={eliminarHandler}>Eliminar</button>
      </div>
    </li>
  );
};

export default CursoItem;
