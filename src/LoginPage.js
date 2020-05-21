import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import './LoginPage.css';

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
        console.log(body);
        fetch('https://localhost:44384/api/test/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        .then(response => {
            // Добавить возможность указывать редирект ссылку
            this.props.history.push('/');
        })
        .catch(error => {
            console.log(error);
        });
    }

    getFormData($form) {
        const array = $form.serializeArray();
        let data = {};
    
        array.forEach(el => {
            data[el.name] = el.value;
        })
    
        return JSON.stringify(data);
    }

    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    render() {
        if (this.getCookie('token')) {
            return <Redirect to='/' />;
        } else {
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
}

export default withRouter(LoginPage);