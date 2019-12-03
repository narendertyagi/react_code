import React, { Component } from "react";
import { NavLink, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react';

import TreeView from './treeview/TreeView'

@inject('globalStore')
@observer
class SideMenu extends Component {
    constructor(props) {
        super(props);  

        this.state = {
            menu: []
        }
    }
    
    async componentDidMount() {
        const menu = Sapp.ModuleSeller.MenuPrimary.generateTree()
        const args = await Sapp.Hook.Filter.apply('beforeSideMenuListGenerate', {
            menu: [...menu]
        })

        this.setState({
            menu: args.menu
        })       
    }

    render() {
        // console.log(this.menu)
        return (
            <div className={"compSideMenu"}>
                <TreeView menu={this.state.menu} />
            </div>
        );
    }
}

export default withRouter(SideMenu);
