import React, { useContext } from "react";
import AuthContext from "../../context/auth-context";
import classes from "./Options.module.css";
import { NavLink } from "react-router-dom";

// las opciones disponibles dependen del tipo de usuario que esté loggeado
const Options = ({ children }) => {
  const { userInfo } = useContext(AuthContext);

  let opciones;
  if (userInfo.isAdmin) {
    opciones = (
      <>
        <NavLink activeClassName={classes.activeLink} to="/admin/all">
          <li>Cursos</li>
        </NavLink>
        <NavLink activeClassName={classes.activeLink} to="/admin/asistencia">
          <li>Asistencia</li>
        </NavLink>
      </>
    );
  } else {
    opciones = (
      <>
        <li>Asistencia</li>
      </>
    );
  }

  return <ul className={classes.options}>{opciones}</ul>;
};

export default Options;
