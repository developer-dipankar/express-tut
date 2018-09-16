exports.blogAccess = function(req, res, next) {
    console.log("Blog slug #"+ req.params.slug);
    if(req.params.slug === 'null') {
        res.redirect(301, '/blogs');
    }
    next();
}