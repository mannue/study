import React, { Component } from "react";
import {ProModeContext} from "./ProModeContext";

class ActionButton extends Component {
    render() {
        console.log(JSON.stringify(this.props))
        console.log(`Render ActionButton (${this.props.text}) Component`);
        return (
            <ProModeContext.Consumer>
                {
                    contextData =>
                        <button className={ this.getClasses(contextData.proMode)} onClick={this.props.callback} disabled={ !contextData.proMode}>
                            {this.props.text}
                        </button>
                }
            </ProModeContext.Consumer>
        );
    }

    getClasses(proMode) {
        let col = proMode ? this.props.theme : "danger";
        return `btn btn-${col} m-2`;
    }
}

export default ActionButton;