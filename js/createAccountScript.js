document.addEventListener('DOMContentLoaded', function () {


    // localStorage.clear();
    // alert("Cleared!");

    // commented arguments are an alternative way of defining roles
    function User(firstName, lastName, email, phone, city, province, role, userId /* owner, renter*/)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phone;
        this.city = city;
        this.province = province;
        this.role = role;
        this.userId = userId;
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

        let userExists = false;
        // check if email is already in use. Returns undefined if not
        userExists = users.find( user => user.email.toLowerCase() === email.toLowerCase());
        

        if (!userExists)
        {
            let userId;
            if (localStorage.getItem('userId')) // check that a userId save has been created
            {
                userId = parseInt(localStorage.getItem('userId'));
                // increase userId to ensure all IDs are unique
                userId++;
            }
            else
            {
                // if userId is not yet saved to local storage, start with 1
                userId = 1;
            }
            // this must be saved to local storage, or database so that all ID's are unique
            localStorage.setItem('userId', JSON.stringify(userId));

            let newUser = new User(firstName, lastName, email, phoneNumber, city, province, role, userId);
            
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
        else 
        {

            // DISPLAY AN OUTPUT IF EMAIL IS ALREADY A REGISTERED USER!

            // let newp = document.createElement("p");
            // document.getElementById("forTesting").appendChild(newp);
            // newp.innerHTML = `${userExists.email} is already in use, please try another!`;
        }
        
        // temporary output to test and view user data
        document.getElementById("forTesting").innerHTML = "";
        users.forEach(user => {

            let newp = document.createElement("p");
            
            let forTestingDiv = document.getElementById("forTesting").appendChild(newp);
            
            newp.innerHTML = ` ${user.firstName} ${user.lastName} Role: ${user.role}, lives in: ${user.city}, userID: ${user.userId} user Email: ${user.email}`;
            if(userExists)
            {
                let emailInUseOutput = document.createElement("p");
                forTestingDiv.appendChild(emailInUseOutput);
                emailInUseOutput.innerHTML = "Email already in use! Please try another!";
            }
            
        })
        // above used for testing

        // commented out for testing, however page should redirect so that user can log in after creating an account 
        // window.location.href="logIn.html";

    }


});