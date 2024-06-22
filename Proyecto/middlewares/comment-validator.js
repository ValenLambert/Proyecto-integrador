const {body} =  require("express-validator"); 

const commentValidations = [
    body("comentario")
    .notEmpty()
    .withMessage("escribe un comentario")
    .isLength({ min: 4 })
    .withMessage('El comentario debe tener al menos 4 caracteres')
   ]

module.exports = commentValidations; 