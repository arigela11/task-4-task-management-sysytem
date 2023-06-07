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
import {Login} from '../../Actions/AuthActions'
import {ClearErrors} from '../../Actions/ErrorActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            email: '',
            password: '',
            msg: null,
            security: true
        }
    }
    componentDidUpdate(prevProps) {
        const {error, isAuthenticated} = this.props
        if(error !== prevProps.error) {
            //Check for register error
            if(error.id === 'LOGIN_FAIL') {
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
        Login: PropTypes.func.isRequired,
        ClearErrors: PropTypes.func.isRequired
    }

    toggle =  () => {
        //Clear Errors
        this.props.ClearErrors()
        this.setState({modal: !this.state.modal, security: true})
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit = (e) => {
        e.preventDefault()

        const {email, password} = this.state;
        const user = {
            email,
            password
        }
        this.props.Login(user)
        
    }
    render() {
        return (
            <div>
              <NavLink onClick={this.toggle} href="#" style={{fontSize: '15px'}}>
                  Login
              </NavLink>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (<Alert color="danger"> {this.state.msg}</Alert>):null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                
                                <Label for="Email">Email</Label>
                                <Input 
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="mb-3"
                                    placeholder="Enter Email"
                                    onChange={this.onChange}
                                />

                                <Label for="Name">Password</Label>
                                <div style={{flexDirection: 'row', display: 'flex'}}>
                                <Input 
                                    type={this.state.security ? "password":"text"}
                                    name="password"
                                    id="password"
                                    className="mb-3"
                                    placeholder="Enter Password"
                                    onChange={this.onChange}
                                    style={{width: '95%'}}
                                />
                                 <FontAwesomeIcon icon={this.state.security ? faEyeSlash : faEye} onClick={() => this.setState({security: !this.state.security})} style={{marginLeft: '10px', marginTop: '10px'}}/>
                                </div>
                                <Button
                                color="dark"
                                style={{marginTop: '2rem'}}
                                block

                                >
                                    Login
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
export default connect(mapStateToProps, {Login, ClearErrors})(LoginModal);