import React, { Component } from "react";

class ActionButton extends Component {
  render() {
    console.log(JSON.stringify(this.props))
    console.log(`Render ActionButton (${this.props.text}) Component`);
    return (
      <button className={ this.getClasses(this.props.proMode)} onClick={this.props.callback} disabled={ !this.props.proMode}>
        {this.props.text}
      </button>
    );
  }

  getClasses(proMode) {
    let col = proMode ? this.props.theme : "danger";
    return `btn btn-${col} m-2`;
  }
}

export default ActionButton;
