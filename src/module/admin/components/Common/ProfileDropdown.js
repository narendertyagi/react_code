import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class ProfileDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null
        }
    }

    static defaultProps = {

    }

    componentDidMount() {
        if (__isBrowser__) {
            const currentUser = Sapp.Auth.getTokenDecoded()
            this.setState({
                email: currentUser.email
            })
        }
    }

    logout = (e) => {
        e.preventDefault()
        Sapp.Auth.logout()
        this.props.history.push('/login')
    }

    render() {
        if(__isBrowser__ && !Sapp.Auth.check()) return null
        const {email} = this.state
        return (
            <div className="dropdown">
                <span className="mr-2 welcomeSpan"><span>Welcome ({email})</span></span>
                <a  href="#" className="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-user"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                <Link className="dropdown-item" to={'/me'}>Edit Profile</Link>
                <Link className="dropdown-item" to={'/change_password'}>Change Password</Link>

                <a className="dropdown-item" href="#" onClick={this.logout}>Sign Out</a>
                </div>
            </div>
        )
    }
}

export default withRouter(ProfileDropdown);
