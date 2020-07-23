import React, { useState } from "react";
import Message from "./Message";
import ActionButton from "./ActionButton";
import { ThemeSelector } from "./ThemeSelector";
import GeneralList from "./GeneralList";
import SortedList from "./SortedList";

function App() {
  const [counter, setCounter] = useState(0);
  const [names, setNames] = useState(["Zoe","Bob","Alice","Dora","Joe"])

  const incrementCounter = (event) => {
    setCounter(counter + 1);
  };
  /*
  return (
    <div className="m-2 text-center">
      <ThemeSelector>
        <Message theme="primary" message={`Counter: ${counter}`} />
        <ActionButton
          theme="secondary"
          text="Increment"
          callback={incrementCounter}
        />
      </ThemeSelector>
    </div>
  );*/

  return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            <GeneralList list={names} theme="primary"/>
          </div>
          <div className="col-6">
            <SortedList list={ names} />
          </div>
        </div>
      </div>
  );
}

export default App;
