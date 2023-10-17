const mongoose = require('mongoose');
const ListingSchema = new mongoose.Schema({

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Owner',
        required:[true,"Owner is required"]
    },

    address:{
        type:String,
        required:[true,"Address is required"]
    },
    
    photo_url:{
        type:String,
        required:[true,"Photo is required"]
    },

    description:{
        type:String,
        required:[true,"Description is required"]
    }

},{timestamps:true});

module.exports.Listing = mongoose.model('Listing',ListingSchema)