import React, { useContext } from "react";
import AdminContext from "../../context/admin-context";
import AsistenciaItem from "../../components/AsistenciaItem";
import AsistenciaList from "../../components/AsistenciaList";

const Asistencia = ({ children }) => {
  const adminCtx = useContext(AdminContext);
  let asistenciaComps;
  if (adminCtx.asistencia.length > 0) {
    asistenciaComps = adminCtx.asistencia.map((asistenciaItem) => (
      <AsistenciaItem
        nombre={asistenciaItem.curso.nombre}
        nombreDocente={`${asistenciaItem.usuario.nombre} ${asistenciaItem.usuario.apellidos}`}
      >
        {`${asistenciaItem.tipo} a las ${asistenciaItem.hora}`}
      </AsistenciaItem>
    ));
  } else {
    asistenciaComps = null;
  }
  return <AsistenciaList>{asistenciaComps}</AsistenciaList>;
};

export default Asistencia;
