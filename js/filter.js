document.addEventListener('DOMContentLoaded', function () {  

let searchTab = document.getElementById("searchTab");
let advancedSearchFilters = document.getElementById("advancedSearchFilters");

let properties = [];

async function fetchProperties() {
    try {
        const response = await fetch('YOUR_LOCAL_SERVER_API_ENDPOINT');
        properties = await response.json();
        filterResults();
    } catch (error) {
        console.error('Error fetching properties:', error);
    }
}

function fetchAndFilterResults() {
    if (properties.length === 0) {
        fetchProperties();
    } else {
        filterResults();
    }
}

function filterResults() {
    const filterAvailability = document.getElementById('filterAvailability').value.toLowerCase();
    const filterParking = document.getElementById('filterParking').value.toLowerCase();
    const filterTransport = document.getElementById('filterTransport').value.toLowerCase();
    const filterType = document.getElementById('filterType').value.toLowerCase();
    const basicSearch = document.getElementById('basicSearch').value.toLowerCase();

    const filteredProperties = properties.filter(property => {
        return (
            (property.availability.toLowerCase().includes(filterAvailability) || filterAvailability === '') &&
            (property.parking.toLowerCase().includes(filterParking) || filterParking === '') &&
            (property.publicTransport.toLowerCase().includes(filterTransport) || filterTransport === '') &&
            (property.type.toLowerCase().includes(filterType) || filterType === '') &&
            (property.name.toLowerCase().includes(basicSearch) || 
            property.address.toLowerCase().includes(basicSearch) || 
            property.type.toLowerCase().includes(basicSearch) || 
            basicSearch === '')
        );
    });

    displayResults(filteredProperties);
}

function displayResults(filteredProperties) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    if (filteredProperties.length === 0) {
        resultsContainer.innerHTML = '<p>No properties found</p>';
        return;
    }

    filteredProperties.forEach(property => {
        const propertyDiv = document.createElement('div');
        propertyDiv.classList.add('property');
        propertyDiv.innerHTML = `
            <h3>${property.name}</h3>
            <p>Address: ${property.address}</p>
            <p>Type: ${property.type}</p>
            <p>Area: ${property.area}</p>
            <p>Capacity: ${property.capacity}</p>
            <p>Parking: ${property.parking}</p>
            <p>Public Transport: ${property.publicTransport}</p>
            <p>Availability: ${property.availability}</p>
            <p>Rental Term: ${property.rentalTerm}</p>
            <p>Price: ${property.price}</p>
        `;
        resultsContainer.appendChild(propertyDiv);
    });
}

// Fetch properties when the page loads
window.onload = fetchProperties;




//For Testing- to check apply filter works or not 
function fetchAndFilterResults() {
    // Get filter values
    const availability = document.getElementById('filterAvailability').value;
    const parking = document.getElementById('filterParking').value;
    const transport = document.getElementById('filterTransport').value;
    const type = document.getElementById('filterType').value;

    // Mock data - replace this with actual API call
    const properties = [
        { name: 'Property 1', availability: 'available', parking: 'yes', transport: 'no', type: 'studio' },
        { name: 'Property 2', availability: 'unavailable', parking: 'no', transport: 'yes', type: 'gallery' },
        // Add more properties as needed
    ];

    // Filter properties based on criteria
    const filteredProperties = properties.filter(property => {
        return (availability === '' || property.availability === availability) &&
               (parking === '' || property.parking === parking) &&
               (transport === '' || property.transport === transport) &&
               (type === '' || property.type.toLowerCase().includes(type.toLowerCase()));
    });

    // Display filtered properties
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; // Clear existing results

    if (filteredProperties.length > 0) {
        filteredProperties.forEach(property => {
            const propertyDiv = document.createElement('div');
            propertyDiv.textContent = property.name; // Customize this to display more property details
            resultsContainer.appendChild(propertyDiv);
        });
    } else {
        resultsContainer.textContent = 'No properties found';
    }
}

// self invoking function that adds the view property link ONLY if a user is logged in and an owner
(function () {
    
    let userId = parseInt(getUserCookie("userId"));
    if(userId)
    { 
        let currentUser = getCurrentUser();
        if(currentUser.role === "Owner")
        {
            let navList = document.getElementById("pageNavigation");
            let listItem = document.createElement("li");
            listItem.innerHTML = `<a href="pages/viewProperties.html">View Properties</a>`;
            navList.appendChild(listItem);         
        }
        
        
    }
})();

// self invoking function that displays all properties as a default. This could later be changed to a limited amount or "featured" properties or some other result.
// then a user can instead search for specifics and those results can replace these
(function displayProperties() {
        let resultsContainer = document.getElementById("resultsContainer");
        resultsContainer.innerHTML = '';
        let localProperties = JSON.parse(localStorage.getItem('properties')) || [];
        localProperties.forEach((property) => {
                const propertyDiv = document.createElement('div');
                propertyDiv.addEventListener("click", function(){
                    viewProperty(property.propertyId, property.userId)
                });
                propertyDiv.classList.add('innerPageContent3', 'dynamicallyCreatedDiv', 'mouseHover');
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
                resultsContainer.appendChild(propertyDiv);
        });
    
    })();

    function viewProperty(propertyId, userId)
    {
        window.location.href = "pages/singlePropertyView.html?propertyId=" + propertyId + "?userId=" + userId + "?";
    }

    // NEED A METHOD FOR PHONE USERS -- Maybe an X appears on the window or instead of the magnifying glass to remove the window.********** 
    advancedSearchFilters.addEventListener("mouseleave", function() {

        if(window.innerWidth <= 701)
        {
            {
                advancedSearchFilters.style.display = "none";
                advancedSearchFilters.style.position = "fixed";
                
            }
        }
    });
    
    searchTab.addEventListener("click", function() {
    
        
        advancedSearchFilters.style.display = "flex";
        advancedSearchFilters.style.position = "fixed";
    
    });
    
   
    // alert(window.innerWidth);
    window.onresize = displaySearchFilters;
    // brings the search window back if screen size is increased again.
    // I had a bug where after display was set to none through javascript it would no longer revert back based on screen size
    function displaySearchFilters()
    {
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth
        if(window.innerWidth > 701)
        {
            
            
            if(advancedSearchFilters.style.display === "none")
            {
                advancedSearchFilters.style.display = "flex";
                advancedSearchFilters.style.position = "absolute";
            }
        }
        else
        {
            if(advancedSearchFilters.style.display === "flex")
            {
                advancedSearchFilters.style.display = "none";
                advancedSearchFilters.style.position = "fixed";
            }
            
        }
    }

});