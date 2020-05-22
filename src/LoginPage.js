import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import './LoginPage.css';
import Cookies from './helpers/cookies';
import AuthService from './helpers/authService';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(e) {
        e.preventDefault();
        const formData = new FormData(document.getElementById('loginForm'));
        const body = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        fetch('https://localhost:44384/api/test/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        .then(
            response => {
                // Добавить возможность указывать редирект ссылку
                if (response.ok) this.props.history.push('/');
            },
            error => {
                console.log(error);
            }
        );
    }

    render() {
        // здесь вставить запрос на сервер с проверкой валидности токена
        // вместо простой проверки наличия токена. Тогда не придётся удалять куки при редиректе на логин.
        if (Cookies.getCookie('token')) {
            return <Redirect to='/' />;
        }
        
        return (
            <div className='LoginPage'>
                <form id='loginForm' onSubmit={this.handleLogin}>
                    <h2>Log to Web App</h2><hr></hr>
                    <div className='FormBody'>
                        <label htmlFor='email'>E-mail</label>
                        <input type='text' name='email' id='email'></input>
                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' id='password'></input>
                        <span>
                            <input type='checkbox' name='remember' id='remember'></input>
                            <label htmlFor='remember'>Remember me</label>
                        </span>
                        <button type='submit'>Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(LoginPage);