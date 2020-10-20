const firstTimeBox = document.querySelector('.first'),
    secondTimeBox = document.querySelector('.second');

firstTimeBox.style = "color: red;";
secondTimeBox.style = "color: blue;";

setInterval(start, 1000);

function start () {
    let date = new Date();
    let primaryString = buildTimeString (date);
    firstTimeBox.innerHTML = formatTimeString(primaryString);
    secondTimeBox.innerHTML = buildShortTime(date);
}

function determineEnd (number, txt) {
    let cases = [2, 0, 1, 1, 1, 2];
    return number + ' ' + txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

function buildTimeString (date){
    let primaryString = date.toLocaleString('ru', { //формирую первичную строку данных
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
    return primaryString;
}

function formatTimeString (primaryString){
    let splitStr = primaryString.split('.'); //делю сроку на 2 части по точке
    let yearStr = splitStr[0].replace('г', 'года'); //меняю г на год в первой части строки
    let timeList = splitStr[1].split(':');//делю вторую часть строки на двоеточию
    let hourStr = determineEnd(+timeList[0].replace(',', '').trim(), ['час', 'часа', 'часов']); // подвтавляю очищенное значение как аргумент в функцию выбирающюу склонение
    let minuteStr = determineEnd(+timeList[1].trim(), ['минута', 'минуты', 'минут']);
    let secondStr = determineEnd(+timeList[2].trim(), ['секунда', 'секунды', 'секунд']);
    return 'Сегодня '+ yearStr + ', ' + hourStr + ' ' + minuteStr + ' ' + secondStr;
}

function plusZero (number) {
    let strNumber = '';
    if(number < 10) strNumber = '0' + number;
    else strNumber = number;
    return strNumber;
}

function buildShortTime (date) {
    let day = +date.getDate();
    let month = +date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = +date.getHours();
    let minute = +date.getMinutes();
    let second = +date.getSeconds();
    return plusZero(day) + '.' + plusZero(month) + '.' + year + ' - ' +  plusZero(hour) + ':' + plusZero(minute) + ':' + plusZero(second);
}
