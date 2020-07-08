import React, {Component} from 'react';
import Counter from "./Counter";
import { BrowserRouter, Route } from "react-router-dom";
import About from "./About";

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <BrowserRouter>
                <Route exact path="/" component={Counter}/>
                <Route path="/about" component={About}/>
            </BrowserRouter>
        );
    }
}

export default App;