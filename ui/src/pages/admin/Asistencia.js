import React, { useContext } from "react";
import AdminContext from "../../context/admin-context";

const Asistencia = ({ children }) => {
  const adminCtx = useContext(AdminContext);
  let asistenciaComps;
  if (adminCtx.asistencia.length > 0) {
    asistenciaComps = adminCtx.asistencia.map((asistenciaItem) => (
      <li>
        <h3>{`${asistenciaItem.curso.nombre}`} </h3>
        <p>{`${asistenciaItem.tipo} a las ${asistenciaItem.hora}`}</p>
      </li>
    ));
  } else {
    asistenciaComps = null;
  }
  return <ul>{asistenciaComps}</ul>;
};

export default Asistencia;
