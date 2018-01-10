import React, { Component } from 'react';
import './RubiksSolver.css';

import Cube from 'cubejs';
import 'cubejs/lib/solve.js';

import RubiksVisual from './RubiksVisual.js';

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
        let moves = this.requestSolution(Cube.fromString(str));
        this.setState({
            status: 'solved',
            solution: moves
        });
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
            { (this.state.status === 'solved' ? 
                <RubiksVisual cubeData={this.state.cubeData}></RubiksVisual>
                : "") }
            { (this.state.status === 'solved' ? 
                <p>{this.state.solution}</p>
                : "") }
        </div>
    }
}

export default RubiksSolver;
