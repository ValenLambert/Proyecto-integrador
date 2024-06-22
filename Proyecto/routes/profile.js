var express = require('express');
var router = express.Router();
let profileController = require ("../controllers/profileController");
const registerValidation = require ("../middlewares/register-validator")
// requerimos las validaciones del login:
const loginValidations = require('../middlewares/login-validator')

//router.get ("/", profileController.index);
//router.get ("/edit", profileController.edit);
router.get('/register', profileController.index);
router.get("/login", profileController.loggueado);

// incluimos el middleware de validaciones entre el path y el controlador
router.post('/register', registerValidation, profileController.store); 

router.get ("/logout", profileController.logout);

// incluimos el middleware de validaciones entre el path y el controlador
router.post ("/login", loginValidations, profileController.login);

module.exports = router;