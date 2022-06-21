import React from "react";
import classes from "./CursosList.module.css";

const CursosList = ({ children }) => {
  return <ul className={classes.container}>{children}</ul>;
};

export default CursosList;
