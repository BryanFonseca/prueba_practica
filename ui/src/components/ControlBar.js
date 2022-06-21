import React from "react";
import classes from "./ControlBar.module.css";
import { useHistory } from "react-router-dom";

const ControlBar = () => {
  const history = useHistory();
  const agregarHandler = () => {
    history.push("/admin/agregar");
  };
  return (
    <div className={classes.controlBar}>
      <button onClick={agregarHandler}>Agregar</button>
      <div>
        <label htmlFor="filtro">Filtro</label>
        <select id="filtro">
          <option>NombreRandom</option>
        </select>
      </div>
    </div>
  );
};

export default ControlBar;
