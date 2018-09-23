const User = require('../models/User');
var AuthController = function() {};
AuthController.prototype = {
    register: function(req, res, next){
        res.render('auth/register');
    },

    postRegister: function(req, res, next) {
        var user = new User;
        user.name = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        var error = user.validateSync();
        if(error){
            console.log(error.errors);
            req.flash('validation_error', error.errors);
        } else {
            user.save().then(data=>{
                req.flash('success', 'You have registered successfully');
            }).catch(err=>{
                req.flash('error', err.errmsg)
            }); 
        }
        res.redirect('back');
    },

    login: function(req, res, next){
        res.render('auth/login');
    },

    postLogin: function(req, res, next) {
        
    }
}

module.exports = new AuthController();