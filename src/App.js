import "react-hot-loader";
import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import MainPage from './MainPage';
import LoginPage from './LoginPage';

class App extends React.Component {
     render() {
        return (
            <div className='App'>
                <Switch>
                    <Redirect exact from='/' to='/dashboard' />
                    <Route path='/dashboard'>
                        <MainPage />
                    </Route>
                    <Route path='/login'>
                        <LoginPage />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default hot(App);