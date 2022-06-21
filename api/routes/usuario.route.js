const usuarioController = require("../app/controllers/usuario.controller");
const { body } = require("express-validator/check");
const Usuario = require("../app/models/usuario.model");
const router = require("express").Router();

// /usuarios/all
//router.get("/all", usuarioController.findAll);

// /usuarios/:id
router.get("/:id", usuarioController.findOne);

// /usuarios/crear
/*
router.post('/crear', [
	// validation
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
], usuarioController.createOne);
    */

module.exports = router;
