const db = require("../database/models"); // Para consultar la abse de datos. 
const op = db.Sequelize.Op


const indexController= {
        index: function (req, res) {
            db.Products.findAll({
                order: [
                    ["createdAt", "DESC"]
                ]
            })
            .then (function (data){
                return res.render('index', { Products: data })

            })
            .catch(function(error){
                console.log(error);
            })

        },
        buscar: function(req, res, next) {
            let info = req.query.search; //obtengo la info de la querystring.
            db.Products.findAll({
                where: [
                    { nombre: {[op.like]: '%'+info+'%'}}
                ]})
                .then(function(data){
                    return res.render('searchResults',{Products: data, info: info});
                })
                .catch(function(error){
                    console.log(error);
                });
    }
}

module.exports = indexController;