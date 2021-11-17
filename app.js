const express = require('express');
const exphbs = require('express-handlebars')
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/user.routes.js');
const indexRouter = require('./routes/index.routes.js')
const postRouter = require('./routes/post.routes.js')
const eventRouter = require('./routes/event.routes.js')
const categoryRouter = require('./routes/category.routes.js')
const messagesRouter = require('./routes/message.routes.js')
const conversationRouter = require('./routes/conversation.routes.js')
const postCatRouter = require('./routes/postCat.routes.js')
const locationRouter = require('./routes/location.routes.js')

const { checkUser, requireAuth } = require('./middlewares/auth.middleware');


require('dotenv').config({ path: './config/.env' })
console.log(process.env.PORT)

const app = express();

// const corsOptions = {
//   origin: process.env.CLIENT_URL,
//   credentials: true,
//   'allowedHeaders': ['sessionId', 'Content-Type'],
//   'exposedHeaders': ['sessionId'],
//   'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   'preflightContinue': false
// }
app.use(cors({ origin: ['http://localhost:3000', 'localhost:3000', 'http://localhost:4000', 'localhost:4000'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'pictures')));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// EN 1er Creation des routes voir la suite dans le dossier routes/fichiers Users.js 

app.use('/user', userRouter);
app.use('/event', eventRouter)
app.use('/', indexRouter)
app.use('/post', postRouter)
app.use('/category', categoryRouter)
app.use('/conversation', conversationRouter)
app.use('/messages', messagesRouter)
app.use('/post-categories', postCatRouter)
app.use('/locations', locationRouter)

app.get("*", checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(req.user_id)
})

require('./config/db.js')

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
app.listen(process.env.PORT, () => {
  console.log("Listening on port" + process.env.PORT);
})


module.exports = app;
