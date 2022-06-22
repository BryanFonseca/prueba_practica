const UsuarioService = require("../services/usuario.service");

exports.findAllProfesores = (req, res, next) => {
  UsuarioService.findAllProfesores(req, res, next);
};

exports.findOne = (req, res, next) => {
  UsuarioService.findOne(req, res, next);
};
