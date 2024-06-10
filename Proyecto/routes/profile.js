var express = require('express');
var router = express.Router();
let profileController = require ("../controllers/profileController");
const registerValidation = require ("../middlewares/register-validator")


//router.get ("/", profileController.index);
//router.get ("/edit", profileController.edit);
router.get('/register', profileController.index);
// incluimos el middleware de validaciones entre el path y el controlador
router.post('/register', registerValidation, profileController.store); 


//router.get ("/login", profileController.login);

module.exports = router;