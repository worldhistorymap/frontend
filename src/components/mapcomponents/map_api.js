import React, {Component} from "react";
import 'leaflet/dist/leaflet.css'
import '../map.css'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import MapMarker from "./mapmarker"
import L from "leaflet";
import util from "util";

class MapAPI extends Component {

     MAPBOX_API = process.env.REACT_APP_MAPBOX_API;
     tileRegions = ["iberia", "medieval_middle_east", "northern_europe"];
     tileRegionServer = process.env.REACT_APP_TILE_SERVER;

     getTiles =  region => {
         const url = util.format("%s/%s/%d/{z}/{x}/{y}.png", this.tileRegionServer, region, this.props.year);
         console.log(url);
         return url
     }
    render () {
        const position = [47.3768, 8.5417]
        const icon = L.icon({
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
        });
        return (
            <Map zoomControl = {false}
                 ref={ref => { this.map = ref; }}
                 onClick = {(e) => this.props.onClick(e)}
                 onMouseMove = {(e) => this.props.onMouseMove(e, this.map.leafletElement.getZoom())}
                 id = "map" center={position} zoom={6}>
                <TileLayer
                    url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
                    attribution= 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
                    maxZoom= "18"
                    id= 'mapbox.streets'
                    accessToken = {this.MAPBOX_API}
                    zindex={0}
                />
                {this.tileRegions.map( region => (
                    /**Having this many TileLayer calls is slow. Merge tilelayers together using gdal_merge, But ensure that a transparent tile from one region does not replace a nontransparent tile from another region
                     * in process.**/
                   <TileLayer
                       key = {region}
                       url = {this.getTiles(region)}
                       zindex = {1}
                       options = {{
                           tms: true,
                           opacity: this.props.opacity,
                       }}
                   />
                   ))}
                {this.props.markers.map(marker => (
                    <MapMarker key = {marker.id} position={[marker.lat, marker.lng]} url = {marker.url} title = {marker.title} />
                ))}
                {this.props.nullMarkers.map (
                    nullMarker => (
                        <Marker key = {nullMarker.id} position = {[nullMarker.lat, nullMarker.lng]} icon = {icon}>
                            <Popup>
                                <p>There are no articles in this area. Try expanding the search range.</p>
                            </Popup>
                        </Marker>
                    )
                )}
            </Map>
        )
    }
}

export default MapAPI
