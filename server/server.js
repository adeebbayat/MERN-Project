const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();
const port = process.env.PORT;
require('./config/mongoose.config'); 

app.use(cors(),express.json(),express.urlencoded({extended:true}));


require('./routes/owner.routes')(app);
require('./routes/renter.routes')(app);
require('./routes/listing.routes')(app);
require('./routes/message.routes')(app);
require('./routes/request.routes')(app);

    
app.listen(port, () => console.log(`Listening on port: ${port}`) );

