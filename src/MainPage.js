import React from 'react';
import {Link, withRouter} from 'react-router-dom';
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
            (res) => {
                if (!res.isAuth) {
                    this.props.history.push('/login');
                } else {
                    this.content = <WeatherBlock />;
                    this.setState({isLoaded: true});
                }
            },
            (err) => {
                this.content = <h3>Помилка: {err.message}</h3>;
                this.setState({isLoaded: true});
            }
        );
    }

    handleLogout() {
        AuthService.logout().then(
            () => this.props.history.push('/login'),
            (error) => console.log(error)
        );
    }

    render() {
        if (!this.state.isLoaded) {
            this.content = (
                <div className='loader-container'>
                    <div className='loader'></div>
                </div>
            );
        }

        return (
            <>
                <header>
                    <div className='Menu'>
                        <Link to='/'>Weather</Link>
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