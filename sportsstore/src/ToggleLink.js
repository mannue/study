import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

const propTypes = {};

export class ToggleLink extends Component {

    static defaultProps = {};

    render() {
        return <Route path={ this.props.to } exact={ this.props.exact }
                      children={ routeProps => {
                          const baseClasses = this.props.className || "m-2 btn btn-block";
                          const activeClass = this.props.activaClass || "btn-primary";
                          const inActiveClass = this.props.inActiveClas || "btn-secondary";
                          const combinedClasses = `${baseClasses} ${routeProps.match ? activeClass: inActiveClass}`;

                          return <Link to={ this.props.to } className={ combinedClasses }>
                              { this.props.children }
                          </Link>
                      }} />
    }
}

ToggleLink.propTypes = propTypes;