import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import ProfileDropdown from './ProfileDropdown'

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          
        }
    }

    static defaultProps = {
  
    }

    sidebarToggle() {
        jQuery(".sidebar").toggle('fast')
    }

    render() {
        return (
            <header className="headerUser">
                <div className="headerUser_inner">
                    <div className="left">
                        <button className="btn btn-primary btn-sm menutoggleBtn" onClick={this.sidebarToggle}><i className="fa fa-bars"></i></button>
                        {/* <Link to={'/'}>
                            <div className="logo" style={{backgroundImage: `url(${Sapp.config.logoUrl})`}}></div>
                        </Link> */}
                    </div>
                    <div className="right">
                        <ProfileDropdown />
                    </div>
                </div>
            </header>
        );
    }
}
export default withRouter(Header);
