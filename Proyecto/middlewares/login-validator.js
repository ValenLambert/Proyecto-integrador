const bcryptjs = require('bcryptjs');
const db = require('../database/models')
const { body } = require("express-validator"); // y ya podemos acceder a sus metodos. 

const loginValidations = [
    // con un body y vamos a fijarnos en nuetsra vista como le pusimos en el name. efectivamente es email. 
    body("email")
        // como validamos que no llegue vacio? con notempty
        .notEmpty().withMessage("Debes completar tu email")
        // si esta vacio, qu elo complete
        .isEmail().withMessage("Debes escribir un formato de correo valido")
        .custom(function (value, { req }) {
            // querrmos validar que el email este en labase de datos 
            return db.User.findOne({
                where: { email: value }
            })
                .then(function (userToLogin) {
                    if (!userToLogin) {
                        throw new Error("No existe un usuario con ese email ")
                    }
                })
        })
    ,
    // validacion de la contrasena: 
    body("contraseña")
        .notEmpty().withMessage("Debes introducir un password")
        // chequear que sea igual a la base de datos
        .custom(function (value, { req }) {
            return db.User.findOne({
                where: { email: req.body.email }
            })

                .then(function (user) {
                    if (user) {
                        // ahora si la comparo con la que puso el usuario
                        const passwordOk = bcryptjs.compareSync(value, user.contraseña);
                        if (!passwordOk) {
                            throw new Error("Contraseña incorrecta")
                        }
                    }
                })
        })

]

// para pdoer acceder, debemos exportarla 

module.exports = loginValidations; 