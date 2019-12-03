import React from 'react'
import queryString from 'query-string'

// import Layout from '../shared/Layout'
import ResetPasswordForm from './ResetPasswordForm'
import Loader from '../../../../components/Loader/Loader'

class Basic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false
        }
    }

    componentDidMount() {
        //console.log(this.props)

    }

    handleLoaderChange = (value) => {
        this.setState({
            loader: value
        })
    }

    render() {
        // console.log(this.props.location.search)
        const query = queryString.parse(this.props.location.search)
        //console.log(query)

        return (
            <div>
                <Loader show={this.state.loader} />
                <ResetPasswordForm {...this.props} 
                id={query.id}
                code={query.code} handleLoaderChange= {this.handleLoaderChange}/>
            </div>
        );
    }
}

export default Basic;
