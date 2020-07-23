import React, { useState } from "react";
import { Message } from "./Message";
import List from "./List";
import { ExternalCounter } from "./ExternalCounter";
import HooksMessage from "./HooksMessage";
import {DirectionDisplay} from "./DirectionDisplay";

function App() {
  const [counter, setCounter] = useState(0);
  const [showMessage, setShowMessage] = useState(true);
  const [counterLeft, setCounterLeft] = useState(0);
  const [counterRight, setCounterRight] = useState(0);

  const handleChange = (event) => {
    console.log(event);
    setShowMessage(!showMessage);
  };

  const incrementCounter = (event, counter) => {
    //setCounter(counter + 1);
    if (counter === "left") {
      setCounterLeft(counterLeft + 1);
    } else {
      setCounterRight(counterRight + 1);
    }
  };

  const changeCounter = (val) => {
    setCounter(counter + val);
  }

  console.log("Render App Component");
  return (
    <div className="container text-center">
      <DirectionDisplay value={ counter }/>
      <div className="text-center">
        <button className="btn btn-primary m-1"
                onClick={ () => changeCounter(-1)}>Decrease</button>
        <button className="btn btn-primary m-1"
                onClick={ () => changeCounter(1)}>Increase</button>
      </div>
    </div>
  );
}

export default App;
