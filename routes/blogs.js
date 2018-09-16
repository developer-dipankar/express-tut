var express = require('express');
var router = express.Router();
var middleware = require('../middleware/middleware');
var BlogController = require('../controller/BlogController');

router.get('/', function(req, res, next){
    var blogs = [
        { title: "Blog A", slug: "blog-a", description: "Description of Blog A", author: "Dennis Lilly"},
        { title: "Blog B", slug: "blog-b", description: "Description of Blog B", author: "Jack Diamond"},
        { title: "Blog C", slug: "blog-c", description: "Description of Blog C", author: "Ben Cuttings"},
        { title: "Blog D", slug: "blog-d", description: "Description of Blog D", author: "Brett Lee"},
        { title: "Blog E", slug: "blog-e", description: "Description of Blog E", author: "Geoffrey Boycott"},
        { title: "Blog F", slug: "blog-f", description: "Description of Blog F", author: "Robert Einstein"}
    ]
    res.render('blogs/blogs_list', {
        'blogs': blogs
    });
});

router.get('/:slug', function (req, res, next) {
    // Method 1
    middleware.blogAccess(req, res, next);

    // Method 2
    // validBlog(req, res, next);
  }, function (req, res, next) {
    //   Method 1
    BlogController.blogDetails(req, res, next);

    // Method 2
    // res.send(req.params.slug);
});

var validBlog = function(req, res, next){
    console.log("Blog slug #"+ req.params.slug);
    if(req.params.slug === 'null') {
        res.redirect(301, '/blogs');
    }
    next();
}

module.exports = router;