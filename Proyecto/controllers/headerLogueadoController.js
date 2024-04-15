const db = require("../db/index");

  const headerLogueadoController = {
    index: function (req, res) {
        return res.render("headerLogueado", {
            db: db
        });
    }
}
  
  module.exports = headerLogueadoController;
  