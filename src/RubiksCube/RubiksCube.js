import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RubiksSide from './RubiksSide.js';
import './RubiksCube.css';

class RubiksCube extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'Front'
        };
        this.sides = ['Front', 'Left', 'Right', 'Top', 'Bottom', 'Back'];
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
                    ref={side}></RubiksSide>
            );
        });
        return <div className="Rubiks-cube">
            {sideElements}
        </div>;
    }
}

export default RubiksCube;
