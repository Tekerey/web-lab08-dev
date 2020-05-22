import Cookies from './cookies';

class AuthService {
    static auth() {
        return fetch('https://localhost:44384/api/test/auth', {
            method: 'GET',
            credentials: 'include'
        })
        .then(
            response => {
                if (!response.ok) {
                    Cookies.deleteCookie('token');
                    Cookies.deleteCookie('email');
                    Cookies.deleteCookie('login');
                    return false;
                    // this.props.history.push('/login');
                } else {
                    return true;
                    // this.content = <WeatherBlock />;
                    // this.setState({isLoaded: true});
                }
            },
            error => {
                console.log(error);
            }
        );
    }
}

export default AuthService;