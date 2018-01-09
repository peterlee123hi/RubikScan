import React, { Component } from 'react';

class RubiksSlot extends Component {
    render() {
        let colorMap = {
            'r': '#F44336',
            'o': '#FF9800',
            'y': '#FFEB3B',
            'b': '#2196F3',
            'g': '#4CAF50',
            'w': '#FFF',
            'black': '#222'
        }
        const slotStyle = { 
            display: 'inline-block',
            width: '50px',
            height: '50px',
            borderRadius: '4px',
            marginLeft: '4px',
            backgroundColor: colorMap[this.props.color]
        }
        return <div className="Rubiks-slot"
            style={slotStyle}>
        </div>;
    }
}

export default RubiksSlot;
