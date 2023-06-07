import React, { Component, Fragment } from 'react';
import {Logout} from '../../Actions/AuthActions'
import {connect} from 'react-redux'
import {NavLink} from 'reactstrap'
import PropTypes from 'prop-types'
class Logout1 extends Component {
    static propTypes = {
        Logout: PropTypes.func.isRequired
    }
    render() {
        console.log(this.props.logout)
        return (
            <Fragment>
                <NavLink onClick={this.props.Logout} href="#">
                    Logout
                </NavLink>
            </Fragment>
        );
    }
}
export default connect(
    null,
    {Logout}
)(Logout1)
