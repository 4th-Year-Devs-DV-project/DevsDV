import Mapeable from '../map/mapeable.js';


class Car extends Mapeable {

    static instance = 0;
    static colors = ["red", "black", "green", "magenta", "yellow", "cyan", "pink"];
    
    
    constructor(id){

        super(id);

        this.serialNumber = ++Car.instance;

        this.color = Car.colors[(this.serialNumber - 1) % Car.colors.length];

        this.location = [];

        this.data = {};

        this.html = null;

        this.Layer();

        this.Source();
    }    

    /**
     * 
     * @param {*} updated object that comes from the actual car
     * 
     * it should contain {location: [x,y], data: {a:"qw", b:"qw", c: "qw" ...}} 
     */
    Update(updated){

        this.Location(updated.location);

        this.Data(updated.data);

        this.Source();
    }

    /**
     * 
     * @param {[float, float]} location  array of length 2, represents the coordinates x,y of this object
     * 
     * returns and sets this.location.
     */
    Location(location){        
        
        if(location != undefined){

            this.location = location;
        } 

        return this.location;
    }

    /**
     * 
     * @param {*} data object that represents the data to keep track of 
     * 
     * i.e {passengers : 15, velocity : 45 km/h}
     * 
     * returns and sets this.data.
     */
    Data(data){

        if(data != undefined){

            this.data = {};

            for(var key in data){
                

                this.data[key] = data[key];
            }
        }     
        
        return this.data;
    }


    /**
     * Creates a layer to be displayed on a map (mapbox)
     */
    Layer(){
        this.layer = {

            'id' : 'car-layer-' + this.id,

            'type' : 'symbol',

            'source' : "car-source-" + this.id,

            'layout' : {

             'icon-image': '{icon}-15',

             'icon-allow-overlap': true
            }
        }

        return this.layer;
    }

    /**
     * Creates the source (mapbox)
     * 
     * this mainly contains the information to be shown in the map (this.source.data)
     */
    Source(){
        this.source = {

            "id" : "car-source-" + this.id,

            'type' : 'geojson',

            'data' : {

                'type' : 'FeatureCollection',

                'features' : [this.Feature()]
            }
        }

        return this.source;
    }

    Feature(){
        this.feature = {

            'type' : 'Feature',

            'properties' : {

                'info' : this.HTML().outerHTML,

                'icon' : 'car'

            },
            'geometry': {

                 'type': 'Point',

                 'coordinates': this.Location()

            }
        }

        return this.feature;
    }

    /**
     * Creates an html template for this object
     * 
     * <h1> Car: this.id </h1>
     * For each key-value pair in data creates a <div><span>KEY</span><span>VALUE</span></div>
     * 
     * i.e 
     * Car : 1
     * velocity : 54 km/h
     * passengers : 15
     * 
     */
    HTML(){

        var root = document.createElement("div");
        root.className = "car-node " + this.id;

        var h1 = document.createElement("h1");

        h1.innerText = "Car : " + this.id;
        h1.className = "car-title " + this.id;

        root.appendChild(h1);

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
        }

        this.htmlNode = root;

        return this.htmlNode;
    }   
}



export default Car;

