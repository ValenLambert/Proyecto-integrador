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