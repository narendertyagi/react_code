import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
// import Auth from '../../modules/Auth'
import { Table, Divider, Popconfirm, message, Input, Avatar, Button, Icon, Form} from 'antd';
//import InvitationLink from './InvitationLink'
const FormItem = Form.Item

class Location extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user : {
                firstName: 'N/A',
                lastName: '',
                email: 'N/A'
            }
        }
    }
    componentDidMount() {
        this.fetch()
    }

    fetch = () => {
        Sapp.Auth.me().then((res) => {
                this.setState({
                    user: res.data.data
                });
            });
    }
    showModal = () => {
        this.props.history.push('/uxms/invite')
    }
    render() {
        const {user} = this.state
          const divStyleProfile = {
            textAlign: 'center',
            marginBottom: '20px',
            marginTop: '60px'
          };
       
        

        return (
            <div>
                <h5 className=""><button className="btn btn-primary btn-sm" onClick={this.showModal}>Invite Members</button></h5>
                {/* <InvitationLink /> */}
                <div style={divStyleProfile}> 
                    <h5>Profile</h5>
                </div>
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <table className="table table-bordered">
                    
                            <tbody>
                            <tr>
                                <th className="text-nowrap">Member ID</th>
                                <td>{user._id}</td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td>{user.firstName +" "+ user.lastName}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <th>Parent</th>
                                <td>{user.parent}</td>
                            </tr>
                            <tr>
                                <th>Can Sell</th>
                                <td>{user.canSell ? 'Yes' : 'No'}</td>
                            </tr>

                            
                            </tbody>
                        </table>
                    </div>
                </div>
           </div>
        );
    }
}
const Dashboard = Form.create()(Location);

export default Dashboard;