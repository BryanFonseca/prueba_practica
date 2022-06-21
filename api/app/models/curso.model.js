const sequelize = require("../../config/index");
const Sequelize = require("sequelize");

const Curso = sequelize.define("cursos", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  horaInicio: {
    type: Sequelize.TIME,
    allowNull: false,
  },
  horaSalida: {
    type: Sequelize.TIME,
    allowNull: false,
  },
  fechaInicio: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
});

module.exports = Curso;
