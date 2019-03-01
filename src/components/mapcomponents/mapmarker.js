import React, {Component} from "react";
import {Marker, Popup} from "react-leaflet";
import L from "leaflet"
import util from "util"
import "../map.css"

class MapMarker extends Component {

    state = {
        extract: ""
    }
    componentDidMount() {
        this.getExtract(this.props.title);
    }

    getExtract = title => {
        title = title.replace(/ /g, "_");
        fetch(util.format("http://en.wikipedia.org/api/rest_v1/page/summary/%s", title))
            .then(response => response.json())
            .then(data => {
                this.setState({extract: data.extract});
            });
    }

    render () {
        const icon = L.icon({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png')
        });
        return(
            <Marker position={this.props.position} icon={icon}
                    onMouseOver={e => {
                        e.target.openPopup();
                    }}
            >
                <Popup autoPan={false}>
                    <button className="btn btn-primary btn-marker" onClick = {() => window.open(this.props.url, "_blank")}> {this.props.title} </button>
                    <p>{this.state.extract}</p>
                </Popup>
            </Marker>
        );
    }
}

export default MapMarker;
