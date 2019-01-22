import React, {Component} from "react";

class NavBar extends Component {


    render () {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">

                    <div className="container-fluid">
                        <button onClick={() => this.props.toggleSideBar()} type="button" id="sidebarCollapse"
                                className="btn btn-info">
                            <i className="fas fa-align-left"></i>
                            <span>SideBar</span>
                        </button>
                        <div>
                            <button onClick={() => this.props.toggleSideBar()} type="button" id="sidebarCollapse"
                                    className="btn btn-info">
                                <i className="fas fa-align-left"></i>
                                <span>Tile Opacity: {this.props.opacity} %</span>
                            </button>
                            <button onClick={() => this.props.toggleSideBar()} type="button" id="sidebarCollapse"
                                    className="btn btn-info">
                                <i className="fas fa-align-left"></i>
                                <span>Current Article Search Radius: {this.props.wikiRange} m</span>
                            </button>
                        </div>
                        <div>
                            <button onClick={() => this.props.toggleSideBar()} type="button" id="sidebarCollapse"
                                    className="btn btn-info">
                                <i className="fas fa-align-left"></i>
                                <span>SignUp</span>
                            </button>
                            <button onClick={() => this.props.toggleSideBar()} type="button" id="sidebarCollapse"
                                    className="btn btn-info">
                                <i className="fas fa-align-left"></i>
                                <span>Login</span>
                            </button>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}

export default NavBar;
