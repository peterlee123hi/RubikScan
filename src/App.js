import React, { Component } from 'react';
import logo from './assets/logo.svg';
import './App.css';

import Instructions from './Instructions.js';
import AlgoGuide from './AlgoGuide.js';
import Camera from './Camera.js';
import RubiksCube from './RubiksCube/RubiksCube.js';
import RubiksSolver from './RubiksSolver/RubiksSolver.js';
import Footer from './Footer.js';

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
                        </header>
                        <div className="App-intro">
                            <div className="App-intro-text">
                                <p>Do you have one of these pieces of crap and need to solve it in a hurry?</p>
                                <p>Well, great news! Go ahead and scan it here. Then, you can follow the instructions for the scanner and algorithm guide to fix your cube!</p>
                            </div>
                        </div>
                        <Instructions />
                        <div className="App-camera-container">
                            <Camera
                                processColorData={ this.processColorData }
                            ></Camera>
                        </div>
                        <RubiksCube
                            ref="cube"
                            loadSolver={ this.loadSolver }
                        ></RubiksCube>
                        <AlgoGuide />
                        <RubiksSolver ref="solver"></RubiksSolver>
                        <Footer></Footer>
                    </div>
                </div>
        );
    }
}

export default App;
