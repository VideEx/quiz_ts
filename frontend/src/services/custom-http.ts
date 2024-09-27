import {Auth} from "./auth";

export class CustomHttp {
    // Тут используем any потому что это кастомный метод для всех запросов на сервер и нет смысла перечислять все типы, которые могут прийти
    public static async request(url: string, method: string = "GET", body: any = null): Promise<any> {
        // Не поняла откуда тут RequestInit взялся и что он вообще значит
        // const params: RequestInit = {
        const params: any = {
            method: method,
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            }
        };

        let token: string | null = localStorage.getItem(Auth.accessTokenKey);

        if (token) {
            params.headers['x-access-token'] = token;
        }

        if (body) {
            params.body = JSON.stringify(body)
        }

        const response: Response = await fetch(url, params);

        if (response.status < 200 || response.status >= 300) {
            if (response.status === 401) {

                const result: boolean = await Auth.processUnauthorizedResponse();

                if (result) {
                    return await this.request(url, method, body)
                } else {
                    return null;
                }
            }

            throw new Error(response.statusText);
        }

        return await response.json();
    }
}