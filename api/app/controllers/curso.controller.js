const cursoService = require("../services/curso.service");

exports.findAll = (req, res, next) => {
  cursoService.findAll(req, res, next);
};

exports.findByUserId = (req, res, next) => {
  cursoService.findByUserId(req, res, next);
};

exports.createByUserId = (req, res, next) => {
  cursoService.createByUserId(req, res, next);
};

exports.deleteById = (req, res, next) => {
  cursoService.deleteById(req, res, next);
};
