const {Message} = require('../models/message.model')

// CREATE
module.exports.createMessage = (request, response) => {
    Message.create(request.body)
        .then(message => response.json(message))
        .catch(err => response.status(400).json(err));
}
// READ ALL
module.exports.getAllMessages = (request, response) => {
    Message.find({})
        .then(messages => response.json(messages))
        .catch(err => response.status(400).json(err))
}

// READ ONE
module.exports.getMessage = (request, response) => {
    Message.findOne({_id:request.params.id})
        .then(message => response.json(message))
        .catch(err => response.status(400).json(err))
}
//UPDATE
module.exports.updateMessage = (request, response) => {
    Message.findOneAndUpdate({_id: request.params.id}, request.body, {new:true,runValidators:true})
        .then(updatedMessage => response.json(updatedMessage))
        .catch(err => response.status(400).json(err))
}
//DELETE
module.exports.deleteMessage = (request, response) => {
    Message.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.status(400).json(err))
}