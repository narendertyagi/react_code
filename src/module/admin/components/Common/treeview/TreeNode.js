import React, { Component } from "react";
import { NavLink, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react';

class TreeNode extends React.Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        node: {
            menuSlug: null,
            name: null,
            menuTitle: null,
            children: null
        }
    }

    render() {
        const node = this.props.node
        var nodes;
        if (this.props.children) {
            nodes = this.props.children.map((item, i) => <TreeNode key={i} node={item} children={item.children} />);
        }
        return (
            <li>
                <NavLink exact to={node.menuSlug} className={node.name}>
                    <i className="fas fa-th"></i>
                    <span className="menuName">{node.menuTitle}</span>
                </NavLink>
                <ul className="submenu">{nodes}</ul>
            </li>
        );
    }
};

export default TreeNode;
