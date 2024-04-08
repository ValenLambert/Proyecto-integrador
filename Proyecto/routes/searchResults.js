var express = require('express');
var router = express.Router();

router.get ("/", searchResultsController.index)

module.exports = router;