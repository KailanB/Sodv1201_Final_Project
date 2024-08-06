
// COOKIEEEES https://www.w3schools.com/js/js_cookies.asp
// gives the user a cookie to track their id when they log in
function setUserCookie(userEmail, userId)
{

    let days = 1; // update these variables to set cookie expiration
    // let hours = 5;
    const expireDate = new Date(); 
    expireDate.setTime(expireDate.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = "userEmail=" + userEmail + ";" + expireDate + ";path=/";
    document.cookie = "userId=" + userId + ";" + expireDate + ";path=/";

}

// returns the users cookie by using the cookie name. Names used are:
// userEmail   (returns email address)
// userId      (returns unique user ID)
function getUserCookie(cname)
{
    
    let name = cname + "=";
    
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieValues = decodedCookie.split(";");
    for (let i = 0; i < cookieValues.length ; i++)
    {
        
        let c = cookieValues[i];
        while (c.charAt(0) === ' ')
        {
            c = c.substring(1);
            
        }
        if (c.indexOf(name) === 0)
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// function checkCookie()
// {
//     let userName = getUserCookie("userEmail");
//     let userId = getCookie("userId");
// }


//check the cookie and manage the display of login and logout
function checkUserLoggedIn() {
    let userEmail = getUserCookie("userEmail");
    // let userId = getCookie("userId");
    let loginButtonContainer = document.getElementById("loginButtonContainer");
    let logoutButtonContainer = document.getElementById("logoutButtonContainer");

    if (userEmail) {
        loginButtonContainer.style.display = "none";
        logoutButtonContainer.style.display = "block";
    } else {
        loginButtonContainer.style.display = "block";
        logoutButtonContainer.style.display = "none";
    }
}
// it will clear the cookie after I click on the log out button
function clearCookies() {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1); // Set expiration to 1 year from now.
    const expires = "expires=" + futureDate.toUTCString(); //is used to create a string representation of the expiration date for a cookie in the correct format
    //document.cookie: returns a string containing all cookies, separated by semicolons. and split(";") divides this string into an array.
    //c.split("=")[0] splits the cookie string at the = sign and takes the first part, which is the cookie name.
    //expires + "; path=/" appends the expires attribute to set the expiration date, and path=/ ensures the cookie is valid for the entire domain
    document.cookie.split(";").forEach(function(c) {
        let cookieName = c.trim().split("=")[0];
        // Set the cookie with the same name, but with an updated expiration date
        document.cookie = cookieName + "=; " + expires + "; path=/";
    });
}


// Event listener for logout button
document.addEventListener('DOMContentLoaded', function () {
    checkUserLoggedIn();
    document.getElementById("logoutButton").addEventListener("click", function() {
        clearCookies();
        window.location.href = "pages/logIn.html"; // Redirect to login page after logging out
    });
});

// compares user cookie id with the id of all registered users, when the function finds a matching user it returns that user object, otherwise returns null. 
// this can be used to retrieve other user data based on the currently browsing user
// for instance getCurrentUser().phone
function getCurrentUser()
{
    let currentUser;
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    users.find(user => 
    {
        if(user.userId === parseInt(getUserCookie("userId")))
        {
            
            currentUser = user;  
        }

    });
    return currentUser;
}
