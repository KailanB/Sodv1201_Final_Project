// NPM init, express, and nodemon are all set up. Nothing much else has been added for the time being.
const express = require('express');

const routes = require('./routes.js');
const app = express();
const PORT = 3000;

// always have this before the routes
app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({ extended: false}));

app.use('/', routes);

const createAccountRoutes = require('./routes');
app.use('/api', createAccountRoutes);


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