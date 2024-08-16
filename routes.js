const express = require('express');

const router = express.Router();
const fs = require('fs');
const path = require('path');


const PROPERTIES_FILENAME = path.join(__dirname, 'data', 'properties.json');
const { saveProperty, retrieveData } = require('./dataScripts');



// index / home page routes
/* ******************************************************************************* */
router.get('/', function(req, res) 
{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));

});


/* ******************************************************************************* */
/* END of index/home page Routes */


// my properties routes
/* ******************************************************************************* */
router.get('/myProperties', function(req, res) 
{
    res.sendFile(path.join(__dirname, 'public', 'pages', 'myProperties.html'));

});

router.post('/myProperties', function(req, res) 
{
    
    saveProperty(req.body, PROPERTIES_FILENAME);
    console.log("save Property success");
    res.status(201).send();

});

router.put('/myProperties', function(req, res) 
{
    // pull all properties
    const myProperties = retrieveData(PROPERTIES_FILENAME);
    myProperties.then(
        function(resolve)
        {
            // find index of the property that matches the request update property
            let propertyIndex = resolve.findIndex(property => property.propertyId === parseInt(req.body.propertyId));
            // if found
            if(propertyIndex !== -1)
            {
                // resolve refers to property data array here. 
                // update property at correct index to the new information gathered in the PUT fetch
                resolve[propertyIndex] = req.body;
                // once the property data has been updated, save the newly updated array
                fs.writeFileSync(PROPERTIES_FILENAME, JSON.stringify(resolve, null, 2));
                console.log("Update successful");
                res.status(201).send();
            }
            else
            {
                console.log("Error: Property not found!");
            }
            
        }
    )
    

});

// userId here refers to the user cookie added in the fetch request
router.get('/myPropertiesData/:userId', function(req, res)
{

    let userId = parseInt(req.params.userId);
    
    const myProperties = retrieveData(PROPERTIES_FILENAME);
    myProperties.then(
        function(resolve)
        {
            // create a new array
            let myProperties = [];
            resolve.forEach(property => {

                // add properties only if the current userId matches
                if(property.userId === userId)
                {
                    myProperties.push(property);
                }
            });
            // return new array only. This ensures we avoid sending the entire database and only send the relevant data
            res.json(myProperties);
        }
    )

});
/* ******************************************************************************* */
/* END of my properties Routes*/


// profile routes
/* ******************************************************************************* */

router.get('/profile', function(req, res) 
{
    res.sendFile(path.join(__dirname, 'public', 'pages', 'profile.html'));

});

/* ******************************************************************************* */
/* END of profile Routes */

// Log in routes
/* ******************************************************************************* */

router.get('/logIn', function(req, res) 
{
    res.sendFile(path.join(__dirname, 'public', 'pages', 'logIn.html'));

});

/* ******************************************************************************* */
/* END of log in Routes */

// Create Account routes
/* ******************************************************************************* */

router.get('/createAccount', function(req, res) 
{
    res.sendFile(path.join(__dirname, 'public', 'pages', 'createAccount.html'));

});

/* ******************************************************************************* */
/* END of Create Account Routes */


// View Property routes
/* ******************************************************************************* */

router.get('/viewProperty', function(req, res) 
{
    res.sendFile(path.join(__dirname, 'public', 'pages', 'viewProperty.html'));

});

/* ******************************************************************************* */
/* END of View Property Routes */

module.exports = router;
