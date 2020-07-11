import React, { Component } from "react";

export default class TodoCreator extends Component {
  static defaultProps = {
    callback: () => {
      console.log("no have callback");
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      nextItemText: "",
    };
  }

  updateNewTextValue = (event) => {
    this.setState({
      nextItemText: event.target.value,
    });
  };

  createNewTodo = () => {
    this.props.callback({
      action: this.state.nextItemText,
      done: false,
    });
    this.setState({
      nextItemText: "",
    });
  };

  render = () => (
    <div className="my-1">
      <input
        className="form-control"
        value={this.state.nextItemText}
        onChange={this.updateNewTextValue}
      />
      <button className="btn btn-primary mt-1" onClick={this.createNewTodo}>
        Add
      </button>
    </div>
  );
}
