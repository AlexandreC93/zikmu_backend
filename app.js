const express = require('express');
const exphbs = require('express-handlebars')
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose')
const cookieParser =require('cookie-parser')

const userRouter = require('./routes/user.routes.js');
const indexRouter = require('./routes/index.routes.js')
const postRouter = require('./routes/post.routes.js')

const env = require('./config/.env')
const app = express();
const port = 4000;



app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// EN 1er Creation des routes voir la suite dans le dossier routes/fichiers Users.js 

app.use('/user', userRouter);
app.use('/', indexRouter)
app.use('/post', postRouter)

env.connect

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});



// Lancer le serveur sur localhost 4000
app.listen(port, () => {
  console.log("Listening on port" + port );
})


module.exports = app;
