import React, {Component} from "react";

class NavBar extends Component {


    render () {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-sm navbar-light bg-light navbar-fixed-top">
                    <div className="container-fluid">
                        <ul className="nav navbar-nav" >
                            <li className="nav-item">
                                <button onClick={() => this.props.toggleSideBar()} type="button" className="btn btn-default navbar-btn">
                                    SideBar
                                </button>
                            </li>
                            <li className="nav-item">
                                <button onClick={() => this.props.toggleSideBar()} type="button"
                                        className="btn btn-default navbar-btn">
                                    <span>Tile Opacity: {this.props.opacity} %</span>
                                </button>
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
