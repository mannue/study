import React, {Fragment, useState} from "react";
import Message from "./Message";
import ActionButton from "./ActionButton";
import { ThemeSelector } from "./ThemeSelector";
import GeneralList from "./GeneralList";
import SortedList from "./SortedList";
import { ProFeature } from "./ProFeature";
import { ProController } from "./ProController";
import { LogToConsole } from "./LogToConsole";
import { ProModeContext } from "./ProModeContext";
//const ProList = ProFeature(SortedList);
//const ProList = ProController(SortedList);
//onst ProList = ProController(LogToConsole(SortedList, "Sorted", true, true, true));

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
  //const [proMode, setProMode] = useState(false);
  const [proContextData, setProContextData] = useState({proMode: false});

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
    setProContextData({
      proMode: !proContextData.proMode
    })
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 text-center p-2">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              value={proContextData.proMode}
              onChange={toggleProMode}
            />
            <label className="form-check-label">Pro Mode</label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <GeneralList list={names} theme="primary" />
        </div>
        <div className="col-6">
          <ProModeContext.Provider value={proContextData}>
            <SortedList list={names}/>
          </ProModeContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default App;
