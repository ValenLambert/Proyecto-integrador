const {body}=require("express-validator")
const db = require("../database/models")

const registerValidation = [
    body ("email")
        .notEmpty().withMessage("Debes completar tu email")
        .isEmail().withMessage ("Formato de correo invalido")
        .custom(function(value,{ req}){
            return db.User.findOne({
                where: {email:value}
            })
            .then(function(user){
                if(user){
                    throw new Error("el email ya esta registrado")
                }
            })
        }),
    body ("usuario")
        .notEmpty().withMessage("Debes completar tu nombre")
    ,body ("contraseña")
        .notEmpty().withMessage("Ingrese una contraseña")
        .isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres')
]

module.exports =registerValidation;