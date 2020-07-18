import React, { Component } from 'react';
import App from './App';
import Header from './Header';
import DieuHuong from '../router/DieuHuong';

class MainApp extends Component {
    render() {
        return (
            <div style={{backgroundColor: '#939393',minWidth:'100%',minHeight:'100%' }}>
                <DieuHuong />
            </div>
        );
    }
}

export default MainApp;