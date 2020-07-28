import React from "react";
import {ForwardFormField} from "./FormField";


function App() {
    const fieldRef = React.createRef();

    const handleClick = () => {
        console.log(fieldRef)
        fieldRef.current.focus();
    };

    return (
        <div className="m-2">
            <ForwardFormField label="Name" ref={fieldRef}/>
            <div className="text-center m-2">
                <button className="btn btn-primary" onClick={handleClick}>
                    Focus
                </button>
            </div>
        </div>
    );
}

export default App;
