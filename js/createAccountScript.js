document.addEventListener('DOMContentLoaded', function () {

    // commented arguments are an alternative way of defining roles
    function User(firstName, lastName, email, phone, city, province, role, userID /* owner, renter*/)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phone;
        this.city = city;
        this.province = province;
        this.role = role;
        this.userID = userID;
        this.properties = [];

    }

    document.getElementById("createNewUserForm").addEventListener("submit", createNewUser);
    function createNewUser(event) 
    {

        event.preventDefault();
        // localStorage.clear();

        let firstName = document.getElementById("userFirstNameInput").value;
        let lastName = document.getElementById("userLastNameInput").value;
        let email = document.getElementById("userEmailAddressInput").value;
        let phoneNumber = document.getElementById("userPhoneInput").value;
        let city = document.getElementById("userCityInput").value;
        let province = document.getElementById("userProvince").value;
        let role = document.querySelector('input[name="ownerRenter"]:checked').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];


        // add user check for existing email not working!
        // needs updates! 
        
        // alert(users.length);
        // let userExists = false;

        // users.forEach( user => {

        //     // check that the email is not already used;
        //     if (user.email = email)
        //     {
        //         alert("Sorry email already in use!");
        //         userExists = true;
        //         return;
        //     }

        // });
        if (true ) //!userExists
        {
            let userID;
            if (localStorage.getItem('userID')) // check that a userID save has been created
            {
                userID = parseInt(localStorage.getItem('userID'));
                // increase userID to ensure all IDs are unique
                userID++;
            }
            else
            {
                // if userID is not yet saved to local storage, start with 1
                userID = 1;
            }
            // this must be saved to local storage, or database so that all ID's are unique
            localStorage.setItem('userID', JSON.stringify(userID));

            let newUser = new User(firstName, lastName, email, phoneNumber, city, province, role, userID);
            
            users.push(newUser);

            localStorage.setItem('users', JSON.stringify(users));
        
            
            
            document.getElementById("userFirstNameInput").value = "";
            document.getElementById("userLastNameInput").value = "";
            document.getElementById("userEmailAddressInput").value = "";
            document.getElementById("userPhoneInput").value = "";
            document.getElementById("userCityInput").value = "";
            document.getElementById("userProvince").value = "";
            document.querySelector('input[name="ownerRenter"]:checked').checked = false;
        }

       

        
        // temporary output to test and view user data
        document.getElementById("forTesting").innerHTML = "";
        users.forEach(user => {

            let newp = document.createElement("p");
            
            document.getElementById("forTesting").appendChild(newp);
            
            newp.innerHTML = ` ${user.firstName} ${user.lastName} Role: ${user.role}, lives in: ${user.city}, userID: ${user.userID} user Email: ${user.email}`;
            
        })
        // above used for testing


        // commented out for testing, however page should redirect so that user can log in after creating an account 
        // window.location.href="logIn.html";
        
        


    }









});