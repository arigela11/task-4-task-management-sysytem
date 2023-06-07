import React, { Component } from 'react';
import {
    Button, 
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap'
import PropTypes from 'prop-types'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {connect} from 'react-redux'
import {addItem} from '../Actions/ItemActions'
class ItemModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            name: '',
            dueDate: new Date(),
            dropdownOpen: false,
            label : "Label",
            msg: null
        }
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }
    toggle =  () => {
        this.setState({modal: !this.state.modal, dueDate: new Date(), msg: null})
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    handleChange = date => {
        this.setState({
          dueDate: date
        });
      };
    onselect = (e) => {
        const {textContent} = e.currentTarget
        this.setState({label: textContent, msg: null})
    }
    onSubmit = (e) => {
        e.preventDefault()
        if(this.state.label === 'Label' || this.state.name === '') {
            this.setState({msg: 'Please fill all details'})
        }
        else {
            const newItem = {
                name:this.state.name,
                DueDate:this.state.dueDate,
                label: this.state.label
            }
    
            //Add item via addItem action
            this.props.addItem(newItem);
    
            // Close toggle
            this.toggle();
        }
    }
    toggledropdown = () => {
        this.setState({dropdownOpen:!this.state.dropdownOpen})
    }
    render() {
        return (
            <div>
                {this.props.isAuthenticated ?  <Button
                    color="dark"
                    style={{marginBottom: '2%', marginTop: '3%'}}
                    onClick={this.toggle}
                >
                    Add Task
                </Button> : null
                } 
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>New Task</ModalHeader>
                    <ModalBody>
                    {this.state.msg ? <Alert>{this.state.msg} </Alert> : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="Item">Task </Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Add New Task"
                                    onChange={this.onChange}
                                />
                                <br/>
                                <Label for="Item">Label</Label>
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggledropdown}>
                                    <DropdownToggle caret>
                                    {this.state.label}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem tag="Personal" onClick={this.onselect}>Personal</DropdownItem>
                                        <DropdownItem tag="Work" onClick={this.onselect}>Work</DropdownItem>
                                        <DropdownItem tag="Shopping" onClick={this.onselect}>shopping</DropdownItem> 
                                        <DropdownItem tag="Others" onClick={this.onselect}>Others</DropdownItem>   
                                    </DropdownMenu>
                                </Dropdown>
                                <br/>
                                <Label for="Item" style={{marginTop: '5px', marginRight: '4px'}}>Due Date </Label>
                                <br/>
                                <DatePicker
                                    selected={this.state.dueDate}
                                    onChange={this.handleChange}
                                />
                                <br/>
                                <Button
                                color="dark"
                                style={{marginTop: '2rem'}}
                                block
                                >
                                    Submit
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>

                </Modal>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    items: state.item,
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {addItem})(ItemModal);