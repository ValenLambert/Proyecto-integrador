const db = require("../database/models"); // Para consultar la abse de datos. 
const op = db.Sequelize.Op


const indexController = {
    index: function (req, res) {
        let user = null;

        if (req.session.user && req.session.user.id_usuario) {
            const id = req.session.user.id_usuario;

            db.User.findByPk(id)
                .then(function (foundUser) {
                    user = foundUser;

                    return db.Products.findAll({
                        order: [
                            ["createdAt", "DESC"]
                        ],
                        include: [
                            { association: 'user' },
                            { association: 'comments' }
                        ]
                    });
                })
                .then(function (products) {
                    return res.render('index', { Products: products, User: user });
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            db.Products.findAll({
                order: [
                    ["createdAt", "DESC"]
                ],
                include: [
                    { association: 'user' },
                    { association: 'comments' }
                ]
            })
                .then(function (products) {
                    return res.render('index', { Products: products, User: null });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },

    buscar: function (req, res, next) {
        let info = req.query.search; //obtengo la info de la querystring.
        db.Products.findAll({
            where: {
                [op.or]: [
                    { nombre: { [op.like]: '%' + info + '%' } },
                    { descripcion: { [op.like]: '%' + info + '%' } }
                ]
            },
            order: [
                ["createdAt", "DESC"]
            ],
            include: [
                { association: 'user' },
                { association: 'comments' }
            ]
        })
            .then(function (data) {
                return res.render('searchResults', { Products: data, info: info, User: req.session.user });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

module.exports = indexController;