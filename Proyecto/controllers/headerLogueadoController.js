const headerLogueadoController = {
    index: function(req, res, next) {
      // ahora quieor que obtenga el nombre de usuario del modulo de datos
      const usuario = db.usuario.usuario;
  
      // ahora q me renderice la vista 'profileEdit' y pasar el nombre de usuario
      res.render('profileEdit', { usuario: usuario });
    }
  };
  
  module.exports = headerLogueadoController;
  