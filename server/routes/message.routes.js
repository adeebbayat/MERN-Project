const MessageController = require('../controllers/message.controller');
module.exports = function(app){

    
    app.get('/api/messages', MessageController.getAllMessages)
    app.get('/api/messages/:id',MessageController.getMessage)

    app.post('/api/messages', MessageController.createMessage);

    app.patch('/api/messages/:id',MessageController.updateMessage);

    app.delete('/api/messages/:id',MessageController.deleteMessage)

}