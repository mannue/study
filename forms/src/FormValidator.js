import React, {Component, Fragment} from 'react';
import {ValidationContext} from "./ValidationContext";
import {ValidateData} from "./validation";


export class FormValidator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            dirty: {},
            formSubmitted: false,
            getMessagesForField: this.getMessagesForField
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
          errors: ValidateData(props.data, props.rules)
        };
    }

    get formValid() {
        return Object.keys(this.state.errors).length === 0;
    }

    handleChange = (ev) => {
        let name = ev.target.name;
        this.setState(state => state.dirty[name] = true)
    }

    handleClick = (ev) => {
        this.setState({ formSubmiited: true }, () => {
            if (this.formValid) {
                this.props.submit(this.props.data)
            }
        })
    }

    getButtonClasses() {
        return this.state.formSubmiited && !this.formValid ? "btn-danger" : "btn-primary";
    }

    getMessagesForField = (field) => {
        return (this.state.formSubmitted || this.state.dirty[field]) ? this.state.errors[field] || [] : []
    }

    render() {
        return (
            <Fragment>
                <ValidationContext.Provider value={this.state}>
                    <div onChange={this.handleChange}>
                        { this.props.children }
                    </div>
                </ValidationContext.Provider>

                <div>
                    <button className={ `btn ${ this.getButtonClasses() }`}
                            onClick={this.handleClick}
                            disabled={ this.state.formSubmitted && !this.formValid }>
                        Submit
                    </button>
                </div>
            </Fragment>
        )
    }
}