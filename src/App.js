import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Camera from './Camera.js';
import RubiksCube from './RubiksCube/RubiksCube.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.processColorData = this.processColorData.bind(this);
    }

    processColorData(faceColors) {
        console.log(faceColors);
    }

    render() {
        return (
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Rubik Scan</h1>
                    </header>
                    <div className="App-camera-container">
                        <Camera
                            processColorData={ this.processColorData }
                        ></Camera>
                    </div>
                    <RubiksCube></RubiksCube>
                </div>
        );
    }
}

export default App;
