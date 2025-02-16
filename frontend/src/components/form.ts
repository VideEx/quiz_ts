import {CustomHttp} from "../services/custom-http";
import {Auth} from "../services/auth";
import config from "../../config/config";
import {FormFieldType} from "../types/form-field.type";
import * as Process from "process";
import {SignupResponseType} from "../types/signup-response.type";
import {LoginResponseType} from "../types/login-response.type";

export class Form {
    readonly processElement: HTMLElement | null = null;
    readonly agreeElement: HTMLInputElement | null = null;
    readonly page: 'signup' | 'login';
    private fields: FormFieldType[] = [];

    constructor(page: 'signup' | 'login') {
        this.page = page;

        const accessToken: string | null = localStorage.getItem(Auth.accessTokenKey);
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
            this.fields.unshift(
                {
                    name: 'name',
                    id: 'name',
                    element: null,
                    regex: /^[А-Я][а-я]+\s*$/,
                    valid: false
                },
                {
                    name: 'lastName',
                    id: 'last-name',
                    element: null,
                    regex: /^[А-Я][а-я]+\s*$/,
                    valid: false
                });
        }
        // Сюда присваиваем текущий класс Form
        const that: Form = this;
        this.fields.forEach((item: FormFieldType) => {
            item.element = document.getElementById(item.id) as HTMLInputElement;
            if (item.element) {
                item.element.onchange = function () {
                    that.validateField.call(that, item, <HTMLInputElement>this)
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
            this.agreeElement = document.getElementById('agree') as HTMLInputElement;
            if (this.agreeElement) {
                this.agreeElement.onchange = function () {
                    that.validateForm();
                }
            }

        }
    }

    private validateField(field: FormFieldType, element: HTMLInputElement): void {
        if (element.parentNode) {
            if (!element.value || !element.value.match(field.regex)) {
                (element.parentNode as HTMLElement).style.borderColor = "red";
                field.valid = false;
            } else {
                (element.parentNode as HTMLElement).removeAttribute('style');
                field.valid = true;
            }
        }

        this.validateForm();
    };

    private validateForm(): boolean {
        const validForm: boolean = this.fields.every(item => item.valid);
        const isValid: boolean = this.agreeElement ? this.agreeElement.checked && validForm : validForm;
        console.log(validForm);
        if (this.processElement) {
            if (isValid) {
                this.processElement.removeAttribute('disabled')
            } else {
                this.processElement.setAttribute('disabled', "")
            }
        }

        return isValid;
    };

    private async processForm(): Promise<void> {
        if (this.validateForm()) {

            const email = this.fields.find(item => item.name === 'email')?.element?.value;
            const password = this.fields.find(item => item.name === 'password')?.element?.value;

            if (this.page === 'signup') {
                try {

                    const result: SignupResponseType = await CustomHttp.request(config.host + '/signup', 'POST', {
                        name: this.fields.find(item => item.name === 'name')?.element?.value,
                        lastName: this.fields.find(item => item.name === 'lastName')?.element?.value,
                        email: email,
                        password: password
                    });

                    if (result) {
                        if (result.error || !result.user) {
                            throw new Error(result.message)
                        }
                    }
                } catch (error) {
                    console.log(error);
                    return;
                }
            }
            try {

                const result: LoginResponseType = await CustomHttp.request(config.host + '/login', 'POST', {
                    email: email,
                    password: password,
                })

                if (result) {
                    if (result.error || !result.accessToken || !result.refreshToken || !result.fullName || !result.userId) {
                        throw new Error(result.message)
                    }

                    console.log(result);

                    Auth.setTokens(result.accessToken, result.refreshToken);
                    // Здесь под почту исправила UserInfoType, добавила необязательное поле email
                    Auth.setUserInfo({
                        fullName: result.fullName,
                        userId: result.userId,
                        email: email
                    });
                    location.href = '#/choice'
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
