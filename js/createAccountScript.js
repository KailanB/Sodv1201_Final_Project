document.addEventListener('DOMContentLoaded', function () {


    function User(firstName, lastName, email, phone)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phone;

    }

    document.getElementById("createNewUserForm").addEventListener("submit", createNewUser);
    function createNewUser(event) 
    {

        event.preventDefault();
        

        let firstName = document.getElementById("userFirstNameInput").value;
        let lastName = document.getElementById("userLastNameInput").value;
        let email = document.getElementById("userEmailAddressInput").value;
        let phoneNumber = document.getElementById("userPhoneInput").value;
        event.preventDefault();
        
        let newUser = new User(firstName, lastName, email, phoneNumber);

        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        users.push(newUser);

        localStorage.setItem('users', JSON.stringify(users));
       

        
        document.getElementById("userFirstNameInput").value = "";
        document.getElementById("userLastNameInput").value = "";
        document.getElementById("userEmailAddressInput").value = "";
        document.getElementById("userPhoneInput").value = "";


        // temporary output to test and view user data
        users.forEach(user => {

            
            let newp = document.createElement("p");
            
            document.getElementById("forTesting").appendChild(newp);
            
            newp.innerHTML = ` ${user.firstName} ${user.lastName}`;
            
        })
        // above used for testing
        
        


    }









});