document.addEventListener('DOMContentLoaded', function () {

    

    const propertyForm = document.getElementById('propertyForm');
    const propertiesDiv = document.getElementById('properties');
    const addPropertyOuterDiv = document.getElementById('addNewPropertyOuterDiv');
    const cancelAddPropertyButton = document.getElementById('cancelAddProperty');
    
    let editIndex = -1; // Index of property being edited


    displayProperties();

    // function to open add property div
    document.getElementById('openAddPropertyDiv').addEventListener('click', function () {
        
        addPropertyOuterDiv.style.display = 'block';
        resetForm();
        // https://stackoverflow.com/questions/3569329/javascript-to-make-the-page-jump-to-a-specific-location
        addPropertyOuterDiv.scrollIntoView({behavior: 'smooth'});
        editIndex = -1; // Reset edit mode
        // resetForm(); //position
    });
    
    // function to close add property div
    cancelAddPropertyButton.addEventListener('click', closeAddProperty);

    function closeAddProperty()
    {
        addPropertyOuterDiv.style.display = 'none';
    }
    

    // 
    propertyForm.addEventListener('submit', function (e) {
        e.preventDefault();
        saveProperty();
    });

    async function saveProperty()
    {

        
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
        // userId is filled in server side by user cookie id 
        const userId = null;
        let propertyId = Date.now();
        if(editIndex > -1)
        {
            // since we are editing a property the propertyId can be updated to the editIndex which now updates to the propertyId of the property being edited.
            propertyId = parseInt(editIndex);

        }
        // now when we create the "new" property if it was an edit the propertyId will be unchanged.
        const property = {
            name, address, city, province, area, type, capacity, parking, publicTransport, availability, rentalTerm, price, userId, propertyId
        };

        if (editIndex > -1) 
        {
            propertyId = parseInt(editIndex);
            await fetch('/myProperties', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(property)
            })
            .then(response => {

                // once client has received "OK" status re-display myProperty data
                if(response.status === 201)
                {
                    //display Properties again
                    resetForm();
                    closeAddProperty();
                    displayProperties();
                }
            })
            .catch(error => console.error('Error: Updating Property was unsuccessful.' + error));

        } else 
        {
            await fetch('/myProperties', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(property)
            })
            .then(response => {

                if(response.status === 201)
                {
                    //display Properties again
                    resetForm();
                    closeAddProperty();
                    displayProperties();
                }
            })
            .catch(error => console.error('Error: Adding Property was unsuccessful.' + error));
           
        }
    }

    function displayProperties()
    {


        /**********************************************************************************************************************/
        // TEMPORARY FUNCTION TO SET A DUMMY USER COOKIE !!
        // setUserCookie("kailanbates@gmail.com", 1);
        /**********************************************************************************************************************/

        propertiesDiv.innerHTML = '';


        // const userId = parseInt(getUserCookie("userId"));



        // add userId pulled from cookie to fetch route in order to only display properties belonging to that user
        // fetch(`/myPropertiesData/${userId}`)
        fetch(`/myPropertiesData`)
            .then(response => response.json())
            .then(properties => 
            {
                properties.forEach((property, index) => {
                    // added the check user cookie back so that only properties that belong to the logged in user are displayed


                    // if(property.userId === parseInt(getUserCookie("userId")))
                    // {

                   
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
                            <button class="edit-button" propertyId="${property.propertyId}">Edit</button>
                            <button class="remove-button" propertyId="${property.propertyId}">Remove</button>
                        `;
                        // here the buttons have the propertyId attached to them so that we can pull that data for the PUT request
                        
                        propertiesDiv.appendChild(propertyDiv);
                    }
                // }
            
            );

                // Add event listeners for edit and remove buttons
                document.querySelectorAll('.edit-button').forEach((button, index) => {
                    button.addEventListener('click', function () {
                        // editIndex is updated to the propertyId. This value gets sent in the fetch request to find the corresponding property in the server data
                        editIndex = this.getAttribute('propertyId');
                        // properties here is still referring to the response array from the fetch.
                        populateForm(properties[index]);
                        addPropertyOuterDiv.style.display = 'block';
                        addPropertyOuterDiv.scrollIntoView({behavior: 'smooth'});
                    });
                });
                
                document.querySelectorAll('.remove-button').forEach(button => {
                    button.addEventListener('click', function () {
                    editIndex = this.getAttribute('propertyId');
                    deleteProperty(editIndex);
                });
                    
                });
            })
            .catch(error => console.error('Error fetching data ' + error));


        

    }

    async function deleteProperty(propertyId) 
    {
        let response = prompt(`Are you sure you want to permanently delete this property? \nType "yes" to delete.`);

        response = response.toLowerCase();
        if(response === "yes")
        {

            propertyId = parseInt(propertyId);
            await fetch(`/myProperties/${propertyId}`, {method: 'DELETE'})
            .then(response => {

                // once client has received "OK" status re-display myProperty data
                if(response.status === 201)
                {
                    //display Properties again
                    // resetForm();
                    // closeAddProperty();
                    displayProperties();
                }
            })
            .catch(error => console.error('Error: deleting Property was unsuccessful.' + error));


            // properties.splice(index, 1);
            // localStorage.setItem('properties', JSON.stringify(properties));
            displayProperties();
        }
    }


    function resetForm() 
    {
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

});