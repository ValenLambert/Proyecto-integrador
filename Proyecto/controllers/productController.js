const db = require("../db/index");

const productController= {
        index: function (req, res) {
            return res.render("product", {
                db: db
            });
        },
        add: function (req, res) {
            return res.render("productAdd", {
                db: db
            });
        }
    }

module.exports = productController