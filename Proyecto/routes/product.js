var express = require('express');
var router = express.Router();
let productController = require ("../controllers/productController");
let productValidations = require("../middlewares/product-validator")

router.get ("/detail/:id", productController.index);
router.get ("/create", productController.create);

router.post ("/store", productValidations, productController.store)

module.exports = router;