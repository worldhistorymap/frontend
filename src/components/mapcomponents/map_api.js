import React, {Component} from "react";
import 'leaflet/dist/leaflet.css'
import styled from 'styled-components';
import '../map.css'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

import {GeoSearchControl, OpenStreetMapProvider} from "leaflet-geosearch";

class MapAPI extends Component {
    componentDidMount() {
        /**
        this.map = L.map('map', {
            center: [47.3769, 8.5417],
            zoom:ition = [] 5,
            zoomControl: false
        });

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
            {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoidmFpYmhhdmoiLCJhIjoiY2pmZ2d1NDVjMjdzMDMzbWlhdTRtZXAyZyJ9.X3KDHMveDXHRh795LdSFmw',
            }).addTo(this.map);
        const provider = new OpenStreetMapProvider();
        const searchControl = new GeoSearchControl({
            provider: provider,
            autoCompleteDelay: 250,
        });

        searchControl.addTo(this.map);

        this.setState({searchControl, provider});
         **/

        this.props.setMap(this.map);
        const map = (
            <Map center={position} zoom={13}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
            </Map>
        )
    }

    render () {
        const position = [47.3768, 8.5417]
        return (
            <Map center={position} zoom={6}>
                <TileLayer
                    url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
                    attribution= 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
                    maxZoom= "18"
                    id= 'mapbox.streets'
                    accessToken = 'pk.eyJ1IjoidmFpYmhhdmoiLCJhIjoiY2pmZ2d1NDVjMjdzMDMzbWlhdTRtZXAyZyJ9.X3KDHMveDXHRh795LdSFmw'
                />
            </Map>
        )
    }



        /**
        return (
            <div id="map"/>
        )
         **/
}

export default MapAPI
