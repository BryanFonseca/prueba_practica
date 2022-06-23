const cursoController = require("../app/controllers/curso.controller");
const { body } = require("express-validator/check");
const Usuario = require("../app/models/usuario.model");
const Curso = require("../app/models/curso.model");
const router = require("express").Router();

// /cursos/all
router.get("/all", cursoController.findAll);

// encontrar cursos por id usuario
// /cursos/usuario/:id
router.get("/usuario/:id", cursoController.findByUserId);

router.delete("/eliminar", cursoController.deleteById);

// /cursos/crear
router.post(
  "/crear",
  [
    // validation
    body("usuarioId")
      .isNumeric()
      .withMessage("El id de usuario debe ser un número.")
      .custom(async (value) => {
        const [usuario] = await Usuario.findAll({
          where: {
            id: value,
          },
        });
        if (!usuario)
          throw new Error("No existe usuario con el id proporcionado.");
        if (usuario.rol === true)
          throw new Error("Un administrador no puede tener cursos asignados.");
        return true;
      })
      .custom(async (value) => {
        const cursosCount = await Curso.count({
          where: {
            usuarioId: value,
          },
        });
        // un docente no puede tener más de 3 cursos asociados
        if (cursosCount >= 3) {
          throw new Error(
            "Un docente no puede tener más de tres cursos asociados."
          );
        }
      }),
  ],
  cursoController.createByUserId
);

module.exports = router;
