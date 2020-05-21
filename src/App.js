import React from 'react';
import {hot} from "react-hot-loader";
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false};
    }

    render() {
        return (
            <div className='App'>
                <h1>Hello, World!</h1>
            </div>
        );
    }
}

export default hot(module)(App);