const db = require("../database/models"); // Para consultar la abse de datos. 
const op = db.Sequelize.Op
const {validationResult} =require ("express-validator")
const bcrypt = require('bcryptjs');


const productController= {
        index: function (req, res) {
            let id = req.params.id;

            db.Products.findByPk (id,
                 {
                include: [
                  { association: 'user' },
                   { association: 'comments',
                   include: { association: 'user' },
                   order: [['createdAt', 'DESC']] }
              ]
            })
            .then(data => {
                return res.render('product', {Products: data });
            })
            .catch(error => {
                console.log(error);
            })

        },

        // add: function (req, res) {
        //         db.Products.findAll()
        //         .then (function (data){
        //             return res.render('productAdd', { Products: data })
    
        //         })
        //         .catch(function(error){
        //             console.log(error);
        //         })
        // },

        create: function (req, res ) {
            //Control de acceso
        if(req.session.user == undefined){  // si no hay un usuario logueado, que directamente me redirija, para decirle, che no, te tenes que loguear primero. 
            return res.redirect('/register');
        } else {
            //Mostrar formulario de carga de crear, quiere decir que si estas logueado
            db.Products.findAll()
                .then( data => {
                    return res.render('productAdd', {
                        User: req.session.user,  // Pasar el usuario logueado a la vista
                        Products: data});
                })
                .catch(function (error) {
                    console.log(error);
                })
        }},

        store: function (req , res) {
            let errors = validationResult(req);
            // preguntamos si hay errores
            if (errors.errors.length > 0) {
            // si hay errores entrara a este condicional, y volveremos al formulario con los mensajes  
             
                db.Products.findAll()
                    .then(data => {
                        return res.render('productAdd', {
                            errors: errors.mapped(),
                            oldData: req.body,
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    })
                return;
            }
            //Método para guardar nuev producto .

            let id_delUsuario = req.session.user.id_delUsuario;
         console.log("iddelusuario", id_delUsuario)

        //1) Obtener datos del formulario
        let data = req.body;
        //2)Crear el producto nuevo.
        let producto  = {
            imagen: data.imagen,
            nombre: data.nombre,
            descripcion: data.descripcion,
            id_delUsuario: id_delUsuario, // para que se guarde el  id del usuario en el producto, pero chequearlo!! 
            createdAt: new Date() // seria la fecha actual de creación del producto
        }
        //3)Guardar aquel producto
        db.Products.create(producto)
            .then( function (producto) {
           
        //4)Redirección
                return res.redirect(`/product/detail/${id_delProducto}`, {
                    User: req.session.user,  // Pasar el usuario logueado a la vista
                    Products: producto});  // chequear!!!!
            })
            .catch(error => {
                console.log(error);
            })
    },
    newComment: function (req, res) {
        const resultValidation = validationResult(req) 
        if (!resultValidation.isEmpty()){
            return res.render( "product", 
            {errors: resultValidation.mapped(),
                oldData: req.body
            })
        } else {
        let data = req.body;
        let comentario = {
            descripcion: data.comentario,
            id_delProducto: id_delProducto,
            id_delUsuario: id_delUsuario
        }
        db.Comments.create(comentario)
        .then( function (comentario) {
                return res.redirect(`/product/detail/${id_delProducto}`);
                })
        .catch(error => {
            console.log(error);
        })}
    }

}

module.exports = productController;