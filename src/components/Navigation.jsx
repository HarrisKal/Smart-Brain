import React, { Component } from "react";

class Navigation extends Component {
    render() {
        return <div className="mt3">
            <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
                {this.props.children}
                <p onClick={() => this.props.onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign Out</p>
            </nav>
        </div>
    }
}

export default Navigation;