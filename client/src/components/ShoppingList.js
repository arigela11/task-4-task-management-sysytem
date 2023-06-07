import React, { Component } from 'react';
import {
    Container, 
    Button,
    Table,
    Input,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Label
} from 'reactstrap'
import {
    TransitionGroup
} from 'react-transition-group'
import {connect} from 'react-redux';
import {getItems, deleteItems, updateItems} from '../Actions/ItemActions'
import PropTypes from 'prop-types'
import HomeScreen from './HomeScreen';
import StatusEdit from './StatusEdit';
class ShoppingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsearch: '',
            dropdownOpen: false,
            label: 'All',
            dropdownstatusOpen: false,
            labelstatus: 'All',
            statuseditOpen: false
        }
    }
    componentDidMount() {
        this.props.getItems();
    }
    toggledropdown = () => {
        this.setState({dropdownOpen:!this.state.dropdownOpen})
    }
    toggledropdownstatus = () => {
        this.setState({dropdownstatusOpen: !this.state.dropdownstatusOpen})
    }
    onselect = (e) => {
        const {textContent} = e.currentTarget
        this.setState({label: textContent})
    }
    onselectlabel = (e) => {
        const {textContent} = e.currentTarget
        this.setState({labelstatus: textContent})
    }
    onselectstatusedit = (_id, status) => {
        const newstatus = {
            status: status
        }
        this.props.updateItems(_id, newstatus)
    }
    onDeleteClick = (id) => {
        this.props.deleteItems(id);
    }
    
    static propTypes = {
        updateItems: PropTypes.func.isRequired,
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    render() {
        const {items} = this.props.item
        //filter based on searched task
        let filtereditems = items.filter(
            (item) => {
                if(this.state.itemsearch.length !== 0) {
                    return item.name.toLowerCase().indexOf(this.state.itemsearch.toLowerCase()) !== -1
                }
                else {
                    return item.name
                }
            }
        );

        //filter based on label of task
       filtereditems = filtereditems.filter(
           (item) => {
               if(this.state.label === 'All') {
                   return item.label
               }
               else {
                   return item.label === this.state.label
               }
           }
       )

       //filter based on status of task
       filtereditems = filtereditems.filter(
        (item) => {
            if(this.state.labelstatus === 'All') {
                return item.status
            }
            else {
                return item.status === this.state.labelstatus
            }
        }
    )

        return (
            <Container>
                {this.props.isAuthenticated ?
                    <TransitionGroup className="Todo-list">
                    <div style={{flexDirection: 'row', display: 'flex', marginTop: '5%', marginBottom: '3%'}}>
                        <Input 
                            type="text"
                            name="itemsearch"
                            id="item"
                            placeholder="Search"
                            onChange={this.onChange}
                            style={{width: '50%'}}
                        />
                         <Label for="Item" style={{marginLeft:'2%', marginRight:'2%', marginTop:'0.5%'}}>Label</Label>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggledropdown}>
                                    <DropdownToggle caret color="primary">
                                    {this.state.label}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem tag="All" onClick={this.onselect}>All</DropdownItem>
                                        <DropdownItem tag="Personal" onClick={this.onselect}>Personal</DropdownItem>
                                        <DropdownItem tag="Work" onClick={this.onselect}>Work</DropdownItem>
                                        <DropdownItem tag="Shopping" onClick={this.onselect}>shopping</DropdownItem> 
                                        <DropdownItem tag="Others" onClick={this.onselect}>Others</DropdownItem>   
                                    </DropdownMenu>
                        </Dropdown>
                        <Label for="Label" style={{marginLeft:'2%', marginRight:'2%', marginTop:'0.5%'}}>Status</Label>
                        <Dropdown isOpen={this.state.dropdownstatusOpen} toggle={this.toggledropdownstatus}>
                                    <DropdownToggle caret color="primary">
                                    {this.state.labelstatus}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem tag="All" onClick={this.onselectlabel}>All</DropdownItem>
                                        <DropdownItem tag="New" onClick={this.onselectlabel}>New</DropdownItem>
                                        <DropdownItem tag="Inprogress" onClick={this.onselectlabel}>In progress</DropdownItem>
                                        <DropdownItem tag="Completed" onClick={this.onselectlabel}>Completed</DropdownItem>    
                                    </DropdownMenu>
                        </Dropdown>
                    </div>
                    <Table bordered small striped size="3">
                        <thead>
                        <tr>
                            <th>Task</th>
                            <th> Date Created</th>
                            <th> Due Date</th>
                            <th> Label </th>
                            <th> Status </th>
                            <th> Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filtereditems.map(({_id, name, date, DueDate, label, status}) => (
                            <tr key={_id}>
                            <td>{name}</td> 
                            <td>{date.substring(0,10)}</td>  
                            <td> {DueDate.substring(0,10)} </td> 
                            <td>{label}</td>
                            <td> 
                                <tr key={_id}><StatusEdit status={status} _id={_id}/> </tr>
                            </td>
                            <td>
                                  <Button
                                    className="remove-btn"
                                    color="danger"
                                    size="sm"
                                    onClick={this.onDeleteClick.bind(this, _id)}
                                > &times; </Button> 
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    </TransitionGroup>
                 : <HomeScreen/> }
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
})

export default connect(mapStateToProps, {getItems, deleteItems, updateItems})(ShoppingList);