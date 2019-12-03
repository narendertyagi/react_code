import React, { Component } from "react";
import { NavLink, withRouter } from 'react-router-dom'
import TreeNode from './TreeNode'
class TreeView extends React.Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        menu: []
    }
  
    render() {
        var menu = this.props.menu;
        var nodes = menu.map((item, i) => <TreeNode key={i} node={item} children={item.children} />)
        return (
            <ul>{nodes}</ul>
        );
    }
};

export default TreeView;
