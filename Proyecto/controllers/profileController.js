const db = require("../database/models");
const {validationResult} =require ("express-validator")
const bcrypt = require('bcryptjs');


let profileController = {
    index: function (req, res) {
        return res.render('register');
    },
    store: function (req, res) {
         //obtenemos los restultados de las validaciones
         const resultValidation =  validationResult(req)
         // preguntamos si hay errores y si los hay los enviamos a la vista, junto con lo q venia en el body
         if (!resultValidation.isEmpty()){
            console.log("errores: ", JSON.stringify(resultValidation,null,4));
            return res.render ("register", {
                errors: resultValidation.mapped(),
                oldData:req.body})
        } else {
       // Guardar un usuario en la db
           const user = {
                email: req.body.email,
                contraseña: bcrypt.hashSync(req.body.contraseña, 10),
                fecha: req.body.fecha,
                DNI: req.body.DNI,
                foto: req.body.foto

            };
        //creamos el usuario
            db.User
                .create(user)
                .then(function (user) {
                    return res.redirect("/login");
                })
                .catch(function (err) {
                    console.log("Error al guardar el usuario", err);
                });
    }}

};

module.exports = profileController;
