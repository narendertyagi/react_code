import React from 'react'

import RegisterForm from './/RegisterForm'
import Loader from '../../../../components/Loader/Loader'

class Basic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false
        }
    }

    componentDidMount() {
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
                <RegisterForm {...this.props} handleLoaderChange= {this.handleLoaderChange}/>
            </div>
        );
    }
}

export default Basic;
