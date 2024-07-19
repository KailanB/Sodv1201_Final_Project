document.addEventListener('DOMContentLoaded', function () {
    // Function to load properties from local storage and display them
    function loadProperties() {
        const properties = JSON.parse(localStorage.getItem('properties')) || [];
        const propertiesContainer = document.getElementById('properties');
        propertiesContainer.innerHTML = '';

        properties.forEach(property => {
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
        });
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

    // Add new property
    document.getElementById('addNewPropertyButton').addEventListener('click', function () {
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
                available
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
