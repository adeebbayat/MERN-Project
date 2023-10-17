const {Listing} = require('../models/listing.model')

// CREATE
module.exports.createListing = (request, response) => {
    Listing.create(request.body)
        .then(listing => response.json(listing))
        .catch(err => response.status(400).json(err));
}
// READ ALL
module.exports.getAllListings = (request, response) => {
    Listing.find({})
        .then(listings => response.json(listings))
        .catch(err => response.status(400).json(err))
}

// READ ONE
module.exports.getListing = (request, response) => {
    Listing.findOne({_id:request.params.id})
        .then(listing => response.json(listing))
        .catch(err => response.status(400).json(err))
}
//UPDATE
module.exports.updateListing = (request, response) => {
    Listing.findOneAndUpdate({_id: request.params.id}, request.body, {new:true,runValidators:true})
        .then(updatedOwner => response.json(updatedOwner))
        .catch(err => response.status(400).json(err))
}
//DELETE
module.exports.deleteListing = (request, response) => {
    Listing.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.status(400).json(err))
}