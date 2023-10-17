const {Request} = require('../models/request.model')

// CREATE
module.exports.createRequest = (request, response) => {
    Request.create(request.body)
        .then(request => response.json(request))
        .catch(err => response.status(400).json(err));
}
// READ ALL
module.exports.getAllRequests = (request, response) => {
    Request.find({})
        .then(requests => response.json(requests))
        .catch(err => response.status(400).json(err))
}

// READ ONE
module.exports.getRequest = (request, response) => {
    Request.findOne({_id:request.params.id})
        .then(request => response.json(request))
        .catch(err => response.status(400).json(err))
}
//UPDATE
module.exports.updateRequest = (request, response) => {
    Request.findOneAndUpdate({_id: request.params.id}, request.body, {new:true,runValidators:true})
        .then(updatedRequest => response.json(updatedRequest))
        .catch(err => response.status(400).json(err))
}
//DELETE
module.exports.deleteRequest = (request, response) => {
    Request.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.status(400).json(err))
}