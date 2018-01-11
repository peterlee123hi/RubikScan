import React, { Component } from 'react';
import { Container, Row, Col, Visible } from 'react-grid-system';

import scanningGuide from './assets/guide.svg';
import front from './assets/front.svg';
import left from './assets/left.svg';
import right from './assets/right.svg';
import top from './assets/top.svg';
import back from './assets/back.svg';
import bottom from './assets/bottom.svg';
import tilt from './assets/tilt.svg';

import './Instructions.css';

class Instructions extends Component {
    render() {
        return <div className="Instructions"> 
            <h1>Scanning Instructions</h1>      
            <p>Make sure to scan the faces using the following convention.</p>
            <Container>
                <Row>
                    <Col sm={12} md={1}/>
                    <Col sm={12} md={7}>
                        <img className="guide" src={scanningGuide} alt='scanning guide'/>
                    </Col>
                    <Visible xs sm>
                        <Col xs={3} sm={3}/>
                    </Visible>
                    <Col xs={6} sm={6} md={2}>
                        <img className="color" src={front} alt='front'/>
                        <img className="color" src={left} alt='front'/>
                        <img className="color" src={right} alt='front'/>
                        <img className="color" src={back} alt='front'/>
                        <img className="color" src={bottom} alt='front'/>
                        <img className="color bottom-color" src={top} alt='front'/>
                    </Col>
                </Row>
            </Container>
            <p className="tip">Tip: if the scanner is having problems detecting the colors, try tilting the cube to get a different lighting.</p>
            <Container>
                <Row>
                    <Col xs={3} sm={3} md={4}/>
                    <Col xs={6} sm={6} md={4}>
                        <img src={tilt} alt="tilt"/>
                    </Col>
                </Row>
            </Container>
        </div>;
    }
}

export default Instructions;
