const UsuarioService = require("../services/usuario.service");

exports.findAll = (req, res, next) => {
  UsuarioService.findAll(req, res, next);
};

exports.findOne = (req, res, next) => {
  UsuarioService.findOne(req, res, next);
};
