const Usuario = require("../models/usuario.model");

exports.findOne = async (req, res, next) => {
  try {
    const usuarios = await Usuario.findAll();
    const usuariosParsed = usuarios.map((usuario) => ({
      id: usuario.id,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      cedula: usuario.n_cedula,
      fechaNacimiento: usuario.fecha_nacimiento,
    }));
    res.status(200).json({
      data: usuariosParsed,
    });
  } catch (err) {
    next(err);
  }
};
