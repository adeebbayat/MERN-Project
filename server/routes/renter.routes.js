const RenterController = require('../controllers/renter.controller');
module.exports = function(app){

    
    app.get('/api/renters', RenterController.getAllRenters)
    app.get('/api/renters/:id',RenterController.getRenter)

    app.post('/api/renters', RenterController.createRenter);

    app.patch('/api/renters/:id',RenterController.updateRenter);

    app.delete('/api/renters/:id',RenterController.deleteRenter)

}