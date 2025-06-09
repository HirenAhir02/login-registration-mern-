const { types, string } = require('joi')
const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
});

const UserModel = mongoose.model('users',UserSchema);
module.exports = UserModel;