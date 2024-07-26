




document.addEventListener('DOMContentLoaded', function () {

    document.getElementById("userLogInForm").addEventListener("submit", userLogIn);

    function userLogIn(event)
    {
        event.preventDefault();
        let userEmail = document.getElementById("userEmailLogIn").value;

        if(userEmail)
        {
            
            const users = JSON.parse(localStorage.getItem('users'));
            //forEach iterates fully here before changing locations
            users.forEach(user => {
                if(user.email === userEmail)
                {
                    
                    setUserCookie(userEmail, user.userID); 
                    // alert(document.cookie);
                    window.location.href="../home.html";
                    
                }
               

            });
            
        }
    }


    
});