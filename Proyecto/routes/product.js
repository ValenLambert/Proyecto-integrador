var express = require('express');
var router = express.Router();

router.get ("/", productController.index)

module.exports = router;