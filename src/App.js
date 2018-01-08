import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Camera from './Camera.js';
import './Camera.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Puzzle Scan</h1>
        </header>
        <Camera></Camera>
      </div>
    );
  }
}

export default App;
