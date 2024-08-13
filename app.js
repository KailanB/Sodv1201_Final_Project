// NPM init, express, and nodemon are all set up. Nothing much else has been added for the time being.

const express = require('express');

const api = require('./api');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.use('/api', api);

app.listen(PORT, (error) => {

    if(!error) 
    {
        console.log("Server is running and app is listening on port: " + PORT);
    }
    else
    {
        console.log("Error: " + error + "Server did not start.");
    }
});