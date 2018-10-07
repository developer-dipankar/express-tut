var Blogs = require('../models/Blog');
const Blog = require('../models/Blug');
exports.blogDetails = function(req, res, next){
    res.send(req.params.slug);
}

exports.blogList = function(req, res, next) {
    var blogs = Blogs.blogs();
    log.info(blogs);
    res.render('blogs/blogs_list', {
        blogs: blogs
    })
}

exports.mongoBlogs = function(req, res, next) {
    Blog.find({}).then(blogs=>{
        res.status(200).send({blogs: blogs, message: "List of Blogs"});
    }).catch(err=>{
        res.status(404).send('No blogs found');
    })
}

exports.mongoBlogPage = function (req, res, next) {
    Blog.find({}).then(blogs=>{
        res.render('blogs/blogs_list', {
            blogs: blogs
        })
    })
}
exports.addMongoBlog = function(req, res, next){
    var blog = new Blog({
        title: req.body.title,
        description: req.body.description,
        slug: req.body.slug,
        author: req.body.author
    });
    blog.save().then(blogSaved=>{
        res.send('Blog has been saved');
    }).catch(err=>{
        res.status(404).send(err);
    });
}