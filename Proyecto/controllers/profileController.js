const db = require("../db/index");

const profileController = {
    index: function (req, res) {
        return res.render("profile", {
            db: db
        });
    }
}

module.exports = profileController;
