import React, { Component } from "react";

// const message = "This is a constant";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 4,
    };
  }

  isEven() {
    return this.state.count % 2 === 0 ? "Even" : "Odd";
  }
  render = () => (
    <h4 className="bg-primary text-white text-center p-2 m-1">
      {/*{message}*/}
      {/*Number of things: { count }*/}
      Number of things: {this.isEven()}
    </h4>
  );
}
