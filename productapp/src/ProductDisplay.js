import React, {Component} from "react";
import {ProductEditor} from "./ProductEditor";
import {ProductTable} from "./ProductTable";

export class ProductDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditor: false,
      selectedProduct: null,
    };
  }

  static defaultProps = {
    products: []
  };

  createProduct = (ev) => {
    this.setState({
      showEditor: true,
      selectedProduct: {},
    });
  };

  startEditing = (product) => {
    this.setState({
      showEditor: true,
      selectedProduct: product,
    });
  };

  cancelEditing = (ev) => {
    this.setState({
      showEditor: false,
      selectedProduct: null,
    });
  };

  saveProduct = (product) => {
    this.props.saveCallback(product);
    this.setState({
      showEditor: false,
      selectedProduct: null,
    });
  };

  render() {
    if (this.state.showEditor) {
      return (
        <ProductEditor
          key={this.state.selectedProduct.id || -1}
          product={this.state.selectedProduct}
          saveCallback={this.saveProduct}
          cancelCallback={this.cancelEditing}
        />
      );
    } else {
      return (
        <div className="m-2">
          <ProductTable
            products={this.props.products}
            editCallback={this.startEditing}
            deleteCallback={this.props.deleteCallback}
          />
          <div className="text-center">
            <button
              className="btn btn-primary m-1"
              onClick={this.createProduct}
            >
              Create Product
            </button>
          </div>
        </div>
      );
    }
  }
}
