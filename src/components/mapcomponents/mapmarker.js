import React, {Component} from "react";
import {Marker, Popup} from "react-leaflet";
import util from "util"

class MapMarker extends Component {

    componentDidMount() {
        this.getExtract(this.props.title);
    }

    getExtract = title => {
        title = title.replace(/ /g, "_");
        fetch(util.format("http://en.wikipedia.org/api/rest_v1/page/summary/%s", title))
            .then(response => response.json())
            .then(data => {
                console.log(data.extract);
                this.setState({extract: data.extract});
            });
    }

    render () {
        return(
            <Marker position={this.props.position}>
                <Popup>
                    <button className="btn btn-primary" onClick = {() => window.open(this.props.url, "_blank")}> {this.props.title} </button>
                    <textarea className="form-control form-rounded"> {this.getExtract(this.props.title)} </textarea>
                </Popup>
            </Marker>
        );
    }
}

export default MapMarker;
