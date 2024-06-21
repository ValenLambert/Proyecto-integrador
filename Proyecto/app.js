var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// requerimso a express session
const session = require("express-session")


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/profile');
var headerLogueadoRouter = require ("./routes/headerLogueado");
var productRouter = require ("./routes/product");
const { log } = require('console');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// usando EL MODULO DE SESSION:
app.use(session(
  {
    secret: "holaa",
    resave: false,
    saveUninitialized: true
  }
))
// lo dejamos disponible para todas las vistas. 
app.use(function(req,res,next){
  console.log("esn session middleware");
  //console.log(req.session.user)
  // si hay un user logueado... 
  if(req.session.user != undefined){
    // guardamos todo lo que tiene el user para poder usarlo dsp en las vistas 
    res.locals.user = req.session.user;
    console.log("entre en locals")
    console.log(res.locals)
    return next()
  }
  // si no  hay usuario, que siga ...
  return next()
})

app.use(function(req,res,next){
  // esto solo si tengo una cookie, para que el usuario no enga que volver a loguearse -- (si tenog una cookie pero el usuario no esta logueado)
  if(req.cookies.userId != undefined && req.session.user == undefined ){
    let idDeLaCookie = req.cookies.userId;

    // buscamos un usuario en la abse de datos con el id de la cookie, por primary key
    db.User.findByPk(idDeLaCookie)
    .then(function(user){
      console.log("middleare de la cookie trasladando  la informacion ")
      req.session.user = user
      console.log("en la cookie middleware");
      // quiero teenr la session tambien disponible en las vistas:
      res.locals.user = user; 
      return next; 
    })
    .catch (function(err){
      console.log("error en cookies", err);
    })
    // si no hay cookies, y el usuairo esta o no logueado, no entra en todo esae if , y directamente pasa de largo en el middleware como si no hubiera pasado nada
  }else {
    return next ()
  }
})

app.use('/loggeado', headerLogueadoRouter);
app.use('/product', productRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
