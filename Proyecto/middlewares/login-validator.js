const bcryptjs = require('bcryptjs');
const db = require('../database/models')
// requerimos el body de express validator
const {body} =  require("express-validator"); // y ya podemos acceder a sus metodos. 

const loginValidations = [
    // con un body y vamos a fijarnos en nuetsra vista como le pusimos en el name. efectivamente es email. 
    body("email")
    // como validamos que no llegue vacio? con notempty
    .notEmpty()
    // si esta vacio, qu elo complete
    .withMessage("debes completar tu email")
    .isEmail()
    .withMessage("debes escribir un formato de correo valido")
    .custom(function(value, {req}){
        // querrmos validar que el email este en labase de datos 
        return db.User.findOne({
            where: {email : value }
        })
        .then(function(userToLogin){
            if(!userToLogin){
                throw new Error ( "no existe un usuario con ese email ")
            }
        })
    }) 
    ,
    // validacion de la contrasena: 
    body("password")
    .notEmpty()
    .withMessage("Debes introducir un password") 
    
    // chequear que sea igual a la base de datos
    .custom(function(value, {req}){
        return db.User.findOne({
            where: {email: req.body.email}
        })

        .then(function(user){
            if (user){
                const password = user.password; // es el password que tiene la base de datos, no el que estoy comparando con lo que puso el susuario
                // ahora si la comparo con la que puso el usuario
                const passwordOk = bcryptjs.compareSync(value, contraseña);
                if(!passwordOk){
                    throw new Error ("contrasena incorrecta")
                }
            }
        })
    })

]

// para pdoer acceder, debemos exportarla 

module.exports = loginValidations; 