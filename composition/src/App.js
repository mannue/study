import React, {Fragment, useEffect, useState} from "react";
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
import {ProModeToggle} from "./ProModeToggle";


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

const toggleProMode = (event, proMode) =>{
    setProContextData({
      ...proContextData,
      proMode: !proMode
    })
  };

  const [proContextData, setProContextData] = useState({proMode: false, toggleProMode: toggleProMode });
  useEffect(()=>{
    console.log(proContextData)
    return () => {
      console.log("componentDidUpdate")
    }
  })



  return (
      <div className="container-fluid">
        <ProModeContext.Provider value={ proContextData}>
          <div className="row">
            <div className="col-12 text-center p-2">
              <ProModeToggle label="Pro Mode"/>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <GeneralList list={names} theme="primary" />
            </div>
            <div className="col-6">
              <SortedList list={names}/>
            </div>
          </div>
        </ProModeContext.Provider>
      </div>
  );
}

export default App;