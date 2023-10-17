const RequestController = require('../controllers/request.controller');
module.exports = function(app){

    
    app.get('/api/requests', RequestController.getAllRequests)
    app.get('/api/requests/:id',RequestController.getRequest)

    app.post('/api/requests', RequestController.createRequest);

    app.patch('/api/requests/:id',RequestController.updateRequest);

    app.delete('/api/requests/:id',RequestController.deleteRequest)

}