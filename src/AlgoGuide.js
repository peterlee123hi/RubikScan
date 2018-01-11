import React, { Component } from 'react';
import { Container, Row, Col, Visible } from 'react-grid-system';

import './AlgoGuide.css';

class AlgoGuide extends Component {
    render() {
        return <div className="Instructions"> 
            <h1>Algorithm Guide</h1>      
            <p>Here's how to follow standard Rubik's cube algorithm notation.</p>
            <Container>
                <Row>
                    <Visible md lg xl>
                        <Col sm={0} md={2} />
                    </Visible>
                    <Col md={4} className="right">
                        <p>U = Turn the up/top face clockwise</p>
                        <p>U' = Turn the up/top face counter-clockwise</p>
                        <p>U2 = Turn the up/top face clockwise, 2 times</p>
                    </Col>
                    <Col md={4} className="left">
                        <p>F = Front face</p>
                        <p>L = Left face</p>
                        <p>R = Right face</p>
                        <p>U = Up/top face</p>
                        <p>D = Down/bottom face</p>
                        <p>B = Back face</p>
                    </Col>
                </Row>
            </Container>
        </div>;
    }
}

export default AlgoGuide;
