import {UrlManager} from "../utilities/url-manager";
import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {Auth} from "../services/auth";
import {QueryParamsType} from "../types/query-params.type";
import {QuizAnswerType, QuizQuestionType, QuizType} from "../types/quiz.type";
import {UserResultType} from "../types/user-result.type";
import {DefaultResponseType} from "../types/default-response.type";
import {ActionTestType} from "../types/action-test.type";
import {UserInfoType} from "../types/user-info.type";
import {PassTestResponseType} from "../types/pass-test-response.type";

export class Test {
    private progressBarElement: HTMLElement | null = null;
    private nextButtonElement: HTMLElement | null = null;
    private passButtonElement: HTMLElement | null = null;
    private prevButtonElement: HTMLElement | null = null;
    private questionTitleElement: HTMLElement | null = null;
    private optionsElement: HTMLElement | null = null;
    private quiz: QuizType | null;
    private currentQuestionIndex: number = 1;
    private testId: number = 0;
    private userResult: UserResultType[] = [];
    private routeParams: QueryParamsType;
    private interval: number = 0;

    constructor() {
        this.nextButtonElement = null;
        this.passButtonElement = null;
        this.prevButtonElement = null;
        this.quiz = null;
        this.questionTitleElement = null;
        this.optionsElement = null;
        this.currentQuestionIndex = 1;
        this.testId = 0;
        this.routeParams = UrlManager.getQueryParams();

        this.init();
    }

