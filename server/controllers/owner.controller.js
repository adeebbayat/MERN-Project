const {Owner} = require('../models/owner.model')

// CREATE
module.exports.createOwner = (request, response) => {
    Owner.create(request.body)
        .then(owner => response.json(owner))
        .catch(err => response.status(400).json(err));
}
// READ ALL
module.exports.getAllOwners = (request, response) => {
    Owner.find({})
        .then(owners => response.json(owners))
        .catch(err => response.status(400).json(err))
}

// READ ONE
module.exports.getOwner = (request, response) => {
    Owner.findOne({_id:request.params.id})
        .then(owner => response.json(owner))
        .catch(err => response.status(400).json(err))
}
//UPDATE
module.exports.updateOwner = (request, response) => {
    Owner.findOneAndUpdate({_id: request.params.id}, request.body, {new:true,runValidators:true})
        .then(updatedOwner => response.json(updatedOwner))
        .catch(err => response.status(400).json(err))
}
//DELETE
module.exports.deleteOwner = (request, response) => {
    Owner.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.status(400).json(err))
}