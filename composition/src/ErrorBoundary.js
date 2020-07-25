import React, {Component, Fragment} from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorThrown: false,
        }
    }

    componentDidCatch(error, info) {
        console.log("conponentDidCatch")
        this.setState({
            errorThrown: true
        })
    }

    render() {
        return (
            <Fragment>
                {
                    console.log("render")
                }
                {
                    this.state.errorThrown &&
                        <h3 className="bg-danger text-white text-center m-2 p-2">
                            Error Detected
                        </h3>
                }
                {
                    this.props.children
                }
            </Fragment>
        );
    }
}

export default ErrorBoundary;