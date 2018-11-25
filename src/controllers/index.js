const passport = require('passport');
const User = require('../models/users');


const main = (req, res) => {
  const { user } = req;
  if (user) {
    return res.render('index', { title: 'Index' });
  }
  return res.redirect('/signIn');
};

const signIn = (req, res) => {
  res.render('signIn', { title: 'SignIn' });
};

const userAccess = (req, res) => {
  res.redirect('/');
};

const signUp = (req, res) => {
  res.render('signUp', { title: 'SignUp' });
};

const createNewAccount = (req, res) => {
  const { username, password } = req.body;
  User.register(new User({ username }),
    password,
    (error) => {
      if (error) {
        return res.render('signUp', { title: 'signUp', message: error.message });
      }
      return passport.authenticate('local')(req, res, () => {
        res.redirect('/');
      });
    });
};

const logOut = (req, res) => {
  req.logout();
  res.redirect('/');
};

module.exports = {
  logOut,
  signIn,
  signUp,
  main,
  createNewAccount,
  userAccess,
};
