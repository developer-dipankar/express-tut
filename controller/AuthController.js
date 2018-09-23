const User = require('../models/User');

exports.register = function(req, res, next){
    res.render('auth/register');
}

exports.postRegister = function(req, res, next) {
    var user = new User;
    user.name = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    var error = user.validateSync();
    // console.log(error);
    if(error){
        res.redirect('back').send({'error': error});
    } else {
        user.save().then(data=>{
            console.log(data);
        }).catch(err=>{
            console.log(err.errmsg);
        }); 
    }
}