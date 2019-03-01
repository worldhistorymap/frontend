import React, {Component} from 'react';
import {Modal} from "react-bootstrap";
import '../map.css';
import util from "util";

class Legend extends Component {
    legendServer = process.env.REACT_APP_LEGEND_SERVER;
    state = {
        show: false,
    };

    open () {
        this.setState({
            show: true,
        });
    }

    close () {
        this.setState({
            show: false, 
        });
    }

    render () {
        const legendUrl = util.format("%s/%s/%s/%s", this.legendServer, this.props.x, this.props.y, this.props.z, this.props.year);
        console.log(legendUrl);
        return (
            <React.Fragment>
                <img src={legendUrl} id = "legend" className="img-thumbnail" onClick={() => this.open()}></img>
                <Modal id="legend-server" show={this.state.show} onHide={() => this.close()}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={legendUrl} className="img-thumbnail"></img>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        )
    }
}

export default Legend 