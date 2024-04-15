var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get ("/buscar", function(req, res, next) {
  let buscar = req.query.buscar;
  res.send (buscar);
});

module.exports = router;
