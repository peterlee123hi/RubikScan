import React, { Component } from 'react';
import './Footer.css';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div className="Footer">
                    <p>Made with &hearts; by <a href="https://peterlee.tech">Peter</a>.</p>
                </div>
        );
    }
}

export default App;
