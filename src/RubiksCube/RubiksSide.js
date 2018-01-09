import React, { Component } from 'react';
import './RubiksSide.css';

import RubiksSlot from './RubiksSlot.js';

class RubiksSide extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let boxes = [];
        for (let i = 0; i < 9; i++) {
            // Push divs here
            // Then put divs in render return value and style        
        }
        return <div className={ "Rubiks-side " + 
                        (this.props.selected === 'true' ? "Rubiks-side-selected" : "") }>
            <h1 className="Rubiks-side-type">{this.props.type}</h1>
            <div className="Rubiks-side-row">
                <RubiksSlot color="black"></RubiksSlot>
                <RubiksSlot color="black"></RubiksSlot>
                <RubiksSlot color="black"></RubiksSlot>
            </div>
            <div className="Rubiks-side-row">
                <RubiksSlot color="black"></RubiksSlot>
                <RubiksSlot color="black"></RubiksSlot>
                <RubiksSlot color="black"></RubiksSlot>
            </div>
            <div className="Rubiks-side-row">
                <RubiksSlot color="black"></RubiksSlot>
                <RubiksSlot color="black"></RubiksSlot>
                <RubiksSlot color="black"></RubiksSlot>
            </div>
        </div>;
    }
}

export default RubiksSide;
