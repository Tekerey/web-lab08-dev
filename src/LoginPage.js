import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import './LoginPage.css';
import Cookies from './helpers/cookies';
import AuthService from './helpers/authService';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.state = {
            emailError: false,
            emailErrorText: '',
            passwordError: false,
            passwordErrorText: ''
        };
    }

    componentDidMount() {
        AuthService.auth().then(
            (res) => {
                if (res.isAuth) {
                    this.props.history.push('/');
                }
            }
        );
    }

    handleFocus(e) {
        const el = e.target;
        el.classList.remove('error');
        if (el.id == 'email') {
            this.setState({
                emailError: false
            });
        } else if (el.id == 'password') {
            this.setState({
                passwordError: false
            });
        }
    }

    handleLogin(e) {
        e.preventDefault();
        document.getElementById('email').classList.remove('error');
        document.getElementById('password').classList.remove('error');

        const formData = new FormData(document.getElementById('loginForm'));
        const body = {
            email: formData.get('email'),
            password: formData.get('password'),
            rememberMe: formData.get('remember') == null ? false : true
        };

        //console.log(body.password); Как защититься от такого ???

        const noEmail = body.email.trim().length == 0;
        const noPassword = body.password.trim().length == 0;

        let errors = false;

        if (noEmail && noPassword) {
            this.setState({
                emailError: true,
                emailErrorText: 'Enter email.',
                passwordError: true,
                passwordErrorText: 'Enter password'
            });
            errors = true;
        } else if (noEmail) {
            this.setState({
                emailError: true,
                emailErrorText: 'Enter email.',
                passwordError: false
            });
            errors = true;
        } else if (noPassword) {
            this.setState({
                emailError: false,
                passwordError: true,
                passwordErrorText: 'Enter password'
            });
            errors = true;
        }
        
        if (!noPassword && body.password.trim().length <= 6) {
            this.setState({
                passwordError: true,
                passwordErrorText: 'Password must have more than 6 symbols.'
            });
            errors = true;
        }

        if (!errors) {
            AuthService.login(body)
            .then(
                result => {
                    if (result.isLogged) {
                        // Добавить возможность указывать редирект ссылку
                        this.props.history.push('/');
                    } else {
                        if (result.status == 'email') {
                            document.getElementById('email').classList.add('error');
                            this.setState({
                                emailError: true,
                                emailErrorText: 'No user with this email.',
                                passwordError: false});
                        } else {
                            document.getElementById('password').classList.add('error');
                            this.setState({
                                emailError: false,
                                passwordError: true,
                                passwordErrorText: 'Incorrect password.'
                            });
                        }
                    }
                },
                error => {
                    console.log(error);
                }
            );            
        }
    }

    render() {
        return (
            <div className='LoginPage'>
                <form id='loginForm' onSubmit={this.handleLogin}>
                    <h2>Log to Web App</h2><hr></hr>
                    <div className='FormBody'>
                        <label className='inputLabel' htmlFor='email'>E-mail:</label>
                        <input type='email' name='email' id='email' onFocus={this.handleFocus}></input>
                        {this.state.emailError &&
                            <div className='errorInfo'>
                                {this.state.emailErrorText}
                            </div>}
                        <label className='inputLabel' htmlFor='password'>Password:</label>
                        <input type='password' name='password' id='password' onFocus={this.handleFocus}></input>
                        {this.state.passwordError &&
                            <div className='errorInfo'>
                                {this.state.passwordErrorText}
                            </div>}
                        <span>
                            <input type='checkbox' name='remember' id='remember'></input>
                            <label htmlFor='remember'> Remember me</label>
                        </span>
                        <button type='submit'>Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(LoginPage);