import React, { useContext } from "react";
import ControlBar from "../../components/ControlBar";
import CursoItem from "../../components/CursoItem";
import List from "../../components/List";
import AdminContext from "../../context/admin-context";

const AllCursos = () => {
  const { cursos } = useContext(AdminContext);
  let cursosComponents;
  if (cursos.length > 0) {
    cursosComponents = cursos.map((curso) => (
      <CursoItem
        key={curso.id}
        id={curso.id}
        nombre={curso.nombre}
        horaInicio={curso.horaInicio}
        horaSalida={curso.horaSalida}
        nombreDocente={`${curso.docente.nombre} ${curso.docente.apellidos}`}
      />
    ));
  } else {
    cursosComponents = null;
  }
  return (
    <>
      <header>
        <h2>Todos los Cursos</h2>
      </header>
      <ControlBar />
      <section className="scrollableContainer">
        <List>{cursosComponents}</List>
      </section>
    </>
  );
};

export default AllCursos;
