import React, {Component} from "react";
import ReactBootstrapSlider from "react-bootstrap-slider";
import {FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button} from 'react-bootstrap';
import "../map.css";

class SideBar extends Component {
    state = {
        opacity: 70,
        wikiRange: 5000,
    };

    handleSubmit = (e) => {
       e.preventDefault();
       console.log("submitted");
    }

    handleOpacity = (e) => {
        const val = e.target.value;
        this.setState({opacity: val});
    }

    handleWikiRange = (e) => {
        const val = e.target.value;
        this.setState({wikiRange: val});
    }

    render() {
        return (
            <div id="sidebar" style={{width: this.props.width, zIndex: this.props.zIndex}}>
                <ul className="list-unstyled components">
                    <li>
                        <button onClick={() => this.props.removeWikiMarkers()} type="button" id="sidebarCollapse"
                                className="btn btn-info">
                            <i className="fas fa-align-left"></i>
                            <span>Clear All Wikipedia Markers</span>
                        </button>
                        <button onClick={() => this.props.removeMarkers()} type="button" id="sidebarCollapse"
                            className="btn btn-info">
                            <i className="fas fa-align-left"></i>
                            <span>Clear All Markers</span>
                        </button>
                    </li>
                    <li>
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup
                                controlId="formBasicText"
                            >
                                <ControlLabel>Change the Search Range Radius in meters for Articles</ControlLabel>
                                <FormControl
                                    type="number"
                                    placeholder="Enter a number between 10 and 10000"
                                    onChange = {this.handleWikiRange}
                                />
                                <FormControl.Feedback />
                                <Button
                                    onClick={() => this.props.setWikiRange(this.state.wikiRange)}
                                    className="btn btn-primary btn-large centerButton" type="submit" >Change Range</Button>
                            </FormGroup>
                        </form>
                    </li>
                    <li>
                       <form onSubmit={this.handleSubmit}>
                            <FormGroup
                                controlId="formBasicText"
                            >
                                <ControlLabel>Change the Search Range Radius in meters for Articles</ControlLabel>
                                <FormControl
                                    type="number"
                                    placeholder="Enter a Opacity Percetage between 1 and 99"
                                    onChange = {this.handleOpacity}
                                />
                                <FormControl.Feedback />
                                <Button className="btn btn-primary btn-large centerButton"
                                        onClick={() => this.props.setOpacity(this.state.opacity)}
                                        type= "submit"> Change Opacity</Button>
                            </FormGroup>
                       </form>
                    </li>
                    <li>
                        Recommendations
                    </li>
                    <li>
                        Add Pin
                    </li>
                    <li>
                       About
                    </li>
                </ul>
            </div>
        )
    }
}

export default SideBar
