import React, { Component } from "react";
import PhoneForm from "./components/PhoneForm";
import PhoneInfoList from "./components/PhoneInfoList";

export default class App extends Component {
  id = 0;

  state = {
    information: [],
    keyword: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCreate = (data) => {
    this.setState({
      information: this.state.information.concat({
        ...data,
        id: this.id++,
      }),
    });
    console.log(data);
  };

  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter((info) => info.id !== id),
    });
  };

  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map((info) => {
        if (info.id === id) {
          return {
            id,
            ...data,
          };
        }
        return info;
      }),
    });
  };

  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        <input
          name="keyword"
          value={this.state.keyword}
          onChange={this.handleChange}
          placeholder="검색...."
        ></input>
        <PhoneInfoList
          data={this.state.information.filter(
            (info) => info.name.indexOf(this.state.keyword) > -1
          )}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}
