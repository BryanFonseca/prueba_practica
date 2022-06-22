import React from "react";
import classes from "./AsistenciaItem.module.css";

const AsistenciaItem = ({ nombre, nombreDocente, children }) => {
  return (
    <li>
      <div className={classes.top}>
        <h2>{nombre}</h2>
        <h3>{nombreDocente}</h3>
      </div>
      <p>{children}</p>
    </li>
  );
};

export default AsistenciaItem;
