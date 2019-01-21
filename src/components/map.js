import React, {Component} from "react";

import MapAPI from "./mapcomponents/map_api"

import "./map.css"

class Map extends Component {
    render () {
        return (
            <React.Fragment>
                <MapAPI/>
            </React.Fragment>
        )
    }
}

export default Map;
