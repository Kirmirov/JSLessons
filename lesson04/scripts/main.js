let money = +prompt('Ваш месячный доход?'), 
    income = '2000000', 
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'), 
    mission = 100000, 
    realyExp = prompt('Какие обязательные расходы вы планируете в месяце?'),
    realyAmount = +prompt('Во сколько это обойдется?'),
    fanExp = prompt('Какие обязательные расходы вы планируете в месяце?'),
    fanAmount = +prompt('Во сколько это обойдется?'),
    period = 9,
    accumulatedMonth,
    budgetDay;
    
getExpensesMonth (realyAmount, fanAmount);
accumulatedMonth = getAccumulatedMonth (money, realyAmount, fanAmount, getExpensesMonth);
budgetDay = accumulatedMonth/30;

function showTypeOf (data){
    return typeof data;
};

function getExpensesMonth (firstExp, secondExp){
    return firstExp + secondExp;
};

function getAccumulatedMonth (money, firstExp, secondExp, callback){
    return money - callback(firstExp, secondExp);
};

function getTargetMonth (mission, accumulatedMonth){
    return Math.ceil(mission/accumulatedMonth);
};

function getStatusIncome (budgetMonth){
    if(budgetMonth >= 1200) return 'У вас высокий уровень дохода';
    else if(budgetMonth >= 600 && budgetMonth < 1200) return 'У вас средний уровень дохода';
    else if(budgetMonth < 600 && budgetMonth >= 0) return 'К сожалению у вас уровень дохода ниже среднего';
    else if (budgetMonth < 0) return 'Что то пошло не так';
};

console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));
console.log('Расход средств за месяц ' + getExpensesMonth (realyAmount, fanAmount) + ' рублей');
console.log(addExpenses.split(','));
console.log('Цель будет достигнута через ' + getTargetMonth(mission, accumulatedMonth) + ' месяцев');
console.log('Дневной бюджет ' + budgetDay + ' рублей');
console.log(getStatusIncome(accumulatedMonth));
