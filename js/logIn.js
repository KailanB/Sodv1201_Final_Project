document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("userLogInForm").addEventListener("submit", userLogIn);

    function userLogIn(event) {
        event.preventDefault();
        let userEmail = document.getElementById("userEmailLogIn").value;

        if (userEmail) {
            // Ensure users is not null
            const users = JSON.parse(localStorage.getItem('users')) || [];
            let currentUser = users.find(user => user.email.toLowerCase() === userEmail.toLowerCase());

            if (users.length === 0) {
                document.getElementById("logInFailedOutput").innerHTML = "No users found. Please try again later.";
                return;
            }

            if (currentUser) {
                setUserCookie(userEmail, currentUser.userId);
                window.location.href = "../index.html";
            } else {
                document.getElementById("logInFailedOutput").innerHTML = `Sorry, user not found. Click <a href="createAccount.html">here</a> to create an account`;
            }
        }
    }
});
