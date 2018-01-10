import React, { Component } from 'react';
import './RubiksVisual.css';

class RubiksVisual extends Component {
    render() {
        let faces = ['front', 'left', 'right', 'top', 'bottom', 'back'];
        let stickers = ['tl', 'tc', 'tr', 'l', 'c', 'r', 'bl', 'bc', 'br'];
        let faceBlocks = [];

        for (let i = 0; i < faces.length; i++) {
            let face = faces[i];
            let stickerBlocks = [];
            let faceColors = this.props.cubeData[face];
            let r = 0, c = 0;
            for (let j = 0; j < stickers.length; j++) {
                let sticker = stickers[j];
                stickerBlocks.push(
                    <div key={j} className={"sticker " + sticker + " " + faceColors[r][c]} /> 
                );
                c++;
                if (c === 3) {
                    r++;
                    c = 0;
                }
            }
            faceBlocks.push(
                <div key={i} className={"face " + face}> 
                    { stickerBlocks }
                </div>
            );
        }
        return <div className="Rubiks-visual">
            <div className='container'>
                <div className='cube'>
                    { faceBlocks }
                </div>
            </div>
        </div>
    }
}

export default RubiksVisual;
