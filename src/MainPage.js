import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import Cookies from './helpers/cookies';
import './MainPage.css';
import WeatherBlock from './components/WeatherBlock';
import AuthService from './helpers/authService';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {isLoaded: false};
    }

    componentDidMount() {
        AuthService.auth().then(
            (isAuth) => {
                if (!isAuth) {
                    this.props.history.push('/login');
                } else {
                    this.content = <WeatherBlock />;
                    this.setState({isLoaded: true});
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    handleLogout() {
        Cookies.deleteCookie('token');
        Cookies.deleteCookie('email');
        Cookies.deleteCookie('login');
        this.props.history.push('/login');
    }

    render() {
        if (!Cookies.getCookie('token')) {
            return <Redirect to='/login' />;
        }

        if (!this.state.isLoaded) {
            this.content = <div>Loading...</div>; // Add loader here
        }

        return (
            <>
                <header>
                    <div className='Menu'>
                        <h2>Weather</h2>
                        <div>
                            <span>{Cookies.getCookie('login')} | {Cookies.getCookie('email')}</span>
                            <button className='LogoutButton' onClick={this.handleLogout}>Logout</button>
                        </div>
                    </div>
                </header>
                <div className='MainPage'>
                    {this.content}
                </div>
            </>
        );
    }
}

export default withRouter(MainPage);