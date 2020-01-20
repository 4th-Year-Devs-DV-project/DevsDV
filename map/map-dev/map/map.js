
mapboxgl.accessToken = 'pk.eyJ1IjoibXJqaW1lbmV6IiwiYSI6ImNrMHpwemhvajBoa3Mzbm84bGdxMHY4dHoifQ.31tiCj_oIvXYXCzG9Yvkdg';

class Map extends mapboxgl.Map{
    
    constructor(){  

        super(Map.MapOptions());   

        this.mapeables = {};  

        this.AddControl("FullscreenControl");

        this.AddControl("NavigationControl");
        
        this.popup = new mapboxgl.Popup({closeButton: false, closeOnClick: false});
    }

    /**
     * 
     * @param {*} mapeable must implement mapleable.js 
     * 
     * mapeable object must have a layer object and a source object (see mapbox documentation)
     * 
     * adds the mapleable object to the map.
     *
     * Event listeners are set only for mouseenter/mouseleave. I think event listeners should be set (as functions)
     * 
     * on the mapleable object and not in here...
     */
    AddMapeableObject(mapeable){

        if(this.mapeables[mapeable.id] != undefined) return;  
        
        this.mapeables[mapeable.id] = mapeable;

        this.AddLayer(mapeable.layer, mapeable.source);

        this.EventListeners(mapeable);
    }

    /**
     * 
     * @param {*} mapeable 
     * 
     * updates the mapleable object on the map
     * 
     */    
    UpdateMapeable(mapeable){

        var sourceID = mapeable.source.id;
        
        var data = mapeable.source.data;

        this.UpdateLayer(sourceID, data);
    }

    /**
     * 
     * @param {*} layer 
     * @param {*} source 
     * 
     * adds a layer to the map
     */
    AddLayer(layer, source){
        
        this.addSource(source.id, {type: source.type, data: source.data});

        this.addLayer(layer);
    }

    /**
     * 
     * @param {*} sourceID 
     * @param {*} data 
     * 
     * Updates a layer on the map
     */

    UpdateLayer(sourceID, data){    
        
        var source = this.getSource(sourceID);   

        source.setData(data);
    }

    /**
     * 
     * @param {*} fnName 
     * @param {*} options 
     * 
     * adds controls to the map (see mapbox documentation)
     */
    AddControl(fnName, options){   
        
        this.addControl(new mapboxgl[fnName](options));
    }

    /**
     * 
     * @param {*} mapeable 
     * 
     * sets event listeners for mapleable
     * 
     * TODO: this function should be more generic
     */
    EventListeners(mapeable){

        this.on('mouseenter', mapeable.layer.id, function (e) {
            
            // Change the cursor style as a UI indicator.
            this.getCanvas().style.cursor = 'pointer';

            var coordinates = e.features[0].geometry.coordinates.slice();
            var description =  e.features[0].properties.info;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            // Populate the popup and set its coordinates
            // based on the feature found.
            this.popup
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(this);
        }.bind(this));

        this.on('mouseleave', mapeable.layer.id , function () {
            
            this.getCanvas().style.cursor = '';
            this.popup.remove();
        }.bind(this));

    }
    
    static setToken(token){
        mapboxgl.accessToken = token;
    }

    static MapOptions() {    
        return {
            container: document.getElementById('map'),
            style: 'mapbox://styles/mrjimenez/ck1mw29ms0bm41cqasq6b8de8',
            center: [-75.697729, 45.384924],
            zoom: 15.00,
            pitch: 54,
            bearing: -29.6
    
        };
    }
    
}

export default Map;