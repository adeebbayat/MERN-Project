const mongoose = require('mongoose');
const RequestSchema = new mongoose.Schema({

    renter:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Renter",
        required:[true,"Renter is required"]
    },

    listing:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing",
        required:[true,"Listing is required"]
    },

    request_status:{
        type:String,
        required:[true,"Request Status is required"]

    }


},{timestamps:true});

module.exports.Request = mongoose.model('Request',RequestSchema)