    
document.addEventListener('DOMContentLoaded', function () {   
    
    //function to return current user object so that data may be displayed 
    function getCurrentUser()
    {
        let currentUser;
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.find(user => 
        {

            
            if(user.userID === parseInt(getUserCookie("userId")))
            {
                currentUser = user;
                
            }
            
            

        });
        return currentUser;

    }

    function displayUser() {
       

        // localStorage.clear();       

        const profileContainer = document.getElementById('profileContainer');

        profileContainer.innerHTML = '';
        
        let currentUser = getCurrentUser();
            // display user data after finding correct user
            if(currentUser)
            {
                
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
                if(currentUser.role === "Owner")
                {
                    let newLink = document.createElement("p");
                    newLink.innerHTML = `<li><a href="../pages/viewProperties.html">View Properties</a></li>`;
                    document.getElementById("pageNavigation").appendChild(newLink);

                }
            }
                        
        
    }
    displayUser();

    document.getElementById("editProfileButton").addEventListener("click", editProfile)

    document.getElementById("saveProfileButton").addEventListener("click", saveProfile)
      

    function editProfile()
    {
        // alert("test");
        let currentUser = getCurrentUser();
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

    }

    function saveProfile()
    {

        let users = JSON.parse(localStorage.getItem('users')) || [];

        let currentUser = getCurrentUser();
        let firstName = document.getElementById("firstNameInput").value;
        let lastName = document.getElementById("lastNameInput").value;
        let email = document.getElementById("emailInput").value;
        let phone = document.getElementById("phoneInput").value;
        let city = document.getElementById("cityInput").value;
        let province = document.getElementById("provinceInput").value;

        //find isn't working properly
        if(!(users.find(user => user.email === emailInput)))
        {
            currentUser.firstName = firstName;
            currentUser.lastName = lastName;
            currentUser.email = email;
            currentUser.phone = phone;
            currentUser.city = city;
            currentUser.province = province;
        }
        else
        {
            alert("Email already in use!");
        }

        displayUser();



    }

});
