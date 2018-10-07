const User = require('../models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const AuthController = function() {};

AuthController.prototype = {
    register: function(req, res, next){
        res.render('auth/register');
    },

    postRegister: function(req, res, next) {
        var user = new User;
        user.name = req.body.username;
        user.email = req.body.email;
        user.setPassword(req.body.password);
        user.type = 'client';
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
        passport.authenticate('local', {
            session: true,
            successRedirect: '/users/dashboard',
            failuresRedirect: '/login'
        }, (err, user, info) => {
            console.log('user-->', user)
            if (err) {
                return res.status(400).json({
                    err    : err
                });
            }
            req.login(user, {session: true}, (err) => {
                if (err) {
                    res.send(err);
                }
                // generate a signed son web token with the contents of user object and return it in the response
                const token = jwt.sign(user.toJSON(), env.jwt_token);
                return res.json({user, token});
            });
        })(req, res);
    },

    facebookLogin: function(req, res, next){
        passport.authenticate('facebook', { 
            // scope : ['email', 'id'],
            successRedirect: '/users/dashboard',
            failuresRedirect: '/login',
            session: true
        }, (err, user, info)=> {
            console.log({err: err});
            console.log('user', user);
        })(req, res);
    }, 

    fn1: function(req, res, next){
        console.log('function 1');
        next();
    },

    fn2: function(req, res, next){
        console.log('function 2');
    }
}

module.exports = new AuthController();