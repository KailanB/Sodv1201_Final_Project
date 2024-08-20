const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const USERS_FILENAME = path.join(__dirname, 'data', 'users.json');
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
    req.body.userId = parseInt(req.cookies.userId);
    // console.log("Req body: " + req.body.userId + "req cookies " + req.cookies.userId);
    saveProperty(req.body, PROPERTIES_FILENAME);
    console.log("save Property success");
    res.status(201).send();

});

router.put('/myProperties', function(req, res) 
{
    // pull all properties

    // userId is sent in as "null", so we need to update userId to be current requesting user
    console.log(req.body.userId);
    req.body.userId = parseInt(req.cookies.userId);
    const properties = retrieveData(PROPERTIES_FILENAME);
    properties.then(
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
                res.status(400).send("Property not found");
            }
            
        });
});

router.delete('/myProperties/:propertyId', function(req, res) 
{

    console.log(req.params.propertyId);
    let propertyId = parseInt(req.params.propertyId);
    const properties = retrieveData(PROPERTIES_FILENAME);
    properties.then(
        function(resolve)
        {
            let propIndex = resolve.findIndex(property => property.propertyId === propertyId);
            if(propIndex === -1)
            {
                res.status(400).send("Property not found");
            }
            else
            {

                resolve.splice(propIndex, 1);
                fs.writeFileSync(PROPERTIES_FILENAME, JSON.stringify(resolve, null, 2));
                res.sendStatus(204).send('Property deleted successfully');
            }

        })


});

// userId here refers to the user cookie added in the fetch request
router.get('/myPropertiesData', function(req, res)
{

    // let userId = parseInt(req.params.userId);

    // console.log(req.cookies);
    let userId = parseInt(req.cookies.userId);
    console.log(req.cookies.userId);
    const properties = retrieveData(PROPERTIES_FILENAME);
    properties.then(
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
        })

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

router.get('/getUser', function(req, res) 
{
    // gets requester cookie and verifies user
    let userId = parseInt(req.cookies.userId);
    const users = retrieveData(USERS_FILENAME);
    users.then(
        function(allUsers)
        {
            
            const user = allUsers.find(user => user.id === userId);
            res.json(user);

        }
    );

});

router.put('/profile', function(req, res)
{

    let userEmail = parseInt(req.params.email);
    req.body.userId = parseInt(req.cookies.userId);
    console.log(req.body.phoneNumber);
    let userId = req.body.userId;
    const users = retrieveData(USERS_FILENAME);
    users.then(
        function(resolve) {

        let user = resolve.find(user => user.email === userEmail);
        if(user)
        {
            if(user.userId !== req.body.userId)
            {
                res.status(400).send("Email already in use! Please try another");
            }
           
        }
        else
        {

            let userIndex = resolve.findIndex(user => user.id === userId)
            if(userIndex !== -1)
            {
                resolve[userIndex] = req.body;

                fs.writeFileSync(USERS_FILENAME, JSON.stringify(resolve, null, 2));
                console.log('update successful');
                res.status(201).send('update successful');


            }
            else
            {
                console.log("Error: User not found!");
                res.status(400).send("Error: User not found!");
            }
        }


    });



});

/* ******************************************************************************* */
/* END of profile Routes */

// Log in routes
/* ******************************************************************************* */
const usersFilePath = path.join(__dirname, 'data','users.json'); 

// Serve the login page
router.get('/logIn', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'logIn.html'));
});

// Handle login
router.post('/login', (req, res) => {
    const { email} = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading users file:', err);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    const users = JSON.parse(data);
    const user = users.find(u => u.email === email);

    if (user) {
        res.cookie('userEmail', user.email, {maxAge: 24 * 60 * 60 * 1000 }); // 1 day
        res.cookie('userId', user.id, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // 1 day
        console.log('User logged in successfully:', user);
        return res.status(200).json({ success: true, email: user.email});
    } else {
        console.log('Login failed: Invalid email');
        return res.status(400).json({ success: false, message: 'Invalid email' });
    }
});
});

// Logout Route
// router.post('/api/logout', (req, res) => {
//     res.clearCookie('userEmail');
//     res.clearCookie('userId');
//     res.json({ success: true });
//     console.log('User logged out successfully');
//     res.status(200).json({ success: true, message: 'Logged out successfully' });
// });

