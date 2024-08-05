
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

function checkCookie()
{
    let userName = getUserCookie("userEmail");
    let userId = getCookie("userId");
}

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
