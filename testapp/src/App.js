import React, { useState } from "react";
import { Result } from "./Result";
import ValueInput from "./ValueInput";

function App(props) {
  const [title] = useState(props.title || "Simple Addition");
  const [fieldValues, setFieldValues] = useState([]);
  const [total, setTotal] = useState(0);

  const updateFieldValue = (id, value) => {
    fieldValues[id] = Number(value);
    setFieldValues(fieldValues);
  };

  const updateTotal = () => {
    setTotal(fieldValues.reduce((total, val) => (total += val), 0));
  };

  return (
    <div className="m-2">
      <h5 className="bg-primary text-white text-center p-2">{title}</h5>
      <Result result={total} />
      <ValueInput id="1" changeCallback={updateFieldValue} />
      <ValueInput id="2" changeCallback={updateFieldValue} />
      <ValueInput id="3" changeCallback={updateFieldValue} />
      <div className="text-center">
        <button className="btn btn-primary" onClick={updateTotal}>
          Total
        </button>
      </div>
    </div>
  );
}

export default App;
