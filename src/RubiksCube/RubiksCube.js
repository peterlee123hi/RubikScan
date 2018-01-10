import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RubiksSide from './RubiksSide.js';

class RubiksCube extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'Front',
            frontColorData: [],
            leftColorData: [],
            rightColorData: [],
            topColorData: [],
            bottomColorData: [],
            backColorData: []
        };
        this.sides = ['Front', 'Left', 'Right', 'Top', 'Bottom', 'Back'];

        this.updateColors = this.updateColors.bind(this);
        this.updateSelectedFace = this.updateSelectedFace.bind(this);
    }

    updateColors(faceColors) {
        const side = this.state.selected;
        const sideColorData = side.toLowerCase() + 'ColorData';
        const colorData = {};
        colorData[sideColorData] = faceColors;
        this.setState(colorData);
        this.updateSelectedFace();

        let readyToSolve = true;
        let cubeColors = {};
        this.sides.forEach((side) => {
            let sideColors = this.state[side.toLowerCase() + 'ColorData'];
            if (side === this.state.selected) {
                sideColors = faceColors;
            }
            if (sideColors.length === 0) {
                readyToSolve = false;
            } else {
                cubeColors[side.toLowerCase()] = sideColors;
            }
        });
        if (readyToSolve) {
            this.props.loadSolver(cubeColors);
        }
    }

    updateSelectedFace() {
        let idx = 0;
        while (this.state.selected !== this.sides[idx]) idx++;
        idx = (idx + 1) % this.sides.length;
        this.setState({
            selected: this.sides[idx]
        });
    }

    componentDidMount() {
        this.sides.forEach((side) => {
            let handler = () => {
                this.setState({
                    selected: side  
                });
            };
            ReactDOM.findDOMNode(this.refs[side])
                .addEventListener('click', handler);
        });
    }

    render() {
        let sideElements = [];
        this.sides.forEach((side) => {
            sideElements.push(
                <RubiksSide
                    key={side}
                    type={side}
                    selected={(this.state.selected === side) ? "true" : ""}
                    colorData={this.state[side.toLowerCase() + 'ColorData']}
                    ref={side}></RubiksSide>
            );
        });
        return <div className="Rubiks-cube">
            {sideElements}
        </div>;
    }
}

export default RubiksCube;
