import React, {Component} from "react";
import 'leaflet/dist/leaflet.css'
import '../map.css'
import { Map, Marker, Popup, TileLayer, LayersControl } from 'react-leaflet'
import MapMarker from "./mapmarker"
import L from "leaflet";
import util from "util";

const {BaseLayer} = LayersControl;
class MapAPI extends Component {

     tileRegions = ["iberia", "mediaeval_middle_east", "northern_europe"];
     tileRegionServer = "https://worldhistorymap.io/tiles"

     componentDidMount() {
         this.tileOverlay = L.layerGroup().addTo(this.map.leafletElement);
         this.tileRegions.map(region => {
             L.tileLayer(this.getTiles(region), {
                 tms: true,
                 opacity: this.props.opacity,
                 className: region,
             }).addTo(this.tileOverlay);
         });
         this.props.setYear(1444);  
     }

    componentDidUpdate(prevProps) {
         if (this.props.year !== prevProps.year) {
             this.tileOverlay.clearLayers();
             this.tileRegions.map(region => {
                 L.tileLayer(this.getTiles(region), {
                     tms: true,
                     opacity: this.props.opacity,
                     className: region,
                 }).addTo(this.tileOverlay);
             });
         }
    }

     getTiles =  region => {
         const url = util.format("%s/%s/%d/{z}/{x}/{y}.png", this.tileRegionServer, region, this.props.year);
         return url;
     };

    render () {
        const position = [47.3768, 8.5417];
        const icon = L.icon({
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
        });
        return (
            <React.Fragment>
                <Map zoomControl = {false}
                     ref={e => { this.map = e; }}
                     onClick = {(e) => this.props.onClick(e)}
                     onMouseMove = {(e) => this.props.onMouseMove(e, this.map.leafletElement.getZoom())}
                     id = "map" center={position} zoom={6}>
                        <TileLayer
                            url= {this.props.baseTiles}
                            attribution= 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
                            maxZoom= "18"
                            id= 'stamen-tiles'
                            zindex={0}
                        />
                    {this.props.markers.map(marker => (
                        <MapMarker key = {marker.id} position={[marker.lat, marker.lng]} url = {marker.url} title = {marker.title} />
                    ))}
                    {this.props.nullMarkers.map (
                        nullMarker => (
                            <Marker key = {nullMarker.id} position = {[nullMarker.lat, nullMarker.lng]} icon = {icon}
                                onMouseOver={e => {
                                    e.target.openPopup();
                                }}
                                onMouseOut = {e => {
                                    e.target.closePopup();
                                }}
                            >
                                <Popup>
                                    <p>There are no articles in this area. Try expanding the search range.</p>
                                </Popup>
                            </Marker>
                        )
                    )}
                </Map>
            </React.Fragment>
        )
    }
}

export default MapAPI
