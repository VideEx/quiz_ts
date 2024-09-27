/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./config/config.ts":
/*!**************************!*\
  !*** ./config/config.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = {
    host: 'http://localhost:3000/api'
};


/***/ }),

/***/ "./src/components/choice.ts":
/*!**********************************!*\
  !*** ./src/components/choice.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Choice = void 0;
var custom_http_1 = __webpack_require__(/*! ../services/custom-http */ "./src/services/custom-http.ts");
var config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
var auth_1 = __webpack_require__(/*! ../services/auth */ "./src/services/auth.ts");
var Choice = /** @class */ (function () {
    function Choice() {
        this.quizzes = [];
        this.testResult = null;
        this.init();
    }
    Choice.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1, userInfo, result, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/tests')];
                    case 1:
                        _a.quizzes = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [2 /*return*/];
                    case 3:
                        userInfo = auth_1.Auth.getUserInfo();
                        if (!userInfo) return [3 /*break*/, 7];
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/tests/results?userId=' + userInfo.userId)];
                    case 5:
                        result = _b.sent();
                        if (result) {
                            // Утверждаем тип данных как DefaulpResponseType потому что уверены что в данном случае ошибка может прийти только из него
                            if (result.error !== undefined) {
                                throw new Error(result.message);
                            }
                            this.testResult = result;
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _b.sent();
                        console.log(error_2);
                        return [2 /*return*/];
                    case 7:
                        this.processQuizzes();
                        return [2 /*return*/];
                }
            });
        });
    };
    Choice.prototype.processQuizzes = function () {
        var _this = this;
        var choiceOptions = document.getElementById('choice-options');
        if (this.quizzes && this.quizzes.length > 0 && choiceOptions) {
            this.quizzes.forEach(function (quiz) {
                var that = _this;
                var choiceOptionElement = document.createElement('div');
                choiceOptionElement.className = 'choice__option';
                choiceOptionElement.setAttribute('data-id', quiz.id.toString());
                choiceOptionElement.onclick = function () {
                    that.chooseQuiz(this);
                };
                var choiceOptionTextElement = document.createElement('div');
                choiceOptionTextElement.className = 'choice__option-text';
                choiceOptionTextElement.innerText = quiz.name;
                var choiceOptionArrowElement = document.createElement('div');
                choiceOptionArrowElement.className = 'choice__option-arrow';
                if (_this.testResult) {
                    var result = _this.testResult.find(function (item) { return item.testId === quiz.id; });
                    if (result) {
                        var choiceOptionResultElement = document.createElement('div');
                        choiceOptionResultElement.className = 'choice__option-result';
                        choiceOptionResultElement.innerHTML = '<div>Результат</div><div>' + result.score + '/' + result.total + '</div>';
                        choiceOptionElement.appendChild(choiceOptionResultElement);
                    }
                }
                var choiceOptionImageElement = document.createElement('img');
                choiceOptionImageElement.setAttribute('src', 'img/choice-arrow.png');
                choiceOptionImageElement.setAttribute('alt', 'Выбрать курс');
                choiceOptionArrowElement.appendChild(choiceOptionImageElement);
                choiceOptionElement.appendChild(choiceOptionTextElement);
                choiceOptionElement.appendChild(choiceOptionArrowElement);
                choiceOptions.appendChild(choiceOptionElement);
            });
        }
    };
    Choice.prototype.chooseQuiz = function (element) {
        var dataId = element.getAttribute('data-id');
        if (dataId) {
            location.href = '#/test?id=' + dataId;
        }
    };
    return Choice;
}());
exports.Choice = Choice;


/***/ }),

/***/ "./src/components/form.ts":
/*!********************************!*\
  !*** ./src/components/form.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Form = void 0;
var custom_http_1 = __webpack_require__(/*! ../services/custom-http */ "./src/services/custom-http.ts");
var auth_js_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../services/auth.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var config_js_1 = __importDefault(__webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../config/config.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
var Form = /** @class */ (function () {
    function Form(page) {
        this.processElement = null;
        this.agreeElement = null;
        this.fields = [];
        this.page = page;
        var accessToken = localStorage.getItem(auth_js_1.Auth.accessTokenKey);
        if (accessToken) {
            location.href = '#/choice';
            return;
        }
        this.fields = [
            {
                name: 'email',
                id: 'email',
                element: null,
                regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                valid: false
            },
            {
                name: 'password',
                id: 'password',
                element: null,
                regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                valid: false
            },
        ];
        if (this.page === "signup") {
            this.fields.unshift({
                name: 'name',
                id: 'name',
                element: null,
                regex: /^[А-Я][а-я]+\s*$/,
                valid: false
            }, {
                name: 'lastName',
                id: 'last-name',
                element: null,
                regex: /^[А-Я][а-я]+\s*$/,
                valid: false
            });
        }
        // Сюда присваиваем текущий класс Form
        var that = this;
        this.fields.forEach(function (item) {
            item.element = document.getElementById(item.id);
            if (item.element) {
                item.element.onchange = function () {
                    that.validateField.call(that, item, this);
                };
            }
        });
        this.processElement = document.getElementById('process');
        if (this.processElement) {
            this.processElement.onclick = function () {
                that.processForm();
            };
        }
        if (this.page === "signup") {
            this.agreeElement = document.getElementById('agree');
            if (this.agreeElement) {
                this.agreeElement.onchange = function () {
                    that.validateForm();
                };
            }
        }
    }
    Form.prototype.validateField = function (field, element) {
        if (element.parentNode) {
            if (!element.value || !element.value.match(field.regex)) {
                element.parentNode.style.borderColor = "red";
                field.valid = false;
            }
            else {
                element.parentNode.removeAttribute('style');
                field.valid = true;
            }
        }
        this.validateForm();
    };
    ;
    Form.prototype.validateForm = function () {
        var validForm = this.fields.every(function (item) { return item.valid; });
        var isValid = this.agreeElement ? this.agreeElement.checked && validForm : validForm;
        console.log(validForm);
        if (this.processElement) {
            if (isValid) {
                this.processElement.removeAttribute('disabled');
            }
            else {
                this.processElement.setAttribute('disabled', "");
            }
        }
        return isValid;
    };
    ;
    Form.prototype.processForm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, result, error_1, result, error_2;
            var _a, _b, _c, _d, _e, _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        if (!this.validateForm()) return [3 /*break*/, 7];
                        email = (_b = (_a = this.fields.find(function (item) { return item.name === 'email'; })) === null || _a === void 0 ? void 0 : _a.element) === null || _b === void 0 ? void 0 : _b.value;
                        password = (_d = (_c = this.fields.find(function (item) { return item.name === 'password'; })) === null || _c === void 0 ? void 0 : _c.element) === null || _d === void 0 ? void 0 : _d.value;
                        if (!(this.page === 'signup')) return [3 /*break*/, 4];
                        _j.label = 1;
                    case 1:
                        _j.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_js_1.default.host + '/signup', 'POST', {
                                name: (_f = (_e = this.fields.find(function (item) { return item.name === 'name'; })) === null || _e === void 0 ? void 0 : _e.element) === null || _f === void 0 ? void 0 : _f.value,
                                lastName: (_h = (_g = this.fields.find(function (item) { return item.name === 'lastName'; })) === null || _g === void 0 ? void 0 : _g.element) === null || _h === void 0 ? void 0 : _h.value,
                                email: email,
                                password: password
                            })];
                    case 2:
                        result = _j.sent();
                        if (result) {
                            if (result.error || !result.user) {
                                throw new Error(result.message);
                            }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _j.sent();
                        console.log(error_1);
                        return [2 /*return*/];
                    case 4:
                        _j.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_js_1.default.host + '/login', 'POST', {
                                email: email,
                                password: password,
                            })];
                    case 5:
                        result = _j.sent();
                        if (result) {
                            if (result.error || !result.accessToken || !result.refreshToken || !result.fullName || !result.userId) {
                                throw new Error(result.message);
                            }
                            console.log(result);
                            auth_js_1.Auth.setTokens(result.accessToken, result.refreshToken);
                            // Здесь под почту исправила UserInfoType, добавила необязательное поле email
                            auth_js_1.Auth.setUserInfo({
                                fullName: result.fullName,
                                userId: result.userId,
                                email: email
                            });
                            location.href = '#/choice';
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _j.sent();
                        console.log(error_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return Form;
}());
exports.Form = Form;


/***/ }),

/***/ "./src/components/result.ts":
/*!**********************************!*\
  !*** ./src/components/result.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Result = void 0;
var url_manager_1 = __webpack_require__(/*! ../utilities/url-manager */ "./src/utilities/url-manager.ts");
var custom_http_1 = __webpack_require__(/*! ../services/custom-http */ "./src/services/custom-http.ts");
var config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
var auth_1 = __webpack_require__(/*! ../services/auth */ "./src/services/auth.ts");
var Result = /** @class */ (function () {
    function Result() {
        this.routeParams = url_manager_1.UrlManager.getQueryParams();
        var that = this;
        var rightResultLink = document.getElementById('show-right-result');
        if (rightResultLink) {
            rightResultLink.onclick = function () {
                console.log(that.routeParams);
                location.href = '#/right-result?id=' + that.routeParams.id;
            };
        }
        this.init();
    }
    Result.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo, result, resultScoreElement, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userInfo = auth_1.Auth.getUserInfo();
                        if (!userInfo) {
                            location.href = '#/';
                            return [2 /*return*/];
                        }
                        if (!this.routeParams.id) return [3 /*break*/, 4];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/tests/' + this.routeParams.id + '/result?userId=' + userInfo.userId)];
                    case 2:
                        result = _b.sent();
                        if (result) {
                            if (result.error !== undefined) {
                                throw new Error(result.message);
                            }
                            ;
                            resultScoreElement = document.getElementById('result-score');
                            if (resultScoreElement) {
                                resultScoreElement.innerText = result.score + '/' + result.total;
                            }
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        console.log(error);
                        return [3 /*break*/, 4];
                    case 4:
                        location.href = '#/';
                        return [2 /*return*/];
                }
            });
        });
    };
    return Result;
}());
exports.Result = Result;


/***/ }),

/***/ "./src/components/right-result.ts":
/*!****************************************!*\
  !*** ./src/components/right-result.ts ***!
  \****************************************/
/***/ (() => {


// import {Auth} from "../services/auth.js";
// import {UrlManager} from "../utilities/url-manager.js";
// import {CustomHttp} from "../services/custom-http";
// import config from "../../config/config.js";
//
// export class RightResult {
//
//     constructor() {
//         this.testInfo = null;
//         this.testRightAnswer = null;
//         this.userResult = null;
//         this.routeParams = UrlManager.getQueryParams();
//
//         let that = this;
//
//         const rightResultLink = document.getElementById('show-result');
//
//         const resulInfo = document.getElementById('resul-info');
//         resulInfo.innerHTML = '<div class="show-result__info" id="resul-info">Тест выполнил <span class="show-result__span">' +
//             Auth.getUserInfo().fullName + ', ' + Auth.getUserInfo().email
//             + '</span></div>'
//
//         rightResultLink.onclick = function () {
//             location.href = '#/result?id=' + that.routeParams.id;
//         }
//
//         // Запрос на получение данных
//         // const xhr = new XMLHttpRequest();
//         // xhr.open('GET', 'https://testologia.ru/get-quiz-right?id=' + testId, false)
//         // xhr.send();
//         //
//         // if (xhr.status === 200 && xhr.responseText) {
//         //     try {
//         //         this.testRightAnswer = JSON.parse(xhr.responseText);
//         //     } catch (e) {
//         //         location.href = '#/';
//         //     }
//         //     // this.showResult();
//         // } else {
//         //     location.href = '#/';
//         // }
//         //
//         //
//         // if (testId) {
//         //     const xhr = new XMLHttpRequest();
//         //     xhr.open('GET', 'https://testologia.ru/get-quiz?id=' + testId, false)
//         //     xhr.send();
//         //
//         //     if (xhr.status === 200 && xhr.responseText) {
//         //         try {
//         //             this.testInfo = JSON.parse(xhr.responseText);
//         //         } catch (e) {
//         //             location.href = '#/';
//         //         }
//         //         this.showResult();
//         //     } else {
//         //         location.href = '#/';
//         //     }
//         // } else {
//         //     location.href = '#/';
//         // }
//         // console.log(this.testInfo)
//
//         this.init();
//     }
//
//     async init() {
//         const userInfo = Auth.getUserInfo();
//         if (!userInfo) {
//             location.href = '#/'
//         }
//
//         if (this.routeParams.id) {
//             try {
//                 const result = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id + '/result/details?userId=' + userInfo.userId);
//
//                 if (result) {
//                     if (result.error) {
//                         throw new Error();
//                     }
//
//                     console.log(result)
//
//                     this.showResult(result);
//                     return;
//                 }
//             } catch {
//                 // console.log(error)
//             }
//         }
//         // location.href = '#/';
//     }
//
//     showResult(obj) {
//         // console.log('Результат - ' + obj.questions)
//         // console.log('Результат - ' + obj.test.questions)
//
//         let currentTest = obj.test.questions;
//         console.log(currentTest);
//
//         let testItems = document.getElementById('test-items');
//
//         let i = 0;
//         // Отрисовываем вопросы
//         currentTest.forEach(quest => {
//             const testItem = document.createElement('div');
//             testItem.className = 'show-result__item';
//
//
//
//             const questTitle = document.createElement('div');
//             questTitle.className = 'show-result__item-title';
//             questTitle.innerHTML = '<span class="show-result__span">Вопрос ' + (i++ + 1) + ':</span> ' + quest.question;
//
//             const testList = document.createElement('ul');
//             testList.className = 'show-result__list';
//
//             let currentAnswersArray = quest.answers;
//
//             currentAnswersArray.forEach(answer => {
//                 const testListItem = document.createElement('li');
//                 testListItem.classList = 'show-result__list-item';
//                 testListItem.innerText = answer.answer;
//
//                 console.log('Наш вопрос - ' + JSON.stringify(answer.answer))
//
//                 if (answer.correct === true) {
//                     testListItem.classList.add('show-result__true');
//                 } else if (answer.correct === false) {
//                     testListItem.classList.add('show-result__false');
//                 }
//
//                 testList.appendChild(testListItem);
//             })
//
//             testItem.appendChild(questTitle);
//             testItem.appendChild(testList);
//             testItems.appendChild(testItem)
//         });
//
//         // for (let i = 0; i < obj.test.questions; i++) {
//         //
//         //     // Здесь мы работаем с определенным вопросом
//         //
//         //     let currentQuest = obj.questions[i];
//         //     console.log(currentQuest);
//         // const chosenAnswerId = this.userResult[i].chosenAnswerId;
//         // const rightAnswerId = this.testRightAnswer[i];
//
//         // const testItem = document.createElement('div');
//         // testItem.className = 'show-result__item';
//         //
//         // const questTitle = document.createElement('div');
//         // questTitle.className = 'show-result__item-title';
//         // questTitle.innerHTML = '<span class="show-result__span">Вопрос ' + (i + 1) + ':</span> ' + currentQuest.question;
//         //
//         // const testList = document.createElement('ul');
//         // testList.className = 'show-result__list';
//         //
//         // for (let j = 0; j < currentQuest.answers.length; j++) {
//         //     // Здесь мы работаем с определенным ответом на вопрос
//         //
//         //     const currentAnswerId = currentQuest.answers[j].id;
//         //     // console.log('Текущий id ответа- ' + currentAnswerId)
//         //     // console.log('Выбранный id ответа- ' + chosenAnswerId)
//         //     // console.log('Правильный id ответа- ' + rightAnswerId)
//         //
//         //     const testListItem = document.createElement('li');
//         //     testListItem.classList = 'show-result__list-item';
//         //     testListItem.innerText = currentQuest.answers[j].answer;
//         //     if (chosenAnswerId === currentAnswerId && chosenAnswerId === rightAnswerId) {
//         //         testListItem.classList.add('show-result__true');
//         //     } else if (chosenAnswerId === currentAnswerId && chosenAnswerId !== rightAnswerId) {
//         //         testListItem.classList.add('show-result__false');
//         //     }
//         //
//         //     testList.appendChild(testListItem);
//         // }
//
//         // testItem.appendChild(questTitle);
//         // testItem.appendChild(testList);
//         // testItems.appendChild(testItem)
//         // }
//     }
// }


/***/ }),

