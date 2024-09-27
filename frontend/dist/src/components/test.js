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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
var url_manager_1 = require("../utilities/url-manager");
var custom_http_1 = require("../services/custom-http");
var config_1 = __importDefault(require("../../config/config"));
var auth_1 = require("../services/auth");
var action_test_type_1 = require("../types/action-test.type");
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
        this.userResult = [];
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
        var that = this;
        this.interval = window.setInterval(function () {
            second--;
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
                        console.log('Ошибка!');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Test;
}());
exports.Test = Test;
//# sourceMappingURL=test.js.map