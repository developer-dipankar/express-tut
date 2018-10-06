const User = require('../models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');

const AuthController = function() {};

AuthController.prototype = {
    register: function(req, res, next){
        res.render('auth/register');
    },

    postRegister: function(req, res, next) {
        const saltRounds = 10;
        var hash = bcrypt.hashSync(req.body.password, saltRounds);
        // console.log(hash);
        var user = new User;
        user.name = req.body.username;
        user.email = req.body.email;
        user.password = hash;
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
        passport.authenticate('local', {session: true}, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    err    : err
                });
            }
            req.login(user, {session: true}, (err) => {
                if (err) {
                    res.send(err);
                }
                // generate a signed son web token with the contents of user object and return it in the response
                const token = jwt.sign(user.toJSON(), req.app.locals.env.jwt_token);
                return res.json({user, token});
            });
        })(req, res);
    },

    facebookLogin: function(req, res, next){
        passport.authenticate('facebook');
    }
}

module.exports = new AuthController();