const db = require("../database/models"); // Para consultar la abse de datos. 
const users = db.User;
const op = db.Sequelize.Op;  // todavia no lo usamos ... lo puse para despues 
// requerimos a express para las validaciones 
const { validationResult } = require("express-validator")
const bcrypt = require('bcryptjs');


let profileController = {
    perfil: function (req, res) {
        let id = req.params.id;

        // Buscamos al usuario por su id e incluimos las asociaciones definidas en el modelo
        db.User.findByPk(id, {
            include: [
                {
                    association: 'products',
                    order: [['createdAt', 'DESC']] // Ordenar productos cronológicamente
                },
                { association: 'comments' }
            ]
        })

            .then(function (user) {
                console.log("IMPRIMIR!!!!", JSON.stringify(user));
                res.render("profile", { 
                     User: req.session.user,
                     usuario: user,
                    //  productos: user.productos,
                     })
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    loggueado: function (req, res) {
        if (req.session.user != undefined) {
            console.log(req.session.user)
            return res.redirect('/');
        } else {
            return res.render('login');
        }
    },

    login: function (req, res) {
        //obtenemos los restultados de las validaciones       
        const resultValidation = validationResult(req)
        if (!resultValidation.isEmpty()) {
            return res.render("login", {
                errors: resultValidation.mapped(),
                oldData: req.body,
            },
                console.log(resultValidation.mapped()))
        } else {
            // preguntamos si hay errores y si los hay los enviamos a la vista, junto con lo q venia en el body         
            // Buscamos el usuario que se quiere loguear.
            db.User.findOne({
                where: [{ email: req.body.email }]
            })
                .then(function (user) {
                    //Seteamos la session con la info del usuario
                    req.session.user = user;
                    //Si tildó recordame => creamos la cookie.
                    if (req.body.recordarme != undefined) {
                        res.cookie('userId', user.id, { maxAge: 1000 * 60 * 100 })
                    }
                    return res.redirect(`/users/perfil/${user.id_usuario}`);
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    },

    index: function (req, res) {
        if (req.session.user != undefined) {
            return res.redirect('/');
        } else {
            return res.render('register');
        }
    },
    store: function (req, res) {
        //obtenemos los restultados de las validaciones
        const resultValidation = validationResult(req)
        // preguntamos si hay errores y si los hay los enviamos a la vista, junto con lo q venia en el body
        if (!resultValidation.isEmpty()) {
            console.log("errores: ", JSON.stringify(resultValidation, null, 4));
            return res.render("register", {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
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
        }
    },
    edit: function (req, res) {
        const id = req.params.id;
        if (req.session.user.id_usuario == id) {
            db.User.findByPk(id)
                .then(function (edit) {
                    res.render("profileEdit", { User: edit })
                })
                .catch(function (err) {
                    console.log(err)
                })
        } else {
            res.redirect(`/users/perfil/${id}`)
        }
    },
    changes: function (req, res) {
        if (req.body.contraseña != "") {
            const resultValidation = validationResult(req)
            // preguntamos si hay errores y si los hay los enviamos a la vista, junto con lo q venia en el body
            if (!resultValidation.isEmpty()) {
                console.log("ESTAS ACAA MIRA ESTO errores: ", JSON.stringify(resultValidation, null, 4));
                return res.render("profileEdit", {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    User: req.session.user
                })
            } else {
                console.log("222 ESTAS ACAA MIRA ESTO errores: ", JSON.stringify(resultValidation, null, 4));
                const id = req.params.id;
                const fecha = req.body.fecha;
                const DNI = req.body.DNI;
                const contraseña = req.body.contraseña;
                const foto = req.body.foto
                db.User.update({
                    contraseña: bcrypt.hashSync(contraseña, 10),
                    fecha: fecha,
                    DNI: DNI,
                    foto: foto
                },
                    {
                        where: {
                            id_usuario: id
                        }
                    })
                    .then(function (result) {
                        return res.redirect(`/users/perfil/${id}`)
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            }
        } else {
            console.log("3333 ESTAS ACAA MIRA ESTO errores: ");

            const id = req.params.id;
            const fecha = req.body.fecha;
            const DNI = req.body.DNI;
            const foto = req.body.foto;
            console.log("ESTAS ACAAAAAA")
            db.User.update({
                fecha: fecha,
                DNI: DNI,
                foto: foto
            },
                {
                    where: {
                        id_usuario: id
                    }
                })
                .then(function (result) {
                    return res.redirect(`/users/perfil/${id}`)
                })
                .catch(function (err) {
                    console.log(err)
                })
        }
    },
    logout: function (req, res) {
        req.session.destroy();

        res.clearCookie('userId');

        return res.redirect('/')
    },

};

module.exports = profileController;
