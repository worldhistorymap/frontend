import React, {Component} from "react";
import "../map.css";

class RecBar extends Component {
   render() {
      return (
          <div id="recbar" style={{zIndex: this.props.zIndex}}>
              We are currently working to add Recommendations.
          </div>
      )
   }
}

export default RecBar;
