import React, { Component } from 'react';
import { 
    Modal,
    ModalHeader,
    ModalBody,
    NavLink,
} from 'reactstrap'
import { ListGroup, ListGroupItem } from 'reactstrap';
class AboutUsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
    }
    toggle = () => {
        this.setState({modal: !this.state.modal})
    }
    render() {
        return (
            <div>
              <NavLink onClick={this.toggle} href="#" style={{fontSize: 'lg'}}>
                  About 
              </NavLink>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}><img src={require('./assests/list.png')} style={{width:"25%"}} alt=""/> <strong className="text-dark"> ABOUT </strong> </ModalHeader>
                    <ModalBody>
                        <div style={{flexDirection: 'row', flex: 1}}>
                        <div>   
                        <p className="text-capitalize"> Task Memo is a Web based app for managing your daily tasks. <br/> Features of Task Memo includes : </p>
                        <ListGroup>
                            <ListGroupItem color="dark">Adding/Managing Tasks</ListGroupItem>
                            <ListGroupItem >Setting their due date</ListGroupItem>
                            <ListGroupItem color="dark">Adding label (ex: Work, personal, others etc)</ListGroupItem>
                            <ListGroupItem >Adding Status (ex: Started, In-progress, Completed)</ListGroupItem>
                        </ListGroup>
                        </div>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default AboutUsModal;