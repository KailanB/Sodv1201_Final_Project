




document.addEventListener('DOMContentLoaded', function () {

    document.getElementById("userLogInForm").addEventListener("submit", userLogIn);

    function userLogIn(event)
    {
        event.preventDefault();
        let userEmail = document.getElementById("userEmailLogIn").value;

        if(userEmail)
        {    
            
            //forEach iterates fully here before changing locations
            // users.forEach(user => {
            //     if(user.email === userEmail)
            //     {
                    
            //         setUserCookie(userEmail, user.userID); 
            //         // alert(document.cookie);
            //         window.location.href="../home.html";   
            //     }

            // });
            
            // better method. Needs further testing for multiple users. Perhaps user dummy data
            const users = JSON.parse(localStorage.getItem('users'));

            let currentUser = users.find(user => user.email === userEmail);
            if(currentUser)
            {
                setUserCookie(userEmail, currentUser.userID); 
                window.location.href="../home.html";
            }
            else
            {
                document.getElementById("logInFailedOutput").innerHTML = `Sorry, user not found. Click <a href="createAccount.html">here</a> to create an account`;
            }
             

            // alert(document.cookie);
        }
    }


    
});