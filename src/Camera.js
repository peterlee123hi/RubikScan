import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Camera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            streaming: false
        };
    }

    componentDidMount() {
        let video = this.refs.video;
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then((stream) => {
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.log("An error occurred! " + err); 
            });

        video.addEventListener('canplay', (ev) => {
            if (!this.state.streaming) {
                this.setState({
                    streaming: true
                });
            }
        });

        this.reticleBoxes.forEach((box, i) => {
            let reticleBox = ReactDOM.findDOMNode(this.refs[box.ref]);
            const boundingRect = reticleBox.getBoundingClientRect(); 
            const size = boundingRect.width;
            const idxR = Math.floor(i / 3 - 1), idxC = Math.floor(i % 3 - 1);
            const offsetX = idxC * size, offsetY = idxR * size;

            // Get this to work.
            reticleBox.style.top = boundingRect.y + offsetY;
            console.log(reticleBox);
            console.log(offsetX + " " + offsetY);
        });
    }

    render() {
        this.reticleBoxes = [];
        for (let i = 1; i <= 9; i++) {
            this.reticleBoxes.push(
                <div
                    className="Camera-reticle-box"
                    key={ i }
                    ref={ "reticle-box-" + i }
                />
            );
        }
        return <div className="Camera">
            <video
                className="Camera-video"
                ref="video">
                Video stream not available.
            </video>
            { this.reticleBoxes }
        </div>;
    }
}

export default Camera;
