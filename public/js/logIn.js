// document.getElementById('userLogInForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent default form submission

//     const userEmail = document.getElementById('userEmailLogIn').value.trim();

//     fetch('/api/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email: userEmail })
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             // Redirect to home page on successful login
//             window.location.href = '/';
//         } else {
//             // Display error message
//             document.getElementById('logInFailedOutput').textContent = 'Login failed: Invalid email.';
//         }
//     })
//     .catch(error => console.error('Error:', error));
// });
document.addEventListener('DOMContentLoaded', () => {
    // Check if the user is logged in by checking the presence of the 'userEmail' cookie
    const isLoggedIn = document.cookie.split('; ').some(row => row.startsWith('userEmail='));

    // Toggle UI elements based on login status
    if (isLoggedIn) {
        document.getElementById('loginButtonContainer').style.display = 'none';
        document.getElementById('logoutButtonContainer').style.display = 'block';
    } else {
        document.getElementById('loginButtonContainer').style.display = 'block';
        document.getElementById('logoutButtonContainer').style.display = 'none';
    }
});


document.getElementById('userLogInForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const userEmail = document.getElementById('userEmailLogIn').value.trim();

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: userEmail })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Check if the email is returned correctly
            if (data.email) {
                console.log('Logged in user email:', data.email);
                // Redirect to home page on successful login
                window.location.href = '/';
            } else {
                console.error('No email returned in response.');
                document.getElementById('logInFailedOutput').textContent = 'Login failed: Email not found in response.';
            }
        } else {
            // Display error message
            document.getElementById('logInFailedOutput').textContent = 'Login failed: Invalid email.';
        }
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('logoutButton').addEventListener('click', () => {
    fetch('/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Redirect to the login page or home page on successful logout
            window.location.href = '/logIn';
        } else {
            console.error('Logout failed:', data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});
