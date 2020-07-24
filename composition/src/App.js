import React, { useState } from "react";
import Message from "./Message";
import ActionButton from "./ActionButton";
import { ThemeSelector } from "./ThemeSelector";
import GeneralList from "./GeneralList";
import SortedList from "./SortedList";
import { ProFeature } from "./ProFeature";
import {ProController} from "./ProController";

//const ProList = ProFeature(SortedList);
const ProList = ProController(SortedList);

function App() {
  const [counter, setCounter] = useState(0);
  const [names, setNames] = useState(["Zoe", "Bob", "Alice", "Dora", "Joe"]);
  const [cities, setCities] = useState([
    "London",
    "New York",
    "Paris",
    "Milan",
    "Boston",
  ]);
  const [proMode, setProMode] = useState(false);

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

  const toggleProMode = () => {
    setProMode(!proMode);
  };

  return (
    <div className="container-fluid">
      <div className="row">
          <div className="col-3">
            <GeneralList list={names} theme="primary" />
          </div>
          <div className="col-3">
            <ProList list={names}/>
          </div>
          <div className="col-3">
            <GeneralList list={cities} theme="secondary" />
          </div>
          <div className="col-3">
            <ProList list={cities} pro={proMode} />
          </div>
      </div>
    </div>
  );
}

export default App;
