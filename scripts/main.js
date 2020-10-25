let money = +prompt('Ваш месячный доход?'), 
    income = '2000000', 
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'), 
    deposit = confirm('Есть ли у вас депозит в банке?'), 
    mission = 100000, 
    realyExp = prompt('Какие обязательные расходы вы планируете в месяце?'),
    realyAmount = +prompt('Во сколько это обойдется?'),
    fanExp = prompt('Какие обязательные расходы вы планируете в месяце?'),
    fanAmount = +prompt('Во сколько это обойдется?'),
    budgetMonth = money - realyAmount,
    answer,
    period = 9,
    budgetDay = budgetMonth/30,
    num = 266219,
    numArr = num.toString().split(''),
    numResult = 1;

if(budgetMonth >= 1200) answer = 'У вас высокий уровень дохода';
if(budgetMonth >= 600 && budgetMonth < 1200) answer = 'У вас средний уровень дохода';
if(budgetMonth < 600 && budgetMonth >= 0) answer = 'К сожалению у вас уровень дохода ниже среднего';
if(budgetMonth < 0) answer = 'Что то пошло не так';

//last lesson
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log('Длина массива равна: ' + addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");
console.log(addExpenses.toLocaleLowerCase().split(''));
console.log('Дневной бюджет равен :' + budgetDay);
console.log(numResult);
console.log(exNumResult);
console.log(numResultArr[0], numResultArr[1]);
//lesson03 low
console.log('Бюджет на месяц равен: ' + budgetMonth);
console.log('Цель будет достигнула за ' + Math.ceil(mission/budgetMonth)+ ' месяцев');
console.log('Дневной бюджет с округлением вниз равен :' + Math.floor(budgetDay));
console.log(answer);