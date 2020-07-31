import React from "react";
import {Provider} from "react-redux";
import dataStore from "./store";
import {ProductDisplay} from "./ProductDisplay";
import {Selector} from "./Selector";
import {SupplierDisplay} from "./SupplierDisplay";

function App() {
  return(
      <Provider store={dataStore}>
          <Selector>
              <ProductDisplay name="Products"/>
              <SupplierDisplay name="Suppliers"/>
          </Selector>
      </Provider>
  )
}

export default App;
