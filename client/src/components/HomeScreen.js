import React, { Component } from 'react';
import './assests/HomeScreen.css';
class HomeScreen extends Component {
    render() {
        return (
            <div style={{marginTop: '3%'}}>
                <h1 className="text-center">Welcome To Task Memo</h1>
                <div className="bodydiv">
                    <p className="text-center"> Your Task Management App </p>
                    <img src={require('./assests/task.png')} className="taskimage" style={{marginTop: '1%'}} alt=""/>
                 </div>
            </div>
        );
    }
}

export default HomeScreen;