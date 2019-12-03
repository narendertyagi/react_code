import React, { Component } from "react";
class Footer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <footer>
                <div className="text-center">
                { Sapp.Util.getObjKey("Sapp.config.copyright", 'Copyright © 2018 Jeoga')}
                </div>
            </footer>
        );
    }
}

export default Footer;