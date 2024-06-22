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
                   { association: 'comments' }
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
                    return res.render('productAdd', {Products:data});
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
         console.log(id_delUsuario)

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
                return res.redirect(`/detail/${producto.id_producto}`); // no seria al detalle del producto con el id de ese producto? 
            })
            .catch(error => {
                console.log(error);
            })
    },




}

module.exports = productController;