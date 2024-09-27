"use strict";
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
//# sourceMappingURL=right-result.js.map