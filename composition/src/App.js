import React, { useState } from "react";
import Message from "./Message";
import ActionButton from "./ActionButton";
import { ThemeSelector } from "./ThemeSelector";

function App() {
  const [counter, setCounter] = useState(0);
  const [names, setNames] = useState(["Zoe","Bob","Alice","Dora","Joe"])

  const incrementCounter = (event) => {
    setCounter(counter + 1);
  };
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
  );
}

export default App;
