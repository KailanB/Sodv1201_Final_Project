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
        propertyDiv.classList.add('property-item');
        propertyDiv.innerHTML = `
            <h3>${property.name}</h3>
            <p>${property.address}, ${property.city}, ${property.province}</p>
            <p>Type: ${property.type}</p>
            <p>Area: ${property.area} sqft</p>
            <p>Capacity: ${property.capacity}</p>
            <p>Parking: ${property.parking ? 'Yes' : 'No'}</p>
            <p>Public Transport: ${property.publicTransport ? 'Yes' : 'No'}</p>
            <p>Availability: ${property.availability ? 'Available' : 'Unavailable'}</p>
            <p>Price: $${property.price}</p>
        `;
        resultsContainer.appendChild(propertyDiv);
    });
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
