import React, { Component } from 'react';
import './RubiksSolver.css';

import Cube from 'cubejs';
import 'cubejs/lib/solve.js';

class RubiksSolver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'waiting'
        };

        this.loadCubeData = this.loadCubeData.bind(this);
        this.requestSolution = this.requestSolution.bind(this);
        this.cubeDataToString = this.cubeDataToString.bind(this);
    }

    loadCubeData(cubeData) {
        const str = this.cubeDataToString(cubeData);
        this.setState({
            cubeData: cubeData
        });
        let moves = this.requestSolution(Cube.fromString(str)).trim();
        if (moves === 'invalid') {
            this.setState({
                status: 'invalid'
            });
        } else {
            let m = moves.split(' ');
            this.setState({
                status: 'solved',
                solution: m.join(' - '),
                numMoves: m.length
            });
        }
    }

    requestSolution(cube) {
        Cube.initSolver();
        let moves = cube.solve();
        return moves;
    }
    
    cubeDataToString(cubeData) {
        const colorMap = {
            'r': 'R',
            'o': 'L',
            'y': 'D',
            'g': 'F',
            'b': 'B',
            'w': 'U'
        };
        let str = "";
        let sides = ['top', 'right', 'front', 'bottom', 'left', 'back'];
        for (let i = 0; i < sides.length; i++) {
            let side = sides[i];
            let faceColors = cubeData[side];
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    str += colorMap[faceColors[r][c]];
                }
            }
        }
        return str;
    }

    render() {
        return <div className="RubiksSolver">
            <div className="RubiksSolver-container">
                <h1>Solver</h1>
                { (this.state.status === 'waiting' ? 
                    <p>Give it a shot!</p>
                    : "") }
                { (this.state.status === 'invalid' ? 
                    <p className="Algorithm bottom">Sorry, I couldn't find a solution for that cube. :(</p>
                    : "") }
                { (this.state.status === 'invalid' ? 
                    <p className="Algorithm">Make sure that you followed the scanning guidelines as specified above. Otherwise, scramble it a bit and try again!</p>
                    : "") }
                { (this.state.status === 'solved' ? 
                    <p className="Algorithm">Number of Moves: {this.state.numMoves}</p>
                    : "") }
                { (this.state.status === 'solved' ? 
                    <p className="Algorithm">Your algorithm: {this.state.solution}</p>
                    : "") }
            </div>
        </div>
    }
}

export default RubiksSolver;
