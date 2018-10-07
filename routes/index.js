var express = require('express');
var router = express.Router();
var BlogController = require('../controller/BlogController');
const AuthController = require('../controller/AuthController');
const passport = require('passport');


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(env.APP_URL);
  log.info(env.APP_URL);
  res.render('index', { title: 'Express' });
});

router.get('/blog-list', function(req, res, next){
  BlogController.blogList(req, res, next);
});


router.get('/mongo-blogs', BlogController.mongoBlogPage);

router.get('/register', function(req, res, next){
  AuthController.register(req, res, next);
});

router.get('/login', function(req, res, next){
  AuthController.login(req, res, next);
});

router.post('/post-register', function(req, res, next){
  AuthController.postRegister(req, res, next);
});

router.post('/post-login', function(req, res, next){
  AuthController.postLogin(req, res, next);
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', AuthController.facebookLogin);

router.get('/method-chain', function(req, res, next){
  AuthController.fn1(req, res, AuthController.fn2);
})

module.exports = router;
