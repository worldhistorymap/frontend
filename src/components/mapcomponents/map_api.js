import React, {Component} from "react";
import 'leaflet/dist/leaflet.css'
import styled from 'styled-components';
import '../map.css'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

class MapAPI extends Component {
    render () {
        const position = [47.3768, 8.5417]
        return (
            <Map zoomControl = {false}
                 onClick = {(e) => this.props.onClick(e)}
                 id = "map" center={position} zoom={6}>
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
}

export default MapAPI
