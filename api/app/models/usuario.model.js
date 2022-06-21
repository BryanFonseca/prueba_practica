const sequelize = require("../../config/index");
const Sequelize = require("sequelize");

const Usuario = sequelize.define("usuarios", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nCedula: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  apellidos: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  contrasenya: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fechaNacimiento: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  rol: {
    // true: admin; false: profesor
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Usuario;
