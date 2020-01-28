import Car from './car.js';
import Map from "../map/map.js";
import Evented from '../../basic-tools/components/evented.js';

class CMCSytem extends Evented{
    
    constructor(){   

        super();   
        
        this.cars = {};

        this.map = this.InitializeMap();

        this.socket = io('http://localhost:3000');

        this.socket.on("connection-success", function(data){alert(data)});

        this.socket.on("updated", this.UpdateCarOnMap.bind(this));    
    }

    /**
     * Initializes map
     * 
     * TODO: we should not start tracking cars until map is ready.
     * 
     * use sockets to emit map ready to let other clients know. 
     */
    InitializeMap(){

        this.map = new Map();

        this.map.on("load", function(ev){

            this.Emit("mapReady", {ev: ev});//instead of this.Emit do socket.emit...
            
        }.bind(this));

       return  this.map;
    }
    
    /**
     * adds a car to the system based on id
     * 
     * once it is created the car is added to the map as well
     */
    AddCar(id){

        var car = this.cars[id];

        if(car == undefined){  

            car = new Car(id);     

            this.cars[id] = car;

            this.map.AddMapeableObject(car);
        }
        
        return car;
    }

    /**
     * 
     * @param {*} item {location: [x,y], data {d:x, a:y, t:w, a:z}}
     * 
     * updates the car on the map
     */
    UpdateCarOnMap(item){
        
        var car = this.cars[item.id];
        
        if(car == undefined){

            car = this.AddCar(item.id);
        }

        car.Update(item);

        this.map.UpdateMapeable(car);                
    }
}


export default CMCSytem;

