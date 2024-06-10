const db = require("../database/models");

const productController= {
        index: function (req, res) {
                db.Products.findAll()
                .then (function (data){
                    return res.render('product', { Products: data })

                })
                .catch(function(error){
                    console.log(error);
                })
        },
        add: function (req, res) {
                db.Products.findAll()
                .then (function (data){
                    return res.render('productAdd', { Products: data })
    
                })
                .catch(function(error){
                    console.log(error);
                })
        }
    }

module.exports = productController