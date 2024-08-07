document.addEventListener('DOMContentLoaded', function () {  

    

    function getIdFromUrl(IdName)
    {
        let name = IdName + "=";
        let url = window.location;
        url = url.toString();
        
        // find location in string of the search parameter
        let positionStart = url.indexOf(name);
        if(positionStart === -1)
        {
            return null;
        }
        else
        {

            // find the first question mark after the search parameter is found
            let positionEnd = (url.substring(positionStart)).indexOf("?") + positionStart;

            // slice string section containing ID of parameter
            // slice starts after the search name within url and ends at the question mark
            return url.slice((positionStart+name.length), positionEnd);
        }
        
    
    }

    let propertyId = parseInt(getIdFromUrl("propertyId"));
    let userId = parseInt(getIdFromUrl("userId"));
    const propertyDisplay = document.getElementById("propertyDisplay");
    const propertyNameTitle = document.getElementById("propertyNameTitle");
    const propertyNameHeader = document.getElementById("propertyNameHeader");


    const localUsers = JSON.parse(localStorage.getItem('users')) || [];
    const localProperties = JSON.parse(localStorage.getItem('properties')) || [];
    
    let property = localProperties.find((property) => property.propertyId === propertyId && property.userId === userId);


    // alert("UserId: " + userId + "propertyId: " + propertyId);
    // alert(property);
    // alert(property.name);

    let owner = localUsers.find((user) => user.userId === userId);



    // alert("My cookie: " + getUserCookie("userId") + " owner is: " + owner);
    // alert("property userId: " + property.userId);
    
    
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
    `;
    
    const ownerDiv = document.createElement('div');
    ownerDiv.classList.add('innerPageContent3', 'dynamicallyCreatedDiv');
    
    ownerDiv.innerHTML = `
    <h2>${owner.firstName} ${owner.lastName}</h2>
    <p>Email: ${owner.email}</p>
    <p>Phone Number: ${owner.phoneNumber}</p>    
    `;
    
    propertyDisplay.appendChild(propertyDiv);
    propertyDisplay.appendChild(ownerDiv);

    propertyNameTitle.innerHTML = property.name + " Property Page";
    propertyNameHeader.innerHTML = property.name + " Property Page";
    // alert("prop id" + propertyId + " user Id: " + userId);



});