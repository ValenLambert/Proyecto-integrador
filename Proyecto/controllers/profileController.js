const db = require("../database/models"); // Para consultar la abse de datos. 
const users = db.User;
const op = db.Sequelize.Op;  // todavia no lo usamos ... lo puse para despues 
// requerimos a express para las validaciones 
const {validationResult} =require ("express-validator")
const bcrypt = require('bcryptjs');


let profileController = {
    perfil: function (req,res)
         {res.send ("profile")},

    login: function (req, res) {
        // obtenemos los resultados de las validaciones:
        const resultValidation = validationResult(req) // le paso el objeto de request 
        if (!resultValidation.isEmpty()){
            return res.render( "login", 
            {errors: resultValidation.mapped(),
                oldData: req.body
            })
        } else {
            // Buscar el usuario que se quiere loguear 
        users.findOne({
            where:[{
                email: req.body.email,
            }],
        })
        // luego del findOne viene el then:
        .then(function(user){
          
          let validPassword = bcrypt.compareSync ( req.body.password, user.password) 
         console.log("validpassword? : ", validPassword); 
            // a la session le paso lo que acabo de buscar 
            req.session.user = user;
            // user es tood el objeto literal que nos trajo 
            //Si tildó el boton de recordame,  creamos la cookie. (como era un checkbox nos devuelve un booleano)
            if (req.body.rememberme != undefined) {
                // creamos la cookie:
                res.cookie('userId', user.id, { maxAge: 1000 * 60 * 100 }) // --> la cookie a los cinco minutos expira
            }
            return res.redirect('/')
        })
        .catch (function(err){
            console.log(err)
        })
        } },


    loggueado: function (req, res) {
            if (req.session.user !== undefined) {
            return res.redirect('/');
        } else {
            return res.render('login');
        }},

    index: function (req, res) {
        if (req.session.user !== undefined) {
            return res.redirect('/');
        } else {
            return res.render('register');
        }
    },
    store: function (req, res) {
         const resultValidation =  validationResult(req)
         if (!resultValidation.isEmpty()){
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
