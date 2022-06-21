import React, { useContext } from "react";
import CursoAsistencia from "../components/CursoAsistencia";
import AppContext from "../context/app-context";

const Usuario = () => {
  const appCtx = useContext(AppContext);
  let cursosComps;
  if (appCtx.cursos.length > 0) {
    cursosComps = appCtx.cursos.map((curso) => {
      return (
        <CursoAsistencia key={curso.id} nombre={curso.nombre} id={curso.id} />
      );
    });
  } else {
    cursosComps = null;
  }
  return (
    <div>
      <ul>{cursosComps}</ul>
    </div>
  );
};

export default Usuario;
