const db = require("../database/models"); // Para consultar la abse de datos. 
const op = db.Sequelize.Op

const productController= {
        index: function (req, res) {
            let id = req.params.id;

            db.Products.findByPk(id,
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
            //Método para guardar nuev producto .
        //1) Obtener datos del formulario
        let data = req.body;
        //2)Crear el producto nuevo.
        let producto  = {
            imagen: data.imagen,
            nombre: data.nombre,
            descripcion: data.descripcion
        }
        //3)Guardar aquel producto
        db.Products.create(producto)
            .then( (productoCreado) => {
        //4)Redirección
                return res.redirect('/');
            })
            .catch(error => {
                console.log(error);
            })
    },




}

module.exports = productController;