const OwnerController = require('../controllers/owner.controller');
module.exports = function(app){

    
    app.get('/api/owners', OwnerController.getAllOwners)
    app.get('/api/owners/:id',OwnerController.getOwner)

    app.post('/api/owners', OwnerController.createOwner);

    app.patch('/api/owners/:id',OwnerController.updateOwner);

    app.delete('/api/owners/:id',OwnerController.deleteOwner)

}