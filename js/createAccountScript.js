document.addEventListener('DOMContentLoaded', function () {

    // commented arguments are an alternative way of defining roles
    function User(firstName, lastName, email, phone, city, province, role /* owner, renter*/)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phone;
        this.city = city;
        this.province = province;
        this.role = role;

        /*
        // we could use booleans in stead which may make it easier for checks that way you can simply write
        // if (user.owner) for if statements, otherwise you would have to write if (user.role === "Owner") which seems tedious
        this.owner = owner;
        this.renter = renter;
        */

    }

    document.getElementById("createNewUserForm").addEventListener("submit", createNewUser);
    function createNewUser(event) 
    {

        event.preventDefault();
        

        let firstName = document.getElementById("userFirstNameInput").value;
        let lastName = document.getElementById("userLastNameInput").value;
        let email = document.getElementById("userEmailAddressInput").value;
        let phoneNumber = document.getElementById("userPhoneInput").value;
        let city = document.getElementById("userCityInput").value;
        let province = document.getElementById("userProvince").value;
        let role = document.querySelector('input[name="ownerRenter"]:checked').value;

        /*
        //using bools method.
        let owner;
        let renter;
        if (role === "Owner")
        {
            owner = true;
            renter = false;
        }
        else 
        {
            owner = false;
            renter = true;
        }
        let newUser = new User(firstName, lastName, email, phoneNumber, owner, renter);
        */
        
        let newUser = new User(firstName, lastName, email, phoneNumber, city, province, role);

        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        users.push(newUser);

        localStorage.setItem('users', JSON.stringify(users));
       

        
        document.getElementById("userFirstNameInput").value = "";
        document.getElementById("userLastNameInput").value = "";
        document.getElementById("userEmailAddressInput").value = "";
        document.getElementById("userPhoneInput").value = "";
        document.getElementById("userCityInput").value = "";
        document.getElementById("userProvince").value = "";
        document.querySelector('input[name="ownerRenter"]:checked').checked = false;

        
        // temporary output to test and view user data
        document.getElementById("forTesting").innerHTML = "";
        users.forEach(user => {

            
            let newp = document.createElement("p");
            
            document.getElementById("forTesting").appendChild(newp);
            
            newp.innerHTML = ` ${user.firstName} ${user.lastName} Role: ${user.role}, lives in: ${user.city}`;
            
        })
        // above used for testing
        
        


    }









});