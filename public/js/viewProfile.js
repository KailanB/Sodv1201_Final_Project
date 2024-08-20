
document.addEventListener('DOMContentLoaded', function () {

    displayUser();


async function displayUser()
{
    
    let currentUser = await getCurrentUser();
    const profileContainer = document.getElementById('profileContainer');
    profileContainer.innerHTML = '';

    
    profileContainer.innerHTML = `
        <h2>Name: ${currentUser.firstName} ${currentUser.lastName}</h2>
        <br>
        <p>Email: ${currentUser.email}</p>
        <br>
        <p>Phone: ${currentUser.phoneNumber}</p>
        <br>
        <p>City: ${currentUser.city}</p>
        <br>
        <p>Province: ${currentUser.province}</p>
        <br>
        <p>Role: ${currentUser.role}</p>                
    
    `;

    //this adds a link to the nav bar to view properties but only in the case that a user is the owner. Otherwise only the home page is there
    
    let button = document.getElementById("editProfileButton")
    button.addEventListener("click", editProfile);
    button.innerHTML = "Edit Profile";
    button.removeEventListener("click", displayUser);
    
}


async function editProfile()
{

    let currentUser = await getCurrentUser();
    profileContainer.innerHTML = `
        <label>First Name: &nbsp;</label><input id="firstNameInput" value="${currentUser.firstName}"><label> &nbsp; Last Name: &nbsp;</label><input id="lastNameInput" value="${currentUser.lastName}">
        <br>
        <br>
        <label>Email: &nbsp;</label><input id="emailInput" value="${currentUser.email}">
        <br>
        <br>
        <label>Phone: &nbsp;</label><input id="phoneInput" value="${currentUser.phoneNumber}"</input>
        <br>
        <br>
        <label>City: &nbsp;</label><input id="cityInput" value="${currentUser.city}"</label>
        <br>
        <br>
        <label>Province: &nbsp;</label><input id="provinceInput" value="${currentUser.province}"</label>
        <br>
        <br>
        <button class="standardButton" id="saveProfileButton">Save Changes</button>
    
    `;
    document.getElementById("saveProfileButton").addEventListener("click", saveProfile);
    let button = document.getElementById("editProfileButton")
    button.removeEventListener("click", editProfile);
    button.innerHTML = "X";
    button.addEventListener("click", displayUser);

}


async function saveProfile()
{

   
    let currentUser = await getCurrentUser();
    
    let id = currentUser.id;
    let firstName = document.getElementById("firstNameInput").value;
    let lastName = document.getElementById("lastNameInput").value;
    let email = (document.getElementById("emailInput").value).toLowerCase();
    let phoneNumber = document.getElementById("phoneInput").value;
    let city = document.getElementById("cityInput").value;
    let province = document.getElementById("provinceInput").value;
    let role = currentUser.role;
    const updatedUser = {id, firstName, lastName, email, phoneNumber, city, province, role}
    
    await fetch('/profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)

    })
    .then (response => {

        if(response.status === 201)
        {
            displayUser();
        }
    })
    .catch(error => alert("Error: " + error));

}


});
