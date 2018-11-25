const router = require('express').Router();
const passport = require('passport');
const ctrl = require('../controllers/index');


router
  .route('/')
  .get(ctrl.main);

router
  .route('/signUp')
  .get(ctrl.signUp);

router
  .route('/signUp')
  .post(ctrl.createNewAccount);

router
  .route('/signIn')
  .get(ctrl.signIn);

router
  .route('/signIn')
  .post(passport.authenticate('local', { failureRedirect: '/signIn' }), ctrl.userAccess);

router
  .route('/logOut')
  .get(ctrl.logOut);
module.exports = router;
