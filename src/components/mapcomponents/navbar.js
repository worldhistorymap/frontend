import React, {Component} from "react";
import {Button, ControlLabel, FormControl, FormGroup, Dropdown, DropdownButton, MenuItem} from "react-bootstrap";
import DropdownMenu from "react-bootstrap/es/DropdownMenu";

class NavBar extends Component {
    state = {
        opacity: 70,
        wikiRange: 5000,
    };

    preventDefault = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    handleOpacity = (e) => {
        const val = e.target.value;
        this.setState({opacity: val});
    };

    handleWikiRange = (e) => {
        const val = e.target.value;
        this.setState({wikiRange: val});
    };

    handleYearChange = e => {
        const year = e.target.value;
        this.setState({year});
    };

    onToggleOpacity = (open) => {
        if (this._opacityInputWasClicked) {
            this._opacityInputWasClicked = false;
            return;
        }
        this.setState({opacityOpen: open});
    };

    opacityInputWasClicked = () => {
        this._opacityInputWasClicked = true;
    };

    onToggleWikiRange = (open) => {
        if (this._wikiRangeWasClicked) {
            this._wikiRangeWasClicked = false;
            return;
        }
        this.setState({wikiRangeOpen: open});
    };

    wikiRangeWasClicked = () => {
        this._wikiRangeWasClicked = true;
    };

    render () {
        const opacityTile = "Tile Opacity: " + this.props.opacity + "%";
        const articleSearchRadius = "Current Article Search Radius: " + this.props.wikiRange + "m";
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-sm navbar-light bg-light navbar-fixed-top">
                    <div className="container-fluid">
                        <ul className="nav navbar-nav" >
                            <li>
                                <Dropdown id="dropdown-menu" open={this.state.opacityOpen} onToggle={this.onToggleOpacity}>
                                    <Dropdown.Toggle className="btn btn-info navbar-btn">
                                        {opacityTile}
                                    </Dropdown.Toggle>
                                    <DropdownMenu onClick = {e => this.preventDefault(e)}>
                                        <MenuItem onClick={e => this.preventDefault(e)}>
                                        <form className = "px-4 px-3" onSubmit={this.preventDefault}>
                                            <FormGroup
                                                controlId="formBasicText"
                                            >
                                                <ControlLabel>Change the Opacity Percentage</ControlLabel>
                                                <FormControl
                                                    type="number"
                                                    placeholder="Enter a Opacity Percentage between 1 and 99"
                                                    onChange = {this.handleOpacity}
                                                    onSelect={this.opacityInputWasClicked}
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
                                <Dropdown id="dropdown" open={this.state.wikiRangeOpen} onToggle={this.onToggleWikiRange}>
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
                                                    onSelect = {this.wikiRangeWasClicked}
                                                />
                                                <FormControl.Feedback />
                                                <Button
                                                    onClick={() => this.props.setWikiRange(this.state.wikiRange)}
                                                    className="btn btn-primary btn-large centerButton" type="submit" >Change Range </Button>
                                            </FormGroup>
                                        </form>
                                        </MenuItem>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                            <li>
                                <form className ="navbar-form" onSubmit={this.preventDefault}>
                                    <input type='number' placeholder={this.state.year}
                                    onChange = {this.handleYearChange} />
                                    <Button
                                        onClick = {() => this.props.setYear(this.state.year)}
                                        className="btn btn-info " type="submit"> Change Year from {this.props.year} </Button>
                                </form>
                            </li>
                            <li>
                                <Button
                                    onClick={() => this.props.toggleRecBar}
                                    className="btn btn-info navbar-btn" type="submit" >  <span> Recommendations</span>
                                </Button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}

export default NavBar;
