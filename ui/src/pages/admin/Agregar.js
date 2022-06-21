import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import useHttp from "../../hooks/use-http";
import { API_BASE_URL } from "../../globals";
import AdminContext from "../../context/admin-context";

const Agregar = (props) => {
  const adminCtx = useContext(AdminContext);
  const history = useHistory();
  const cancelarHandler = () => {
    history.goBack();
  };
  const { sendRequest: agregarCursoRequest } = useHttp();
  const formik = useFormik({
    initialValues: {
      profesorId: "",
      nombre: "",
      horaInicio: "",
      horaSalida: "",
      fechaInicio: "",
    },
    onSubmit: (values) => {
      sendRequest({
        method: "POST",
        url: `${API_BASE_URL}/cursos/crear`,
        body: {
          usuarioId: values.profesorId,
          nombre: values.nombre,
          horaInicio: values.horaInicio,
          horaSalida: values.horaSalida,
          fechaInicio: values.fechaInicio,
        },
      }).then((response) => {
        adminCtx.dispatchCursosAction({
          type: "ADD",
          payload: {
            id: response.cursoId,
            nombre: values.nombre,
            horaInicio: values.horaInicio,
            horaSalida: values.horaSalida,
            fechaInicio: values.fechaInicio,
            docente: {
              nombre: "",
              apellidos: "",
              id: 0,
            },
          },
        });
        history.replace("/admin/all");
        console.log(response);
      });
    },
  });

  const [profesores, setProfesores] = useState([]);
  const { sendRequest } = useHttp();
  useEffect(() => {
    sendRequest({
      method: "GET",
      url: `${API_BASE_URL}/usuarios/all`,
    }).then(({ data: profesores }) => {
      setProfesores(profesores);
    });
  }, []);

  let profesorOptions;
  if (profesores.length > 0) {
    profesorOptions = [
      <option key="-1" value="-1">
        --ninguno--
      </option>,
      ...profesores.map((profesor) => (
        <option
          key={profesor.id}
          value={profesor.id}
        >{`${profesor.nombre} ${profesor.apellidos}`}</option>
      )),
    ];
  } else {
    profesorOptions = [
      <option key="-1" value="-1">
        --ninguno--
      </option>,
    ];
  }

  return (
    <header>
      <h2>Agregar ...</h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="nombre">Nombre de curso</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formik.values.nombre}
          onChange={formik.handleChange}
        ></input>
        <label htmlFor="profesorId">Profesor</label>
        <select
          id="profesorId"
          name="profesorId"
          value={formik.values.profesorId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          {profesorOptions}
        </select>
        <label htmlFor="horaInicio">Hora de inicio</label>
        <input
          type="time"
          id="horaInicio"
          name="horaInicio"
          value={formik.values.horaInicio}
          onChange={formik.handleChange}
        ></input>
        <label htmlFor="horaFin">Hora de salida</label>
        <input
          type="time"
          id="horaFin"
          name="horaSalida"
          value={formik.values.horaSalida}
          onChange={formik.handleChange}
        ></input>
        <label htmlFor="fechaInicio">Fecha de inicio</label>
        <input
          type="date"
          id="fechaInicio"
          name="fechaInicio"
          value={formik.values.fechaInicio}
          onChange={formik.handleChange}
        ></input>
        <button type="submit">Agregar</button>
      </form>
      <button onClick={cancelarHandler}>Cancelar</button>
    </header>
  );
};

export default Agregar;
