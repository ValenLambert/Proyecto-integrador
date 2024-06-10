const db = require("../database/models");

const indexController= {
        index: function (req, res) {
            db.Products.findAll()
            .then (function (data){
                return res.render('index', { Products: data })

            })
            .catch(function(error){
                console.log(error);
            })

        },
        buscar: function(req, res, next) {
            let buscar = req.query.search;
            return res.render("searchResults", {
                buscar: buscar, 
                db: db
            });
    }
}

module.exports = indexController;