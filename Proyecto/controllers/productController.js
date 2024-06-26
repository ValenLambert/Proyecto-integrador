const db = require("../database/models"); // Para consultar la abse de datos. 
const op = db.Sequelize.Op;
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

const productController = {
    index: function (req, res) {
        let user = null;
        let idProducto = req.params.id;

        if (req.session.user && req.session.user.id_usuario) {
            const id = req.session.user.id_usuario;

            db.User.findByPk(id)
                .then(function (foundUser) {
                    user = foundUser;

                    return db.Products.findByPk(idProducto, {
                        include: [
                            { association: 'user' },
                            {
                                association: 'comments',
                                include: { association: 'user' },
                                order: [['createdAt', 'DESC']]
                            }
                        ]
                    });
                })
                .then(function (products) {
                    return res.render('product', { Products: products, User: user });
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            db.Products.findByPk(idProducto, {
                include: [
                    { association: 'user' },
                    {
                        association: 'comments',
                        include: { association: 'user' },
                        order: [['createdAt', 'DESC']]
                    }
                ]
            })
                .then(function (products) {
                    return res.render('product', { Products: products, User: null });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    create: function (req, res) {
        // Control de acceso
        if (req.session.user == undefined) {  // Si no hay un usuario logueado
            return res.redirect('/users/register');  // Redirigir al usuario a la página de registro
        } else {
            // Mostrar formulario de carga de crear, quiere decir que estás logueado
            if (req.session.user && req.session.user.id_usuario) {
                const id = req.session.user.id_usuario;

                db.User.findByPk(id)
                    .then(function (foundUser) {
                        return res.render('productAdd', {
                            User: foundUser, // Pasar el usuario logueado a la vista   
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    },

    store: function (req, res) {
        let errors = validationResult(req);
        // preguntamos si hay errores
        if (!errors.isEmpty()) {
            // si hay errores entrara a este condicional, y volveremos al formulario con los mensajes  
            return res.render('productAdd', {
                errors: errors.mapped(),
                oldData: req.body,
                User: req.session.user
            })
                .catch(error => {
                    console.log(error);
                });
        } else {
            //Método para guardar nuevo producto.
            let id_delUsuario = req.session.user.id_usuario;
            //1) Obtener datos del formulario
            let data = req.body;
            //2) Crear el producto nuevo.
            let producto = {
                foto_producto: data.imagen,
                nombre: data.nombre,
                descripcion: data.descripcion,
                id_delUsuario: id_delUsuario, // para que se guarde el  id del usuario en el producto, pero chequearlo!! 
                //createdAt: new Date() // seria la fecha actual de creación del producto
            };
            //3) Guardar aquel producto
            db.Products.create(producto)
                .then(function (producto) {
                    //4) Redirección
                    return res.redirect(`/`);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    newComment: function (req, res) {
        const resultValidation = validationResult(req);
        if (!resultValidation.isEmpty()) {
            let idProducto = req.params.id;
            db.Products.findByPk(idProducto, {
                include: [
                    { association: 'user' },
                    {
                        association: 'comments',
                        include: { association: 'user' },
                        order: [['createdAt', 'DESC']]
                    }
                ]
            })
                .then(function (product) {
                    return res.render("product", {
                        errors: resultValidation.mapped(),
                        oldData: req.body,
                        User: req.session.user,
                        Products: product
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });

        } else {
            let data = req.body;
            let id_delProducto = req.params.id;
            let id_delUsuario = req.session.user.id_usuario;
            console.log("LA SESSION:", req.session)
            let comentario = {
                id_delProducto: id_delProducto,
                id_delUsuario: id_delUsuario,
                comentario: data.comentario,
            }
            db.Comments.create(comentario)
                .then(function (comentario) {
                    return res.redirect(`/product/detail/${id_delProducto}`);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    edit: function (req, res) {
        let id = req.params.id
        db.Products.findByPk(id)
            .then(function (product) {
                let idusuario = product.id_delUsuario
                console.log("ACACACACCACACACACACACACCACACA", req.session.user)

                if (req.session.user.id_usuario == idusuario) {
                    console.log("ACACACACCACACACACACACACCACACA", req.session.user)
                    return res.render("productEdit", { Products: product, User: req.session.user });
                } else {
                    return res.redirect(`/products/${id}`);
                }
            })
            .catch(error => {
                console.log(error);
            });
    },
    change: function (req, res) {
        const resultValidation = validationResult(req);
        if (!resultValidation.isEmpty()) {
            return res.render("productEdit", { errors: resultValidation.mapped(), oldData: req.body, User: req.session.user })
        }
        else {
            const id_producto = req.params.id;
            const producto = req.body
            db.Products.update(producto, {
                where: {
                    id_producto: id_producto
                }
            })
                .then(function (result) {
                    return res.redirect(`/product/detail/${id_producto}`)
                })
                .catch(function (err) {
                    console.log(err)
                })
        }
    },
    destroy: function (req, res) {
        // buscamos el id del producto a borrar: 
        let id = req.params.id;
        db.Comments.destroy({
            where: { id_delProducto: id }
        })
        db.Products.destroy({
            where: [
                { id_producto: id },
            ]
        })
            .then(() => {
                return res.redirect('/');
            })
            .catch(error => {
                console.log(error);
            })
    },
};

module.exports = productController;
