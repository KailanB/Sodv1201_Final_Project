document.addEventListener('DOMContentLoaded', function () {
    
    // Function to load properties from local storage and display them
    function loadProperties() {
       
        let properties = JSON.parse(localStorage.getItem('properties')) || [];

        // localStorage.clear();
        // DUMMY DATA FOR TESTING **************************************** 
        if(!properties.length) // check if array is empty
        {
            
            let propertiesArray = [

                ["Galleria", "561 4th street", "Calgary", "AB", "Art Gallery", 500, 50, true, true, 300, "Daily", true, 1],
                ["Sweet Sounds", "1212 5th ave", "Edmonton", "AB", "Recording Studio", 250, 5, true, false, 400, "Weekly", true, 1],
                ["Theatrics Theatre", "781 1st street", "Saskatoon", "SK", "Theatre", 1000, 100, true, true, 5000, "Monthly", false, 2],
                ["Creative Center", "22 50th street", "Calgary", "AB", "Painting Rooms", 700, 30, false, true, 1000, "Weekly", true, 2],
                ["Simple Solutions Art", "820 2nd ave", "Vulcan", "AB", "All Purpose Art Space", 350, 8, true, false, 200, "Daily", true, 3],
                ["Music Mania", "31 9th ave", "Calgary", "AB", "Music Studio", 850, 15, false, true, 3000, "Monthly", true, 4],
                ["Sally Studio", "44 Oak Street", "Vancouver", "BC", "Art Gallery", 600, 25, true, false, 200, "Hourly", true, 5],
                ["Dramatic Theatres ", "87 Elm ave", "Calgary", "AB", "Theatre", 1200, 300, true, true, 8000, "Monthly", true, 1]


            ];
            
            propertiesArray.forEach( property => 
            {
                let newProperty = new Property(property[0], property[1], property[2], property[3], property[4], property[5], property[6], property[7], property[8], property[9], property[10], property[11], property[12]);
                properties.push(newProperty);
                
            });
            
            localStorage.setItem('properties', JSON.stringify(properties));
        }  
        


        properties = JSON.parse(localStorage.getItem('properties')) || [];
        const propertiesContainer = document.getElementById('properties');
        propertiesContainer.innerHTML = '';
        
        properties.forEach(property => {
            
            // alert("Cookie user ID: " + getUserCookie("userId") + " property userId: " + property.userId + " Property name: " + property.name);

            // check to display only properties that match current userId
            if(property.userId === parseInt(getUserCookie("userId")))
            {
                const propertyDiv = document.createElement('div');
                propertyDiv.className = 'innerPageContent3 dynamicallyCreatedDiv';
                
                propertyDiv.innerHTML = `
                    <h2>${property.name}</h2>
                    <p>${property.address}</p>
                    <p>${property.city}, ${property.province}</p>
                    
                    <p>${property.area} sq Meters, Max Occupants: ${property.maxOccupants}</p>
                    <p>Parking: ${property.parking ? 'Yes' : 'No'}</p>
                    <p>Public Transport: ${property.transport ? 'Yes' : 'No'}</p>
                    <div>
                        <h3>${property.type} (type)</h3>
                    </div>
                    <div>
                        <p>$${property.price.toFixed(2)} - ${property.rentalTerm}</p>
                        <p>${property.available ? 'Available Now' : 'Not Available'}</p>
                    </div>
                `;
                
                propertiesContainer.appendChild(propertyDiv);
            }
            
            
        });
        
    }


    function Property(name, address, city, province, type, area, maxOccupants, parking, transport, price, rentalTerm, available, userId) 
    {
        this.name = name;
        this.address = address;
        this.city = city;
        this.province = province;
        this.type = type;
        this.area = area;
        this.maxOccupants = maxOccupants;
        this.parking = parking;
        this.transport = transport;
        this.price = price;
        this.rentalTerm = rentalTerm;
        this.available = available;
        this.userId = userId;
    }
    // Load properties on page load
    loadProperties();

    // Show add property form
    document.getElementById('openAddPropertyDiv').addEventListener('click', function () {
        document.getElementById('addNewPropertyOuterDiv').style.display = 'flex'; // changed this from block to flex, so that the add property div is center aligned again  
    });

    // Hide add property form
    document.getElementById('cancelAddProperty').addEventListener('click', function () {
        document.getElementById('addNewPropertyOuterDiv').style.display = 'none';

        // added clear property inputs to the hide / X since this seems like a cancel to me.
        // this is optional. If we want to keep it, I'd put the clear property as it's own function
        document.getElementById('propertyNameInput').value = '';
        document.getElementById('propertyAddressInput').value = '';
        document.getElementById('propertyCityInput').value = '';
        document.getElementById('propertyProvinces').value = '';
        document.getElementById('propertyTypeInput').value = '';
        document.getElementById('propertAreaInput').value = '';
        document.getElementById('propertyMaxOccupancyInput').value = '';
        document.querySelector('input[name="parking"]:checked').checked = false;
        document.querySelector('input[name="transport"]:checked').checked = false;
        document.getElementById('propertyPriceInput').value = '';
        document.getElementById('rentalTermSelect').value = '';
        document.querySelector('input[name="availability"]:checked').checked = false;
        // above are clear property inputs added
    });

    document.getElementById('addNewPropertyButton').addEventListener('click', function () {

        // for testing and edits!
        // localStorage.clear();
        
        const name = document.getElementById('propertyNameInput').value;
        const address = document.getElementById('propertyAddressInput').value;
        const city = document.getElementById('propertyCityInput').value;
        const province = document.getElementById('propertyProvinces').value;
        const type = document.getElementById('propertyTypeInput').value;
        const area = parseFloat(document.getElementById('propertAreaInput').value);
        const maxOccupants = parseInt(document.getElementById('propertyMaxOccupancyInput').value, 10);
        const parking = document.querySelector('input[name="parking"]:checked').value === 'yes';
        const transport = document.querySelector('input[name="transport"]:checked').value === 'yes';
        const price = parseFloat(document.getElementById('propertyPriceInput').value);
        const rentalTerm = document.getElementById('rentalTermSelect').value;
        const available = document.querySelector('input[name="availability"]:checked').value === 'yes';


        const userId = parseInt(getUserCookie("userId"));

        if (name && address && city && province && type && !isNaN(area) && !isNaN(maxOccupants) && !isNaN(price) && rentalTerm) {
            const newProperty = {
                name,
                address,
                city,
                province,
                type,
                area,
                maxOccupants,
                parking,
                transport,
                price,
                rentalTerm,
                available,
                userId,
            };

            // Retrieve existing properties
            const properties = JSON.parse(localStorage.getItem('properties')) || [];
            properties.push(newProperty);

            // Store updated properties in local storage
            localStorage.setItem('properties', JSON.stringify(properties));

            // Clear form inputs
            document.getElementById('propertyNameInput').value = '';
            document.getElementById('propertyAddressInput').value = '';
            document.getElementById('propertyCityInput').value = '';
            document.getElementById('propertyProvinces').value = '';
            document.getElementById('propertyTypeInput').value = '';
            document.getElementById('propertAreaInput').value = '';
            document.getElementById('propertyMaxOccupancyInput').value = '';
            document.querySelector('input[name="parking"]:checked').checked = false;
            document.querySelector('input[name="transport"]:checked').checked = false;
            document.getElementById('propertyPriceInput').value = '';
            document.getElementById('rentalTermSelect').value = '';
            document.querySelector('input[name="availability"]:checked').checked = false;

            // Hide add property form
            document.getElementById('addNewPropertyOuterDiv').style.display = 'none';

            // Reload properties to show the new one
            loadProperties();
        } else {
            alert('Please fill in all required fields.');
        }
    });
});
