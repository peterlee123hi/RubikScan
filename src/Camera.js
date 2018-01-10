import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';

import './Camera.css';

class Camera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            streaming: false,
            r1: 'w',
            r2: 'w',
            r3: 'w',
            r4: 'w',
            r5: 'w',
            r6: 'w',
            r7: 'w',
            r8: 'w',
            r9: 'w'
        };

        this.processImage = this.processImage.bind(this);
        this.getFaceColors = this.getFaceColors.bind(this);
        this.processImageData = this.processImageData.bind(this);
        this.rgbToHsv = this.rgbToHsv.bind(this);
        this.classifyColor = this.classifyColor.bind(this);
        this.updateReticleColor = this.updateReticleColor.bind(this);
    }

    processImage(ev) {
        const faceColors = this.getFaceColors();
        this.props.processColorData(faceColors);
    }

    getFaceColors() {
        let video = this.refs.video;
        let videoBoundingBox = video.getBoundingClientRect();
        let videoX = videoBoundingBox.x, videoY = videoBoundingBox.y;

        let canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        let img = ctx.getImageData(0, 0, canvas.width, canvas.height);
        return this.processImageData(img, videoX, videoY);
    }

    processImageData(img, videoX, videoY) {
        let colorData = []

        this.reticleBoxes.forEach((box) => {
            let reticleBox = ReactDOM.findDOMNode(this.refs[box.ref]);
            const boundingBox = reticleBox.getBoundingClientRect();
            const sX = boundingBox.x - videoX, 
                sY = boundingBox.y - videoY,
                size = boundingBox.width;
            let colorOccurrences = {
                'r': 0,
                'g': 0,
                'b': 0,
                'o': 0,
                'y': 0,
                'w': 0,
                'invalid': 0
            };
            for (let x = sX; x < sX + size; x += 2) {
                for (let y = sY; y < sY + size; y += 2) {
                    let pos = (x + img.width * y) * 4, data = img.data;
                    let rgb = [0, 0, 0];
                    rgb[0] = data[pos];
                    rgb[1] = data[pos + 1];
                    rgb[2] = data[pos + 2];
                    colorOccurrences[this.classifyColor(rgb)]++;
                }
            }

            let maxOcc = -1;
            let maxColor = 'r';
            for (let color in colorOccurrences) {
                if (colorOccurrences.hasOwnProperty(color) && color !== 'invalid') {
                    if (maxOcc < colorOccurrences[color]) {
                        maxColor = color;
                        maxOcc = colorOccurrences[color];
                    }
                }
            }
            colorData.push(maxColor);
        });

        let faceColors = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        for (let i = 0; i < 9; i++) {
            const r = Math.floor(i % 3);
            const c = Math.floor(i / 3);
            faceColors[r][c] = colorData[i];
        }
        return faceColors;
    }

    rgbToHsv(rgb) {
        let r = rgb[0] / 255;
        let g = rgb[1] / 255;
        let b = rgb[2] / 255;

        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s;
        let v = max;

        const d = max - min;
        s = max === 0 ? 0 : d / max;

        if (max === min) {
            h = 0;
        } else {
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                default: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [h, s, v];
    }

    classifyColor(rgb) {
        let hsv = this.rgbToHsv(rgb);
        if (0 <= hsv[1] && hsv[1] <= 100 / 255 && 130 / 255 <= hsv[2] && hsv[2] <= 255 / 255)
            return 'w';
        if (30 / 255 <= hsv[1] && hsv[1] <= 255 / 255 && 50 / 255 <= hsv[2] && hsv[2] <= 255 / 255) {
            if ((0 <= hsv[0] && hsv[0] <= 6 / 180) || (151 / 180 < hsv[0] && hsv[0] <= 1))
                return 'r';
            else if (6 / 180 < hsv[0] && hsv[0] <= 20 / 180)
                return 'o';
            else if (20 / 180 < hsv[0] && hsv[0] <= 45 / 180)
                return 'y';
            else if (45 / 180 < hsv[0] && hsv[0] <= 100 / 180)
                return 'g';
            else if (100 / 180 < hsv[0] && hsv[0] <= 151 / 180)
                return 'b';
        }
        return 'invalid';
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

        setInterval(() => {
            this.updateReticleColor();
        }, 250);
    }

    updateReticleColor() {
        if (this.state.streaming) {
            let faceColors = this.getFaceColors();
            this.setState({
                r1: faceColors[0][2],
                r2: faceColors[1][2],
                r3: faceColors[2][2],
                r4: faceColors[0][1],
                r5: faceColors[1][1],
                r6: faceColors[2][1],
                r7: faceColors[0][0],
                r8: faceColors[1][0],
                r9: faceColors[2][0]
            });
        }
    }

    render() {
        this.reticleBoxes = [];
        for (let i = 1; i <= 9; i++) {
            this.reticleBoxes.push(
                <div
                className= { "Camera-reticle-box offset-" + i +
                    " " + this.state['r' + i]}
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
            { this.state.streaming ? this.reticleBoxes : "" }
            <Button raised
                className="snap-button" 
                onClick={ this.processImage }
                color="accent">
                    Confirm
            </Button>
        </div>;
    }
}

export default Camera;
