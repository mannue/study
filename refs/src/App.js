import React, { useState } from "react";
import Editor from "./Editor";
import ProductTable from "./ProductTable";

function App() {
  const [products, setProducts] = useState([]);

  const appProduct = (product) => {
    if (products.indexOf(product.name) === -1) {
      setProducts([...products, product])
    }
  }

  return <div>
    <Editor callback={appProduct}/>
    <h6 className="bg-secondary text-white m-2 p-2">Products</h6>
    <div className="m-2">
      {
        products.length === 0? <div className="text-center">No Products</div> : <ProductTable products={products}/>
      }
    </div>
  </div>
}

export default App;
