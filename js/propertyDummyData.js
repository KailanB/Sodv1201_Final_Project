document.addEventListener('DOMContentLoaded', function () {

    (function displayProperties() {


        // alert("test");
        // localStorage.clear();
        let properties = JSON.parse(localStorage.getItem('properties')) || [];
        

        if(!properties.length) // check if array is empty
        {
            
                     
            
            let propertiesArray = [

                ["Galleria", "561 4th street", "Calgary", "AB", "Art Gallery", 500, 50, true, true, 300, "Daily", true, 1, 1],
                ["Sweet Sounds", "1212 5th ave", "Edmonton", "AB", "Recording Studio", 250, 5, true, false, 400, "Weekly", true, 1, 2],
                ["Theatrics Theatre", "781 1st street", "Saskatoon", "SK", "Theatre", 1000, 100, true, true, 5000, "Monthly", false, 2, 3],
                ["Creative Center", "22 50th street", "Calgary", "AB", "Painting Rooms", 700, 30, false, true, 1000, "Weekly", true, 2, 4],
                ["Simple Solutions Art", "820 2nd ave", "Vulcan", "AB", "All Purpose Art Space", 350, 8, true, false, 200, "Daily", true, 3, 5],
                ["Music Mania", "31 9th ave", "Calgary", "AB", "Music Studio", 850, 15, false, true, 3000, "Monthly", true, 4, 6],
                ["Sally Studio", "44 Oak Street", "Vancouver", "BC", "Art Gallery", 600, 25, true, false, 200, "Hourly", true, 5, 7],
                ["Dramatic Theatres ", "87 Elm ave", "Calgary", "AB", "Theatre", 1200, 300, true, true, 8000, "Monthly", true, 1, 8]


            ];
            let propertyId = 8;
            localStorage.setItem('propertyId', JSON.stringify(propertyId));
            propertiesArray.forEach( property => 
            {
                let newProperty = new Property(property[0], property[1], property[2], property[3], property[4], property[5], property[6], property[7], property[8], property[9], property[10], property[11], property[12], property[13]);
                properties.push(newProperty);
                
            });

            localStorage.setItem('properties', JSON.stringify(properties));

            displayProperties();
        }

        
    
    })();


    function Property(name, address, city, province, type, area, capacity, parking, transport, price, rentalTerm, available, userId, propertyId) 
    {
        this.name = name;
        this.address = address;
        this.city = city;
        this.province = province;
        this.type = type;
        this.area = area;
        this.capacity = capacity;
        this.parking = parking;
        this.transport = transport;
        this.price = price;
        this.rentalTerm = rentalTerm;
        this.available = available;
        this.userId = userId;
        this.propertyId = propertyId
    }





});
