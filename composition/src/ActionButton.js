import React, { Component } from "react";
import {ProModeContext} from "./ProModeContext";

class ActionButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickCount: 0,
        }
    }

    handleClick = () => {
        this.setState({
            clickCount: this.state.clickCount + 1,
        })
        this.props.callback();
    }

    render() {
        console.log(JSON.stringify(this.props))
        console.log(`Render ActionButton (${this.props.text}) Component`);
        return (
            <ProModeContext.Consumer>
                {
                    contextData => {
                        if (this.state.clickCount > 1) {
                            throw new Error("Click Counter Error")
                        }
                        return <button className={ this.getClasses(contextData.proMode)} onClick={this.handleClick} disabled={ !contextData.proMode}>
                            {this.props.text}
                        </button>
                    }
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