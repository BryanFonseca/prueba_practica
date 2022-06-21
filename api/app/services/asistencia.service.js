const Asistencia = require("../models/asistencia.model");
const Curso = require("../models/curso.model");
const Usuario = require("../models/usuario.model");

exports.findAll = async (req, res, next) => {
  try {
    const asistencias = await Asistencia.findAll({
      include: Curso,
    });
    const asistenciasParsed = asistencias.map((asistencia) => ({
      id: asistencia.id,
      hora: asistencia.hora,
      tipo: asistencia.tipo === true ? "llegada" : "salida",
      fecha: asistencia.fecha,
      curso: { id: asistencia.curso.id, nombre: asistencia.curso.nombre },
      usuario: {
        id: asistencia.curso.usuarioId,
      },
    }));
    res.status(200).json({
      data: asistenciasParsed,
    });
  } catch (err) {
    next(err);
  }
};

exports.findByCursoId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const asistencias = await Asistencia.findAll({
      where: {
        "$curso.id$": id,
      },
      include: {
        model: Curso,
        include: {
          model: Usuario,
        },
      },
    });
    const asistenciasParsed = asistencias.map((asistencia) => {
      return {
        id: asistencia.id,
        hora: asistencia.hora,
        tipo: asistencia.tipo === "true" ? "llegada" : "salida",
        fecha: asistencia.fecha,
      };
    });
    res.status(200).json({
      usuario: {
        id: asistencias[0].curso.usuario.id,
        nombre: asistencias[0].curso.usuario.nombre,
        apellidos: asistencias[0].curso.usuario.apellidos,
      },
      curso: {
        id: asistencias[0].curso.id,
        nombre: asistencias[0].curso.nombre,
      },
      asistencias: asistenciasParsed,
    });
    console.log(JSON.stringify(asistencias, null, 2));
  } catch (err) {
    next(err);
  }
};

exports.createByCursoId = async (req, res, next) => {
  try {
    const { tipo, hora, fecha, cursoId } = req.body;
    const tipoInterno = tipo === "llegada" ? true : false;
    const asistenciaCreada = await Asistencia.create({
      tipo: tipoInterno,
      hora,
      fecha,
      cursoId,
    });
    res.status(200).json({
      id: asistenciaCreada.id,
    });
  } catch (err) {
    next(err);
  }
};
