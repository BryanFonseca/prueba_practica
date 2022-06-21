require("dotenv").config();
const sequelize = require("./config/index");
const Usuario = require("./app/models/usuario.model");
const bcrypt = require("bcryptjs");

async function init() {
  try {
    await sequelize.sync();
    const pass = "12345";
    const hashedPass = await bcrypt.hash(pass, 12);

    /////////////USUARIOS////////////////
    // usuario: 0959316472 pass: 12345 // admin
    // usuario: 1205102294 pass: 12345 // profesor
    // usuario: 1234567890 pass: 12345 // profesor
    await Usuario.bulkCreate([
      {
        nombre: "Bryan",
        apellidos: "Fonseca Toala",
        contrasenya: hashedPass,
        n_cedula: "0959316472",
        fecha_nacimiento: "2001-05-06",
        rol: true,
      },
      {
        nombre: "Isaac",
        apellidos: "Toala Bayas",
        contrasenya: hashedPass,
        n_cedula: "1205102294",
        fecha_nacimiento: "2000-05-02",
        rol: false,
      },
      {
        nombre: "Henry",
        apellidos: "Moyano Ramirez",
        contrasenya: hashedPass,
        n_cedula: "1234567890",
        fecha_nacimiento: "1995-05-02",
        rol: false,
      },
    ]);
    console.log("Usuarios creados correctamente.");
  } catch (err) {
    console.log(err.message);
  } finally {
    process.exit();
  }
}

init();
