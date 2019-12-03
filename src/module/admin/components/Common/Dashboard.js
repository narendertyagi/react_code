import React, { Component } from "react";
import { inject, observer } from 'mobx-react';

class Dashboard extends Component {
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
        this.props.history.push('/uxm/users/invite')
    }
    render() {
        const {user} = this.state
        return (
            <div>
             
                <div> 
                    <h4>Profile</h4>
                </div>
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <table className="table table-bordered">
                    
                            <tbody>
                            <tr>
                                <th>Member ID</th>
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
                            
                            </tbody>
                        </table>
                    </div>
                </div>
               
           </div>
        );
    }
}

export default Dashboard;