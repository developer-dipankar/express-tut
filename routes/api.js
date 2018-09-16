var express = require('express');
var router = express.Router();
var middleware = require('../middleware/middleware');
var BlogController = require('../controller/BlogController');

router.post('/mongo-blogs/add', function(req, res, next){
    middleware.blogAccess(req, res, next);
  }, function(req, res, next){
    BlogController.addMongoBlog(req, res, next);
  });

router.get('/mongo-blogs', function(req, res, next){
    BlogController.mongoBlogs(req, res, next);
})
module.exports = router;
