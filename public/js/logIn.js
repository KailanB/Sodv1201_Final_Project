// document.addEventListener('DOMContentLoaded', () => {
//     // Check if the user is logged in by checking the presence of the 'userEmail' cookie
//     // const isLoggedIn = document.cookie.split('; ').some(row => row.startsWith('userEmail='));
//     const cookies = document.cookie.split('; ');
//     const isLoggedIn = cookies.some(cookie => cookie.startsWith('userEmail='));

//      console.log('User is logged in:', isLoggedIn); // Debug log

//     // Toggle UI elements based on login status
//     if (isLoggedIn) {
//         document.getElementById('loginButtonContainer').style.display = 'none';
//         document.getElementById('logoutButtonContainer').style.display = 'block';
//     } else {
//         document.getElementById('loginButtonContainer').style.display = 'block';
//         document.getElementById('logoutButtonContainer').style.display = 'none';
//     }
// });

// // Handle login form submission
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
//             // Check if the email is returned correctly
//             if (data.email) {
//                 console.log('Logged in user email:', data.email);
//                 // Redirect to home page on successful login
//                 window.location.href = '/';
//             } else {
//                 console.error('No email returned in response.');
//                 document.getElementById('logInFailedOutput').textContent = 'Login failed: Email not found in response.';
//             }
//         } else {
//             // Display error message
//             document.getElementById('logInFailedOutput').textContent = 'Login failed: Invalid email.';
//         }
//     })
//     .catch(error => console.error('Error:', error));
// });



// //logout
// async function logoutUser() {
//     try {
//         const response = await fetch('/api/logout', {
//             method: 'POST',
//             credentials: 'include' // Ensure cookies are sent with the request
//         });

//         const data = await response.json();
//         if (data.success) {
//             console.log('Logged out successfully');
//             // Redirect or update UI
//             window.location.href = '/login'; // Or another page
//         } else {
//             console.error('Logout failed:', data.message);
//         }
//     } catch (error) {
//         console.error('Error during logout:', error);
//     }
// }

// // Add event listener to logout button
// document.addEventListener('DOMContentLoaded', () => {
//     const logoutButton = document.getElementById('logoutButton');
//     if (logoutButton) {
//         logoutButton.addEventListener('click', async function() {
//             await logoutUser();
//         });
//     } else {
//         console.error('Logout button not found.');
//     }
// });



document.addEventListener('DOMContentLoaded', () => {

    console.log('All Cookies:', document.cookie); // Debug log for all cookies
    // Check if the user is logged in by checking the presence of the 'userEmail' cookie
    const cookies = document.cookie.split('; ');
    const isLoggedIn = cookies.some(cookie => cookie.startsWith('userEmail='));

    console.log('User is logged in:', isLoggedIn); // Debug log

    // Toggle UI elements based on login status
    if (isLoggedIn) {
        document.getElementById('loginButtonContainer').style.display = 'none';
        document.getElementById('logoutButtonContainer').style.display = 'block';
    } else {
        document.getElementById('loginButtonContainer').style.display = 'block';
        document.getElementById('logoutButtonContainer').style.display = 'none';
    }
});

// Handle login form submission
document.getElementById('userLogInForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const userEmail = document.getElementById('userEmailLogIn').value.trim();

    await loginUser(userEmail);
});

async function loginUser(email) {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email})
        });

        const data = await response.json();
        if (data.success) {
            console.log('Logged in user email:', data.email);
            // Update UI and redirect
            window.location.href = '/'; // Redirect to the home page or dashboard
        } else {
            console.error('Login failed:', data.message);
            document.getElementById('logInFailedOutput').textContent = 'Login failed: ' + data.message;
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}

async function logoutUser() {
    alert('test');
    try {
        const response = await fetch('/api/logout', {
            method: 'POST',
            credentials: 'include' // Ensure cookies are sent with the request
        });

        const data = await response.json();
        if (data.success) {
            console.log('Logged out successfully');
            // Redirect or update UI
            window.location.href = '/login'; // Or another page
        } else {
            console.error('Logout failed:', data.message);
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
}

// Add event listener to logout button
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', async function() {
            await logoutUser();
        });
    }
});
