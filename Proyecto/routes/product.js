var express = require('express');
var router = express.Router();
let productController = require ("../controllers/productController");
let productValidations = require("../middlewares/product-validator");
let commentValidations= require("../middlewares/comment-validator");

router.get ("/detail/:id", productController.index);
router.get ("/add", productController.create); // misma ruta que el post, total son distintos metodos. 

router.post ("/add", productValidations, productController.store)

router.post("/detail/:id",commentValidations, productController.newComment)

router.get('/edit/:id', productController.edit);

router.post('/edit/:id', productValidations, productController.change);

router.post("/delete/:id", productController.delete);

module.exports = router;