/***/ "./src/components/test.ts":
/*!********************************!*\
  !*** ./src/components/test.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Test = void 0;
var url_manager_1 = __webpack_require__(/*! ../utilities/url-manager */ "./src/utilities/url-manager.ts");
var custom_http_1 = __webpack_require__(/*! ../services/custom-http */ "./src/services/custom-http.ts");
var config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
var auth_1 = __webpack_require__(/*! ../services/auth */ "./src/services/auth.ts");
var action_test_type_1 = __webpack_require__(/*! ../types/action-test.type */ "./src/types/action-test.type.ts");
var Test = /** @class */ (function () {
    function Test() {
        this.progressBarElement = null;
        this.nextButtonElement = null;
        this.passButtonElement = null;
        this.prevButtonElement = null;
        this.questionTitleElement = null;
        this.optionsElement = null;
        this.currentQuestionIndex = 1;
        this.testId = 0;
        this.interval = 0;
        this.nextButtonElement = null;
        this.passButtonElement = null;
        this.prevButtonElement = null;
        this.quiz = null;
        this.questionTitleElement = null;
        this.optionsElement = null;
        this.currentQuestionIndex = 1;
        this.testId = 0;
        this.routeParams = url_manager_1.UrlManager.getQueryParams();
        this.init();
    }
    Test.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.routeParams.id) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/tests/' + this.routeParams.id)];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            if (result.error) {
                                throw new Error(result.message);
                            }
                            this.quiz = result;
                            this.startQuiz();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    Test.prototype.startQuiz = function () {
        // console.log(this.quiz);
        if (!this.quiz)
            return;
        this.questionTitleElement = document.getElementById('title');
        this.progressBarElement = document.getElementById('progress-bar');
        // console.log(this.progressBarElement)
        this.optionsElement = document.getElementById('options');
        this.nextButtonElement = document.getElementById('next');
        if (this.nextButtonElement) {
            this.nextButtonElement.onclick = this.move.bind(this, action_test_type_1.ActionTestType.next);
        }
        this.passButtonElement = document.getElementById('pass');
        if (this.passButtonElement) {
            this.passButtonElement.onclick = this.move.bind(this, action_test_type_1.ActionTestType.pass);
        }
        this.prevButtonElement = document.getElementById('prev');
        if (this.prevButtonElement) {
            this.prevButtonElement.onclick = this.move.bind(this, action_test_type_1.ActionTestType.prev);
        }
        var preTitleBtn = document.getElementById('pre-title');
        if (preTitleBtn) {
            preTitleBtn.innerText = this.quiz.name;
        }
        ;
        this.prepareProgressBar();
        this.showQuest();
        var timerElement = document.getElementById('timer');
        var second = 59;
        this.interval = window.setInterval(function () {
            second--;
            var that = this;
            if (timerElement) {
                timerElement.innerText = second.toString();
            }
            if (second === 0) {
                clearInterval(that.interval);
                that.complete();
            }
        }.bind(this), 1000);
    };
    ;
    Test.prototype.prepareProgressBar = function () {
        if (!this.quiz)
            return;
        for (var i = 0; i < this.quiz.questions.length; i++) {
            var itemElement = document.createElement('div');
            itemElement.className = 'test__progress-bar-item ' + (i === 0 ? 'test__active' : '');
            var itemCircleElement = document.createElement('div');
            itemCircleElement.className = 'test__progress-bar-circle';
            var itemTextElement = document.createElement('div');
            itemTextElement.className = 'test__progress-bar-text';
            itemTextElement.innerText = 'Вопрос ' + (i + 1);
            itemElement.appendChild(itemCircleElement);
            itemElement.appendChild(itemTextElement);
            if (this.progressBarElement) {
                this.progressBarElement.appendChild(itemElement);
            }
            // console.log(this.progressBarElement)
            // console.log(1)
        }
    };
    ;
    Test.prototype.showQuest = function () {
        var _this = this;
        if (!this.quiz)
            return;
        var activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
        if (this.questionTitleElement) {
            this.questionTitleElement.innerHTML = '<span class="test__span">Вопрос ' + this.currentQuestionIndex
                + ':</span> ' + activeQuestion.question;
        }
        if (this.optionsElement) {
            this.optionsElement.innerHTML = '';
        }
        var that = this;
        var chosenOption = this.userResult.find(function (item) { return item.questionId === activeQuestion.id; });
        activeQuestion.answers.forEach(function (item) {
            var testOption = document.createElement('div');
            testOption.className = 'test__option';
            var inputId = 'answer-' + item.id;
            var testInput = document.createElement('input');
            testInput.className = 'option-answer';
            testInput.setAttribute('id', inputId);
            testInput.setAttribute('type', 'radio');
            testInput.setAttribute('name', 'answer');
            testInput.setAttribute('value', item.id.toString());
            if (chosenOption && chosenOption.chosenAnswerId === item.id) {
                testInput.setAttribute('checked', 'true');
            }
            testInput.onchange = function () {
                that.chooseAnswer();
            };
            var testLabel = document.createElement('label');
            testLabel.setAttribute('for', inputId);
            testLabel.innerText = item.answer;
            testOption.appendChild(testInput);
            testOption.appendChild(testLabel);
            if (_this.optionsElement) {
                _this.optionsElement.appendChild(testOption);
            }
        });
        if (this.nextButtonElement) {
            if (chosenOption && chosenOption.chosenAnswerId) {
                this.nextButtonElement.removeAttribute('disabled');
            }
            else {
                this.nextButtonElement.setAttribute('disabled', 'true');
            }
        }
        if (this.nextButtonElement) {
            if (this.currentQuestionIndex === this.quiz.questions.length) {
                this.nextButtonElement.innerText = 'Завершить';
            }
            else {
                this.nextButtonElement.innerText = 'Дальше';
            }
        }
        if (this.prevButtonElement) {
            if (this.currentQuestionIndex > 1) {
                this.prevButtonElement.removeAttribute('disabled');
            }
            else {
                this.prevButtonElement.setAttribute('disabled', 'true');
            }
        }
    };
    ;
    Test.prototype.chooseAnswer = function () {
        if (this.nextButtonElement) {
            this.nextButtonElement.removeAttribute('disabled');
        }
    };
    ;
    Test.prototype.move = function (action) {
        var _this = this;
        if (!this.quiz)
            return;
        var activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
        var chosenAnswer = Array.from(document.getElementsByClassName('option-answer')).find(function (item) {
            return item.checked;
        });
        var chosenAnswerId = null;
        if (chosenAnswer && chosenAnswer.value) {
            chosenAnswerId = Number(chosenAnswer.value);
        }
        var existingResult = this.userResult.find(function (item) {
            return item.questionId === activeQuestion.id;
        });
        if (chosenAnswerId) {
            if (existingResult) {
                existingResult.chosenAnswerId = chosenAnswerId;
            }
            else {
                this.userResult.push({
                    questionId: activeQuestion.id,
                    chosenAnswerId: chosenAnswerId
                });
            }
        }
        if (action === action_test_type_1.ActionTestType.next || action === action_test_type_1.ActionTestType.pass) {
            this.currentQuestionIndex++;
        }
        else {
            this.currentQuestionIndex--;
        }
        if (this.currentQuestionIndex > this.quiz.questions.length) {
            clearInterval(this.interval);
            this.complete();
            return;
        }
        if (this.progressBarElement) {
            Array.from(this.progressBarElement.children).forEach(function (item, index) {
                var currentItemIndex = index + 1;
                item.classList.remove('test__complete');
                item.classList.remove('test__active');
                if (currentItemIndex === _this.currentQuestionIndex) {
                    item.classList.add('test__active');
                }
                else if (currentItemIndex < _this.currentQuestionIndex) {
                    item.classList.add('test__complete');
                }
            });
        }
        this.showQuest();
    };
    ;
    Test.prototype.complete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userInfo = auth_1.Auth.getUserInfo();
                        if (!userInfo) {
                            location.href = '#/';
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/tests/' + this.routeParams.id + '/pass', 'POST', {
                                userId: userInfo.userId,
                                results: this.userResult
                            })];
                    case 2:
                        result = _b.sent();
                        if (result) {
                            if (result.error !== undefined) {
                                throw new Error(result.message);
                            }
                            ;
                            location.href = '#/result?id=' + this.routeParams.id;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        console.log(error);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Test;
}());
exports.Test = Test;


/***/ }),

/***/ "./src/router.ts":
/*!***********************!*\
  !*** ./src/router.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Router = void 0;
var form_1 = __webpack_require__(/*! ./components/form */ "./src/components/form.ts");
var choice_1 = __webpack_require__(/*! ./components/choice */ "./src/components/choice.ts");
var test_1 = __webpack_require__(/*! ./components/test */ "./src/components/test.ts");
var result_1 = __webpack_require__(/*! ./components/result */ "./src/components/result.ts");
var right_result_1 = __webpack_require__(/*! ./components/right-result */ "./src/components/right-result.ts");
var auth_1 = __webpack_require__(/*! ./services/auth */ "./src/services/auth.ts");
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
            {
                route: '#/right-result',
                title: 'Подробные результаты',
                template: 'template/right-result.html',
                load: function () {
                    new right_result_1.RightResult();
                }
                // Стили не подключаю, тк они в едином файле в dist
            },
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


/***/ }),

