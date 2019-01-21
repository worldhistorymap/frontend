import React, {Component} from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import styled from 'styled-components';
import '../map.css'

class MapAPI extends Component {
    componentDidMount() {
        this.map = L.map('map', {
            center: [47.3769, 8.5417],
            zoom: 5,
            zoomControl: false
        });

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
            {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoidmFpYmhhdmoiLCJhIjoiY2pmZ2d1NDVjMjdzMDMzbWlhdTRtZXAyZyJ9.X3KDHMveDXHRh795LdSFmw',
            }).addTo(this.map);
    }

    render () {
        return (
            <div id="map"/>
        )
    }
}

export default MapAPI
