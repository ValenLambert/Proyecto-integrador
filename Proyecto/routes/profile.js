var express = require('express');
var router = express.Router();
let profileController = require ("../controllers/profileController");
const registerValidation = require ("../middlewares/register-validator");
// requerimos las validaciones del login:
const loginValidations = require('../middlewares/login-validator')

//router.get ("/", profileController.index);
//router.get ("/edit", profileController.edit);
router.get("/", profileController.perfil);
router.get('/register', profileController.index);
router.post('/register', registerValidation, profileController.store); 
router.get("/login", profileController.loggueado);
router.post ("/login", loginValidations, profileController.login);

router.get ("/logout", profileController.logout);

module.exports = router;