//This class would simulate a real car
import Evented from '../basic-tools/components/evented.js'
import path from "./data/GeoFiles/road.js"

class MyStubCar extends Evented{

    static instance = 0;

    constructor(id){
        super();

        this.id = id;

        this.serialNumber = ++MyStubCar.instance;

        this.locations = this.Locations();  

        this.currentLocation = {index : this.locations.length -1 , location :this.locations[this.locations.length - 1]};
        
        this.data = {};

        this.htmlNode = document.createElement("div");

        this.htmlNode.className = "car-info " + this.id;

        this.HTML();

        this.Update();
    }

    Update(){

        var location = this.Location();

        var data = this.Data();

        this.HTML();

        this.Emit("Updated");

        return {location: location, data: data};
    }

    /*updates the location of this car, looping through this.locations */
    Location(){

        var currentIndex = this.currentLocation.index;

        var newIndex = (currentIndex + 1 < this.locations.length) ? currentIndex + 1 : 0;
        
        this.currentLocation = {index : newIndex, location : this.locations[newIndex]};

        return  this.currentLocation["location"];
    }

    Data(){
        this.data = {

            /* "velocity" : Math.floor(Math.random() * 10) + 1 + "Km/h", */

            "people" : Math.floor(Math.random() * 20) + 1,

            "combustible" : combustible(),
            
            "temperature-motor" : Math.floor(Math.random() * 100) + "C",

            "location" : this.currentLocation["location"],

            "driver" : "No-Driver"
        }

        return this.data; 
        
        function combustible(){
            var temp = Math.floor(Math.random() * 3) + 1;

            var combustible = "Full";
            
            if(temp == 3){
                combustible = "Full";
            }
            else if(temp == 2){
                combustible = "Medium";
            }
            else{
                combustible = "Low";
            }

            return combustible;
        }
    }


    /*Generates "Ramdom" Locations around the campus path*/
    Locations(){

        var array = [];

        var id = this.serialNumber;

        var temp = (id % 2 != 0) ? "loop-1" : "loop-2";

        var roadFeature =  path.features.find(x => x.properties.name == temp);

        var coordinates = roadFeature.geometry.coordinates[0];


        if(id % 3 == 0 || id % 4 == 0){
            
            for(var i = coordinates.length -1 ; i >= 0; i--){

                if(id % 4 && i % 3 == 0){

                    array.push(coordinates[i]);
                }                    

                else if(id % 3 && i % 2 == 0){

                    array.push(coordinates[i]);
                }                  

                else{

                    array.push(coordinates[i]);
                }                    
            }
        }

        else{

            for(var i = 0; i < coordinates.length; i++){

                array.push(coordinates[i]);
            }
        }
        return array;
    }

    HTML(){

        this.Empty();

        var root = document.createElement("div");
        root.className = "car-node " + this.id;

        var h1 = document.createElement("h1");

        h1.innerText = "Car : " + this.id;
        h1.className = "car-title " + this.id;

        root.appendChild(h1);

        var temp = 0;
        for(var k in this.data){

            var div = document.createElement("div");
            div.className = "car-item " + this.id;

            var key = document.createElement("span");
            key.className = "car-key " + k + " " + this.id;
            key.innerText = k + " : ";

            var value = document.createElement("span");
            value.className = "car-value " + k + " " + this.id;
            value.innerText = this.data[k];

            div.appendChild(key);

            div.appendChild(value);

            root.appendChild(div);

            temp++;
        }

        if(temp == 0){
            var div = document.createElement("div");
            div.className = "no-data " + this.id;   
            div.innerText = "There's no data yet";

            root.appendChild(div);
        }
        

        var updateButton = document.createElement("button");
        updateButton.innerHTML = "Update";
        updateButton.className = "button update";
        updateButton.addEventListener("click", this.Update.bind(this));

        var subscribeButton = document.createElement("button");
        subscribeButton.innerHTML = "Subscribe";
        subscribeButton.className = "button subscribe";
        subscribeButton.addEventListener("click", function(){this.Emit("Subscribe")}.bind(this));

        this.htmlNode.appendChild(root);
        this.htmlNode.appendChild(document.createElement("br"));
        this.htmlNode.appendChild(updateButton);
        this.htmlNode.appendChild(subscribeButton);

        return this.htmlNode;
    }

    Empty() {
        
        while (this.htmlNode.firstChild) {
            this.htmlNode.removeChild(this.htmlNode.firstChild);
        }
    }
    
}

export default MyStubCar;