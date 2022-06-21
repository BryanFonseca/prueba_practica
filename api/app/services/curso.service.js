const Curso = require("../models/curso.model");
const Usuario = require("../models/usuario.model");

exports.findAll = async (req, res, next) => {
  try {
    const cursos = await Curso.findAll({
      include: Usuario,
    });
    const cursosParsed = cursos.map((curso) => ({
      id: curso.id,
      nombre: curso.nombre,
      horaInicio: curso.horaInicio,
      horaSalida: curso.horaSalida,
      fechaInicio: curso.fechaInicio,
      docente: {
        id: curso.usuario.id,
        nCedula: curso.usuario.nCedula,
        nombre: curso.usuario.nombre,
        apellidos: curso.usuario.apellidos,
        // tal vez rol
      },
    }));
    res.status(200).json({
      data: cursosParsed,
    });
  } catch (err) {
    next(err);
  }
};

exports.findByUserId = async (req, res, next) => {
  try {
    const { id: usuarioId } = req.params;
    const cursos = await Curso.findAll({
      where: {
        usuarioId,
      },
    });
    const cursosParsed = cursos.map((curso) => ({
      id: curso.id,
      nombre: curso.nombre,
      horaInicio: curso.horaInicio,
      horaSalida: curso.horaSalida,
      fechaInicio: curso.fechaInicio,
    }));
    res.status(200).json({
      data: cursosParsed,
    });
  } catch (err) {
    next(err);
  }
};

exports.createByUserId = async (req, res, next) => {
  try {
    const { usuarioId, nombre, horaInicio, horaSalida, fechaInicio } = req.body;
    const cursoCreado = await Curso.create({
      usuarioId,
      nombre,
      horaInicio,
      horaSalida,
      fechaInicio,
    });
    res.status(200).json({
      cursoId: cursoCreado.id,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteById = async (req, res, next) => {
  try {
    const { cursoId } = req.body;
    const eliminado = await Curso.destroy({
      where: {
        id: cursoId,
      },
    });
    if (eliminado) {
      res.status(200).json({
        mensaje: "Se ha eliminado el curso con éxito",
      });
    }
  } catch (err) {
    next(err);
  }
};
