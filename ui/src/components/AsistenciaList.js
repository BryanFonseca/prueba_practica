import React from "react";
import classes from "./AsistenciaList.module.css";

const AsistenciaList = ({ children }) => {
  return <ul className={classes.container}>{children}</ul>;
};

export default AsistenciaList;
