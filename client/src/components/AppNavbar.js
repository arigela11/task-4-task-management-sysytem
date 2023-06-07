import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav, 
    NavItem,
} from 'reactstrap';
import RegisterModal from './auth/RegisterModal'
import Logout1 from './auth/Logout';
import LoginModal from './auth/LoginModal';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import AboutUsModal from './AboutUsModal';
class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }
    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    toggle = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                    <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                    </span>
                </NavItem>
                 <NavItem>
                    <Logout1/>
                </NavItem>
            </Fragment>
        )
        const guestLinks = (
            <Fragment>
                 <NavItem>
                    <RegisterModal/>
                </NavItem>
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        )

        const aboutuslink = (
            <Fragment>
                <NavItem>
                    <AboutUsModal/>
                </NavItem>
            </Fragment>
        )
        return (
            <div>
                <Navbar color="dark" dark expand="sm"> 
                    <img src={require('./assests/taskicon.png')} style={{width: '3%'}} href="/" alt=""/>
                        <NavbarBrand style={{marginLeft: '8px', fontSize: '15px'}}>
                            Task Memo
                        </NavbarBrand>
                        <NavbarBrand href="/" style={{marginLeft: '8px', fontSize: '15px'}}>
                            Home
                        </NavbarBrand>
                        <Nav navbar>
                            {aboutuslink}
                        </Nav>
                    <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav navbar className="ml-auto">
                                {isAuthenticated? authLinks:guestLinks}
                            </Nav>
                        </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(AppNavbar);