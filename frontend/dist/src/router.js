"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
var form_1 = require("./components/form");
var choice_1 = require("./components/choice");
var test_1 = require("./components/test");
var result_1 = require("./components/result");
// import {RightResult} from "./components/right-result";
var auth_1 = require("./services/auth");
var Router = /** @class */ (function () {
    function Router() {
        this.profile = document.getElementById('profile');
        this.profileName = document.getElementById('profile-name');
        this.content = document.getElementById('content');
        this.pageTitle = document.getElementById('title-page');
        this.routes = [
            {
                route: '#/',
                title: 'Главная',
                template: 'template/index.html',
                load: function () {
                }
                // Стили не подключаю, тк они в едином файле в dist
            },
            {
                route: '#/signup',
                title: 'Регистрация',
                template: 'template/signup.html',
                load: function () {
                    new form_1.Form('signup');
                }
                // Стили не подключаю, тк они в едином файле в dist
            },
            {
                route: '#/login',
                title: 'Вход вв систему',
                template: 'template/login.html',
                load: function () {
                    new form_1.Form('login');
                }
                // Стили не подключаю, тк они в едином файле в dist
            },
            {
                route: '#/choice',
                title: 'Выбор теста',
                template: 'template/choice.html',
                load: function () {
                    new choice_1.Choice();
                }
                // Стили не подключаю, тк они в едином файле в dist
            },
            {
                route: '#/test',
                title: 'Тестирование',
                template: 'template/test.html',
                load: function () {
                    new test_1.Test();
                }
                // Стили не подключаю, тк они в едином файле в dist
            },
            {
                route: '#/result',
                title: 'Результаты тестирования',
                template: 'template/result.html',
                load: function () {
                    new result_1.Result();
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
        ];
    }
    ;
    // Т.к. это асинхронная функция, которая ничего не возвращает, в качестве возвращаемого объекта указывается Promice<void>
    Router.prototype.openRoute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var urlRoute, result, newRoute, _a, userInfo, accessToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        urlRoute = window.location.hash.split('?')[0];
                        if (!(urlRoute === '#/logout')) return [3 /*break*/, 2];
                        return [4 /*yield*/, auth_1.Auth.logout()];
                    case 1:
                        result = _b.sent();
                        if (result) {
                            window.location.href = '#/';
                            return [2 /*return*/];
                        }
                        _b.label = 2;
                    case 2:
                        newRoute = this.routes.find(function (item) {
                            return item.route === urlRoute;
                        });
                        if (!newRoute) {
                            window.location.href = '#/';
                            return [2 /*return*/];
                        }
                        if (!this.content || !this.pageTitle || !this.profile || !this.profileName) {
                            if (urlRoute === '#/') {
                                return [2 /*return*/];
                            }
                            else {
                                window.location.href = '#/';
                                return [2 /*return*/];
                            }
                        }
                        _a = this.content;
                        return [4 /*yield*/, fetch(newRoute.template).then(function (response) { return response.text(); })];
                    case 3:
                        _a.innerHTML =
                            _b.sent();
                        this.pageTitle.innerText = newRoute.title;
                        userInfo = auth_1.Auth.getUserInfo();
                        accessToken = localStorage.getItem(auth_1.Auth.accessTokenKey);
                        if (userInfo && accessToken) {
                            this.profile.style.display = 'flex';
                            this.profileName.innerText = userInfo.fullName;
                        }
                        else {
                            this.profile.style.display = 'none';
                        }
                        newRoute.load();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Router;
}());
exports.Router = Router;
//# sourceMappingURL=router.js.map