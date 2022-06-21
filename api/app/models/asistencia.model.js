const sequelize = require("../../config/index");
const Sequelize = require("sequelize");

const Asistencia = sequelize.define("asistencias", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  hora: {
    type: Sequelize.TIME,
    allowNull: false,
  },
  tipo: {
    // true: entrada; false: salida
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  fechaInicio: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
});

module.exports = Asistencia;