// Logout Route
router.post('/api/logout', (req, res) => {
    const userEmail = req.cookies.userEmail;
    const userId = req.cookies.userId;

    if (userEmail && userId) {
        // Log the detailed information before logging out
        console.log("user logged out", userEmail);
        
        // Clear the cookies
        res.clearCookie('userEmail');
        res.clearCookie('userId');

        // Send the response
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } else {
        // If the userEmail or userId cookie doesn't exist, log that no user was logged in
        console.log('Logout attempted but no user was logged in or cookies were missing.');
        res.status(500).json({ success: false, message: 'No user was logged in' });
    }
});


// module.exports = router;

//     // Read users.json file
//     fs.readFile(usersFilePath, 'utf8', (err, data) => {
//         if (err) {
//             console.error('Error reading users file:', err);
//             return res.status(500).json({ message: 'Internal Server Error' });
//         }

//         const users = JSON.parse(data);

//         // Find the user by email
//         const user = users.find(u => u.email === email);

//         if (user) {
//             // Set a cookie with user details (e.g., user ID)
//             res.cookie('userId', user.id, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // 1 day

//             // Redirect or respond with success
//             return res.status(200).json({ message: 'Login successful', user });
//         } else {
//             return res.status(401).json({ message: 'Invalid email' });
//         }
//     });
// });

//handle the cookies
// router.get('/protected-route', (req, res) => {
//     const userId = req.cookies.userId;

//     if (userId) {
//         // Logic for logged-in users
//         return res.status(200).json({ message: 'Welcome back!' });
//     } else {
//         return res.status(401).json({ message: 'Please log in first.' });
//     }
// });

/* ******************************************************************************* */
/* END of log in Routes */

// Create Account routes
/* ******************************************************************************* */

router.get('/createAccount', function(req, res) 
{
    res.sendFile(path.join(__dirname, 'public', 'pages', 'createAccount.html'));

});

// Handle form submission
router.post('/createAccount', (req, res) => {
    const { firstName, lastName, email, phoneNumber, city, province, role } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber || !city || !province || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const USER_FILENAME = path.join(__dirname, 'data', 'users.json');

    fs.readFile(USER_FILENAME, 'utf8', (err, data) => {
        let users = [];
        if (!err && data) {
            users = JSON.parse(data);
        }

        // Check if user with the same email already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        // Add the new registration data with unique ID
        const newUser = {
            id: Date.now(), // Unique ID based on timestamp
            firstName,
            lastName,
            email,
            phoneNumber,
            city,
            province,
            role
        };

        users.push(newUser);

        fs.writeFile(USER_FILENAME, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving registration' });
            }
            return res.status(200).json({ message: 'User Created Successfully', registrationData: newUser });
        });
    });
});

// router.post('/createAccount', (req,res) => {
//     const {id, firstName, lastName, email, phoneNumber, city, province, role} = req.body;

//     if(!firstName || !lastName || !email ||!phoneNumber || !city || !province || !role){
//         return res.status(500).json({ message: 'All fields are required' });
//     }

//     const creatAccountData = { id, firstName, lastName, email, phoneNumber, city, province, role};

//     //path to json file 
//     const USER_FILENAME = path.join(__dirname, 'data', 'users.json');

//     fs.readFile(USER_FILENAME, 'utf8', (err, data) => {
//     let users = [];
//     if (!err && data) {
//         users = JSON.parse(data);
//     }

//     //add the new registration data
//     users.push(creatAccountData);

//     fs.writeFile(USER_FILENAME, JSON.stringify(users, null, 2), (err) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error saving registration' });
//         }
//         return res.status(200).json({ message: 'Registration successful', creatAccountData });
//         });
//     });
// });
/* ******************************************************************************* */
/* END of Create Account Routes */


// View Property routes
/* ******************************************************************************* */

router.get('/viewProperty', function(req, res) 
{
    res.sendFile(path.join(__dirname, 'public', 'pages', 'viewProperty.html'));

});

router.get('/viewProperty/:propertyId', function(req, res)
{
    
    let propertyId = parseInt(req.params.propertyId);
    const properties = retrieveData(PROPERTIES_FILENAME);
    properties.then(
        function(allProperties)
        {            
            const property = allProperties.find(property => property.propertyId === propertyId);
            res.json(property);

            
        }
    )
    
});

router.get('/viewProperty/users/:userId', function(req, res)
{
    let userId = parseInt(req.params.userId);
    
    const users = retrieveData(USERS_FILENAME);
    users.then(
        function(allUsers)
        {
            
            const user = allUsers.find(user => user.id === userId);
            res.json(user);
        }
    );



});


/* ******************************************************************************* */
/* END of View Property Routes */

module.exports = router;
