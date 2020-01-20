import Evented from '../../basic-tools/components/evented.js'

class Mapeable extends Evented{

    constructor(id){
        super();
        
        this.id = id;
        
        this.layer = {};

        this.source = {};

        this.feature = {};
    }

    /**
     * see mapbox documentation to know what you need to implement in this functions
     * 
     * (look for  layer, source and features mainly)
     */
    Layer(){
        throw new Error("Layer function needs to be implemented");
    }

    Feature(){
        throw new Error("Feature function needs to be implemented");
    }

    Source(data){
        throw new Error("Source function needs to be implemented");
    }
}

export default Mapeable;
