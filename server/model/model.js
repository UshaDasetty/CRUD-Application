const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    gender:String,
    status:String

})

module.exports = mongoose.model('UserModel',UserSchema,'User');