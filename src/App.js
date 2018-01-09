import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Camera from './Camera.js';
import './Camera.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.processColorData = this.processColorData.bind(this);
    }

    processColorData(faceColors) {
        console.log('Data is in app.js');
    }

    render() {
        return (
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Rubik Scan</h1>
                    </header>
                    <Camera
                        processColorData={ this.processColorData }
                    ></Camera>
                </div>
        );
    }
}

export default App;
