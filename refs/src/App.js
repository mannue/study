import React from "react";
import {ForwardFormField} from "./FormField";
import PortalWrapper from "./PortalWrapper";


function App() {
    const fieldRef = React.createRef();
    const portalFieldRef = React.createRef();

    const focusLocal = () => {
        fieldRef.current.focus();
    }

    const focusPortal = () => {
        portalFieldRef.current.focus()
    };

    return (
        <div>
            <PortalWrapper>
                <ForwardFormField label="Name" ref={portalFieldRef}/>
            </PortalWrapper>
            <ForwardFormField label="Name" ref={fieldRef}/>
            <div>
                <button className="btn btn-primary m-1"
                onClick={focusLocal}>
                    Focus Local
                </button>
                <button className="btn btn-primary m-1"
                onClick={focusPortal}>
                    Focus Portal
                </button>
            </div>
        </div>
    );
}

export default App;
