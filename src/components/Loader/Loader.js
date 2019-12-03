import React, { Component } from "react";
var classNames = require('classnames');


function Anchor(props) {
    return <a href={props.href}>{props.title}</a>;
}
function Paragraph(props) {
    if(!props.text) return null
    return <p>{props.text}</p>;
}

import './style.scss'
class Message extends Component {
    constructor(props) {
        super(props)

    }

    static defaultProps = {
        show: false,
        classname: null
    }

    componentDidMount() {
     
    }


    render() {
        const {show, classname} = this.props
        if(!show) return null
        return (            
            <div className={classNames('comp_Loader comp_Loader-small', classname)} style={{zIndex: 10000}}>
            </div>
        );
    }
}

export default Message;
