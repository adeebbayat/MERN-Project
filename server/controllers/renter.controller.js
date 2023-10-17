const {Renter} = require('../models/renter.model')

// CREATE
module.exports.createRenter = (request, response) => {
    Renter.create(request.body)
        .then(renter => response.json(renter))
        .catch(err => response.status(400).json(err));
}
// READ ALL
module.exports.getAllRenters = (request, response) => {
    Renter.find({})
        .then(renters => response.json(renters))
        .catch(err => response.status(400).json(err))
}

// READ ONE
module.exports.getRenter = (request, response) => {
    Renter.findOne({_id:request.params.id})
        .then(renter => response.json(renter))
        .catch(err => response.status(400).json(err))
}
//UPDATE
module.exports.updateRenter = (request, response) => {
    Renter.findOneAndUpdate({_id: request.params.id}, request.body, {new:true,runValidators:true})
        .then(updatedRenter => response.json(updatedRenter))
        .catch(err => response.status(400).json(err))
}
//DELETE
module.exports.deleteRenter = (request, response) => {
    Renter.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.status(400).json(err))
}