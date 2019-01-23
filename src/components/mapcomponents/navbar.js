import React, {Component} from "react";
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";

class NavBar extends Component {
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

    render () {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-sm navbar-light bg-light navbar-fixed-top">
                    <div className="container-fluid">
                        <ul className="nav navbar-nav" >
                            <li className = "dropdown">
                                    <button type="button" id="opacityDropDown"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                            className="btn btn-default navbar-btn dropdown-toggle">
                                        Tile Opacity: {this.props.opacity} %
                                        <span className="caret"> </span>
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="opacityDropDown">
                                        <a className="dropdown-item" href="#">Action</a>
                                    </div>
                            </li>
                            <li>
                                <button onClick={() => this.props.toggleSideBar()} type="button"
                                        className="btn btn-info navbar-btn">
                                    Current Article Search Radius: {this.props.wikiRange} m
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}

export default NavBar;
