var express = require('express');
var router = express.Router();
let profileController = require("../controllers/profileController");
const registerValidation = require("../middlewares/register-validator");
// requerimos las validaciones del login:
const loginValidations = require('../middlewares/login-validator')


router.get("/perfil/:id", profileController.perfil);

router.get('/register', profileController.index);

router.post('/register', registerValidation, profileController.store);

router.get("/login", profileController.loggueado);

router.post("/login", loginValidations, profileController.login);

router.get("/edit/:id", profileController.edit);

router.post("/edit/:id", registerValidation, profileController.changes);

router.get("/logout", profileController.logout);

module.exports = router;