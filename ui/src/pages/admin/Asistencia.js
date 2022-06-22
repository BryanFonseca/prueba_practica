import React, { useContext } from "react";
import AdminContext from "../../context/admin-context";
import AsistenciaItem from "../../components/AsistenciaItem";
import List from "../../components/List";

const Asistencia = ({ children }) => {
  const adminCtx = useContext(AdminContext);
  let asistenciaComps;
  if (adminCtx.asistencia.length > 0) {
    asistenciaComps = adminCtx.asistencia.map((asistenciaItem) => (
      <AsistenciaItem
        key={asistenciaItem.id}
        nombre={asistenciaItem.curso.nombre}
        nombreDocente={`${asistenciaItem.usuario.nombre} ${asistenciaItem.usuario.apellidos}`}
      >
        {`${asistenciaItem.tipo} a las ${asistenciaItem.hora}`}
      </AsistenciaItem>
    ));
  } else {
    asistenciaComps = null;
  }
  return (
    <div className="scrollableContainer">
      <List>{asistenciaComps}</List>
    </div>
  );
};

export default Asistencia;
