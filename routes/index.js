var express = require('express');
var router = express.Router();
var BlogController = require('../controller/BlogController');
const AuthController = require('../controller/AuthController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * Get blog list page
 * req
 * res
 */
router.get('/blog-list', function(req, res, next){
  BlogController.blogList(req, res, next);
});


router.get('/mongo-blogs', function(req, res, next){
  BlogController.mongoBlogPage(req, res, next);
});

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

module.exports = router;
