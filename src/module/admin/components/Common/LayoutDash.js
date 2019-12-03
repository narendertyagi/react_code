import React, { Component } from "react";
import { NavLink, withRouter } from 'react-router-dom'

import {
    Layout, Menu, Breadcrumb, Icon,
  } from 'antd';
  
  const {
    Content, Footer, Sider,
  } = Layout;
  const SubMenu = Menu.SubMenu;

import Header from './Header'
import Footer1 from './Footer'
import SideMenu from './SideMenu'

import Fullscreen from "react-full-screen";

class LayoutAdmin extends Component {
    constructor(props) {
        super(props);  

        this.state = {
            isFull: false,
            collapsed: false
        }
    }

    componentDidMount() {
        if (!Sapp.Auth.check()) {
            this.props.history.push('/login')
        }
    }

    goFull = () => {
        this.setState({ isFull: true });
    }
    
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }
    
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" />
                    <SideMenu />
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0, marginBottom: '16px' }} />
                    <Content style={{ margin: '0 16px' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Blackbox ©2018 Created by Jeoga
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

            // <div className={"layoutAdmin has-sidebar"}>
            //     <Header {...this.props} />
            //     <div className="main">
            //         <div className="mainInner">
            //             <div className="sidebar">
            //                 <button onClick={this.goFull} className="ant-btn ant-btn-primary mb-2">
            //                     Go Fullscreen
            //                 </button>
            //                 <SideMenu />
            //                 {/*this.renderNav()*/}
            //             </div>
            //             <div className="content">
            //                 <div className="contentInner">
            //                     <Fullscreen
            //                         enabled={this.state.isFull}
            //                         onChange={isFull => this.setState({isFull})}
            //                     >
            //                         {this.props.children}
            //                     </Fullscreen>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            //     <Footer />
            // </div>

export default withRouter(LayoutAdmin);
