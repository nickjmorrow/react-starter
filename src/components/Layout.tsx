import React, { Component } from 'react';
import { NavMenu } from './NavMenu';

export class Layout extends Component<{ children: React.ReactNode }> {
    render() {
        return (
            <div>
                <NavMenu />
                <div>{this.props.children}</div>
            </div>
        );
    }
}
