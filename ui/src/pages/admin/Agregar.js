import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import useHttp from "../../hooks/use-http";
import { API_BASE_URL } from "../../globals";
import AdminContext from "../../context/admin-context";
import CursoForm from "../../components/forms/CursoForm";

const Agregar = (props) => {
  const adminCtx = useContext(AdminContext);
  const { sendRequest: agregarCursoRequest } = useHttp();
  const history = useHistory();

  const cancelarHandler = () => {
    history.goBack();
  };

  const submitHandler = (values) => {
    agregarCursoRequest({
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
      const docente = adminCtx.docentes.find(
        (profesor) => profesor.id === +values.profesorId
      );
      adminCtx.dispatchCursosAction({
        type: "ADD",
        payload: {
          id: response.cursoId,
          nombre: values.nombre,
          horaInicio: values.horaInicio,
          horaSalida: values.horaSalida,
          fechaInicio: values.fechaInicio,
          docente: {
            id: docente.id,
            nombre: docente.nombre,
            apellidos: docente.apellidos,
          },
        },
      });
      history.replace("/admin/all");
      //console.log(response);
    });
  };

  return (
    <header>
      <h2>Agregar ...</h2>
      <CursoForm onSubmit={submitHandler} />
      <button onClick={cancelarHandler}>Cancelar</button>
    </header>
  );
};

export default Agregar;
