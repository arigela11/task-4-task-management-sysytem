import React, { Component } from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from 'reactstrap'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {updateItems, deleteItems} from '../Actions/ItemActions'
class StatusEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statuseditOpen: false,
            status: '',
            color: ''
        }
    }
    componentDidMount() {
        const {status} = this.props
        if(status === 'New') {
            this.setState({color: 'primary'})
        }
        else if(status === 'In progress') {
            this.setState({color: 'danger'})
        }
        else {
            this.setState({color: 'success'})
        }
        this.setState({status})
    }
   
    static propTypes = {
        updateItems: PropTypes.func.isRequired,
    }
    togglestatusedit = () => {
        this.setState({statuseditOpen: !this.state.statuseditOpen})
    }
    onselectstatusedit = (_id, status) => {
        const newstatus = {
            status: status
        }
        if(status === 'New') {
            this.setState({color: 'primary'})
        }
        else if(status === 'In progress') {
            this.setState({color: 'danger'})
        }
        else {
            this.setState({color: 'success'})
        }
        this.setState({status})
       
        this.props.updateItems(_id, newstatus)
    }
    render() {
        const {_id} = this.props
        return (
            <Dropdown isOpen={this.state.statuseditOpen} toggle={this.togglestatusedit} direction="right">
            <DropdownToggle caret color={this.state.color}>
            {this.state.status}
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem  onClick={() => this.onselectstatusedit(_id,"New")}>New</DropdownItem>
                <DropdownItem onClick={() => this.onselectstatusedit(_id, "In progress")}>In progress</DropdownItem>
                <DropdownItem onClick={() => this.onselectstatusedit(_id, "Completed")}>Completed</DropdownItem>    
            </DropdownMenu>
        </Dropdown>
        );
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
})
export default connect(mapStateToProps, {updateItems, deleteItems})(StatusEdit); 