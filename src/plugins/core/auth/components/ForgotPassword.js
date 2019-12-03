import React from 'react'

// import Layout from '../shared/Layout'
import ForgotPasswordForm from './/ForgotPasswordForm'
import Loader from '../../../../components/Loader/Loader'

class Basic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false
        }
    }

    handleLoaderChange = (value) => {
        this.setState({
            loader: value
        })
    }

    componentDidMount() {
    }

    onSuccess = (response) => {
        this.props.history.push('/reset_password?id='+ response._id)
    }

    render() {
        return (
            <div>
                <Loader show={this.state.loader} />
                <ForgotPasswordForm {...this.props} onSuccess={this.onSuccess} handleLoaderChange= {this.handleLoaderChange}/>
            </div>
        );
    }
}

export default Basic;
