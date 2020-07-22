import React, { useState } from "react";
import {Message} from "./Message";
import List from "./List";

function App() {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
      setCounter(counter + 1);
  }

  console.log("Render App Component");
  return <div className="container text-center">
      <div className="row p-2">
          <div className="col-6">
              <Message message={ `Counter: ${counter}`}
                       callback={incrementCounter}
                       text="Increment Counter"/>
          </div>
          <div className="col-6">
              <List/>
          </div>
      </div>
  </div>
}

export default App;
