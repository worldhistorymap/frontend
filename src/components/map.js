import React, {Component} from "react";

import MapAPI from "./mapcomponents/map_api"
import NavBar from "./mapcomponents/navbar"
import RecBar from "./mapcomponents/recbar"
import util from  "util"
import "./map.css"


class Map extends Component {

    STAMEN_TERRAIN = 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png';
    STAMEN_TERRAIN_BACKGROUND = 'https://stamen-tiles.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.png';
    WikiPageUrl =  "https://en.wikipedia.org/?curid=";

    state = {
        recBarZIndex: -1,
        recBarOpen: false,
        wikiRange: 5000,
        opacity: 70,
        markers: [],
        markerNum: 0,
        nullMarkers: [],
        wikiMarkerNum: 1,
        noArticleMarkerNum: 1,
        year: 2019,
        baseTiles: this.STAMEN_TERRAIN_BACKGROUND,
        baseIsTerrainBackground: true
    };



    componentDidMount() {
        /**Function copied from  https://stackoverflow.com/questions/21513646/how-to-get-x-y-z-coordinates-of-tile-by-click-on-leaflet-map **/
        if (typeof (Number.prototype.toRad) === "undefined") {
            Number.prototype.toRad = function () {
                return this * Math.PI / 180;
            }
        }
    }

    changeBaseMap () {
        if (this.state.baseTiles === this.STAMEN_TERRAIN) {
            this.setState({baseTiles: this.STAMEN_TERRAIN_BACKGROUND,
                            baseIsTerrainBackground: true, 
            });
        } else {
            this.setState({baseTiles: this.STAMEN_TERRAIN, 
                            baseIsTerrainBackground: false, 
            });
        }
    }


    removeMarkers  = () => {
        this.setState({markers: [], nullMarkers: []});
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
        if (val <= 0) {
            val = 1;
        }
        if (val >= 99) {
            val = 99;
        }
        this.setState({opacity: val});
    };

    toggleRecBar = () => {
        if (!this.state.recBarOpen) {
            const recBarZIndex = 5;
            const recBarOpen = true;
            this.setState({recBarZIndex, recBarOpen});
        } else {
            const recBarZIndex = -1;
            const recBarOpen = false;
            this.setState({recBarZIndex, recBarOpen});
        }
    };

    addNoWikiMarker = (lat,lng) => {
        let nullMarkers = [...this.state.nullMarkers];
        nullMarkers.push({lat: lat, lng: lng, id: this.state.noArticleMarkerNum});
        this.setState({nullMarkers, noArticleMarkerNum: this.state.noArticleMarkerNum + 1});
    };

    addWikiMarker = (lat, lng, pageid, title) => {
        let markers = [...this.state.markers];
        const url = this.WikiPageUrl + pageid;
        markers.filter(c => c.lat === lat && c.lng === lng);
        markers.push({id: this.state.wikiMarkerNum, lat: lat, lng: lng, url: url, title: title});
        this.setState({markers, wikiMarkerNum: this.state.wikiMarkerNum + 1});
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
    };


    mapOnClick = (e) => {
       const lat = e.latlng.lat;
       const lng = e.latlng.lng;
       const fileReturnLimit = 5;
       let lnk = util.format("https://en.wikipedia.org/w/api.php?" +
            "action=query&origin=*&list=geosearch&gscoord=%d|%d" +
            "&gsradius=%d&gslimit=%d&prop=info|extracts&inprop=url" +
            "&format=json", lat, lng, this.state.wikiRange, fileReturnLimit);
       this.wikiCall(lnk, lat, lng);
    };

    getTileCoordinates = (lat, lng, zoom) => {
        /**Function copied from  https://stackoverflow.com/questions/21513646/how-to-get-x-y-z-coordinates-of-tile-by-click-on-leaflet-map **/
        const x = parseInt(Math.floor( (lng + 180) / 360 * (1<<zoom) ));
        const y = parseInt(Math.floor( (1 - Math.log(Math.tan(lat.toRad()) + 1 / Math.cos(lat.toRad())) / Math.PI) / 2 * (1<<zoom) ));
        this.setState({x, y, zoom});
    };

    mapOnMouseMove = (e, zoom) => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        /** Insert search for map zooming over at that time **/
        this.getTileCoordinates(lat,lng,zoom);
    };

    setYear = year => {
        if (year > 2019) {
            year = 2019;
        } else if (year < -3000) {
            year = -3000;
        }

        if (year == null || year === "") {
            year = this.state.year;
        }

        this.setState({year});
    };

    render () {
        return (
            <React.Fragment>
                <NavBar removeWikiMarkers={this.removeWikiMarkers}
                        removeMarkers={this.removeMarkers}
                        opacity={this.state.opacity}
                        wikiRange={this.state.wikiRange}
                        setWikiRange={this.setWikiRange}
                        map={this.state.map}
                        setOpacity={this.setOpacity}
                        setYear = {this.setYear}
                        year = {this.state.year}
                        toggleRecBar = {this.toggleRecBar}
                        changeBaseMap = {this.changeBaseMap.bind(this)}
                        baseIsTerrainBackground = {this.state.baseIsTerrainBackground}
                        removeMarkers = {() => this.removeMarkers()}
                />

                <MapAPI onClick={this.mapOnClick}
                        onMouseMove = {this.mapOnMouseMove}
                        markers={this.state.markers}
                        nullMarkers = {this.state.nullMarkers}
                        year = {this.state.year}
			setYear = {this.setYear}
                        opacity = {this.state.opacity}
                        baseTiles = {this.state.baseTiles}
                />

                <RecBar zIndex={this.state.recBarZIndex}/>
            </React.Fragment>
        )
    }
}

export default Map;
