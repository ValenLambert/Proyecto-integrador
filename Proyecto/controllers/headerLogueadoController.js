const db = require("../database/models");

  const headerLogueadoController = {
    index: function (req, res) {
        return res.render("headerLogueado", {
            db: db
        });
    }
}
  
  module.exports = headerLogueadoController;
  