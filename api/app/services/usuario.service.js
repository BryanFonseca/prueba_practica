const Usuario = require("../models/usuario.model");

exports.findAllProfesores = async (req, res, next) => {
  try {
    const usuarios = await Usuario.findAll({
      where: {
        rol: false,
      },
    });
    const usuariosParsed = usuarios.map((usuario) => ({
      id: usuario.id,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      nCedula: usuario.nCedula,
      fechaNacimiento: usuario.fechaNacimiento,
    }));
    res.status(200).json({
      data: usuariosParsed,
    });
  } catch (err) {
    next(err);
  }
};
