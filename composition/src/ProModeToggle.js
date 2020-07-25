import React, {useContext} from 'react';
import {ProModeContext} from "./ProModeContext";

export function ProModeToggle(props) {
    //static contextType = ProModeContext
    const context = useContext(ProModeContext);

    return (<div className="form-check">
        <input type="checkbox" className="form-check-input"
               value={ context.proMode}
               onChange={ (e)=> context.toggleProMode(e,context.proMode) }/>
        <label className="form-check-label">
            { props.label }
        </label>
    </div>)

}
