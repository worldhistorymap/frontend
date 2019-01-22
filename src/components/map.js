import React, {Component} from "react";

import MapAPI from "./mapcomponents/map_api"
import SideBar from "./mapcomponents/sidebar"
import NavBar from "./mapcomponents/navbar"
import L from "leaflet"
import "./map.css"


class Map extends Component {

    state = {
        sideBarWidth: "0px",
        sideBarZIndex: -1,
        sideBarOpen: false,
    };


    setMap = map => {
        const wikiMarkers = L.layerGroup().addTo(map);
        this.setState({wikiMarkers, map})
    };

    toggleSideBar = () => {
        if (!this.state.sideBarOpen) {
            const sideBarWidth = "20%";
            const sideBarZIndex = 1;
            const sideBarOpen = true;
            this.setState({sideBarWidth, sideBarZIndex, sideBarOpen})
        } else {
            const sideBarWidth = "0";
            const sideBarZIndex = -1;
            const sideBarOpen = false;
            this.setState({sideBarWidth, sideBarZIndex, sideBarOpen})
        }
    };

    render () {
        return (
            <React.Fragment>
                    <NavBar toggleSideBar = {this.toggleSideBar}/>
                    <div id="content">
                        <SideBar width = {this.state.sideBarWidth} zIndex = {this.state.sideBarZIndex}/>
                        <MapAPI setMap={this.setMap}/>
                    </div>
            </React.Fragment>
        )
    }
}

export default Map;
