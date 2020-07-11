import React, { Component } from "react";

export default class TodoRow extends Component {
  static defaultProps = {
    item: {
      action: "",
      done: false,
    },
    callback: () => {
      console.log("no setup callback method!");
    },
  };

  render() {
    const { item, callback } = this.props;
    return (
      <tr>
        <td>{item.action}</td>
        <td>
          <input
            type="checkbox"
            checked={item.done}
            onChange={() => callback(item)}
          />
        </td>
      </tr>
    );
  }
}
