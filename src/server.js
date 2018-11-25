const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const LocalStorage = require('passport-local');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const router = require('./routes/index');
const User = require('./models/users');


mongoose.connect('mongodb://127.0.0.1:27017/myApp', { useNewUrlParser: true });

const app = express();
const port = process.env.port || 3000;

// Template engine
app.use(express.static(`${__dirname}\\public`));
app.set('views', './views');
app.set('view engine', 'ejs');
// middlewares configurations

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
  secret: 'myApp',
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);


// Passport cofiguration
passport.use(new LocalStorage(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.listen(3000, () => {
  console.log(`server runs on 127.0.0.1:${port}`);
});
