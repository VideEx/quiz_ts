import {Form} from "./components/form";
import {Choice} from "./components/choice";
import {Test} from "./components/test";
import {Result} from "./components/result";
// import {RightResult} from "./components/right-result";
import {Auth} from "./services/auth";
import {RouteType} from "./types/route.type";
import {UserInfoType} from "./types/user-info.type";

export class Router {

    readonly profile: HTMLElement | null;
    readonly profileName: HTMLElement | null;
    readonly content: HTMLElement | null;
    readonly pageTitle: HTMLElement | null;

    private routes: RouteType[];

    constructor() {

        this.profile = document.getElementById('profile');
        this.profileName = document.getElementById('profile-name');
        this.content = document.getElementById('content');
        this.pageTitle = document.getElementById('title-page');

        this.routes = [
            {
                route: '#/',
                title: 'Главная',
                template: 'template/index.html',
                load: () => {
                }
                // Стили не подключаю, тк они в едином файле в dist
            },
            {
                route: '#/signup',
                title: 'Регистрация',
                template: 'template/signup.html',
                load: () => {
                    new Form('signup');
                }
                // Стили не подключаю, тк они в едином файле в dist
            },
            {
                route: '#/login',
                title: 'Вход вв систему',
                template: 'template/login.html',
                load: () => {
                    new Form('login');
                }
                // Стили не подключаю, тк они в едином файле в dist
            },
            {
                route: '#/choice',
                title: 'Выбор теста',
                template: 'template/choice.html',
                load: () => {
                    new Choice();
                }
                // Стили не подключаю, тк они в едином файле в dist
            },
            {
                route: '#/test',
                title: 'Тестирование',
                template: 'template/test.html',
                load: () => {
                    new Test();
                }
                // Стили не подключаю, тк они в едином файле в dist
            },
            {
                route: '#/result',
                title: 'Результаты тестирования',
                template: 'template/result.html',
                load: () => {
                    new Result();
                }
                // Стили не подключаю, тк они в едином файле в dist
            },
            // {
            //     route: '#/right-result',
            //     title: 'Подробные результаты',
            //     template: 'template/right-result.html',
            //     load: () => {
            //         new RightResult();
            //     }
            //     // Стили не подключаю, тк они в едином файле в dist
            // },
        ]
    };

    // Т.к. это асинхронная функция, которая ничего не возвращает, в качестве возвращаемого объекта указывается Promice<void>
    public async openRoute(): Promise<void> {

        const urlRoute: string = window.location.hash.split('?')[0];
        if (urlRoute === '#/logout') {
            const result: boolean = await Auth.logout();
            if (result) {
                window.location.href = '#/';
                return;
            }
        }

        // Тут почему-то не подсвечивалась ошибка без undefind
        const newRoute: RouteType | undefined = this.routes.find(item => {
            return item.route === urlRoute;
        });

        if (!newRoute) {
            window.location.href = '#/'
            return;
        }

        if (!this.content || !this.pageTitle || !this.profile || !this.profileName) {
            if (urlRoute === '#/') {
                return
            } else {
                window.location.href = '#/'
                return;
            }
        }
        this.content.innerHTML =
            await fetch(newRoute.template).then(response => response.text());
        this.pageTitle.innerText = newRoute.title;

        const userInfo: UserInfoType | null = Auth.getUserInfo();
        const accessToken: string | null = localStorage.getItem(Auth.accessTokenKey);

        if (userInfo && accessToken) {
            this.profile.style.display = 'flex';
            this.profileName.innerText = userInfo.fullName;
        } else {
            this.profile.style.display = 'none';
        }

        newRoute.load();
    }

}