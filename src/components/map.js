import React, {Component} from "react";

import MapAPI from "./mapcomponents/map_api"
import SideBar from "./mapcomponents/sidebar"
import "./map.css"


class Map extends Component {

    state = {
        sideBarWidth: "0px",
        sideBarZIndex: -1,
        sideBarOpen: false
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
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <button onClick = {() => this.toggleSideBar()} type="button" id="sidebarCollapse" className="btn btn-info" >
                                <i className="fas fa-align-left"></i>
                                <span>SideBar</span>
                            </button>
                        </div>
                    </nav>
                    <div id="content">
                        <SideBar width = {this.state.sideBarWidth} zIndex = {this.state.sideBarZIndex}/>
                        <MapAPI/>
                    </div>
            </React.Fragment>
        )
    }
}

export default Map;
