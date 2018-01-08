import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';

class Camera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            streaming: false,
            button: 'active'
        };

        this.processImage = (ev) => {
            this.setState({
                button: 'deactive'
            });

            let video = this.refs.video;
            let videoBoundingBox = video.getBoundingClientRect();
            let videoX = videoBoundingBox.x, videoY = videoBoundingBox.y;
            let canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            let ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            let img = ctx.getImageData(0, 0, canvas.width, canvas.height);
            console.log(img);

            this.reticleBoxes.forEach((box) => {
                let reticleBox = ReactDOM.findDOMNode(this.refs[box.ref]);
                const boundingBox = reticleBox.getBoundingClientRect();
                const sX = boundingBox.x - videoX, 
                    sY = boundingBox.y - videoY,
                    size = boundingBox.width;
                let avgRGB = [0, 0, 0], total = 0;
                for (let x = sX; x < sX + size; x += 4) {
                    for (let y = sY; y < sY + size; y += 4) {
                        let pos = (x + img.width * y) * 4, data = img.data;
                        avgRGB[0] += data[pos];
                        avgRGB[1] += data[pos + 1];
                        avgRGB[2] += data[pos + 2];
                        total++;
                    }
                }
                avgRGB[0] /= total;
                avgRGB[1] /= total;
                avgRGB[2] /= total;
                console.log(avgRGB);
            });
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
    }

    render() {
        this.reticleBoxes = [];
        for (let i = 1; i <= 9; i++) {
            this.reticleBoxes.push(
                <div
                    className= { "Camera-reticle-box offset-" + i }
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
            <Button raised disabled={this.state['button'] === 'deactive'}
                className="snap-button" 
                onClick={ this.processImage }>
                Snap
            </Button>
        </div>;
    }
}

export default Camera;
