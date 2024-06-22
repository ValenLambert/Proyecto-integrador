var express = require('express');
var router = express.Router();
let productController = require ("../controllers/productController");

router.get ("/detail/:id", productController.index);
router.get ("/add", productController.add);

// router.get("/create", productController.create).  //esta seria la que ya esta hecha, osea add no? 

router.post ("/store", productController.store)

module.exports = router;