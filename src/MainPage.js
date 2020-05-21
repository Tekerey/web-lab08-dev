import React from 'react';
import {Redirect} from 'react-router-dom';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    render() {
        //Добавить отправку токена на сервер для проверки!!!
        if (!this.getCookie('token')) {
            return <Redirect to='/login' />;
        } else {
            return <h1>Welcome!</h1>;
        }
    }
}