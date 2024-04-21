const db = require("../db/index");

const indexController= {
        index: function (req, res) {
            return res.render("index", {
                db: db.productos
            });
        },
        buscar: function(req, res, next) {
            let buscar = req.query.search;
            return res.render("searchResults", {
                buscar: buscar, 
                db: db
            });
    }}

module.exports = indexController;