import React, { Component } from "react";

class ActionButton extends Component {
  render() {
    console.log(JSON.stringify(this.props))
    console.log(`Render ActionButton (${this.props.text}) Component`);
    return (
      <button className={`btn btn-${this.props.theme} m-2`} onClick={this.props.callback}>
        {this.props.text}
      </button>
    );
  }
}

export default ActionButton;
