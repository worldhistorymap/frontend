import React, {Component} from "react";

import "../map.css"

class SideBar extends Component {
    render() {
        return (
            <div id="sidebar" style={{width: this.props.width, zIndex: this.props.zIndex}}>
                <ul className="list-unstyled components">
                    <li>
                        Wikipedia Range
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
