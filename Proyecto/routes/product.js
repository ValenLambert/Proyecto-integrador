var express = require('express');
var router = express.Router();
let productController = require ("../controllers/productController");
let productValidations = require("../middlewares/product-validator")

router.get ("/detail/:id", productController.index);
router.get ("/add", productController.create); // misma ruta que el post, total son distintos metodos. 
router.post ("/add", productValidations, productController.store)

module.exports = router;