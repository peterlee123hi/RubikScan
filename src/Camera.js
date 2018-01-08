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
            let img = ctx.createImageData(canvas.width, canvas.height);
            console.log(img);

            this.reticleBoxes.forEach((box, i) => {
                let reticleBox = ReactDOM.findDOMNode(this.refs[box.ref]);
                const boundingBox = reticleBox.getBoundingClientRect();
                const x = boundingBox.x - videoX, 
                    y = boundingBox.y - videoY,
                    width = boundingBox.width,
                    height = boundingBox.height;
                // TODO: Restructure entire project from PuzzleScan to RubikScan (pain in the dick)
                // Extract colors here and ask the user for verification
                // Then pass up the confirmed colors to App
                // Then visualize the sides with the virtual cube from Google
                // Then once all sides have been scanned, analyze and post solution
                // Then restyle everything to look pretty
                // Then add instructions and improve visualizations
                // Then double check everything so that it meets standards
                // Then you're finally done...
                console.log(x, y);
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
