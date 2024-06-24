const bcryptjs = require('bcryptjs');
const db = require('../database/models')
const { body } = require('express-validator');



let productValidations = [
    body("nombre")
        .notEmpty() // que no este vacio
        .withMessage("Debes completar este campo"),


    body("descripcion")
        .notEmpty()
        .withMessage("Debes escribir un tetxo descriptivo")
        .trim(), // para eliminar los eslpacios en blanco que puedan haber 


    body("imagen")
        .notEmpty()
        .withMessage("Debes seleccionar una imagen")
        .isURL().withMessage('Este campo debe ser una URL válida.')
]

module.exports = productValidations;