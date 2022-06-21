const jwt = require("jsonwebtoken");
const HttpError = require("../utils/http-error");
const Usuario = require("../models/usuario.model");
const bcrypt = require("bcryptjs");

const helpers = require("../utils/helpers");

exports.login = async (req, res, next) => {
  try {
    const { user, password } = req.body;
    helpers
      .validate(user)
      .isRequired(new HttpError("No se ha especificado el usuario.", 401))
      .isString(new HttpError("El nombre de usuario debe ser un string.", 401));

    helpers
      .validate(password)
      .isRequired(new HttpError("No se ha especificado la contraseña.", 401))
      .isString(new HttpError("La contraseña debe ser un string.", 401));

    const [usuarioEncontrado] = await Usuario.findAll({
      where: {
        nCedula: user,
      },
    });

    if (!usuarioEncontrado) throw new HttpError("Usuario no encontrado.", 401);

    const isEqual = await bcrypt.compare(
      password,
      usuarioEncontrado.contrasenya
    );

    if (!isEqual) throw new HttpError("Credenciales incorrectas.", 401);

    const key = process.env.AUTH_SECRET;

    const token = jwt.sign(
      {
        id: usuarioEncontrado.id,
        nombre: `${usuarioEncontrado.nombre} ${usuarioEncontrado.apellidos}`,
        cedula: usuarioEncontrado.n_cedula,
      },
      key,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      id: usuarioEncontrado.id,
      nombres: `${usuarioEncontrado.nombre} ${usuarioEncontrado.apellidos}`,
      isAdmin: usuarioEncontrado.rol,
      token,
    });
  } catch (err) {
    next(err);
  }
};
