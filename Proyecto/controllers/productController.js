const db = require("../db/index");

const productController= {
        index: function (req, res) {
            return res.render("profile", {
                db: db
            });
        }
    }

module.exports = productController