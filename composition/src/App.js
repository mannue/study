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

  const toggleSuperMode = (event, proMode) =>
    setSuperProContextData({
      ...superProContextData,
      proMode: !proMode,
    })

  const [superProContextData, setSuperProContextData] = useState({
    proMode: false,
    toggleProMode: toggleSuperMode,
  })


  return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-6 text-center p-2">
            <ProModeContext.Provider value={ proContextData}>
              <ProModeToggle label="Pro Mode"/>
            </ProModeContext.Provider>
          </div>
          <div className="col-6 text-center p-2">
            <ProModeContext.Provider value={ superProContextData}>
              <ProModeToggle label="Super Pro Mode"/>
            </ProModeContext.Provider>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <ProModeContext.Provider value={ proContextData}>
              <SortedList list={names}/>
            </ProModeContext.Provider>
          </div>
          <div className="col-6">
            <ProModeContext.Provider value={ superProContextData}>
              <SortedList list={cities}/>
            </ProModeContext.Provider>
          </div>
        </div>
      </div>
  );
}

export default App;