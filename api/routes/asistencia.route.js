const asistenciaController = require("../app/controllers/asistencia.controller");
const { body } = require("express-validator/check");
const Asistencia = require("../app/models/asistencia.model");
const router = require("express").Router();
const auth = require("../app/middlewares/is_auth");

// /asistencia/all
router.get("/all", /*auth.isAuth, auth.isAdmin,*/ asistenciaController.findAll);

// asistencias por id de curso
// /asistencia/curso/id
router.get("/curso/:id", asistenciaController.findByCursoId);

// /asistencia/crear
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
  asistenciaController.createByCursoId
);

module.exports = router;