    private async init(): Promise<void> {
        if (this.routeParams.id) {

            try {
                const result: DefaultResponseType | QuizType = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id)

                if (result) {

                    if ((result as DefaultResponseType).error) {
                        throw new Error((result as DefaultResponseType).message)
                    }

                    this.quiz = result as QuizType;
                    this.startQuiz();
                }
            } catch (error) {
                console.log(error)
            }
        }
        ;
    }

    private startQuiz(): void {
        // console.log(this.quiz);

        if (!this.quiz) return;

        this.questionTitleElement = document.getElementById('title');
        this.progressBarElement = document.getElementById('progress-bar');

        // console.log(this.progressBarElement)
        this.optionsElement = document.getElementById('options');
        this.nextButtonElement = document.getElementById('next');
        if (this.nextButtonElement) {
            this.nextButtonElement.onclick = this.move.bind(this, ActionTestType.next);
        }
        this.passButtonElement = document.getElementById('pass');
        if (this.passButtonElement) {
            this.passButtonElement.onclick = this.move.bind(this, ActionTestType.pass);
        }

        this.prevButtonElement = document.getElementById('prev');
        if (this.prevButtonElement) {
            this.prevButtonElement.onclick = this.move.bind(this, ActionTestType.prev);
        }

        const preTitleBtn: HTMLElement | null = document.getElementById('pre-title')
        if (preTitleBtn) {
            preTitleBtn.innerText = this.quiz.name;
        }
        ;

        this.prepareProgressBar();
        this.showQuest();

        const timerElement: HTMLElement | null = document.getElementById('timer');
        let second = 59;

        const that: Test = this;
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

    private prepareProgressBar(): void {
        if (!this.quiz) return;
        for (let i = 0; i < this.quiz.questions.length; i++) {
            const itemElement: HTMLElement | null = document.createElement('div');
            itemElement.className = 'test__progress-bar-item ' + (i === 0 ? 'test__active' : '');

            const itemCircleElement = document.createElement('div');
            itemCircleElement.className = 'test__progress-bar-circle';

            const itemTextElement = document.createElement('div');
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

    private showQuest(): void {

        if (!this.quiz) return;

        const activeQuestion: QuizQuestionType = this.quiz.questions[this.currentQuestionIndex - 1];

        if (this.questionTitleElement) {
            this.questionTitleElement.innerHTML = '<span class="test__span">Вопрос ' + this.currentQuestionIndex
                + ':</span> ' + activeQuestion.question;
        }

        if (this.optionsElement) {
            this.optionsElement.innerHTML = '';
        }

        const that: Test = this;
        const chosenOption: UserResultType | undefined = this.userResult.find(item => item.questionId === activeQuestion.id)
        activeQuestion.answers.forEach((item: QuizAnswerType) => {
            const testOption: HTMLElement | null = document.createElement('div');
            testOption.className = 'test__option';

            const inputId = 'answer-' + item.id;

            const testInput: HTMLElement | null = document.createElement('input');
            testInput.className = 'option-answer';
            testInput.setAttribute('id', inputId);
            testInput.setAttribute('type', 'radio');
            testInput.setAttribute('name', 'answer');
            testInput.setAttribute('value', item.id.toString());

            if (chosenOption && chosenOption.chosenAnswerId === item.id) {
                testInput.setAttribute('checked', 'true')
            }

            testInput.onchange = function () {
                that.chooseAnswer();
            };

            const testLabel = document.createElement('label');
            testLabel.setAttribute('for', inputId);
            testLabel.innerText = item.answer;

            testOption.appendChild(testInput);
            testOption.appendChild(testLabel);

            if (this.optionsElement) {
                this.optionsElement.appendChild(testOption);
            }
        });

        if (this.nextButtonElement) {
            if (chosenOption && chosenOption.chosenAnswerId) {
                this.nextButtonElement.removeAttribute('disabled')
            } else {
                this.nextButtonElement.setAttribute('disabled', 'true');
            }
        }

        if (this.nextButtonElement) {
            if (this.currentQuestionIndex === this.quiz.questions.length) {
                this.nextButtonElement.innerText = 'Завершить';
            } else {
                this.nextButtonElement.innerText = 'Дальше';
            }
        }

        if (this.prevButtonElement) {
            if (this.currentQuestionIndex > 1) {
                this.prevButtonElement.removeAttribute('disabled');
            } else {
                this.prevButtonElement.setAttribute('disabled', 'true')
            }
        }
    };

    private chooseAnswer(): void {
        if (this.nextButtonElement) {
            this.nextButtonElement.removeAttribute('disabled');
        }
    };

    private move(action: ActionTestType): void {
        if (!this.quiz) return;
        const activeQuestion: QuizQuestionType = this.quiz.questions[this.currentQuestionIndex - 1];

        const chosenAnswer: HTMLInputElement | undefined = Array.from(document.getElementsByClassName('option-answer')).find(item => {
            return (item as HTMLInputElement).checked;
        }) as HTMLInputElement;


        let chosenAnswerId: number | null = null;
        if (chosenAnswer && chosenAnswer.value) {
            chosenAnswerId = Number(chosenAnswer.value);
        }

        const existingResult : UserResultType | undefined= this.userResult.find(item => {
            return item.questionId === activeQuestion.id
        })

        if (chosenAnswerId) {
            if (existingResult) {
                existingResult.chosenAnswerId = chosenAnswerId;
            } else {
                this.userResult.push({
                    questionId: activeQuestion.id,
                    chosenAnswerId: chosenAnswerId
                })
            }
        }

        if (action === ActionTestType.next || action === ActionTestType.pass) {
            this.currentQuestionIndex++;
        } else {
            this.currentQuestionIndex--;
        }

        if (this.currentQuestionIndex > this.quiz.questions.length) {
            clearInterval(this.interval);
            this.complete();
            return;
        }

        if (this.progressBarElement) {
            Array.from(this.progressBarElement.children).forEach((item : Element, index: number) => {
                const currentItemIndex : number= index + 1;
                item.classList.remove('test__complete');
                item.classList.remove('test__active');

                if (currentItemIndex === this.currentQuestionIndex) {
                    item.classList.add('test__active')
                } else if (currentItemIndex < this.currentQuestionIndex) {
                    item.classList.add('test__complete')
                }
            });
        }

        this.showQuest();
    };

    private async complete(): Promise<void> {

        const userInfo: UserInfoType|null = Auth.getUserInfo();
        if (!userInfo) {
            location.href = '#/';
            return;
        }

        try {
            const result: DefaultResponseType|PassTestResponseType = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id + '/pass', 'POST', {
                userId: userInfo.userId,
                results: this.userResult
            })

            if (result) {
                if ((result as DefaultResponseType).error !== undefined) {
                    throw new Error((result as DefaultResponseType).message)
                };

                location.href = '#/result?id=' + this.routeParams.id;
            }
        } catch {
            console.log('Ошибка!')
        }
    }
}
