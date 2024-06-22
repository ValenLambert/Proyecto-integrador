const db = require("../database/models"); // Para consultar la abse de datos. 
const users = db.User;
const op = db.Sequelize.Op;  // todavia no lo usamos ... lo puse para despues 
// requerimos a express para las validaciones 
const {validationResult} =require ("express-validator")
const bcrypt = require('bcryptjs');


let profileController = {

    login: function (req, res) {
        // obtenemos los resultados de las validaciones:
        const resultValidation = validationResult(req) // le paso el objeto de request 
        if (!resultValidation.isEmpty()){
            // si hay errores, los m,ando a la vista, a login :
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
         //obtenemos los restultados de las validaciones
         const resultValidation =  validationResult(req)
         // preguntamos si hay errores y si los hay los enviamos a la vista, junto con lo q venia en el body
         if (!resultValidation.isEmpty()){
            console.log("errores: ", JSON.stringify(resultValidation,null,4));
            return res.render ("register", {
                errors: resultValidation.mapped(),
                oldData:req.body})
        } else {
       // Guardar un usuario en la db, creamos un ob con los datos del ussuario
           const user = {
                email: req.body.email,
                contraseña: bcrypt.hashSync(req.body.contraseña, 10),
                fecha: req.body.fecha,
                DNI: req.body.DNI,
                foto: req.body.foto
            };
        //una vez que tenemos el usuario capturado, creamos el usuario
            db.User
                .create(user)
                .then(function (user) {
                    return res.redirect("/users/login"); // te redirecciona a la pagina del login
                })
                .catch(function (err) {
                    console.log("Error al guardar el usuario", err);
                });
    }},
    logout: function(req,res){
        //Destruir la sessión, se borra tood lo que tenia session
        req.session.destroy();

        //Destruir la coockie tambien, porque sino se vuelve a cerar la cookie
         res.clearCookie('userId');
        
        //redireccionar a home
        return res.redirect('/')
    }


};

module.exports = profileController;
