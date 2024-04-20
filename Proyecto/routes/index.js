var express = require('express');
var router = express.Router();
let indexController = require ("../controllers/indexController");


/* GET home page. */
router.get ("/", indexController.index);

router.get ("/buscar", function(req, res, next) {
  let buscar = req.query.search;
  res.send (buscar);
});

module.exports = router;
