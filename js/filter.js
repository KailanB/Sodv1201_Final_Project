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
