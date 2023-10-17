const ListingController = require('../controllers/listing.controller');
module.exports = function(app){

    
    app.get('/api/listings', ListingController.getAllListings)
    app.get('/api/listings/:id',ListingController.getListing)

    app.post('/api/listings', ListingController.createListing);

    app.patch('/api/listings/:id',ListingController.updateListing);

    app.delete('/api/listings/:id',ListingController.deleteListing)

}