/***/ "./src/services/auth.ts":
/*!******************************!*\
  !*** ./src/services/auth.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Auth = void 0;
var config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
var Auth = /** @class */ (function () {
    function Auth() {
    }
    Auth.processUnauthorizedResponse = function () {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refreshToken = localStorage.getItem(this.refreshTokenKey);
                        if (!refreshToken) return [3 /*break*/, 3];
                        return [4 /*yield*/, fetch(config_1.default.host + '/refresh', {
                                method: 'POST',
                                headers: {
                                    'Content-type': 'application/json',
                                    'Accept': 'application/json',
                                },
                                body: JSON.stringify({ refreshToken: refreshToken })
                            })];
                    case 1:
                        response = _a.sent();
                        if (!(response && response.status === 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        result = _a.sent();
                        if (result && !result.error && result.accessToken && result.refreshToken) {
                            this.setTokens(result.accessToken, result.refreshToken);
                            return [2 /*return*/, true];
                        }
                        _a.label = 3;
                    case 3:
                        this.removeTokens();
                        location.href = '#/';
                        return [2 /*return*/, false];
                }
            });
        });
    };
    Auth.setTokens = function (accessToken, refreshToken) {
        localStorage.setItem(this.accessTokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
    };
    Auth.removeTokens = function () {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
    };
    Auth.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refreshToken = localStorage.getItem(this.refreshTokenKey);
                        if (!refreshToken) return [3 /*break*/, 3];
                        return [4 /*yield*/, fetch(config_1.default.host + '/logout', {
                                method: 'POST',
                                headers: {
                                    'Content-type': 'application/json',
                                    'Accept': 'application/json',
                                },
                                body: JSON.stringify({ refreshToken: refreshToken })
                            })];
                    case 1:
                        response = _a.sent();
                        if (!(response && response.status === 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        result = _a.sent();
                        console.log(result);
                        if (result && !result.error) {
                            Auth.removeTokens();
                            localStorage.removeItem(this.userInfoKey);
                            return [2 /*return*/, true];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    Auth.setUserInfo = function (info) {
        localStorage.setItem(this.userInfoKey, JSON.stringify(info));
    };
    Auth.getUserInfo = function () {
        var userInfo = localStorage.getItem('userInfo');
        console.log(userInfo);
        if (userInfo) {
            return JSON.parse(userInfo);
        }
        return null;
    };
    Auth.accessTokenKey = 'accessToken';
    Auth.refreshTokenKey = 'refreshToken';
    Auth.userInfoKey = 'userInfo';
    return Auth;
}());
exports.Auth = Auth;


/***/ }),

/***/ "./src/services/custom-http.ts":
/*!*************************************!*\
  !*** ./src/services/custom-http.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomHttp = void 0;
var auth_1 = __webpack_require__(/*! ./auth */ "./src/services/auth.ts");
var CustomHttp = /** @class */ (function () {
    function CustomHttp() {
    }
    // Тут используем any потому что это кастомный метод для всех запросов на сервер и нет смысла перечислять все типы, которые могут прийти
    CustomHttp.request = function (url_1) {
        return __awaiter(this, arguments, void 0, function (url, method, body) {
            var params, token, response, result;
            if (method === void 0) { method = "GET"; }
            if (body === void 0) { body = null; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            method: method,
                            headers: {
                                'Content-type': 'application/json',
                                'Accept': 'application/json',
                            }
                        };
                        token = localStorage.getItem(auth_1.Auth.accessTokenKey);
                        if (token) {
                            params.headers['x-access-token'] = token;
                        }
                        if (body) {
                            params.body = JSON.stringify(body);
                        }
                        return [4 /*yield*/, fetch(url, params)];
                    case 1:
                        response = _a.sent();
                        if (!(response.status < 200 || response.status >= 300)) return [3 /*break*/, 6];
                        if (!(response.status === 401)) return [3 /*break*/, 5];
                        return [4 /*yield*/, auth_1.Auth.processUnauthorizedResponse()];
                    case 2:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.request(url, method, body)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [2 /*return*/, null];
                    case 5: throw new Error(response.statusText);
                    case 6: return [4 /*yield*/, response.json()];
                    case 7: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return CustomHttp;
}());
exports.CustomHttp = CustomHttp;


/***/ }),

/***/ "./src/types/action-test.type.ts":
/*!***************************************!*\
  !*** ./src/types/action-test.type.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActionTestType = void 0;
var ActionTestType;
(function (ActionTestType) {
    ActionTestType["next"] = "next";
    ActionTestType["pass"] = "pass";
    ActionTestType["prev"] = "prev";
})(ActionTestType || (exports.ActionTestType = ActionTestType = {}));


/***/ }),

