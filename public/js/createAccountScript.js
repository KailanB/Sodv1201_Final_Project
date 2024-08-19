// document.getElementById("createNewUserForm").addEventListener("submit", function(event) {
//     event.preventDefault(); // Prevent form submission

//     // Get form values
//     const firstName = document.getElementById("userFirstNameInput").value.trim();
//     const lastName = document.getElementById("userLastNameInput").value.trim();
//     const email = document.getElementById("userEmailAddressInput").value.trim();
//     const phoneNumber = document.getElementById("userPhoneInput").value.trim();
//     const city = document.getElementById("userCityInput").value.trim();
//     const province = document.getElementById("userProvince").value;
//     const role = document.querySelector('input[name="ownerRenter"]:checked')?.value;

//     // Validate form inputs
//     if (!firstName || !lastName || !email || !phoneNumber || !city || !province || !role) {
//         alert("Please fill in all fields.");
//         return;
//     }

//     // Create registration object with unique ID
//     const registrationDetails = {
//         id: Date.now(), // Unique ID based on timestamp
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         phoneNumber: phoneNumber,
//         city: city,
//         province: province,
//         role: role
//     };

//     // Send registration data to the server
//     fetch('/api/createAccount', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(registrationDetails)
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.message === 'User Created Successfully') {
//             // Display confirmation
//             document.getElementById('forTesting').innerHTML = `
//                 <p>ID: ${data.registrationData.id}</p>
//                 <p>First Name: ${data.registrationData.firstName}</p>
//                 <p>Last Name: ${data.registrationData.lastName}</p>
//                 <p>Email: ${data.registrationData.email}</p>
//                 <p>Phone Number: ${data.registrationData.phoneNumber}</p>
//                 <p>City: ${data.registrationData.city}</p>
//                 <p>Province: ${data.registrationData.province}</p>
//                 <p>Role: ${data.registrationData.role}</p>
//             `;
//             document.getElementById("confirmationMessage").style.display = "block";
//             // Clear form fields after submission
//             document.getElementById("createNewUserForm").reset();
//         } else {
//             alert(data.message);
//         }
//     })
//     .catch(error => console.error('Error:', error));
// });

document.getElementById("createNewUserForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const firstName = document.getElementById("userFirstNameInput").value.trim();
    const lastName = document.getElementById("userLastNameInput").value.trim();
    const email = document.getElementById("userEmailAddressInput").value.trim();
    const phoneNumber = document.getElementById("userPhoneInput").value.trim();
    const city = document.getElementById("userCityInput").value.trim();
    const province = document.getElementById("userProvince").value;
    const role = document.querySelector('input[name="ownerRenter"]:checked')?.value;

    // Validate form inputs
    if (!firstName || !lastName || !email || !phoneNumber || !city || !province || !role) {
        alert("Please fill in all fields.");
        return;
    }

    // Create registration object with unique ID
    const registrationDetails = {
        id: Date.now(), // Unique ID based on timestamp
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        city: city,
        province: province,
        role: role
    };

    // Send registration data to the server
    fetch('/api/createAccount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationDetails)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'User Created Successfully') {
            // Optional: You can show an alert or other notification
            alert('Account created successfully!');

            // Clear form fields after submission
            clearFormFields();
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});

// Function to clear form fields
function clearFormFields() {
    const form = document.getElementById("createNewUserForm");
    for (let element of form.elements) {
        switch (element.type) {
            case 'text':
            case 'email':
            case 'number':
            case 'textarea':
                element.value = '';
                break;
            case 'radio':
            case 'checkbox':
                element.checked = false;
                break;
            case 'select-one':
                element.selectedIndex = 0; // Sets to the first option
                break;
        }
    }
}
