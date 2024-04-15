var express = require('express');
var router = express.Router();
let headerLogueadoController = require ("../controllers/headerLogueadoController")

router.get ("/", headerLogueadoController.index);

module.exports = router;