import React from 'react'
// import axios from 'axios'
const qs = require('query-string');
import Loader from '../../../../components/Loader/Loader'

// import Layout from '../shared/Layout'

// import Loadable from 'react-loadable';

// const Loading = () => <div>Loading...</div>;
// const LoginForm = Loadable({
//     loader: () => import('./LoginForm'),
//     loading: Loading,
// });

  
import LoginForm from './LoginForm'

class Basic extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            loader: false
        }
    }

    
    componentDidMount() {
        // if(Sapp.Auth.check()) this.redirectBasedonRole()
        // console.log(this.props)
        const token = this.props.match.params.token
        // console.log(token)
        if(token){
            Sapp.Auth.login(token)
        }
        const qparam = qs.parse(this.props.location.search);
        if(Sapp.Auth.check()) this.props.history.push(qparam.redirect || '/')
    }



    onSuccess = () => {
        axios.defaults.headers.common['Authorization'] = Sapp.Auth.getAuthorizationHeader()
        const qparam = qs.parse(this.props.location.search);
        this.props.history.push(qparam.redirect || '/')
        // this.redirectBasedonRole()
        // this.props.history.push('/admin')
    }
    
    redirectBasedonRole = () => {
        const data = Sapp.Auth.getTokenDecoded();
        if(data.role) {
            this.props.history.push(data.role)
        } else {
            this.props.history.push('/')
        }
    }

    handleLoaderChange = (value) => {
        this.setState({
            loader: value
        })
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
            <Loader show={this.state.loader} />
            <LoginForm {...this.props} onSuccess={this.onSuccess} handleLoaderChange= {this.handleLoaderChange}/>
            </div>
        );
    }
}

export default Basic;
