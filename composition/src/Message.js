import React, {Component} from 'react';

class Message extends Component {
    render() {
        console.log(JSON.stringify(this.props))
        return (
            <div className={`h5 bg-${this.props.theme} text-white p-2`}>
                { this.props.message }
            </div>
        );
    }
}

export default Message;