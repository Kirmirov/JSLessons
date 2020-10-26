'use strict'

const userGreeting = document.querySelector('.user-name'),
        registrationBtn = document.querySelector('.registration'),
        authorisationBtn = document.querySelector('.authorisation'),
        userList = document.querySelector('.user-list');

let userArray = [];

render();

function toAskName () {
    let userName = '';
    do userName = prompt('Введите ваше имя и фамилию').trim();
    while (!isAnswerCorrect(userName)) 
    return userName.split(' ');
};
function toAskLogin() {
    let userLogin = '';
    do userLogin = prompt('Введите логин одним словом на латинице').trim();
    while (!userLogin.split(' ').length == 1) 
    return userLogin;
};
function toAskPass() {
    let userPass = '';
    do userPass = prompt('Введите пароль одним словом').trim();
    while (!userPass.split(' ').length == 1) 
    return userPass;
};
function getDate() {
    let date = new Date();
    let regDate = date.toLocaleString('ru', { 
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
    });
    return regDate;
};

function render () {
    if(JSON.parse(localStorage.getItem("usersData")) != null){
        userArray = (JSON.parse(localStorage.getItem("usersData")));
    }
    const allLi = document.querySelectorAll('li');
    allLi.forEach((item) => {
        item.remove();
    });
    userArray.forEach((user) => {
        const li = document.createElement('li');
        li.innerHTML = '<span class="first-name">' + user.firstName  + '</span>' + '<span>' +
        ' ' + user.secondName + ' ' + user.dateOfRegistration + '</span>' +
        '<button class="del"></button>';
        userList.append(li);
        const deleteBtn = li.querySelector('.del');
        deleteBtn.addEventListener ('click', function () {
        let userName = deleteBtn.closest('li').querySelector('span.first-name').textContent;
        userArray.forEach((user) => {
            if(user.firstName == userName){
                userArray.splice(userArray.indexOf(user), 1);
                localStorage.setItem("usersData", JSON.stringify(userArray));
                deleteBtn.closest('li').remove();
                render();
                }
            });
        });
    });
};
function isAnswerCorrect (answer) {
    let splitAnswer = answer.split(' ');
    if(splitAnswer.length != 2) return false;
    if(isNumber(splitAnswer[0])) return false;
    if(isNumber(splitAnswer[1])) return false;
    return true;
};
function isNumber (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};
function addNewUser ()  {
    let splitAnswer = toAskName();
    let newUser = {
        firstName: splitAnswer[0],
        secondName: splitAnswer[1],
        login: toAskLogin(),
        password: toAskPass(),
        dateOfRegistration: getDate(),
        }
    userArray.push(newUser);
    localStorage.setItem("usersData", JSON.stringify(userArray));
    render();
};

function authOfUser (){
    let userLogin = prompt('Введие логин');
    let userPass = prompt('Введите пароль');
    let access = false;
    let userName = '';
    userArray.forEach((user) => {
        if(user.login == userLogin && user.password == userPass){
            access = true;
            userName = user.firstName;
        }
    });
    if(access){
        userGreeting.textContent = 'Здравствуйте ' + userName;
    }else alert('Пользователь не найден');
}


authorisationBtn.addEventListener('click', authOfUser);
registrationBtn.addEventListener('click', addNewUser);