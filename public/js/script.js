document.addEventListener("DOMContentLoaded", () => {
    fetchProperties();
});

let allProperties = [];

function fetchProperties() {
    fetch('/properties')
        .then(response => response.json())
        .then(data => {
            allProperties = data;
            displayProperties(allProperties);
        })
        .catch(error => console.error("Error fetching properties:", error));
}

function displayProperties(properties) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    properties.forEach(property => {
        const propertyDiv = document.createElement('div');
        // create event listener to provide a link to view each property
        propertyDiv.addEventListener("click", function(){
            viewProperty(property.propertyId, property.userId)
        });
        // propertyDiv.classList.add('property-item');
        propertyDiv.classList.add('innerPageContent3', 'dynamicallyCreatedDiv', 'mouseHover');
        propertyDiv.innerHTML = `
            <h3>${property.name}</h3>
            <p>${property.address}, ${property.city}, ${property.province}</p>
            <div>
                <p>Type: ${property.type}</p>
            </div>
            <p>Area: ${property.area} sqft</p>
            <p>Capacity: ${property.capacity}</p>
            <p>Parking: ${property.parking ? 'Yes' : 'No'}</p>
            <p>Public Transport: ${property.publicTransport ? 'Yes' : 'No'}</p>
            <div>
                <p>Price: $${property.price} - ${property.rentalTerm}</p>
                <p>Availability: ${property.availability ? 'Available' : 'Unavailable'}</p>
            </div>
            
        `;
        resultsContainer.appendChild(propertyDiv);
    });
}

function viewProperty(propertyId, userId)
{
    window.location.href = "/viewProperty?propertyId=" + propertyId + "&userId=" + userId + "&";
}

function performSearch() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredProperties = allProperties.filter(property => 
        property.name.toLowerCase().includes(searchInput) ||
        property.address.toLowerCase().includes(searchInput) ||
        property.type.toLowerCase().includes(searchInput)
    );
    displayProperties(filteredProperties);
}

//Apply Filter
function applyFilters() {
    // Retrieve filter values
    const filterAvailability = document.getElementById('filterAvailability').value;
    const filterParking = document.getElementById('filterParking').value;
    const filterTransport = document.getElementById('filterTransport').value;
    const filterType = document.getElementById('filterType').value.toLowerCase();

    // Convert filter values to boolean
    const filterAvailabilityBoolean = filterAvailability === "" ? null : filterAvailability === "true";
    const filterParkingBoolean = filterParking === "" ? null : filterParking === "true";
    const filterTransportBoolean = filterTransport === "" ? null : filterTransport === "true";

    // Filter properties based on the selected filters
    const filteredProperties = allProperties.filter(property => {
        return (
            (filterAvailabilityBoolean === null || property.availability === filterAvailabilityBoolean) &&
            (filterParkingBoolean === null || property.parking === filterParkingBoolean) &&
            (filterTransportBoolean === null || property.publicTransport === filterTransportBoolean) &&
            (filterType === "" || property.type.toLowerCase().includes(filterType))
        );
    });

    // Display filtered properties
    displayProperties(filteredProperties);
}
