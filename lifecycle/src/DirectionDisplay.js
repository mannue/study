import React, {Component, PropTypes} from 'react';

const propTypes = {};

export class DirectionDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            direction: "up",
            lastValue: 0
        }
    }

    getClasses() {
        return (this.state.direction === "up"? "bg-success" : "bg-danger") +
            " text-white text-center p-2 m-2";
    }

    render() {
        return <h5 className={ this.getClasses() }>{ this.props.value }</h5>
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.value !== prevState.lastValue) {
            return {
                lastValue: nextProps.value,
                direction: prevState.lastValue > nextProps.value ? "down" : "up"
            }
        }
        return prevState;
    }

}
