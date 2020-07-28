import React from "react";

import FormField from "./FormField";

function App() {
    const fieldRef = React.createRef();

    const handleClick = () => {
        fieldRef.current.focus();
    };

    return (
        <div className="m-2">
            <FormField label="Name" fieldRef={fieldRef}/>
            <div className="text-center m-2">
                <button className="btn btn-primary" onClick={handleClick}>
                    Focus
                </button>
            </div>
        </div>
    );
}

export default App;
