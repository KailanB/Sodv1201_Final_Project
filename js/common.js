// COOKIEEEES https://www.w3schools.com/js/js_cookies.asp
function setUserCookie(userEmail, userId)
{

    let days = 1; // update these variables to set cookie expiration
    // let hours = 5;
    const expireDate = new Date(); 
    expireDate.setTime(expireDate.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = "userEmail=" + userEmail + ";" + expireDate + ";path=/";
    document.cookie = "userId=" + userId + ";" + expireDate + ";path=/";

}

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