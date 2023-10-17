const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({

    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Sender',
        required:[true,"Sender is required"]
    },

    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Receiver',
        required:[true,"Receiver is required"]
    },

    message:{
        type:String,
        required:[true,"Message is required"]
    }

},{timestamps:true});

module.exports.Message = mongoose.model('Message',MessageSchema)