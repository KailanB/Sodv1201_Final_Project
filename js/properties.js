document.addEventListener('DOMContentLoaded', function () {
    const propertyForm = document.getElementById('propertyForm');
    const propertiesDiv = document.getElementById('properties');
    const addPropertyOuterDiv = document.getElementById('addNewPropertyOuterDiv');
    const addPropertyButton = document.getElementById('addNewPropertyButton');
    const cancelAddPropertyButton = document.getElementById('cancelAddProperty');

    let properties = JSON.parse(localStorage.getItem('properties')) || [];
    let editIndex = -1; // Index of property being edited

    displayProperties();

    propertyForm.addEventListener('submit', function (e) {
        e.preventDefault();
        saveProperty();
    });

    cancelAddPropertyButton.addEventListener('click', function () {
        addPropertyOuterDiv.style.display = 'none';
    });

    document.getElementById('openAddPropertyDiv').addEventListener('click', function () {
        addPropertyOuterDiv.style.display = 'block';
        editIndex = -1; // Reset edit mode
        resetForm(); //position
    });

    function saveProperty() {
        const name = document.getElementById('propertyNameInput').value;
        const address = document.getElementById('propertyAddressInput').value;
        const city = document.getElementById('propertyCityInput').value;
        const province = document.getElementById('propertyProvinces').value;
        const area = document.getElementById('propertAreaInput').value;
        const type = document.getElementById('propertyTypeInput').value;
        const capacity = document.getElementById('propertyMaxOccupancyInput').value;
        const parking = document.querySelector('input[name="parking"]:checked')?.value === 'yes';
        const publicTransport = document.querySelector('input[name="transport"]:checked')?.value === 'yes';
        const availability = document.querySelector('input[name="availability"]:checked')?.value === 'yes';
        const rentalTerm = document.getElementById('rentalTermSelect').value;
        const price = document.getElementById('propertyPriceInput').value;


        const userId = parseInt(getUserCookie("userId"));

        const property = {
            name, address, city, province, area, type, capacity, parking, publicTransport, availability, rentalTerm, price, userId
        };

        if (editIndex > -1) {
            properties[editIndex] = property;
        } else {
            properties.push(property);
        }

        localStorage.setItem('properties', JSON.stringify(properties));
        displayProperties();
        addPropertyOuterDiv.style.display = 'none';
        resetForm(); //position
    }

    function displayProperties() {
        propertiesDiv.innerHTML = '';

        properties.forEach((property, index) => {
            // added the check user cookie back so that only properties that belong to the logged in user are displayed
            if(property.userId === parseInt(getUserCookie("userId")))
            {
                const propertyDiv = document.createElement('div');
                propertyDiv.classList.add('innerPageContent3', 'dynamicallyCreatedDiv');
                propertyDiv.innerHTML = `
                    <h2>${property.name}</h2>
                    <p>${property.address}</p>
                    <p>${property.city} ${property.province}</p>
                    <p>${property.area} sq Meters, Max Occupants: ${property.capacity}</p>
                    <p>Parking: ${property.parking ? 'Yes' : 'No'}</p>
                    <p>Public Transport: ${property.publicTransport ? 'Yes' : 'No'}</p>
                    <div>
                        <h3>${property.type}</h3>
                    </div>
                    <div>
                        <p>$${property.price} - ${property.rentalTerm}</p>
                        <p>${property.availability ? 'Available Now' : 'Not Available'}</p>
                    </div>
                    <button class="edit-button" data-index="${index}">Edit</button>
                    <button class="remove-button" data-index="${index}">Remove</button>
                `;
                propertiesDiv.appendChild(propertyDiv);
            }
        });

        // Add event listeners for edit and remove buttons
        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', function () {
                editIndex = this.getAttribute('data-index');
                populateForm(properties[editIndex]);
                addPropertyOuterDiv.style.display = 'block';
            });
        });
        
        document.querySelectorAll('.remove-button').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                properties.splice(index, 1);
                localStorage.setItem('properties', JSON.stringify(properties));
                displayProperties();
            });
        });
    }

    function populateForm(property) {
        document.getElementById('propertyNameInput').value = property.name;
        document.getElementById('propertyAddressInput').value = property.address;
        document.getElementById('propertyCityInput').value = property.city;
        document.getElementById('propertyProvinces').value = property.province;
        document.getElementById('propertAreaInput').value = property.area;
        document.getElementById('propertyTypeInput').value = property.type;
        document.getElementById('propertyMaxOccupancyInput').value = property.capacity;
        document.querySelector(`input[name="parking"][value="${property.parking ? 'yes' : 'no'}"]`).checked = true;
        document.querySelector(`input[name="transport"][value="${property.publicTransport ? 'yes' : 'no'}"]`).checked = true;
        document.querySelector(`input[name="availability"][value="${property.availability ? 'yes' : 'no'}"]`).checked = true;
        document.getElementById('rentalTermSelect').value = property.rentalTerm;
        document.getElementById('propertyPriceInput').value = property.price;
    }

    // function resetForm() {
    //     propertyForm.reset();
    //     document.querySelectorAll('input[name="parking"]').forEach(radio => radio.checked = false);
    //     document.querySelectorAll('input[name="transport"]').forEach(radio => radio.checked = false);
    //     document.querySelectorAll('input[name="availability"]').forEach(radio => radio.checked = false);
    //     document.getElementById('rentalTermSelect').value = '';
    // }
    function resetForm() {
        document.getElementById('propertyNameInput').value = '';
        document.getElementById('propertyAddressInput').value = '';
        document.getElementById('propertyCityInput').value = '';
        document.getElementById('propertyProvinces').value = '';
        document.getElementById('propertAreaInput').value = '';
        document.getElementById('propertyTypeInput').value = '';
        document.getElementById('propertyMaxOccupancyInput').value = '';
        document.querySelectorAll('input[name="parking"]').forEach(radio => radio.checked = false);
        document.querySelectorAll('input[name="transport"]').forEach(radio => radio.checked = false);
        document.querySelectorAll('input[name="availability"]').forEach(radio => radio.checked = false);
        document.getElementById('rentalTermSelect').value = '';
        document.getElementById('propertyPriceInput').value = '';
    }
});
