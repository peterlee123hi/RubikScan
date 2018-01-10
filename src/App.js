import React, { Component } from 'react';
import logo from './assets/cube.png';
import './App.css';

import Camera from './Camera.js';
import RubiksCube from './RubiksCube/RubiksCube.js';
import RubiksSolver from './RubiksSolver/RubiksSolver.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.processColorData = this.processColorData.bind(this);
        this.loadSolver = this.loadSolver.bind(this);
    }

    processColorData(faceColors) {
        this.refs.cube.updateColors(faceColors);
    }

    loadSolver(cubeColors) {
        this.refs.solver.loadCubeData(cubeColors);
    }

    render() {
        return (
                <div className="App">
                    <div className="App-container">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <h1 className="App-title">Rubik Scan</h1>
                        </header>
                        <div className="App-intro">
                            <div className="App-intro-text">
                                <p>Do you have one of these pieces of shit and need to solve it in a hurry?</p>
                                <p>Well, great news! Go ahead and scan it here. Then, you can follow the algorithm guide and the bottom if you're new to solving Rubik's cubes and fix your shit!</p>
                            </div>
                        </div>
                        <div className="App-camera-container">
                            <Camera
                                processColorData={ this.processColorData }
                            ></Camera>
                        </div>
                        <RubiksCube 
                            ref="cube"
                            loadSolver={ this.loadSolver }
                        ></RubiksCube>
                        <RubiksSolver ref="solver"></RubiksSolver>
                    </div>
                </div>
        );
    }
}

export default App;
