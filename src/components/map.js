import React, {Component} from "react";

import MapAPI from "./mapcomponents/map_api"
import SideBar from "./mapcomponents/sidebar"
import NavBar from "./mapcomponents/navbar"
import util from  "util"
import L from "leaflet"
import "./map.css"


class Map extends Component {

    state = {
        sideBarWidth: "0px",
        sideBarZIndex: -1,
        sideBarOpen: false,
        wikiRange: 5000,
        opacity: 70,
        markers: [],
        markerNum: 0,
        nullMarkers: [],
    };

    WikiPageUrl =  "https://en.wikipedia.org/?curid=";

    removeWikiMarkers = () => {
        return;
    }

    removeMarkers  = () => {
        return;
    }

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

    setWikiRange = val => {
        if (val < 11) {
            val = 11;
        }
        if (val > 9999) {
            val = 9999;
        }
        this.setState({wikiRange: val})
    };

    setOpacity = val => {
        console.log(val);
        if (val <= 0) {
            val = 1;
        }
        if (val >= 99) {
            val = 99;
        }
        this.setState({opacity: val});
    };

    addNoWikiMarker = (lat,lng) => {
        let nullMarkers = [...this.state.nullMarkers];
        nullMarkers.push({lat, lng});
        this.setState({nullMarkers});
    };

    addWikiMarker = (lat, lng, pageid, title) => {
        const pos = [lat,lng];
        let markers = [...this.state.markers];
        const url = this.WikiPageUrl + pageid;
        markers.filter(c => c.key == pos)
        markers.push({key: pos, lat: lat, lng: lng, url: url, title: title})
        this.setState({markers});
    };

    /** put text render in promise **/
    wikiCall = (lnk, lat, lng) => {
        fetch(lnk).then(response => response.json())
            .then(data => {
                const articles = data.query.geosearch;
                if (articles.length === 0) {
                    this.addNoWikiMarker(lat, lng);
                } else {
                    articles.map(article => this.addWikiMarker(article.lat, article.lon, article.pageid, article.title));
                }
            })
    }

    onClick = (e) => {
       const lat = e.latlng.lat;
       const lng = e.latlng.lng;
       const fileReturnLimit = 5;
       console.log(lat, lng);
       let lnk = util.format("https://en.wikipedia.org/w/api.php?" +
            "action=query&origin=*&list=geosearch&gscoord=%d|%d" +
            "&gsradius=%d&gslimit=%d&prop=info|extracts&inprop=url" +
            "&format=json", lat, lng, this.state.wikiRange, fileReturnLimit);
       console.log(lnk);
       this.wikiCall(lnk, lat, lng);
    }

    render () {
        return (
            <React.Fragment>
                <NavBar toggleSideBar={this.toggleSideBar}
                        removeWikiMarkers={this.removeWikiMarkers}
                        removeMarkers={this.removeMarkers}
                        opacity={this.state.opacity}
                        wikiRange={this.state.wikiRange}
                        map={this.state.map}
                />
                <MapAPI onClick={this.onClick}
                markers={this.state.markers}
                nullMarkers = {this.state.nullMarkers}/>
            </React.Fragment>
        )
    }
}

export default Map;
