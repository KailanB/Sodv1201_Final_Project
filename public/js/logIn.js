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
            // Redirect to home page on successful login
            window.location.href = '/';
        } else {
            // Display error message
            document.getElementById('logInFailedOutput').textContent = 'Login failed: Invalid email.';
        }
    })
    .catch(error => console.error('Error:', error));
});
