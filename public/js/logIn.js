document.addEventListener('DOMContentLoaded', () => {

    
    // const cookies = document.cookie.split('; ');
    // const isLoggedIn = cookies.some(cookie => cookie.startsWith('userEmail='));

    // console.log('User is logged in:', isLoggedIn); // Debug log

    // // Toggle UI elements based on login status
    // if (isLoggedIn) {
    //     document.getElementById('loginButtonContainer').style.display = 'none';
    //     document.getElementById('logoutButtonContainer').style.display = 'block';
    // } else {
    //     document.getElementById('loginButtonContainer').style.display = 'block';
    //     document.getElementById('logoutButtonContainer').style.display = 'none';
    // }
    document.getElementById('userLogInForm').addEventListener('submit', async function(event) {
        event.preventDefault();
    
        const userEmail = document.getElementById('userEmailLogIn').value.trim();
    
        await loginUser(userEmail);
        
    });

});

// Handle login form submission


async function loginUser(email) {
    try {
        const response = await fetch('/login', {
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

// async function logoutUser() {
//     // console.log("logout user");
//     try {
//         const response = await fetch('/logout', {
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




