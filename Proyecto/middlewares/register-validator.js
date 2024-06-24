const { body } = require("express-validator")
const db = require("../database/models")

const registerValidation = [
    body("email")
        .notEmpty().withMessage("Debes completar tu email")
        .isEmail().withMessage("Formato de correo invalido")
        .custom((value, { req }) => {
            if (req.session && req.session.user && value === req.session.user.email) {
                return Promise.resolve();
            } else {
                return db.User.findOne({
                    where: { email: value }
                }).then(user => {
                    if (user) {
                        throw new Error("El email ya está registrado");
                    }
                });
            }
        }),
    body("usuario")
        .notEmpty().withMessage("Debes completar tu nombre")
    , body("contraseña")
        .notEmpty().withMessage("Ingrese una contraseña")
        .isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres')
    , body ("fecha")
     .notEmpty().withMessage("Debes completar tu fecha de nacimiento")

]

module.exports = registerValidation;