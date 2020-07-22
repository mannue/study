import React, { Component } from "react";

export class ActionButton extends Component {
  render() {
    console.log();
    return (
      <button className="btn btn-primary m-2" onClick={this.props.callback}>
        {this.props.text}
      </button>
    );
  }
}
