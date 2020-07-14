import React, {Component} from 'react';
import {Provider} from "react-redux";
import {SportsStoreDataStore} from "./data/DataStore";
import {BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import {ShopConnector} from "./data/shop/ShopConnector";

export default class App extends Component {
    render() {
        return <Provider store={SportsStoreDataStore}>
            <Router>
                <Switch>
                    <Route paht="/shop" component={ShopConnector}/>
                    <Redirect to="/shop"/>
                </Switch>
            </Router>
        </Provider>
    }
}
