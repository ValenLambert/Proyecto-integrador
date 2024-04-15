var express = require('express');
var router = express.Router();
let profileController = require ("../controllers/profileController");


router.get ("/", profileController.index);
router.get ("/edit", profileController.edit);
router.get ("/register", profileController.register);
router.get ("/login", profileController.login);

module.exports = router;