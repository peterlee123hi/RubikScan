import React, { Component } from 'react';
import './RubiksSide.css';

import RubiksSlot from './RubiksSlot.js';

class RubiksSide extends Component {
    render() {
        let colorData = this.props.colorData
        return <div className={ "Rubiks-side " + 
                        (this.props.selected === 'true' ? "Rubiks-side-selected" : "") }>
            <h1 className="Rubiks-side-type">{this.props.type}</h1>
            <div className="Rubiks-side-row">
                <RubiksSlot color={(colorData.length > 0 ? colorData[0][0] : "black")}></RubiksSlot>
                <RubiksSlot color={(colorData.length > 0 ? colorData[0][1] : "black")}></RubiksSlot>
                <RubiksSlot color={(colorData.length > 0 ? colorData[0][2] : "black")}></RubiksSlot>
            </div>
            <div className="Rubiks-side-row">
                <RubiksSlot color={(colorData.length > 0 ? colorData[1][0] : "black")}></RubiksSlot>
                <RubiksSlot color={(colorData.length > 0 ? colorData[1][1] : "black")}></RubiksSlot>
                <RubiksSlot color={(colorData.length > 0 ? colorData[1][2] : "black")}></RubiksSlot>
            </div>
            <div className="Rubiks-side-row">
                <RubiksSlot color={(colorData.length > 0 ? colorData[2][0] : "black")}></RubiksSlot>
                <RubiksSlot color={(colorData.length > 0 ? colorData[2][1] : "black")}></RubiksSlot>
                <RubiksSlot color={(colorData.length > 0 ? colorData[2][2] : "black")}></RubiksSlot>
            </div>
        </div>;
    }
}

export default RubiksSide;
