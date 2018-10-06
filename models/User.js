var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is already existed'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    type: {
        type: String,
        required: [true, 'User type is required']
    },
    token: {
        type: String,
    },

},
{ timestamps: true });


module.exports = mongoose.model('User', UserSchema);