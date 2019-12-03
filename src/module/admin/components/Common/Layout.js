import React, { Component } from "react";
import { NavLink, withRouter } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import SideMenu from './SideMenu'

class LayoutAdmin extends Component {
    constructor(props) {
        super(props);  
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className={"layoutAdmin has-sidebar"}>
                <Header {...this.props} />
                <div className="main">
                    <div className="mainInner">
                        <div className="content">
                            <div className="contentInner">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(LayoutAdmin);
