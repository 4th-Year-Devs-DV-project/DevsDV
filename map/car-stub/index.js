import Car from './myStubCar.js'

window.onload = function(){
    //socket
    var socket = io('http://localhost:3000');

    socket.on("connection-success", function(data){alert(data)});
    
    //nodes involved in interactions
    var addCarButton = document.getElementById("create-car");

    var input = document.getElementById("input-id");

    var carsContainer = document.getElementById("cars-container");    

    //event listener to "Add Car" button
    //Creates "Real Cars" and displays its html on the page
    addCarButton.addEventListener("click", function(){
        if(input.value == "") return;
        
        var car = new Car(input.value);
               
        carsContainer.appendChild(car.htmlNode);

        //when the car info is updated the socket emits that info
        car.On("Updated", function(){            
            
            socket.emit("update-car", {id: car.id, data:car.data, location: car.currentLocation.location});
        });

        //when the car is ready to be mapped, the socket emits the car id
        car.On("Subscribe", function(){
            
            socket.emit("subscribe-car", car.id);
        }); 
    });
}