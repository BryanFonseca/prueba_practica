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
    /*
    body("nombre")
      .isString()
      .withMessage("El nombre debe ser un string")
      .custom(async (value) => {
        const [encontrado] = await Usuario.findAll({
          where: {
            nombre: value,
          },
        });
        console.log(encontrado);
        if (encontrado) {
          throw new Error("Ya existe un usuario con ese nombre");
        }
      }),
    body("apellido").isString().withMessage("El apellido debe ser un string"),
    */
  ],
  cursoController.createByUserId
);

module.exports = router;
