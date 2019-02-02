import React, {Component} from "react";
import {Button, ControlLabel, FormControl, FormGroup, Dropdown, DropdownButton, MenuItem} from "react-bootstrap";
import DropdownMenu from "react-bootstrap/es/DropdownMenu";

class NavBar extends Component {
    state = {
        opacity: 70,
        wikiRange: 5000,
    };

    preventDefault = (e) => {
        e.preventDefault();
        e.stopPropagation();
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
        const opacityTile = "Tile Opacity: " + this.props.opacity + "%";
        const articleSearchRadius = "Current Article Search Radius: " + this.props.wikiRange + "m";
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-sm navbar-light bg-light navbar-fixed-top">
                    <div className="container-fluid">
                        <ul className="nav navbar-nav" >
                            <li>
                                <Dropdown id="dropdown" >
                                    <Dropdown.Toggle className="btn btn-info navbar-btn">
                                        {opacityTile}
                                    </Dropdown.Toggle>
                                    <DropdownMenu onClick = {e => this.preventDefault(e)}>
                                        <MenuItem>
                                        <form onSubmit={this.preventDefault}>
                                            <FormGroup
                                                controlId="formBasicText"
                                            >
                                                <ControlLabel>Change the Opacity Percentage</ControlLabel>
                                                <FormControl
                                                    type="number"
                                                    placeholder="Enter a Opacity Percentage between 1 and 99"
                                                    onChange = {this.handleOpacity}
                                                />
                                                <FormControl.Feedback />
                                                <Button className="btn btn-primary btn-large centerButton"
                                                        onClick={() => this.props.setOpacity(this.state.opacity)}
                                                        type= "submit"> Change Opacity </Button>
                                            </FormGroup>
                                        </form>
                                        </MenuItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </li>
                            <li>
                                <Dropdown id="dropdown" onClick = {this.preventDefault} >
                                    <Dropdown.Toggle className="btn btn-info navbar-btn">
                                        {articleSearchRadius}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="articlesearch-dropdown">
                                        <MenuItem>
                                        <form className="dropdown-item" onSubmit={this.preventDefault}>
                                            <FormGroup
                                                controlId="formBasicText"
                                            >
                                                <ControlLabel>Change the Search Range Radius in Meters for Articles</ControlLabel>
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
                                        </MenuItem>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                        </ul>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}

export default NavBar;
