var express = require('express');
var router = express.Router();
var BlogController = require('../controller/BlogController');

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
})

module.exports = router;
