
class AuthService {
    static async auth() {
        const response = await fetch('https://localhost:44384/api/test/auth', {
            method: 'GET',
            credentials: 'include'
        });
        if (response.status == 401) {
            const data = await response.json();
            //this.logout(); // Убрать и делать логаут на стороне сервера?
            return {isAuth: false, reason: data.reason};
        } else if (response.ok) {
            return {isAuth: true};
        } else {
            return {isAuth: false, reason: 'error'};
        }
    }

    static logout() {
        return fetch('https://localhost:44384/api/test/logout', {
            method: 'POST',
            credentials: 'include'
        });
        // Отправка запроса на логаут на сервер? удаление куки на стороне сервера? удаление токена с бд?
        // Куки с токеном должен быть HttpOnly, и удалятся/изменятся на стороне сервера?
    }

    static async login(body) {
        const response = await fetch('https://localhost:44384/api/test/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (response.ok) return {isLogged: true};
        const data = await response.json();
        return {isLogged: false, status: data.status};
    }
}

export default AuthService;