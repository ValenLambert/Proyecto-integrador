const db = require("../database/models"); // Para consultar la abse de datos. 
const users = db.User;
const op = db.Sequelize.Op;  // todavia no lo usamos ... lo puse para despues 
// requerimos a express para las validaciones 
const {validationResult} =require ("express-validator")
const bcrypt = require('bcryptjs');


let profileController = {
    perfil: function (req,res)
         {res.send ("profile")},
        
    loggueado: function (req, res) {
        if (req.session.user !== undefined) {
            return res.redirect('/');
        } else {
            return res.render('login');
        }},

    login: function(req, res){
        //obtenemos los restultados de las validaciones       
        const resultValidation =  validationResult(req)
        if (!resultValidation.isEmpty()){
            return res.render ("login", {
                errors: resultValidation.mapped(),
                oldData:req.body})
        } else  {
            // preguntamos si hay errores y si los hay los enviamos a la vista, junto con lo q venia en el body         
            // Buscamos el usuario que se quiere loguear.
            db.User.findOne({
                where: [{email: req.body.email}]
            })
            .then( function ( user ) {
                //Seteamos la session con la info del usuario
                req.session.user = user;          
                //Si tildó recordame => creamos la cookie.
                if(req.body.recordarme != undefined){
                    res.cookie('userId', user.id, { maxAge: 1000 * 60 * 100})
                }
                return res.redirect('/');            
            })
            .catch( function(error) {
                console.log(error)
            }) 
        }
    },

    index: function (req, res) {
        if (req.session.user !== undefined) {
            return res.redirect('/');
        } else {
            return res.render('register');
        }
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
           const user = {
                email: req.body.email,
                contraseña: bcrypt.hashSync(req.body.contraseña, 10),
                fecha: req.body.fecha,
                DNI: req.body.DNI,
                foto: req.body.foto
            };
            db.User
            .create(user)
            .then(function (user) {
                return res.redirect("/users/login");
            })
            .catch(function (err) {
                console.log("Error al guardar el usuario", err);
            });
    }},
    logout: function(req,res){
        req.session.destroy();

        res.clearCookie('userId');
        
        return res.redirect('/')
    }


};

module.exports = profileController;
