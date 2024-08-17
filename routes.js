const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


const PROPERTIES_FILENAME = path.join(__dirname, 'data', 'properties.json');
const { saveProperty, retrieveData } = require('./dataScripts');



// index / home page routes
/* ******************************************************************************* */
router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'public', 'index.html'));

});


/* ******************************************************************************* */
/* END of index/home page Routes */


// my properties routes
/* ******************************************************************************* */
router.get('/myProperties', function(req, res) {
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
        function(resolve) {
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
                res.status(404).send("Property not found");
            }
            
        });
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

// Route to serve the properties data
router.get('/properties', function(req, res) {
    fs.readFile(PROPERTIES_FILENAME, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading properties data:", err);
            res.status(500).send("Error reading properties data.");
        } else {
            res.json(JSON.parse(data));
        }
    });
});

router.get('/properties', function(req, res) {
    const { availability, parking, transport, type, address, city, province, area, capacity, rentalTerm, price, search } = req.query;
    const properties = retrieveData(PROPERTIES_FILENAME);

    properties.then(function(propertyList) {
        let filteredProperties = propertyList;

        // Log retrieved properties for debugging
        console.log("Retrieved Properties:", propertyList);

        if (search) {
            filteredProperties = filteredProperties.filter(property =>
                property.name.toLowerCase().includes(search.toLowerCase()) ||
                property.address.toLowerCase().includes(search.toLowerCase()) ||
                property.city.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (availability) {
            filteredProperties = filteredProperties.filter(property =>
                property.availability.toString() === availability.toLowerCase()  // Convert boolean to string
            );
        }

        if (parking) {
            filteredProperties = filteredProperties.filter(property =>
                property.parking.toString() === parking.toLowerCase()  // Convert boolean to string
            );
        }

        if (transport) {
            filteredProperties = filteredProperties.filter(property =>
                property.publicTransport.toString() === transport.toLowerCase()  // Convert boolean to string
            );
        }

        if (type) {
            filteredProperties = filteredProperties.filter(property =>
                property.type.toLowerCase().includes(type.toLowerCase())
            );
        }
        if (address) {
            filteredProperties = filteredProperties.filter(property =>
                property.address.toLowerCase().includes(address.toLowerCase())
            );
        }

        if (city) {
            filteredProperties = filteredProperties.filter(property =>
                property.city.toLowerCase().includes(city.toLowerCase())
            );
        }

        if (province) {
            filteredProperties = filteredProperties.filter(property =>
                property.province.toLowerCase().includes(province.toLowerCase())
            );
        }

        if (area) {
            filteredProperties = filteredProperties.filter(property =>
                property.area >= parseFloat(area)
            );
        }

        if (capacity) {
            filteredProperties = filteredProperties.filter(property =>
                property.capacity >= parseFloat(capacity)
            );
        }

        if (rentalTerm) {
            filteredProperties = filteredProperties.filter(property =>
                property.rentalTerm.toLowerCase().includes(rentalTerm.toLowerCase())
            );
        }

        if (price) {
            filteredProperties = filteredProperties.filter(property =>
                property.price <= parseFloat(price)
            );
        }
        // Log filtered properties for debugging
        console.log("Filtered Properties:", filteredProperties);

        res.json(filteredProperties);
    });
});

//end of advance filter

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


// router.get('/myPropertiesData/:userId', function(req, res)
// {

//     let userId = parseInt(req.params.userId);
    
//     const myProperties = retrieveData(PROPERTIES_FILENAME);
//     myProperties.then(
//         function(resolve)
//         {
//             // create a new array
//             let myProperties = [];
//             resolve.forEach(property => {

//                 // add properties only if the current userId matches
//                 if(property.userId === userId)
//                 {
//                     myProperties.push(property);
//                 }
//             });
//             // return new array only. This ensures we avoid sending the entire database and only send the relevant data
//             res.json(myProperties);
//         }
//     )

// });

router.get('/viewProperty/:propertyId/:userId', function(req, res)
{

    let userId = parseInt(req.params.userId);
    let propertyId = parseInt(req.params.propertyId);
    console.log("userId: " + userId + ". PropertyId: " + propertyId);
    const myProperties = retrieveData(PROPERTIES_FILENAME);
    myProperties.then(
        function(resolve)
        {

            const property = resolve.find(property => property.propertyId === propertyId);

            res.json(property);
            // const user = resolve.find(user => property.userId = userId);

            // resolve.forEach(property => {

            //     // add properties only if the current userId matches
            //     if(property.userId === userId)
            //     {
            //         myProperties.push(property);
            //     }
            // });
            // // return new array only. This ensures we avoid sending the entire database and only send the relevant data
            // res.json(myProperties);
        }
    )

});

// router.get('/viewProperty', function(req, res) 
// {
//     res.sendFile(path.join(__dirname, 'public', 'pages', 'viewProperty.html'));

// });

/* ******************************************************************************* */
/* END of View Property Routes */

module.exports = router;
