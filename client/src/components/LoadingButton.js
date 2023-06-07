import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import {setItemsLoading} from '../Actions/ItemActions'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
class LoadingButton extends Component {
    static propType = {
        isAuthenticated: PropTypes.bool
    }
    render() {
        const {loading} = this.props.item
        console.log(loading)
        if(this.props.isAuthenticated === true) {
            return (
                <div>
                     {loading && <Spinner color="success" size="sm"/>}
                </div>
            );
        }
        else {
            return (
                null
            )
        }
    }
}
const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
})
export default connect(mapStateToProps, {setItemsLoading})(LoadingButton);;