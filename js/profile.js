    
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
                let button = document.getElementById("editProfileButton")
                button.addEventListener("click", editProfile);
                button.innerHTML = "Edit Profile";
                button.removeEventListener("click", displayUser);
            }
                        
        
    }
    displayUser();

    document.getElementById("editProfileButton").addEventListener("click", editProfile);
      

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
        document.getElementById("saveProfileButton").addEventListener("click", saveProfile);
        let button = document.getElementById("editProfileButton")
        button.removeEventListener("click", editProfile);
        button.innerHTML = "X";
        button.addEventListener("click", displayUser);

    }


    function saveProfile()
    {
        const users = JSON.parse(localStorage.getItem('users')) || [];

        let currentUser = getCurrentUser();
        let firstName = document.getElementById("firstNameInput").value;
        let lastName = document.getElementById("lastNameInput").value;
        let email = document.getElementById("emailInput").value;
        let phone = document.getElementById("phoneInput").value;
        let city = document.getElementById("cityInput").value;
        let province = document.getElementById("provinceInput").value;


        let notInUse = false;
        // check if email is unchanged 
        // change both to lower case first, since email are not case sensitive.
        if(currentUser.email.toLowerCase() === email.toLowerCase())
        {
            notInUse = true;
        }
        // check if email is in use by another account
        else if(!(users.find(user => user.email.toLowerCase() === email.toLowerCase())))
        {
            notInUse = true;
        }
        else // otherwise return false and allow update
        {
            notInUse = false;
        }

        
        if(notInUse)
        {

            // since email is NOT in use, iterate through users array and find current user
            // I used a for loop here because other methods were not altering the array
            for(let i = 0; i< users.length ; i++)
            {
                if(users[i].userID === currentUser.userID)
                {
                    // update their information
                    users[i].firstName = firstName;
                    users[i].lastName = lastName;
                    users[i].email = email;
                    users[i].phoneNumber = phone;
                    users[i].city = city;
                    users[i].province = province;
                }
            } 
            // save data 
            localStorage.setItem('users', JSON.stringify(users));
            // return to regular profile page
            displayUser();
            

        }
        else //otherwise if email is in use...
        {
            // display some output for the user, ideally not an alert box. 
            // this can be changed
            alert("Email already in use!");
        }

        



    }

});
