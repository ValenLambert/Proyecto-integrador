const db = require("../db/index");

const profileController = {
    index: function (req, res) {
        return res.render("profile", {
            db: db
        });
    },
    edit: function (req, res) {
        return res.render("profileEdit", {
            db: db
        });
    },
    register: function (req, res) {
        return res.render("register", {
            db: db
        });
    },

    login: function (req, res) {
        return res.render("login", {
            db: db
        });
    },
}

module.exports = profileController;
