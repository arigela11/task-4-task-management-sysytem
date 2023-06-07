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
    NavLink,
    Alert
} from 'reactstrap'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {register} from '../../Actions/AuthActions'
import {ClearErrors} from '../../Actions/ErrorActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
class RegisterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            name: '',
            email: '',
            password: '',
            msg: null,
            security: true,
            confirmpassword: ''
        }
    }
    componentDidUpdate(prevProps) {
        const {error, isAuthenticated} = this.props
        if(error !== prevProps.error) {
            //Check for register error
            if(error.id === 'REGISTER_FAIL') {
                this.setState({msg:error.msg.msg})
            } else {
                this.setState({msg: null});
            }
        }
        if(this.state.modal) {
            if(isAuthenticated) {
                //if authenticated close modal
                this.toggle()
            }
        }
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        ClearErrors: PropTypes.func.isRequired
    }

    toggle =  () => {
        //Clear Errors
        this.props.ClearErrors()
        this.setState({modal: !this.state.modal, security: true})
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value, msg: ""})
    }
    onSubmit = (e) => {
        e.preventDefault()
        const {name, email, password, confirmpassword} = this.state
        if(password === confirmpassword) {
            const newUser = {
                name,
                email,
                password
            };
    
            //Attempt to register
            this.props.register(newUser);
            // Close toggle
        }
        else {
            this.setState({msg: "Password and Confirm password does not match"})
        }
    }
    render() {
        return (
            <div>
              <NavLink onClick={this.toggle} href="#" style={{fontSize: '15px'}}>
                  Register
              </NavLink>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (<Alert color="danger"> {this.state.msg}</Alert>):null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="Name">Name</Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="mb-3"
                                    placeholder="Enter Name"
                                    onChange={this.onChange}
                                />
                                
                                <Label for="Email">Email</Label>
                                <Input 
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="mb-3"
                                    placeholder="Enter Email"
                                    onChange={this.onChange}
                                />

                                <Label for="Password">Password</Label>
                                <div style={{flexDirection: 'row', display: 'flex'}}>
                                <Input 
                                    type={this.state.security ? "password" : "text"}
                                    name="password"
                                    id="password"
                                    className="mb-3"
                                    placeholder="Enter Password"
                                    onChange={this.onChange}
                                    style={{width: '95%'}}
                                />
                                 <FontAwesomeIcon icon={this.state.security ? faEyeSlash : faEye} onClick={() => this.setState({security: !this.state.security})} style={{marginLeft: '10px', marginTop: '10px'}}/>
                                </div>
                                <Label for="ConfirmPassword">Confirm Password</Label>
                                <Input 
                                    type={this.state.security ? "password" : "text"}
                                    name="confirmpassword"
                                    id="confirmpassword"
                                    className="mb-3"
                                    placeholder="Enter Password"
                                    onChange={this.onChange}
                                    style={{width: '95%'}}
                                />
                                <Button
                                color="dark"
                                style={{marginTop: '2rem'}}
                                block

                                >
                                    Register
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
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})
export default connect(mapStateToProps, {register, ClearErrors})(RegisterModal);