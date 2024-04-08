var express = require('express');
var router = express.Router();

router.get ("/", profileController.index)

module.exports = router;