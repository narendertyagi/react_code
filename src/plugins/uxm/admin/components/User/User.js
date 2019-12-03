import React, { Component } from "react";
import { Table, Divider, Popconfirm, message, Input, Avatar, Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import moment from 'moment'

import UserEditForm from './UserEditForm'
class User extends Component {
	  constructor(props) {
    super(props)
   
    }
    state = {
        user: [],
        loading: true
    };

    componentDidMount() {
        this.fetch(this.props.match.params.id)
    }

    saveFormRef = (form) => {
        this.form = form;
    }

    fetch = (id) => {
        Sapp.UxmAdmin.Api.User.getUser(id).then((res) => {
            this.setState({
                user: res.data.data,
                loading: false
            })
        }).catch((err)=>{
            message.error('User not Found')
            this.props.history.push('/users')
        })
    }


    handleSubmit = (e) => {
        e.preventDefault()
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            //console.log('Received values of form: ', values);
            const id = this.state.user._id
            // let user = Object.assign({}, this.state.user, values)
            Sapp.UxmAdmin.Api.User.updateUser(values, id).then((res) => {
                //console.log(res.data)
                this.props.history.push('/users')
            }).catch((err) => {
                // console.log(err)
            })
        });
    }

    render() {
        //console.log(this.state.user)
        const firstName = Sapp.Util.objValue(this.state.user, ['parentDetail','firstName'],[])
        const id = Sapp.Util.objValue(this.state, ['user','parentDetail','_id'],[])
        const lastName = Sapp.Util.objValue(this.state, ['user','parentDetail','lastName'],[])
        const country = Sapp.Util.objValue(this.state, ['user','parentDetail','country'],[])
        const email = Sapp.Util.objValue(this.state, ['user','parentDetail','email'],[])
        
        // const amountInEth = Sapp.Util.objValue(this.state, ['user','parentDetail','amountInEth'],[])
        const businessName = Sapp.Util.objValue(this.state, ['user','parentDetail','businessName'],[])
        const createdAt = Sapp.Util.objValue(this.state, ['user','parentDetail','createdAt'],[])
        const role = Sapp.Util.objValue(this.state, ['user','parentDetail','role'],[])
        const phone = Sapp.Util.objValue(this.state, ['user','parentDetail','phone'],[])
        const primaryLanguage = Sapp.Util.objValue(this.state, ['user','parentDetail','primaryLanguage'],[])
        const speakEnglish = Sapp.Util.objValue(this.state, ['user','parentDetail','speakEnglish'],[])
        const flag = firstName ? true : false
        const {loading} = this.state
        const {Loader} = Sapp.UxmShared.Components
        if(loading === true){
            return (
                <Loader />
            )
            
        }
        return (
            <div>
                <h4>User</h4>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="User Detail" key="1">
                        <table className="table table-bordered table-hover">
                            <tbody>
                                <tr>
                                    <td width="300">ID</td>
                                    <td>{this.state.user._id}</td>
                                </tr>                            
                                <tr>
                                    <td>Created At</td>
                                    <td>{moment(this.state.user.createdAt).format('YYYY-MM-DD hh:mm:ss')}</td>
                                </tr>
                                <tr>
                                    <td>First Name</td>
                                    <td>{this.state.user.firstName}</td>
                                </tr>
                                <tr>
                                    <td>Last Name</td>
                                    <td>{this.state.user.lastName}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{this.state.user.email}</td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>{this.state.user.phone}</td>
                                </tr>
                               
                                {/* <tr>
                                    <td>Business Name</td>
                                    <td>{this.state.user.businessName}</td>
                                </tr> */}
                                <tr>
                                    <td>Country</td>
                                    <td>{this.state.user.country}</td>
                                </tr>
                                {/* <tr>
                                    <td>Primary Language</td>
                                    <td>{this.state.user.primaryLanguage}</td>
                                </tr>
                                <tr>
                                    <td>Speak Language</td>
                                    <td>{this.state.user.speakEnglish}</td>
                                </tr> */}
                                <tr>
                                    <td>Role</td>
                                    <td>{this.state.user.role}</td>
                                </tr>

                            </tbody>
                        </table>
                        {this.state.user.parentDetail 
                            ? <div>
                                <h4>Parent User</h4>
                        <table className="table table-bordered table-hover" >
                            <tbody>
                                <tr>
                                    <td width="300">ID</td>
                                    <td>{id}</td>
                                </tr>
                                <tr>
                                    <td>Created At</td>
                                    <td>{createdAt}</td>
                                </tr>
                                <tr>
                                    <td>First Name</td>
                                    <td>{firstName}</td>
                                </tr>
                                <tr>
                                    <td>Last Name</td>
                                    <td>{lastName}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{email}</td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>{phone}</td>
                                </tr>
                                <tr>
                                    <td>Business Name</td>
                                    <td>{businessName}</td>
                                </tr>
                                <tr>
                                    <td>Country</td>
                                    <td>{country}</td>
                                </tr>
                                <tr>
                                    <td>Primary Language</td>
                                    <td>{primaryLanguage}</td>
                                </tr>
                                <tr>
                                    <td>Speak Language</td>
                                    <td>{speakEnglish}</td>
                                </tr>
                                <tr>
                                    <td>Role</td>
                                    <td>{role}</td>
                                </tr>
                            </tbody>
                        </table>

                            </div>
                              : null}
                    </TabPane>
                    <TabPane tab="Update User" key="2">
                        <UserEditForm 
                            ref={this.saveFormRef}
                            user={this.state.user}
                            handleSubmit={this.handleSubmit}
                        />
                    </TabPane> 
                </Tabs>
            </div>
        )
    }
}

export default User;