/***/ "./src/utilities/url-manager.ts":
/*!**************************************!*\
  !*** ./src/utilities/url-manager.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UrlManager = void 0;
var UrlManager = /** @class */ (function () {
    function UrlManager() {
    }
    UrlManager.getQueryParams = function () {
        var qs = document.location.hash.split('+').join(' ');
        var params = {}, tokens, re = /[?&]([^=]+)=([^&]*)/g;
        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
        return params;
    };
    return UrlManager;
}());
exports.UrlManager = UrlManager;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var router_1 = __webpack_require__(/*! ./router */ "./src/router.ts");
var App = /** @class */ (function () {
    function App() {
        this.router = new router_1.Router();
        window.addEventListener('DOMContentLoaded', this.handleRouterChanging.bind(this));
        window.addEventListener('popstate', this.handleRouterChanging.bind(this));
    }
    App.prototype.handleRouterChanging = function () {
        this.router.openRoute();
    };
    return App;
}());
(new App());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUUsQ0FBQztRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUM7QUFkWSxnQ0FBVTs7Ozs7OztVQ0Z2QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7Ozs7QUN0QkEsc0VBQStCO0FBRS9CO0lBSUk7UUFFSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7UUFDM0IsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsRixNQUFNLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRU8sa0NBQW9CLEdBQTVCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBQ0wsVUFBQztBQUFELENBQUM7QUFFRCxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3F1aXogdHMvLi9jb25maWcvY29uZmlnLnRzIiwid2VicGFjazovL3F1aXogdHMvLi9zcmMvY29tcG9uZW50cy9jaG9pY2UudHMiLCJ3ZWJwYWNrOi8vcXVpeiB0cy8uL3NyYy9jb21wb25lbnRzL2Zvcm0udHMiLCJ3ZWJwYWNrOi8vcXVpeiB0cy8uL3NyYy9jb21wb25lbnRzL3Jlc3VsdC50cyIsIndlYnBhY2s6Ly9xdWl6IHRzLy4vc3JjL2NvbXBvbmVudHMvcmlnaHQtcmVzdWx0LnRzIiwid2VicGFjazovL3F1aXogdHMvLi9zcmMvY29tcG9uZW50cy90ZXN0LnRzIiwid2VicGFjazovL3F1aXogdHMvLi9zcmMvcm91dGVyLnRzIiwid2VicGFjazovL3F1aXogdHMvLi9zcmMvc2VydmljZXMvYXV0aC50cyIsIndlYnBhY2s6Ly9xdWl6IHRzLy4vc3JjL3NlcnZpY2VzL2N1c3RvbS1odHRwLnRzIiwid2VicGFjazovL3F1aXogdHMvLi9zcmMvdHlwZXMvYWN0aW9uLXRlc3QudHlwZS50cyIsIndlYnBhY2s6Ly9xdWl6IHRzLy4vc3JjL3V0aWxpdGllcy91cmwtbWFuYWdlci50cyIsIndlYnBhY2s6Ly9xdWl6IHRzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3F1aXogdHMvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGhvc3Q6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpJ1xyXG59IiwiaW1wb3J0IHtDdXN0b21IdHRwfSBmcm9tIFwiLi4vc2VydmljZXMvY3VzdG9tLWh0dHBcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vLi4vY29uZmlnL2NvbmZpZ1wiO1xyXG5pbXBvcnQge0F1dGh9IGZyb20gXCIuLi9zZXJ2aWNlcy9hdXRoXCI7XHJcbmltcG9ydCB7UXVpekxpc3RUeXBlfSBmcm9tIFwiLi4vdHlwZXMvcXVpei1saXN0LnR5cGVcIjtcclxuaW1wb3J0IHtUZXN0UmVzdWx0VHlwZX0gZnJvbSBcIi4uL3R5cGVzL3Rlc3QtcmVzdWx0LnR5cGVcIjtcclxuaW1wb3J0IHtVc2VySW5mb1R5cGV9IGZyb20gXCIuLi90eXBlcy91c2VyLWluZm8udHlwZVwiO1xyXG5pbXBvcnQge0RlZmF1bHRSZXNwb25zZVR5cGV9IGZyb20gXCIuLi90eXBlcy9kZWZhdWx0LXJlc3BvbnNlLnR5cGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDaG9pY2Uge1xyXG4gICAgcHJpdmF0ZSBxdWl6emVzOiBRdWl6TGlzdFR5cGVbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSB0ZXN0UmVzdWx0OiBUZXN0UmVzdWx0VHlwZVtdIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGluaXQoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5xdWl6emVzID0gYXdhaXQgQ3VzdG9tSHR0cC5yZXF1ZXN0KGNvbmZpZy5ob3N0ICsgJy90ZXN0cycpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1c2VySW5mbzogVXNlckluZm9UeXBlIHwgbnVsbCA9IEF1dGguZ2V0VXNlckluZm8oKTtcclxuXHJcbiAgICAgICAgaWYgKHVzZXJJbmZvKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQ6IFRlc3RSZXN1bHRUeXBlIHwgRGVmYXVsdFJlc3BvbnNlVHlwZSA9IGF3YWl0IEN1c3RvbUh0dHAucmVxdWVzdChjb25maWcuaG9zdCArICcvdGVzdHMvcmVzdWx0cz91c2VySWQ9JyArIHVzZXJJbmZvLnVzZXJJZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vINCj0YLQstC10YDQttC00LDQtdC8INGC0LjQvyDQtNCw0L3QvdGL0YUg0LrQsNC6IERlZmF1bHBSZXNwb25zZVR5cGUg0L/QvtGC0L7QvNGDINGH0YLQviDRg9Cy0LXRgNC10L3RiyDRh9GC0L4g0LIg0LTQsNC90L3QvtC8INGB0LvRg9GH0LDQtSDQvtGI0LjQsdC60LAg0LzQvtC20LXRgiDQv9GA0LjQudGC0Lgg0YLQvtC70YzQutC+INC40Lcg0L3QtdCz0L5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoKHJlc3VsdCBhcyBEZWZhdWx0UmVzcG9uc2VUeXBlKS5lcnJvciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigocmVzdWx0IGFzIERlZmF1bHRSZXNwb25zZVR5cGUpLm1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlc3RSZXN1bHQgPSByZXN1bHQgYXMgVGVzdFJlc3VsdFR5cGVbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJvY2Vzc1F1aXp6ZXMoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwcm9jZXNzUXVpenplcygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBjaG9pY2VPcHRpb25zOiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hvaWNlLW9wdGlvbnMnKTtcclxuICAgICAgICBpZiAodGhpcy5xdWl6emVzICYmIHRoaXMucXVpenplcy5sZW5ndGggPiAwICYmIGNob2ljZU9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdGhpcy5xdWl6emVzLmZvckVhY2goKHF1aXo6IFF1aXpMaXN0VHlwZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGhhdDogQ2hvaWNlID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNob2ljZU9wdGlvbkVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgY2hvaWNlT3B0aW9uRWxlbWVudC5jbGFzc05hbWUgPSAnY2hvaWNlX19vcHRpb24nO1xyXG4gICAgICAgICAgICAgICAgY2hvaWNlT3B0aW9uRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCBxdWl6LmlkLnRvU3RyaW5nKCkpXHJcblxyXG4gICAgICAgICAgICAgICAgY2hvaWNlT3B0aW9uRWxlbWVudC5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY2hvb3NlUXVpeig8SFRNTEVsZW1lbnQ+dGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hvaWNlT3B0aW9uVGV4dEVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgY2hvaWNlT3B0aW9uVGV4dEVsZW1lbnQuY2xhc3NOYW1lID0gJ2Nob2ljZV9fb3B0aW9uLXRleHQnO1xyXG4gICAgICAgICAgICAgICAgY2hvaWNlT3B0aW9uVGV4dEVsZW1lbnQuaW5uZXJUZXh0ID0gcXVpei5uYW1lO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGNob2ljZU9wdGlvbkFycm93RWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBjaG9pY2VPcHRpb25BcnJvd0VsZW1lbnQuY2xhc3NOYW1lID0gJ2Nob2ljZV9fb3B0aW9uLWFycm93JztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50ZXN0UmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0OiBUZXN0UmVzdWx0VHlwZSB8IHVuZGVmaW5lZCA9IHRoaXMudGVzdFJlc3VsdC5maW5kKGl0ZW0gPT4gaXRlbS50ZXN0SWQgPT09IHF1aXouaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hvaWNlT3B0aW9uUmVzdWx0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaG9pY2VPcHRpb25SZXN1bHRFbGVtZW50LmNsYXNzTmFtZSA9ICdjaG9pY2VfX29wdGlvbi1yZXN1bHQnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaG9pY2VPcHRpb25SZXN1bHRFbGVtZW50LmlubmVySFRNTCA9ICc8ZGl2PtCg0LXQt9GD0LvRjNGC0LDRgjwvZGl2PjxkaXY+JyArIHJlc3VsdC5zY29yZSArICcvJyArIHJlc3VsdC50b3RhbCArICc8L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaG9pY2VPcHRpb25FbGVtZW50LmFwcGVuZENoaWxkKGNob2ljZU9wdGlvblJlc3VsdEVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGNob2ljZU9wdGlvbkltYWdlRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgICAgICAgICBjaG9pY2VPcHRpb25JbWFnZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdzcmMnLCAnaW1nL2Nob2ljZS1hcnJvdy5wbmcnKTtcclxuICAgICAgICAgICAgICAgIGNob2ljZU9wdGlvbkltYWdlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FsdCcsICfQktGL0LHRgNCw0YLRjCDQutGD0YDRgScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNob2ljZU9wdGlvbkFycm93RWxlbWVudC5hcHBlbmRDaGlsZChjaG9pY2VPcHRpb25JbWFnZUVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgY2hvaWNlT3B0aW9uRWxlbWVudC5hcHBlbmRDaGlsZChjaG9pY2VPcHRpb25UZXh0RWxlbWVudClcclxuICAgICAgICAgICAgICAgIGNob2ljZU9wdGlvbkVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hvaWNlT3B0aW9uQXJyb3dFbGVtZW50KVxyXG5cclxuICAgICAgICAgICAgICAgIGNob2ljZU9wdGlvbnMuYXBwZW5kQ2hpbGQoY2hvaWNlT3B0aW9uRWxlbWVudCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hvb3NlUXVpeihlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGRhdGFJZDogc3RyaW5nIHwgbnVsbCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XHJcblxyXG4gICAgICAgIGlmIChkYXRhSWQpIHtcclxuICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcjL3Rlc3Q/aWQ9JyArIGRhdGFJZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtDdXN0b21IdHRwfSBmcm9tIFwiLi4vc2VydmljZXMvY3VzdG9tLWh0dHBcIjtcclxuaW1wb3J0IHtBdXRofSBmcm9tIFwiLi4vc2VydmljZXMvYXV0aC5qc1wiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi8uLi9jb25maWcvY29uZmlnLmpzXCI7XHJcbmltcG9ydCB7Rm9ybUZpZWxkVHlwZX0gZnJvbSBcIi4uL3R5cGVzL2Zvcm0tZmllbGQudHlwZVwiO1xyXG5pbXBvcnQgKiBhcyBQcm9jZXNzIGZyb20gXCJwcm9jZXNzXCI7XHJcbmltcG9ydCB7U2lnbnVwUmVzcG9uc2VUeXBlfSBmcm9tIFwiLi4vdHlwZXMvc2lnbnVwLXJlc3BvbnNlLnR5cGVcIjtcclxuaW1wb3J0IHtMb2dpblJlc3BvbnNlVHlwZX0gZnJvbSBcIi4uL3R5cGVzL2xvZ2luLXJlc3BvbnNlLnR5cGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBGb3JtIHtcclxuICAgIHJlYWRvbmx5IHByb2Nlc3NFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xyXG4gICAgcmVhZG9ubHkgYWdyZWVFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbCA9IG51bGw7XHJcbiAgICByZWFkb25seSBwYWdlOiAnc2lnbnVwJyB8ICdsb2dpbic7XHJcbiAgICBwcml2YXRlIGZpZWxkczogRm9ybUZpZWxkVHlwZVtdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocGFnZTogJ3NpZ251cCcgfCAnbG9naW4nKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlID0gcGFnZTtcclxuXHJcbiAgICAgICAgY29uc3QgYWNjZXNzVG9rZW46IHN0cmluZyB8IG51bGwgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShBdXRoLmFjY2Vzc1Rva2VuS2V5KTtcclxuICAgICAgICBpZiAoYWNjZXNzVG9rZW4pIHtcclxuICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcjL2Nob2ljZSc7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZmllbGRzID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnZW1haWwnLFxyXG4gICAgICAgICAgICAgICAgaWQ6ICdlbWFpbCcsXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9eXFx3KyhbXFwuLV0/XFx3KykqQFxcdysoW1xcLi1dP1xcdyspKihcXC5cXHd7MiwzfSkrJC8sXHJcbiAgICAgICAgICAgICAgICB2YWxpZDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ3Bhc3N3b3JkJyxcclxuICAgICAgICAgICAgICAgIGlkOiAncGFzc3dvcmQnLFxyXG4gICAgICAgICAgICAgICAgZWxlbWVudDogbnVsbCxcclxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXig/PS4qW0EtWmEtel0pKD89LipcXGQpW0EtWmEtelxcZF17OCx9JC8sXHJcbiAgICAgICAgICAgICAgICB2YWxpZDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wYWdlID09PSBcInNpZ251cFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLnVuc2hpZnQoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ25hbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnbmFtZScsXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICByZWdleDogL15b0JAt0K9dW9CwLdGPXStcXHMqJC8sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdsYXN0TmFtZScsXHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdsYXN0LW5hbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9eW9CQLdCvXVvQsC3Rj10rXFxzKiQvLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINCh0Y7QtNCwINC/0YDQuNGB0LLQsNC40LLQsNC10Lwg0YLQtdC60YPRidC40Lkg0LrQu9Cw0YHRgSBGb3JtXHJcbiAgICAgICAgY29uc3QgdGhhdDogRm9ybSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuZm9yRWFjaCgoaXRlbTogRm9ybUZpZWxkVHlwZSkgPT4ge1xyXG4gICAgICAgICAgICBpdGVtLmVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpdGVtLmlkKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5lbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmVsZW1lbnQub25jaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC52YWxpZGF0ZUZpZWxkLmNhbGwodGhhdCwgaXRlbSwgPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcylcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9jZXNzJyk7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvY2Vzc0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzRWxlbWVudC5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wcm9jZXNzRm9ybSgpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBhZ2UgPT09IFwic2lnbnVwXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5hZ3JlZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdyZWUnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hZ3JlZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWdyZWVFbGVtZW50Lm9uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudmFsaWRhdGVGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGVGaWVsZChmaWVsZDogRm9ybUZpZWxkVHlwZSwgZWxlbWVudDogSFRNTElucHV0RWxlbWVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChlbGVtZW50LnBhcmVudE5vZGUpIHtcclxuICAgICAgICAgICAgaWYgKCFlbGVtZW50LnZhbHVlIHx8ICFlbGVtZW50LnZhbHVlLm1hdGNoKGZpZWxkLnJlZ2V4KSkge1xyXG4gICAgICAgICAgICAgICAgKGVsZW1lbnQucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYm9yZGVyQ29sb3IgPSBcInJlZFwiO1xyXG4gICAgICAgICAgICAgICAgZmllbGQudmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIChlbGVtZW50LnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQpLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgIGZpZWxkLnZhbGlkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52YWxpZGF0ZUZvcm0oKTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZUZvcm0oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgdmFsaWRGb3JtOiBib29sZWFuID0gdGhpcy5maWVsZHMuZXZlcnkoaXRlbSA9PiBpdGVtLnZhbGlkKTtcclxuICAgICAgICBjb25zdCBpc1ZhbGlkOiBib29sZWFuID0gdGhpcy5hZ3JlZUVsZW1lbnQgPyB0aGlzLmFncmVlRWxlbWVudC5jaGVja2VkICYmIHZhbGlkRm9ybSA6IHZhbGlkRm9ybTtcclxuICAgICAgICBjb25zb2xlLmxvZyh2YWxpZEZvcm0pO1xyXG4gICAgICAgIGlmICh0aGlzLnByb2Nlc3NFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChpc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgXCJcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGlzVmFsaWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgcHJvY2Vzc0Zvcm0oKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVGb3JtKCkpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGVtYWlsID0gdGhpcy5maWVsZHMuZmluZChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gJ2VtYWlsJyk/LmVsZW1lbnQ/LnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBwYXNzd29yZCA9IHRoaXMuZmllbGRzLmZpbmQoaXRlbSA9PiBpdGVtLm5hbWUgPT09ICdwYXNzd29yZCcpPy5lbGVtZW50Py52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UgPT09ICdzaWdudXAnKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQ6IFNpZ251cFJlc3BvbnNlVHlwZSA9IGF3YWl0IEN1c3RvbUh0dHAucmVxdWVzdChjb25maWcuaG9zdCArICcvc2lnbnVwJywgJ1BPU1QnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuZmllbGRzLmZpbmQoaXRlbSA9PiBpdGVtLm5hbWUgPT09ICduYW1lJyk/LmVsZW1lbnQ/LnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZTogdGhpcy5maWVsZHMuZmluZChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gJ2xhc3ROYW1lJyk/LmVsZW1lbnQ/LnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogZW1haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZXJyb3IgfHwgIXJlc3VsdC51c2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzdWx0Lm1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHJ5IHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQ6IExvZ2luUmVzcG9uc2VUeXBlID0gYXdhaXQgQ3VzdG9tSHR0cC5yZXF1ZXN0KGNvbmZpZy5ob3N0ICsgJy9sb2dpbicsICdQT1NUJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcclxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmVycm9yIHx8ICFyZXN1bHQuYWNjZXNzVG9rZW4gfHwgIXJlc3VsdC5yZWZyZXNoVG9rZW4gfHwgIXJlc3VsdC5mdWxsTmFtZSB8fCAhcmVzdWx0LnVzZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzdWx0Lm1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBBdXRoLnNldFRva2VucyhyZXN1bHQuYWNjZXNzVG9rZW4sIHJlc3VsdC5yZWZyZXNoVG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vINCX0LTQtdGB0Ywg0L/QvtC0INC/0L7Rh9GC0YMg0LjRgdC/0YDQsNCy0LjQu9CwIFVzZXJJbmZvVHlwZSwg0LTQvtCx0LDQstC40LvQsCDQvdC10L7QsdGP0LfQsNGC0LXQu9GM0L3QvtC1INC/0L7Qu9C1IGVtYWlsXHJcbiAgICAgICAgICAgICAgICAgICAgQXV0aC5zZXRVc2VySW5mbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxOYW1lOiByZXN1bHQuZnVsbE5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZDogcmVzdWx0LnVzZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IGVtYWlsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcjL2Nob2ljZSdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7VXJsTWFuYWdlcn0gZnJvbSBcIi4uL3V0aWxpdGllcy91cmwtbWFuYWdlclwiO1xyXG5pbXBvcnQge0N1c3RvbUh0dHB9IGZyb20gXCIuLi9zZXJ2aWNlcy9jdXN0b20taHR0cFwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi8uLi9jb25maWcvY29uZmlnXCI7XHJcbmltcG9ydCB7QXV0aH0gZnJvbSBcIi4uL3NlcnZpY2VzL2F1dGhcIjtcclxuaW1wb3J0IHtRdWVyeVBhcmFtc1R5cGV9IGZyb20gXCIuLi90eXBlcy9xdWVyeS1wYXJhbXMudHlwZVwiO1xyXG5pbXBvcnQge1VzZXJJbmZvVHlwZX0gZnJvbSBcIi4uL3R5cGVzL3VzZXItaW5mby50eXBlXCI7XHJcbmltcG9ydCB7RGVmYXVsdFJlc3BvbnNlVHlwZX0gZnJvbSBcIi4uL3R5cGVzL2RlZmF1bHQtcmVzcG9uc2UudHlwZVwiO1xyXG5pbXBvcnQge1Bhc3NUZXN0UmVzcG9uc2VUeXBlfSBmcm9tIFwiLi4vdHlwZXMvcGFzcy10ZXN0LXJlc3BvbnNlLnR5cGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZXN1bHQge1xyXG5cclxuICAgIHByaXZhdGUgcm91dGVQYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnJvdXRlUGFyYW1zID0gVXJsTWFuYWdlci5nZXRRdWVyeVBhcmFtcygpO1xyXG5cclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIGNvbnN0IHJpZ2h0UmVzdWx0TGluazogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3ctcmlnaHQtcmVzdWx0Jyk7XHJcblxyXG4gICAgICAgIGlmIChyaWdodFJlc3VsdExpbmspIHtcclxuICAgICAgICAgICAgcmlnaHRSZXN1bHRMaW5rLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGF0LnJvdXRlUGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcjL3JpZ2h0LXJlc3VsdD9pZD0nICsgdGhhdC5yb3V0ZVBhcmFtcy5pZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBpbml0KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJJbmZvOiBVc2VySW5mb1R5cGUgfCBudWxsID0gQXV0aC5nZXRVc2VySW5mbygpO1xyXG4gICAgICAgIGlmICghdXNlckluZm8pIHtcclxuICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcjLyc7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnJvdXRlUGFyYW1zLmlkKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQ6IERlZmF1bHRSZXNwb25zZVR5cGUgfCBQYXNzVGVzdFJlc3BvbnNlVHlwZSA9IGF3YWl0IEN1c3RvbUh0dHAucmVxdWVzdChjb25maWcuaG9zdCArICcvdGVzdHMvJyArIHRoaXMucm91dGVQYXJhbXMuaWQgKyAnL3Jlc3VsdD91c2VySWQ9JyArIHVzZXJJbmZvLnVzZXJJZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgocmVzdWx0IGFzIERlZmF1bHRSZXNwb25zZVR5cGUpLmVycm9yICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKChyZXN1bHQgYXMgRGVmYXVsdFJlc3BvbnNlVHlwZSkubWVzc2FnZSlcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHRTY29yZUVsZW1lbnQ6IEhUTUxFbGVtZW50fG51bGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0LXNjb3JlJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRTY29yZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFNjb3JlRWxlbWVudC5pbm5lclRleHQgPSAocmVzdWx0IGFzIFBhc3NUZXN0UmVzcG9uc2VUeXBlKS5zY29yZSArICcvJyArIChyZXN1bHQgYXMgUGFzc1Rlc3RSZXNwb25zZVR5cGUpLnRvdGFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnIy8nO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCIvLyBpbXBvcnQge0F1dGh9IGZyb20gXCIuLi9zZXJ2aWNlcy9hdXRoLmpzXCI7XHJcbi8vIGltcG9ydCB7VXJsTWFuYWdlcn0gZnJvbSBcIi4uL3V0aWxpdGllcy91cmwtbWFuYWdlci5qc1wiO1xyXG4vLyBpbXBvcnQge0N1c3RvbUh0dHB9IGZyb20gXCIuLi9zZXJ2aWNlcy9jdXN0b20taHR0cFwiO1xyXG4vLyBpbXBvcnQgY29uZmlnIGZyb20gXCIuLi8uLi9jb25maWcvY29uZmlnLmpzXCI7XHJcbi8vXHJcbi8vIGV4cG9ydCBjbGFzcyBSaWdodFJlc3VsdCB7XHJcbi8vXHJcbi8vICAgICBjb25zdHJ1Y3RvcigpIHtcclxuLy8gICAgICAgICB0aGlzLnRlc3RJbmZvID0gbnVsbDtcclxuLy8gICAgICAgICB0aGlzLnRlc3RSaWdodEFuc3dlciA9IG51bGw7XHJcbi8vICAgICAgICAgdGhpcy51c2VyUmVzdWx0ID0gbnVsbDtcclxuLy8gICAgICAgICB0aGlzLnJvdXRlUGFyYW1zID0gVXJsTWFuYWdlci5nZXRRdWVyeVBhcmFtcygpO1xyXG4vL1xyXG4vLyAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuLy9cclxuLy8gICAgICAgICBjb25zdCByaWdodFJlc3VsdExpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvdy1yZXN1bHQnKTtcclxuLy9cclxuLy8gICAgICAgICBjb25zdCByZXN1bEluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWwtaW5mbycpO1xyXG4vLyAgICAgICAgIHJlc3VsSW5mby5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cInNob3ctcmVzdWx0X19pbmZvXCIgaWQ9XCJyZXN1bC1pbmZvXCI+0KLQtdGB0YIg0LLRi9C/0L7Qu9C90LjQuyA8c3BhbiBjbGFzcz1cInNob3ctcmVzdWx0X19zcGFuXCI+JyArXHJcbi8vICAgICAgICAgICAgIEF1dGguZ2V0VXNlckluZm8oKS5mdWxsTmFtZSArICcsICcgKyBBdXRoLmdldFVzZXJJbmZvKCkuZW1haWxcclxuLy8gICAgICAgICAgICAgKyAnPC9zcGFuPjwvZGl2PidcclxuLy9cclxuLy8gICAgICAgICByaWdodFJlc3VsdExpbmsub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcjL3Jlc3VsdD9pZD0nICsgdGhhdC5yb3V0ZVBhcmFtcy5pZDtcclxuLy8gICAgICAgICB9XHJcbi8vXHJcbi8vICAgICAgICAgLy8g0JfQsNC/0YDQvtGBINC90LAg0L/QvtC70YPRh9C10L3QuNC1INC00LDQvdC90YvRhVxyXG4vLyAgICAgICAgIC8vIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4vLyAgICAgICAgIC8vIHhoci5vcGVuKCdHRVQnLCAnaHR0cHM6Ly90ZXN0b2xvZ2lhLnJ1L2dldC1xdWl6LXJpZ2h0P2lkPScgKyB0ZXN0SWQsIGZhbHNlKVxyXG4vLyAgICAgICAgIC8vIHhoci5zZW5kKCk7XHJcbi8vICAgICAgICAgLy9cclxuLy8gICAgICAgICAvLyBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwICYmIHhoci5yZXNwb25zZVRleHQpIHtcclxuLy8gICAgICAgICAvLyAgICAgdHJ5IHtcclxuLy8gICAgICAgICAvLyAgICAgICAgIHRoaXMudGVzdFJpZ2h0QW5zd2VyID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuLy8gICAgICAgICAvLyAgICAgfSBjYXRjaCAoZSkge1xyXG4vLyAgICAgICAgIC8vICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcjLyc7XHJcbi8vICAgICAgICAgLy8gICAgIH1cclxuLy8gICAgICAgICAvLyAgICAgLy8gdGhpcy5zaG93UmVzdWx0KCk7XHJcbi8vICAgICAgICAgLy8gfSBlbHNlIHtcclxuLy8gICAgICAgICAvLyAgICAgbG9jYXRpb24uaHJlZiA9ICcjLyc7XHJcbi8vICAgICAgICAgLy8gfVxyXG4vLyAgICAgICAgIC8vXHJcbi8vICAgICAgICAgLy9cclxuLy8gICAgICAgICAvLyBpZiAodGVzdElkKSB7XHJcbi8vICAgICAgICAgLy8gICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4vLyAgICAgICAgIC8vICAgICB4aHIub3BlbignR0VUJywgJ2h0dHBzOi8vdGVzdG9sb2dpYS5ydS9nZXQtcXVpej9pZD0nICsgdGVzdElkLCBmYWxzZSlcclxuLy8gICAgICAgICAvLyAgICAgeGhyLnNlbmQoKTtcclxuLy8gICAgICAgICAvL1xyXG4vLyAgICAgICAgIC8vICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwICYmIHhoci5yZXNwb25zZVRleHQpIHtcclxuLy8gICAgICAgICAvLyAgICAgICAgIHRyeSB7XHJcbi8vICAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy50ZXN0SW5mbyA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbi8vICAgICAgICAgLy8gICAgICAgICB9IGNhdGNoIChlKSB7XHJcbi8vICAgICAgICAgLy8gICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcjLyc7XHJcbi8vICAgICAgICAgLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgLy8gICAgICAgICB0aGlzLnNob3dSZXN1bHQoKTtcclxuLy8gICAgICAgICAvLyAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAvLyAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnIy8nO1xyXG4vLyAgICAgICAgIC8vICAgICB9XHJcbi8vICAgICAgICAgLy8gfSBlbHNlIHtcclxuLy8gICAgICAgICAvLyAgICAgbG9jYXRpb24uaHJlZiA9ICcjLyc7XHJcbi8vICAgICAgICAgLy8gfVxyXG4vLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMudGVzdEluZm8pXHJcbi8vXHJcbi8vICAgICAgICAgdGhpcy5pbml0KCk7XHJcbi8vICAgICB9XHJcbi8vXHJcbi8vICAgICBhc3luYyBpbml0KCkge1xyXG4vLyAgICAgICAgIGNvbnN0IHVzZXJJbmZvID0gQXV0aC5nZXRVc2VySW5mbygpO1xyXG4vLyAgICAgICAgIGlmICghdXNlckluZm8pIHtcclxuLy8gICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcjLydcclxuLy8gICAgICAgICB9XHJcbi8vXHJcbi8vICAgICAgICAgaWYgKHRoaXMucm91dGVQYXJhbXMuaWQpIHtcclxuLy8gICAgICAgICAgICAgdHJ5IHtcclxuLy8gICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IEN1c3RvbUh0dHAucmVxdWVzdChjb25maWcuaG9zdCArICcvdGVzdHMvJyArIHRoaXMucm91dGVQYXJhbXMuaWQgKyAnL3Jlc3VsdC9kZXRhaWxzP3VzZXJJZD0nICsgdXNlckluZm8udXNlcklkKTtcclxuLy9cclxuLy8gICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmVycm9yKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuLy9cclxuLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpXHJcbi8vXHJcbi8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UmVzdWx0KHJlc3VsdCk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9IGNhdGNoIHtcclxuLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVycm9yKVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIC8vIGxvY2F0aW9uLmhyZWYgPSAnIy8nO1xyXG4vLyAgICAgfVxyXG4vL1xyXG4vLyAgICAgc2hvd1Jlc3VsdChvYmopIHtcclxuLy8gICAgICAgICAvLyBjb25zb2xlLmxvZygn0KDQtdC30YPQu9GM0YLQsNGCIC0gJyArIG9iai5xdWVzdGlvbnMpXHJcbi8vICAgICAgICAgLy8gY29uc29sZS5sb2coJ9Cg0LXQt9GD0LvRjNGC0LDRgiAtICcgKyBvYmoudGVzdC5xdWVzdGlvbnMpXHJcbi8vXHJcbi8vICAgICAgICAgbGV0IGN1cnJlbnRUZXN0ID0gb2JqLnRlc3QucXVlc3Rpb25zO1xyXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRUZXN0KTtcclxuLy9cclxuLy8gICAgICAgICBsZXQgdGVzdEl0ZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rlc3QtaXRlbXMnKTtcclxuLy9cclxuLy8gICAgICAgICBsZXQgaSA9IDA7XHJcbi8vICAgICAgICAgLy8g0J7RgtGA0LjRgdC+0LLRi9Cy0LDQtdC8INCy0L7Qv9GA0L7RgdGLXHJcbi8vICAgICAgICAgY3VycmVudFRlc3QuZm9yRWFjaChxdWVzdCA9PiB7XHJcbi8vICAgICAgICAgICAgIGNvbnN0IHRlc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbi8vICAgICAgICAgICAgIHRlc3RJdGVtLmNsYXNzTmFtZSA9ICdzaG93LXJlc3VsdF9faXRlbSc7XHJcbi8vXHJcbi8vXHJcbi8vXHJcbi8vICAgICAgICAgICAgIGNvbnN0IHF1ZXN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuLy8gICAgICAgICAgICAgcXVlc3RUaXRsZS5jbGFzc05hbWUgPSAnc2hvdy1yZXN1bHRfX2l0ZW0tdGl0bGUnO1xyXG4vLyAgICAgICAgICAgICBxdWVzdFRpdGxlLmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInNob3ctcmVzdWx0X19zcGFuXCI+0JLQvtC/0YDQvtGBICcgKyAoaSsrICsgMSkgKyAnOjwvc3Bhbj4gJyArIHF1ZXN0LnF1ZXN0aW9uO1xyXG4vL1xyXG4vLyAgICAgICAgICAgICBjb25zdCB0ZXN0TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcbi8vICAgICAgICAgICAgIHRlc3RMaXN0LmNsYXNzTmFtZSA9ICdzaG93LXJlc3VsdF9fbGlzdCc7XHJcbi8vXHJcbi8vICAgICAgICAgICAgIGxldCBjdXJyZW50QW5zd2Vyc0FycmF5ID0gcXVlc3QuYW5zd2VycztcclxuLy9cclxuLy8gICAgICAgICAgICAgY3VycmVudEFuc3dlcnNBcnJheS5mb3JFYWNoKGFuc3dlciA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zdCB0ZXN0TGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4vLyAgICAgICAgICAgICAgICAgdGVzdExpc3RJdGVtLmNsYXNzTGlzdCA9ICdzaG93LXJlc3VsdF9fbGlzdC1pdGVtJztcclxuLy8gICAgICAgICAgICAgICAgIHRlc3RMaXN0SXRlbS5pbm5lclRleHQgPSBhbnN3ZXIuYW5zd2VyO1xyXG4vL1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ9Cd0LDRiCDQstC+0L/RgNC+0YEgLSAnICsgSlNPTi5zdHJpbmdpZnkoYW5zd2VyLmFuc3dlcikpXHJcbi8vXHJcbi8vICAgICAgICAgICAgICAgICBpZiAoYW5zd2VyLmNvcnJlY3QgPT09IHRydWUpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICB0ZXN0TGlzdEl0ZW0uY2xhc3NMaXN0LmFkZCgnc2hvdy1yZXN1bHRfX3RydWUnKTtcclxuLy8gICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYW5zd2VyLmNvcnJlY3QgPT09IGZhbHNlKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgdGVzdExpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ3Nob3ctcmVzdWx0X19mYWxzZScpO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vL1xyXG4vLyAgICAgICAgICAgICAgICAgdGVzdExpc3QuYXBwZW5kQ2hpbGQodGVzdExpc3RJdGVtKTtcclxuLy8gICAgICAgICAgICAgfSlcclxuLy9cclxuLy8gICAgICAgICAgICAgdGVzdEl0ZW0uYXBwZW5kQ2hpbGQocXVlc3RUaXRsZSk7XHJcbi8vICAgICAgICAgICAgIHRlc3RJdGVtLmFwcGVuZENoaWxkKHRlc3RMaXN0KTtcclxuLy8gICAgICAgICAgICAgdGVzdEl0ZW1zLmFwcGVuZENoaWxkKHRlc3RJdGVtKVxyXG4vLyAgICAgICAgIH0pO1xyXG4vL1xyXG4vLyAgICAgICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqLnRlc3QucXVlc3Rpb25zOyBpKyspIHtcclxuLy8gICAgICAgICAvL1xyXG4vLyAgICAgICAgIC8vICAgICAvLyDQl9C00LXRgdGMINC80Ysg0YDQsNCx0L7RgtCw0LXQvCDRgSDQvtC/0YDQtdC00LXQu9C10L3QvdGL0Lwg0LLQvtC/0YDQvtGB0L7QvFxyXG4vLyAgICAgICAgIC8vXHJcbi8vICAgICAgICAgLy8gICAgIGxldCBjdXJyZW50UXVlc3QgPSBvYmoucXVlc3Rpb25zW2ldO1xyXG4vLyAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhjdXJyZW50UXVlc3QpO1xyXG4vLyAgICAgICAgIC8vIGNvbnN0IGNob3NlbkFuc3dlcklkID0gdGhpcy51c2VyUmVzdWx0W2ldLmNob3NlbkFuc3dlcklkO1xyXG4vLyAgICAgICAgIC8vIGNvbnN0IHJpZ2h0QW5zd2VySWQgPSB0aGlzLnRlc3RSaWdodEFuc3dlcltpXTtcclxuLy9cclxuLy8gICAgICAgICAvLyBjb25zdCB0ZXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4vLyAgICAgICAgIC8vIHRlc3RJdGVtLmNsYXNzTmFtZSA9ICdzaG93LXJlc3VsdF9faXRlbSc7XHJcbi8vICAgICAgICAgLy9cclxuLy8gICAgICAgICAvLyBjb25zdCBxdWVzdFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbi8vICAgICAgICAgLy8gcXVlc3RUaXRsZS5jbGFzc05hbWUgPSAnc2hvdy1yZXN1bHRfX2l0ZW0tdGl0bGUnO1xyXG4vLyAgICAgICAgIC8vIHF1ZXN0VGl0bGUuaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwic2hvdy1yZXN1bHRfX3NwYW5cIj7QktC+0L/RgNC+0YEgJyArIChpICsgMSkgKyAnOjwvc3Bhbj4gJyArIGN1cnJlbnRRdWVzdC5xdWVzdGlvbjtcclxuLy8gICAgICAgICAvL1xyXG4vLyAgICAgICAgIC8vIGNvbnN0IHRlc3RMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuLy8gICAgICAgICAvLyB0ZXN0TGlzdC5jbGFzc05hbWUgPSAnc2hvdy1yZXN1bHRfX2xpc3QnO1xyXG4vLyAgICAgICAgIC8vXHJcbi8vICAgICAgICAgLy8gZm9yIChsZXQgaiA9IDA7IGogPCBjdXJyZW50UXVlc3QuYW5zd2Vycy5sZW5ndGg7IGorKykge1xyXG4vLyAgICAgICAgIC8vICAgICAvLyDQl9C00LXRgdGMINC80Ysg0YDQsNCx0L7RgtCw0LXQvCDRgSDQvtC/0YDQtdC00LXQu9C10L3QvdGL0Lwg0L7RgtCy0LXRgtC+0Lwg0L3QsCDQstC+0L/RgNC+0YFcclxuLy8gICAgICAgICAvL1xyXG4vLyAgICAgICAgIC8vICAgICBjb25zdCBjdXJyZW50QW5zd2VySWQgPSBjdXJyZW50UXVlc3QuYW5zd2Vyc1tqXS5pZDtcclxuLy8gICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coJ9Ci0LXQutGD0YnQuNC5IGlkINC+0YLQstC10YLQsC0gJyArIGN1cnJlbnRBbnN3ZXJJZClcclxuLy8gICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coJ9CS0YvQsdGA0LDQvdC90YvQuSBpZCDQvtGC0LLQtdGC0LAtICcgKyBjaG9zZW5BbnN3ZXJJZClcclxuLy8gICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coJ9Cf0YDQsNCy0LjQu9GM0L3Ri9C5IGlkINC+0YLQstC10YLQsC0gJyArIHJpZ2h0QW5zd2VySWQpXHJcbi8vICAgICAgICAgLy9cclxuLy8gICAgICAgICAvLyAgICAgY29uc3QgdGVzdExpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuLy8gICAgICAgICAvLyAgICAgdGVzdExpc3RJdGVtLmNsYXNzTGlzdCA9ICdzaG93LXJlc3VsdF9fbGlzdC1pdGVtJztcclxuLy8gICAgICAgICAvLyAgICAgdGVzdExpc3RJdGVtLmlubmVyVGV4dCA9IGN1cnJlbnRRdWVzdC5hbnN3ZXJzW2pdLmFuc3dlcjtcclxuLy8gICAgICAgICAvLyAgICAgaWYgKGNob3NlbkFuc3dlcklkID09PSBjdXJyZW50QW5zd2VySWQgJiYgY2hvc2VuQW5zd2VySWQgPT09IHJpZ2h0QW5zd2VySWQpIHtcclxuLy8gICAgICAgICAvLyAgICAgICAgIHRlc3RMaXN0SXRlbS5jbGFzc0xpc3QuYWRkKCdzaG93LXJlc3VsdF9fdHJ1ZScpO1xyXG4vLyAgICAgICAgIC8vICAgICB9IGVsc2UgaWYgKGNob3NlbkFuc3dlcklkID09PSBjdXJyZW50QW5zd2VySWQgJiYgY2hvc2VuQW5zd2VySWQgIT09IHJpZ2h0QW5zd2VySWQpIHtcclxuLy8gICAgICAgICAvLyAgICAgICAgIHRlc3RMaXN0SXRlbS5jbGFzc0xpc3QuYWRkKCdzaG93LXJlc3VsdF9fZmFsc2UnKTtcclxuLy8gICAgICAgICAvLyAgICAgfVxyXG4vLyAgICAgICAgIC8vXHJcbi8vICAgICAgICAgLy8gICAgIHRlc3RMaXN0LmFwcGVuZENoaWxkKHRlc3RMaXN0SXRlbSk7XHJcbi8vICAgICAgICAgLy8gfVxyXG4vL1xyXG4vLyAgICAgICAgIC8vIHRlc3RJdGVtLmFwcGVuZENoaWxkKHF1ZXN0VGl0bGUpO1xyXG4vLyAgICAgICAgIC8vIHRlc3RJdGVtLmFwcGVuZENoaWxkKHRlc3RMaXN0KTtcclxuLy8gICAgICAgICAvLyB0ZXN0SXRlbXMuYXBwZW5kQ2hpbGQodGVzdEl0ZW0pXHJcbi8vICAgICAgICAgLy8gfVxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbiIsImltcG9ydCB7VXJsTWFuYWdlcn0gZnJvbSBcIi4uL3V0aWxpdGllcy91cmwtbWFuYWdlclwiO1xyXG5pbXBvcnQge0N1c3RvbUh0dHB9IGZyb20gXCIuLi9zZXJ2aWNlcy9jdXN0b20taHR0cFwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi8uLi9jb25maWcvY29uZmlnXCI7XHJcbmltcG9ydCB7QXV0aH0gZnJvbSBcIi4uL3NlcnZpY2VzL2F1dGhcIjtcclxuaW1wb3J0IHtRdWVyeVBhcmFtc1R5cGV9IGZyb20gXCIuLi90eXBlcy9xdWVyeS1wYXJhbXMudHlwZVwiO1xyXG5pbXBvcnQge1F1aXpBbnN3ZXJUeXBlLCBRdWl6UXVlc3Rpb25UeXBlLCBRdWl6VHlwZX0gZnJvbSBcIi4uL3R5cGVzL3F1aXoudHlwZVwiO1xyXG5pbXBvcnQge1VzZXJSZXN1bHRUeXBlfSBmcm9tIFwiLi4vdHlwZXMvdXNlci1yZXN1bHQudHlwZVwiO1xyXG5pbXBvcnQge0RlZmF1bHRSZXNwb25zZVR5cGV9IGZyb20gXCIuLi90eXBlcy9kZWZhdWx0LXJlc3BvbnNlLnR5cGVcIjtcclxuaW1wb3J0IHtBY3Rpb25UZXN0VHlwZX0gZnJvbSBcIi4uL3R5cGVzL2FjdGlvbi10ZXN0LnR5cGVcIjtcclxuaW1wb3J0IHtVc2VySW5mb1R5cGV9IGZyb20gXCIuLi90eXBlcy91c2VyLWluZm8udHlwZVwiO1xyXG5pbXBvcnQge1Bhc3NUZXN0UmVzcG9uc2VUeXBlfSBmcm9tIFwiLi4vdHlwZXMvcGFzcy10ZXN0LXJlc3BvbnNlLnR5cGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXN0IHtcclxuICAgIHByaXZhdGUgcHJvZ3Jlc3NCYXJFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBuZXh0QnV0dG9uRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgcGFzc0J1dHRvbkVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIHByZXZCdXR0b25FbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBxdWVzdGlvblRpdGxlRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgb3B0aW9uc0VsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIHF1aXo6IFF1aXpUeXBlIHwgbnVsbDtcclxuICAgIHByaXZhdGUgY3VycmVudFF1ZXN0aW9uSW5kZXg6IG51bWJlciA9IDE7XHJcbiAgICBwcml2YXRlIHRlc3RJZDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgdXNlclJlc3VsdDogVXNlclJlc3VsdFR5cGVbXTtcclxuICAgIHByaXZhdGUgcm91dGVQYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZTtcclxuICAgIHByaXZhdGUgaW50ZXJ2YWw6IG51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5uZXh0QnV0dG9uRWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wYXNzQnV0dG9uRWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wcmV2QnV0dG9uRWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5xdWl6ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uVGl0bGVFbGVtZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLm9wdGlvbnNFbGVtZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbkluZGV4ID0gMTtcclxuICAgICAgICB0aGlzLnRlc3RJZCA9IDA7XHJcbiAgICAgICAgdGhpcy5yb3V0ZVBhcmFtcyA9IFVybE1hbmFnZXIuZ2V0UXVlcnlQYXJhbXMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBpbml0KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmICh0aGlzLnJvdXRlUGFyYW1zLmlkKSB7XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0OiBEZWZhdWx0UmVzcG9uc2VUeXBlIHwgUXVpelR5cGUgPSBhd2FpdCBDdXN0b21IdHRwLnJlcXVlc3QoY29uZmlnLmhvc3QgKyAnL3Rlc3RzLycgKyB0aGlzLnJvdXRlUGFyYW1zLmlkKVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChyZXN1bHQgYXMgRGVmYXVsdFJlc3BvbnNlVHlwZSkuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKChyZXN1bHQgYXMgRGVmYXVsdFJlc3BvbnNlVHlwZSkubWVzc2FnZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXVpeiA9IHJlc3VsdCBhcyBRdWl6VHlwZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0UXVpeigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhcnRRdWl6KCk6IHZvaWQge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucXVpeik7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5xdWl6KSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMucXVlc3Rpb25UaXRsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGl0bGUnKTtcclxuICAgICAgICB0aGlzLnByb2dyZXNzQmFyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzcy1iYXInKTtcclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wcm9ncmVzc0JhckVsZW1lbnQpXHJcbiAgICAgICAgdGhpcy5vcHRpb25zRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcHRpb25zJyk7XHJcbiAgICAgICAgdGhpcy5uZXh0QnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXh0Jyk7XHJcbiAgICAgICAgaWYgKHRoaXMubmV4dEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5uZXh0QnV0dG9uRWxlbWVudC5vbmNsaWNrID0gdGhpcy5tb3ZlLmJpbmQodGhpcywgQWN0aW9uVGVzdFR5cGUubmV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFzc0J1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFzcycpO1xyXG4gICAgICAgIGlmICh0aGlzLnBhc3NCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFzc0J1dHRvbkVsZW1lbnQub25jbGljayA9IHRoaXMubW92ZS5iaW5kKHRoaXMsIEFjdGlvblRlc3RUeXBlLnBhc3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wcmV2QnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmV2Jyk7XHJcbiAgICAgICAgaWYgKHRoaXMucHJldkJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5wcmV2QnV0dG9uRWxlbWVudC5vbmNsaWNrID0gdGhpcy5tb3ZlLmJpbmQodGhpcywgQWN0aW9uVGVzdFR5cGUucHJldik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBwcmVUaXRsZUJ0bjogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZS10aXRsZScpXHJcbiAgICAgICAgaWYgKHByZVRpdGxlQnRuKSB7XHJcbiAgICAgICAgICAgIHByZVRpdGxlQnRuLmlubmVyVGV4dCA9IHRoaXMucXVpei5uYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICA7XHJcblxyXG4gICAgICAgIHRoaXMucHJlcGFyZVByb2dyZXNzQmFyKCk7XHJcbiAgICAgICAgdGhpcy5zaG93UXVlc3QoKTtcclxuXHJcbiAgICAgICAgY29uc3QgdGltZXJFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZXInKTtcclxuICAgICAgICBsZXQgc2Vjb25kID0gNTk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmludGVydmFsID0gd2luZG93LnNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2Vjb25kLS07XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQ6IFRlc3QgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRpbWVyRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgdGltZXJFbGVtZW50LmlubmVyVGV4dCA9IHNlY29uZC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc2Vjb25kID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoYXQuaW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5jb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0uYmluZCh0aGlzKSwgMTAwMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgcHJlcGFyZVByb2dyZXNzQmFyKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5xdWl6KSByZXR1cm47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnF1aXoucXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1FbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgaXRlbUVsZW1lbnQuY2xhc3NOYW1lID0gJ3Rlc3RfX3Byb2dyZXNzLWJhci1pdGVtICcgKyAoaSA9PT0gMCA/ICd0ZXN0X19hY3RpdmUnIDogJycpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaXRlbUNpcmNsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgaXRlbUNpcmNsZUVsZW1lbnQuY2xhc3NOYW1lID0gJ3Rlc3RfX3Byb2dyZXNzLWJhci1jaXJjbGUnO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaXRlbVRleHRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGl0ZW1UZXh0RWxlbWVudC5jbGFzc05hbWUgPSAndGVzdF9fcHJvZ3Jlc3MtYmFyLXRleHQnO1xyXG4gICAgICAgICAgICBpdGVtVGV4dEVsZW1lbnQuaW5uZXJUZXh0ID0gJ9CS0L7Qv9GA0L7RgSAnICsgKGkgKyAxKTtcclxuXHJcbiAgICAgICAgICAgIGl0ZW1FbGVtZW50LmFwcGVuZENoaWxkKGl0ZW1DaXJjbGVFbGVtZW50KTtcclxuICAgICAgICAgICAgaXRlbUVsZW1lbnQuYXBwZW5kQ2hpbGQoaXRlbVRleHRFbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb2dyZXNzQmFyRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0JhckVsZW1lbnQuYXBwZW5kQ2hpbGQoaXRlbUVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnByb2dyZXNzQmFyRWxlbWVudClcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coMSlcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgc2hvd1F1ZXN0KCk6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMucXVpeikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBhY3RpdmVRdWVzdGlvbjogUXVpelF1ZXN0aW9uVHlwZSA9IHRoaXMucXVpei5xdWVzdGlvbnNbdGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleCAtIDFdO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5xdWVzdGlvblRpdGxlRWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXN0aW9uVGl0bGVFbGVtZW50LmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInRlc3RfX3NwYW5cIj7QktC+0L/RgNC+0YEgJyArIHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXhcclxuICAgICAgICAgICAgICAgICsgJzo8L3NwYW4+ICcgKyBhY3RpdmVRdWVzdGlvbi5xdWVzdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc0VsZW1lbnQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0aGF0OiBUZXN0ID0gdGhpcztcclxuICAgICAgICBjb25zdCBjaG9zZW5PcHRpb246IFVzZXJSZXN1bHRUeXBlIHwgdW5kZWZpbmVkID0gdGhpcy51c2VyUmVzdWx0LmZpbmQoaXRlbSA9PiBpdGVtLnF1ZXN0aW9uSWQgPT09IGFjdGl2ZVF1ZXN0aW9uLmlkKVxyXG4gICAgICAgIGFjdGl2ZVF1ZXN0aW9uLmFuc3dlcnMuZm9yRWFjaCgoaXRlbTogUXVpekFuc3dlclR5cGUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGVzdE9wdGlvbjogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHRlc3RPcHRpb24uY2xhc3NOYW1lID0gJ3Rlc3RfX29wdGlvbic7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpbnB1dElkID0gJ2Fuc3dlci0nICsgaXRlbS5pZDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRlc3RJbnB1dDogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICAgICAgdGVzdElucHV0LmNsYXNzTmFtZSA9ICdvcHRpb24tYW5zd2VyJztcclxuICAgICAgICAgICAgdGVzdElucHV0LnNldEF0dHJpYnV0ZSgnaWQnLCBpbnB1dElkKTtcclxuICAgICAgICAgICAgdGVzdElucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICdyYWRpbycpO1xyXG4gICAgICAgICAgICB0ZXN0SW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywgJ2Fuc3dlcicpO1xyXG4gICAgICAgICAgICB0ZXN0SW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIGl0ZW0uaWQudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hvc2VuT3B0aW9uICYmIGNob3Nlbk9wdGlvbi5jaG9zZW5BbnN3ZXJJZCA9PT0gaXRlbS5pZCkge1xyXG4gICAgICAgICAgICAgICAgdGVzdElucHV0LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICd0cnVlJylcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGVzdElucHV0Lm9uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5jaG9vc2VBbnN3ZXIoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRlc3RMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XHJcbiAgICAgICAgICAgIHRlc3RMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsIGlucHV0SWQpO1xyXG4gICAgICAgICAgICB0ZXN0TGFiZWwuaW5uZXJUZXh0ID0gaXRlbS5hbnN3ZXI7XHJcblxyXG4gICAgICAgICAgICB0ZXN0T3B0aW9uLmFwcGVuZENoaWxkKHRlc3RJbnB1dCk7XHJcbiAgICAgICAgICAgIHRlc3RPcHRpb24uYXBwZW5kQ2hpbGQodGVzdExhYmVsKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNFbGVtZW50LmFwcGVuZENoaWxkKHRlc3RPcHRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm5leHRCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChjaG9zZW5PcHRpb24gJiYgY2hvc2VuT3B0aW9uLmNob3NlbkFuc3dlcklkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRCdXR0b25FbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0QnV0dG9uRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ3RydWUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMubmV4dEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXggPT09IHRoaXMucXVpei5xdWVzdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRCdXR0b25FbGVtZW50LmlubmVyVGV4dCA9ICfQl9Cw0LLQtdGA0YjQuNGC0YwnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0QnV0dG9uRWxlbWVudC5pbm5lclRleHQgPSAn0JTQsNC70YzRiNC1JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucHJldkJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZCdXR0b25FbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJldkJ1dHRvbkVsZW1lbnQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICd0cnVlJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBjaG9vc2VBbnN3ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMubmV4dEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5uZXh0QnV0dG9uRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIG1vdmUoYWN0aW9uOiBBY3Rpb25UZXN0VHlwZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5xdWl6KSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgYWN0aXZlUXVlc3Rpb246IFF1aXpRdWVzdGlvblR5cGUgPSB0aGlzLnF1aXoucXVlc3Rpb25zW3RoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXggLSAxXTtcclxuXHJcbiAgICAgICAgY29uc3QgY2hvc2VuQW5zd2VyOiBIVE1MSW5wdXRFbGVtZW50IHwgdW5kZWZpbmVkID0gQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvcHRpb24tYW5zd2VyJykpLmZpbmQoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAoaXRlbSBhcyBIVE1MSW5wdXRFbGVtZW50KS5jaGVja2VkO1xyXG4gICAgICAgIH0pIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG5cclxuICAgICAgICBsZXQgY2hvc2VuQW5zd2VySWQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG4gICAgICAgIGlmIChjaG9zZW5BbnN3ZXIgJiYgY2hvc2VuQW5zd2VyLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIGNob3NlbkFuc3dlcklkID0gTnVtYmVyKGNob3NlbkFuc3dlci52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBleGlzdGluZ1Jlc3VsdCA6IFVzZXJSZXN1bHRUeXBlIHwgdW5kZWZpbmVkPSB0aGlzLnVzZXJSZXN1bHQuZmluZChpdGVtID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucXVlc3Rpb25JZCA9PT0gYWN0aXZlUXVlc3Rpb24uaWRcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBpZiAoY2hvc2VuQW5zd2VySWQpIHtcclxuICAgICAgICAgICAgaWYgKGV4aXN0aW5nUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBleGlzdGluZ1Jlc3VsdC5jaG9zZW5BbnN3ZXJJZCA9IGNob3NlbkFuc3dlcklkO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyUmVzdWx0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uSWQ6IGFjdGl2ZVF1ZXN0aW9uLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNob3NlbkFuc3dlcklkOiBjaG9zZW5BbnN3ZXJJZFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gQWN0aW9uVGVzdFR5cGUubmV4dCB8fCBhY3Rpb24gPT09IEFjdGlvblRlc3RUeXBlLnBhc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleCsrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXgtLTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRRdWVzdGlvbkluZGV4ID4gdGhpcy5xdWl6LnF1ZXN0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcclxuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9ncmVzc0JhckVsZW1lbnQpIHtcclxuICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzLnByb2dyZXNzQmFyRWxlbWVudC5jaGlsZHJlbikuZm9yRWFjaCgoaXRlbSA6IEVsZW1lbnQsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRJdGVtSW5kZXggOiBudW1iZXI9IGluZGV4ICsgMTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgndGVzdF9fY29tcGxldGUnKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgndGVzdF9fYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRJdGVtSW5kZXggPT09IHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ3Rlc3RfX2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRJdGVtSW5kZXggPCB0aGlzLmN1cnJlbnRRdWVzdGlvbkluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCd0ZXN0X19jb21wbGV0ZScpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zaG93UXVlc3QoKTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBjb21wbGV0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuXHJcbiAgICAgICAgY29uc3QgdXNlckluZm86IFVzZXJJbmZvVHlwZXxudWxsID0gQXV0aC5nZXRVc2VySW5mbygpO1xyXG4gICAgICAgIGlmICghdXNlckluZm8pIHtcclxuICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcjLyc7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogRGVmYXVsdFJlc3BvbnNlVHlwZXxQYXNzVGVzdFJlc3BvbnNlVHlwZSA9IGF3YWl0IEN1c3RvbUh0dHAucmVxdWVzdChjb25maWcuaG9zdCArICcvdGVzdHMvJyArIHRoaXMucm91dGVQYXJhbXMuaWQgKyAnL3Bhc3MnLCAnUE9TVCcsIHtcclxuICAgICAgICAgICAgICAgIHVzZXJJZDogdXNlckluZm8udXNlcklkLFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0czogdGhpcy51c2VyUmVzdWx0XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHJlc3VsdCBhcyBEZWZhdWx0UmVzcG9uc2VUeXBlKS5lcnJvciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKChyZXN1bHQgYXMgRGVmYXVsdFJlc3BvbnNlVHlwZSkubWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcjL3Jlc3VsdD9pZD0nICsgdGhpcy5yb3V0ZVBhcmFtcy5pZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtGb3JtfSBmcm9tIFwiLi9jb21wb25lbnRzL2Zvcm1cIjtcclxuaW1wb3J0IHtDaG9pY2V9IGZyb20gXCIuL2NvbXBvbmVudHMvY2hvaWNlXCI7XHJcbmltcG9ydCB7VGVzdH0gZnJvbSBcIi4vY29tcG9uZW50cy90ZXN0XCI7XHJcbmltcG9ydCB7UmVzdWx0fSBmcm9tIFwiLi9jb21wb25lbnRzL3Jlc3VsdFwiO1xyXG5pbXBvcnQge1JpZ2h0UmVzdWx0fSBmcm9tIFwiLi9jb21wb25lbnRzL3JpZ2h0LXJlc3VsdFwiO1xyXG5pbXBvcnQge0F1dGh9IGZyb20gXCIuL3NlcnZpY2VzL2F1dGhcIjtcclxuaW1wb3J0IHtSb3V0ZVR5cGV9IGZyb20gXCIuL3R5cGVzL3JvdXRlLnR5cGVcIjtcclxuaW1wb3J0IHtVc2VySW5mb1R5cGV9IGZyb20gXCIuL3R5cGVzL3VzZXItaW5mby50eXBlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUm91dGVyIHtcclxuXHJcbiAgICByZWFkb25seSBwcm9maWxlOiBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICByZWFkb25seSBwcm9maWxlTmFtZTogSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgcmVhZG9ubHkgY29udGVudDogSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgcmVhZG9ubHkgcGFnZVRpdGxlOiBIVE1MRWxlbWVudCB8IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSByb3V0ZXM6IFJvdXRlVHlwZVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICB0aGlzLnByb2ZpbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZScpO1xyXG4gICAgICAgIHRoaXMucHJvZmlsZU5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZS1uYW1lJyk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKTtcclxuICAgICAgICB0aGlzLnBhZ2VUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aXRsZS1wYWdlJyk7XHJcblxyXG4gICAgICAgIHRoaXMucm91dGVzID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZTogJyMvJyxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn0JPQu9Cw0LLQvdCw0Y8nLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICd0ZW1wbGF0ZS9pbmRleC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGxvYWQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vINCh0YLQuNC70Lgg0L3QtSDQv9C+0LTQutC70Y7Rh9Cw0Y4sINGC0Log0L7QvdC4INCyINC10LTQuNC90L7QvCDRhNCw0LnQu9C1INCyIGRpc3RcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm91dGU6ICcjL3NpZ251cCcsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ9Cg0LXQs9C40YHRgtGA0LDRhtC40Y8nLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICd0ZW1wbGF0ZS9zaWdudXAuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBsb2FkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEZvcm0oJ3NpZ251cCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8g0KHRgtC40LvQuCDQvdC1INC/0L7QtNC60LvRjtGH0LDRjiwg0YLQuiDQvtC90Lgg0LIg0LXQtNC40L3QvtC8INGE0LDQudC70LUg0LIgZGlzdFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZTogJyMvbG9naW4nLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfQktGF0L7QtCDQstCyINGB0LjRgdGC0LXQvNGDJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAndGVtcGxhdGUvbG9naW4uaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBsb2FkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEZvcm0oJ2xvZ2luJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyDQodGC0LjQu9C4INC90LUg0L/QvtC00LrQu9GO0YfQsNGOLCDRgtC6INC+0L3QuCDQsiDQtdC00LjQvdC+0Lwg0YTQsNC50LvQtSDQsiBkaXN0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlOiAnIy9jaG9pY2UnLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfQktGL0LHQvtGAINGC0LXRgdGC0LAnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICd0ZW1wbGF0ZS9jaG9pY2UuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBsb2FkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IENob2ljZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8g0KHRgtC40LvQuCDQvdC1INC/0L7QtNC60LvRjtGH0LDRjiwg0YLQuiDQvtC90Lgg0LIg0LXQtNC40L3QvtC8INGE0LDQudC70LUg0LIgZGlzdFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZTogJyMvdGVzdCcsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ9Ci0LXRgdGC0LjRgNC+0LLQsNC90LjQtScsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJ3RlbXBsYXRlL3Rlc3QuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBsb2FkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFRlc3QoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vINCh0YLQuNC70Lgg0L3QtSDQv9C+0LTQutC70Y7Rh9Cw0Y4sINGC0Log0L7QvdC4INCyINC10LTQuNC90L7QvCDRhNCw0LnQu9C1INCyIGRpc3RcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm91dGU6ICcjL3Jlc3VsdCcsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ9Cg0LXQt9GD0LvRjNGC0LDRgtGLINGC0LXRgdGC0LjRgNC+0LLQsNC90LjRjycsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJ3RlbXBsYXRlL3Jlc3VsdC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGxvYWQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgUmVzdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyDQodGC0LjQu9C4INC90LUg0L/QvtC00LrQu9GO0YfQsNGOLCDRgtC6INC+0L3QuCDQsiDQtdC00LjQvdC+0Lwg0YTQsNC50LvQtSDQsiBkaXN0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlOiAnIy9yaWdodC1yZXN1bHQnLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfQn9C+0LTRgNC+0LHQvdGL0LUg0YDQtdC30YPQu9GM0YLQsNGC0YsnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICd0ZW1wbGF0ZS9yaWdodC1yZXN1bHQuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBsb2FkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFJpZ2h0UmVzdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyDQodGC0LjQu9C4INC90LUg0L/QvtC00LrQu9GO0YfQsNGOLCDRgtC6INC+0L3QuCDQsiDQtdC00LjQvdC+0Lwg0YTQsNC50LvQtSDQsiBkaXN0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyDQoi7Qui4g0Y3RgtC+INCw0YHQuNC90YXRgNC+0L3QvdCw0Y8g0YTRg9C90LrRhtC40Y8sINC60L7RgtC+0YDQsNGPINC90LjRh9C10LPQviDQvdC1INCy0L7Qt9Cy0YDQsNGJ0LDQtdGCLCDQsiDQutCw0YfQtdGB0YLQstC1INCy0L7Qt9Cy0YDQsNGJ0LDQtdC80L7Qs9C+INC+0LHRitC10LrRgtCwINGD0LrQsNC30YvQstCw0LXRgtGB0Y8gUHJvbWljZTx2b2lkPlxyXG4gICAgcHVibGljIGFzeW5jIG9wZW5Sb3V0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuXHJcbiAgICAgICAgY29uc3QgdXJsUm91dGU6IHN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNwbGl0KCc/JylbMF07XHJcbiAgICAgICAgaWYgKHVybFJvdXRlID09PSAnIy9sb2dvdXQnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogYm9vbGVhbiA9IGF3YWl0IEF1dGgubG9nb3V0KCk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJyMvJztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0KLRg9GCINC/0L7Rh9C10LzRgy3RgtC+INC90LUg0L/QvtC00YHQstC10YfQuNCy0LDQu9Cw0YHRjCDQvtGI0LjQsdC60LAg0LHQtdC3IHVuZGVmaW5kXHJcbiAgICAgICAgY29uc3QgbmV3Um91dGU6IFJvdXRlVHlwZSB8IHVuZGVmaW5lZCA9IHRoaXMucm91dGVzLmZpbmQoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnJvdXRlID09PSB1cmxSb3V0ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFuZXdSb3V0ZSkge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcjLydcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRlbnQgfHwgIXRoaXMucGFnZVRpdGxlIHx8ICF0aGlzLnByb2ZpbGUgfHwgIXRoaXMucHJvZmlsZU5hbWUpIHtcclxuICAgICAgICAgICAgaWYgKHVybFJvdXRlID09PSAnIy8nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJyMvJ1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29udGVudC5pbm5lckhUTUwgPVxyXG4gICAgICAgICAgICBhd2FpdCBmZXRjaChuZXdSb3V0ZS50ZW1wbGF0ZSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpO1xyXG4gICAgICAgIHRoaXMucGFnZVRpdGxlLmlubmVyVGV4dCA9IG5ld1JvdXRlLnRpdGxlO1xyXG5cclxuICAgICAgICBjb25zdCB1c2VySW5mbzogVXNlckluZm9UeXBlIHwgbnVsbCA9IEF1dGguZ2V0VXNlckluZm8oKTtcclxuICAgICAgICBjb25zdCBhY2Nlc3NUb2tlbjogc3RyaW5nIHwgbnVsbCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKEF1dGguYWNjZXNzVG9rZW5LZXkpO1xyXG5cclxuICAgICAgICBpZiAodXNlckluZm8gJiYgYWNjZXNzVG9rZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9maWxlLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZmlsZU5hbWUuaW5uZXJUZXh0ID0gdXNlckluZm8uZnVsbE5hbWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9maWxlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZXdSb3V0ZS5sb2FkKCk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vLi4vY29uZmlnL2NvbmZpZ1wiO1xyXG5pbXBvcnQgKiBhcyBzdHJlYW0gZnJvbSBcInN0cmVhbVwiO1xyXG5pbXBvcnQge1VzZXJJbmZvVHlwZX0gZnJvbSBcIi4uL3R5cGVzL3VzZXItaW5mby50eXBlXCI7XHJcbmltcG9ydCB7UmVmcmVzaFJlc3BvbnNlVHlwZX0gZnJvbSBcIi4uL3R5cGVzL3JlZnJlc2gtcmVzcG9uc2UudHlwZVwiO1xyXG5pbXBvcnQge0xvZ291dFJlc3BvbnNlVHlwZX0gZnJvbSBcIi4uL3R5cGVzL2xvZ291dC1yZXNwb25zZS50eXBlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQXV0aCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGFjY2Vzc1Rva2VuS2V5OiBzdHJpbmcgPSAnYWNjZXNzVG9rZW4nO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVmcmVzaFRva2VuS2V5OiBzdHJpbmcgPSAncmVmcmVzaFRva2VuJztcclxuICAgIHByaXZhdGUgc3RhdGljIHVzZXJJbmZvS2V5OiBzdHJpbmcgPSAndXNlckluZm8nO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgcHJvY2Vzc1VuYXV0aG9yaXplZFJlc3BvbnNlKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIGNvbnN0IHJlZnJlc2hUb2tlbjogc3RyaW5nIHwgbnVsbCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMucmVmcmVzaFRva2VuS2V5KTtcclxuXHJcbiAgICAgICAgaWYgKHJlZnJlc2hUb2tlbikge1xyXG4gICAgICAgICAgICAvLyDQoi7Qui4g0LjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPINGE0YPQvdC60YbQuNGPIGZldGNoIC0g0LLQvtC30LLRgNCw0YnQsNC10YLRgdGPINGA0LXRgdC/0L7QvdGBXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBSZXNwb25zZSA9IGF3YWl0IGZldGNoKGNvbmZpZy5ob3N0ICsgJy9yZWZyZXNoJywge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtyZWZyZXNoVG9rZW46IHJlZnJlc2hUb2tlbn0pXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQ6IFJlZnJlc2hSZXNwb25zZVR5cGUgfCBudWxsID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiAhcmVzdWx0LmVycm9yICYmIHJlc3VsdC5hY2Nlc3NUb2tlbiAmJiByZXN1bHQucmVmcmVzaFRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUb2tlbnMocmVzdWx0LmFjY2Vzc1Rva2VuLCByZXN1bHQucmVmcmVzaFRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZW1vdmVUb2tlbnMoKTtcclxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gJyMvJztcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0VG9rZW5zKGFjY2Vzc1Rva2VuOiBzdHJpbmcsIHJlZnJlc2hUb2tlbjogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5hY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW4pO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMucmVmcmVzaFRva2VuS2V5LCByZWZyZXNoVG9rZW4pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHJlbW92ZVRva2VucygpOiB2b2lkIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLmFjY2Vzc1Rva2VuS2V5KTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLnJlZnJlc2hUb2tlbktleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBsb2dvdXQoKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgY29uc3QgcmVmcmVzaFRva2VuOiBzdHJpbmd8bnVsbCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMucmVmcmVzaFRva2VuS2V5KTtcclxuXHJcbiAgICAgICAgaWYgKHJlZnJlc2hUb2tlbikge1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZTogUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChjb25maWcuaG9zdCArICcvbG9nb3V0Jywge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtyZWZyZXNoVG9rZW46IHJlZnJlc2hUb2tlbn0pXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQ6IExvZ291dFJlc3BvbnNlVHlwZSB8IG51bGwgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiAhcmVzdWx0LmVycm9yKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEF1dGgucmVtb3ZlVG9rZW5zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy51c2VySW5mb0tleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldFVzZXJJbmZvKGluZm86IFVzZXJJbmZvVHlwZSk6IHZvaWQge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMudXNlckluZm9LZXksIEpTT04uc3RyaW5naWZ5KGluZm8pKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFVzZXJJbmZvKCk6IFVzZXJJbmZvVHlwZSB8IG51bGwge1xyXG4gICAgICAgIGNvbnN0IHVzZXJJbmZvOiBzdHJpbmcgfCBudWxsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJJbmZvJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codXNlckluZm8pXHJcblxyXG4gICAgICAgIGlmICh1c2VySW5mbykge1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh1c2VySW5mbyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQge0F1dGh9IGZyb20gXCIuL2F1dGhcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDdXN0b21IdHRwIHtcclxuICAgIC8vINCi0YPRgiDQuNGB0L/QvtC70YzQt9GD0LXQvCBhbnkg0L/QvtGC0L7QvNGDINGH0YLQviDRjdGC0L4g0LrQsNGB0YLQvtC80L3Ri9C5INC80LXRgtC+0LQg0LTQu9GPINCy0YHQtdGFINC30LDQv9GA0L7RgdC+0LIg0L3QsCDRgdC10YDQstC10YAg0Lgg0L3QtdGCINGB0LzRi9GB0LvQsCDQv9C10YDQtdGH0LjRgdC70Y/RgtGMINCy0YHQtSDRgtC40L/Riywg0LrQvtGC0L7RgNGL0LUg0LzQvtCz0YPRgiDQv9GA0LjQudGC0LhcclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgcmVxdWVzdCh1cmw6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiLCBib2R5OiBhbnkgPSBudWxsKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAvLyDQndC1INC/0L7QvdGP0LvQsCDQvtGC0LrRg9C00LAg0YLRg9GCIFJlcXVlc3RJbml0INCy0LfRj9C70YHRjyDQuCDRh9GC0L4g0L7QvSDQstC+0L7QsdGJ0LUg0LfQvdCw0YfQuNGCXHJcbiAgICAgICAgLy8gY29uc3QgcGFyYW1zOiBSZXF1ZXN0SW5pdCA9IHtcclxuICAgICAgICBjb25zdCBwYXJhbXM6IGFueSA9IHtcclxuICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IHRva2VuOiBzdHJpbmcgfCBudWxsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oQXV0aC5hY2Nlc3NUb2tlbktleSk7XHJcblxyXG4gICAgICAgIGlmICh0b2tlbikge1xyXG4gICAgICAgICAgICBwYXJhbXMuaGVhZGVyc1sneC1hY2Nlc3MtdG9rZW4nXSA9IHRva2VuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGJvZHkpIHtcclxuICAgICAgICAgICAgcGFyYW1zLmJvZHkgPSBKU09OLnN0cmluZ2lmeShib2R5KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2U6IFJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBwYXJhbXMpO1xyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzIDwgMjAwIHx8IHJlc3BvbnNlLnN0YXR1cyA+PSAzMDApIHtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0OiBib29sZWFuID0gYXdhaXQgQXV0aC5wcm9jZXNzVW5hdXRob3JpemVkUmVzcG9uc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucmVxdWVzdCh1cmwsIG1ldGhvZCwgYm9keSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZW51bSBBY3Rpb25UZXN0VHlwZSB7XHJcbiAgICBuZXh0PSduZXh0JyxcclxuICAgIHBhc3M9J3Bhc3MnLFxyXG4gICAgcHJldj0ncHJldidcclxufSIsImltcG9ydCB7UXVlcnlQYXJhbXNUeXBlfSBmcm9tIFwiLi4vdHlwZXMvcXVlcnktcGFyYW1zLnR5cGVcIjtcblxuZXhwb3J0IGNsYXNzIFVybE1hbmFnZXIge1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UXVlcnlQYXJhbXMoKTogUXVlcnlQYXJhbXNUeXBlIHtcbiAgICAgICAgY29uc3QgcXM6IHN0cmluZyA9IGRvY3VtZW50LmxvY2F0aW9uLmhhc2guc3BsaXQoJysnKS5qb2luKCcgJyk7XG5cbiAgICAgICAgbGV0IHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge30sXG4gICAgICAgICAgICB0b2tlbnM6IFJlZ0V4cEV4ZWNBcnJheSB8IG51bGwsXG4gICAgICAgICAgICByZTpSZWdFeHAgPSAvWz8mXShbXj1dKyk9KFteJl0qKS9nO1xuXG4gICAgICAgIHdoaWxlICh0b2tlbnMgPSByZS5leGVjKHFzKSkge1xuICAgICAgICAgICAgcGFyYW1zW2RlY29kZVVSSUNvbXBvbmVudCh0b2tlbnNbMV0pXSA9IGRlY29kZVVSSUNvbXBvbmVudCh0b2tlbnNbMl0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImltcG9ydCB7Um91dGVyfSBmcm9tICcuL3JvdXRlcidcclxuXHJcbmNsYXNzIEFwcCB7XHJcblxyXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5yb3V0ZXIgPSBuZXcgUm91dGVyKCk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCB0aGlzLmhhbmRsZVJvdXRlckNoYW5naW5nLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHRoaXMuaGFuZGxlUm91dGVyQ2hhbmdpbmcuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVSb3V0ZXJDaGFuZ2luZygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5vcGVuUm91dGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuKG5ldyBBcHAoKSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9