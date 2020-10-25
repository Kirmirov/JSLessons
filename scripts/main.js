'use strict'

start();

function start (){

    let number = generateNumber();
    let attemptsAmount = 10;
    console.log(number); // right answer for test
    continueGame();

    function generateNumber (){
        return Math.ceil(Math.random()*100);
    };

    function continueGame (){
        let playerAnswer = askQuestion();
        if(!isAnswerCorrect(playerAnswer)){
            alert ('Введи число!');
            continueGame ();
        }
        else {
            if (attemptsAmount == 0) reStart();
            else {
                let acceptedAnswer = +playerAnswer;
                checkAnswer(acceptedAnswer, number);
            }
        }
    };

    function askQuestion (){
        let playerAnswer = prompt('Угадай число от 1 до 100');
        return playerAnswer;
    };

    function isAnswerCorrect (str){
        if(str === null){
            alert ('Игра окончена');
            start();
        } 
        else if (!isNumber(str)) return false;
        else return true;
    };

    function isNumber (num){
        return !isNaN(parseFloat(num)) && isFinite(num);
    };

    function checkAnswer (answer, number){
        if(answer > number){
            attemptsAmount--;
            alert ('Загаданное число меньше, осталось ' + attemptsAmount + ' попыток!');
            continueGame();
        }
        if(answer < number){
            attemptsAmount--;
            alert ('Загаданное число больше, осталось ' + attemptsAmount + ' попыток!');
            continueGame();
        }
        if(answer == number){
            if(confirm ('Поздравляю, Вы угадали!!! Хотели бы сыграть еще?')) start();
            else alert ('Игра окончена');
        } 
    };

    function reStart(){
        if(confirm('Попытки закончились, хотите сыграть еще?')) start();
        else alert ('Игра окончена');
    };
};