import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {Auth} from "../services/auth";
import {QuizListType} from "../types/quiz-list.type";
import {TestResultType} from "../types/test-result.type";
import {UserInfoType} from "../types/user-info.type";
import {DefaultResponseType} from "../types/default-response.type";

export class Choice {
    private quizzes: QuizListType[] = [];
    private testResult: TestResultType[] | null = null;

    constructor() {


        this.init();
    }

    private async init(): Promise<void> {
        try {
            this.quizzes = await CustomHttp.request(config.host + '/tests');
        } catch (error) {
            console.log(error)
            return;
        }

        const userInfo: UserInfoType | null = Auth.getUserInfo();

        if (userInfo) {
            try {
                const result: TestResultType[] | DefaultResponseType = await CustomHttp.request(config.host + '/tests/results?userId=' + userInfo.userId);

                if (result) {
                    // Утверждаем тип данных как DefaulpResponseType потому что уверены что в данном случае ошибка может прийти только из него
                    if ((result as DefaultResponseType).error !== undefined) {
                        throw new Error((result as DefaultResponseType).message)
                    }

                    this.testResult = result as TestResultType[];
                }
            } catch (error) {
                console.log(error)
                return;
            }
        }
        this.processQuizzes();

    }

    private processQuizzes(): void {
        const choiceOptions: HTMLElement | null = document.getElementById('choice-options');
        if (this.quizzes && this.quizzes.length > 0 && choiceOptions) {
            this.quizzes.forEach((quiz: QuizListType) => {
                const that: Choice = this;
                const choiceOptionElement: HTMLElement | null = document.createElement('div');
                choiceOptionElement.className = 'choice__option';
                choiceOptionElement.setAttribute('data-id', quiz.id.toString())

                choiceOptionElement.onclick = function () {
                    that.chooseQuiz(<HTMLElement>this);
                }

                const choiceOptionTextElement: HTMLElement | null = document.createElement('div');
                choiceOptionTextElement.className = 'choice__option-text';
                choiceOptionTextElement.innerText = quiz.name;

                const choiceOptionArrowElement: HTMLElement | null = document.createElement('div');
                choiceOptionArrowElement.className = 'choice__option-arrow';

                if (this.testResult) {
                    const result: TestResultType | undefined = this.testResult.find(item => item.testId === quiz.id);
                    if (result) {
                        const choiceOptionResultElement = document.createElement('div');
                        choiceOptionResultElement.className = 'choice__option-result';
                        choiceOptionResultElement.innerHTML = '<div>Результат</div><div>' + result.score + '/' + result.total + '</div>';
                        choiceOptionElement.appendChild(choiceOptionResultElement)
                    }
                }

                const choiceOptionImageElement: HTMLElement | null = document.createElement('img');
                choiceOptionImageElement.setAttribute('src', 'img/choice-arrow.png');
                choiceOptionImageElement.setAttribute('alt', 'Выбрать курс');

                choiceOptionArrowElement.appendChild(choiceOptionImageElement);
                choiceOptionElement.appendChild(choiceOptionTextElement)
                choiceOptionElement.appendChild(choiceOptionArrowElement)

                choiceOptions.appendChild(choiceOptionElement);
            })
        }
    }

    private chooseQuiz(element: HTMLElement): void {
        const dataId: string | null = element.getAttribute('data-id');

        if (dataId) {
            location.href = '#/test?id=' + dataId;
        }
    }
}