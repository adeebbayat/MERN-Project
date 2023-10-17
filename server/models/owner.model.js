const mongoose = require('mongoose');
const OwnerSchema = new mongoose.Schema({

    username: {
        type:String,
        required:[true,"Username is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLength:[8,"Password must be at least 8 characters long"]
    },
    
    email:{
        type:String,
        required:[true,"Email is required"],
        minLength:[8,"Email must be at least 8 characters long"]
    }

},{timestamps:true});

module.exports.Owner = mongoose.model('Owner',OwnerSchema)