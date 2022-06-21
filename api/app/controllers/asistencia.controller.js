const asistenciaService = require("../services/asistencia.service");

exports.findAll = (req, res, next) => {
  asistenciaService.findAll(req, res, next);
};

exports.findByCursoId = (req, res, next) => {
  asistenciaService.findByCursoId(req, res, next);
};

exports.createByCursoId = (req, res, next) => {
  asistenciaService.createByCursoId(req, res, next);
};
