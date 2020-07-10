import React, {Component, createRef} from 'react';

class PhoneForm extends Component {

    input = createRef();

    state = {
        name: '',
        phone: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onCreate(this.state);
        this.setState({
            name: '',
            phone: ''
        });
        this.input.current.focus();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    name="name"
                    placeholder="name"
                    onChange={this.handleChange}
                    value={this.state.name}
                    ref={this.input}
                />
                <input name="phone" placeholder="phone" onChange={this.handleChange} value={this.state.phone}/>
                <button type="submit">등록</button>
            </form>
        );
    }
}

export default PhoneForm;