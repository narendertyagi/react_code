import React from 'react'
import axios from 'axios'
// import LayoutAdmin from './LayoutAdmin'
import ChangePasswordForm from './ChangePasswordForm'
import Loader from '../../../../components/Loader/Loader'

class Basic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false
        }
    }
  

    componentDidMount() {
        if(!Sapp.Auth.check()) this.props.history.push('/')
    }

    onSuccess = () => {

    }

    handleLoaderChange = (value) => {
        this.setState({
            loader: value
        })
    }
  

    render() {
        return (
            <div>
                <Loader show={this.state.loader} />
                <ChangePasswordForm {...this.props} onSuccess={this.onSuccess} handleLoaderChange= {this.handleLoaderChange} />
            </div>
        );
    }
}

export default Basic;
