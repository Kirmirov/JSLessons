let money, 
    income = '2000000', 
    addExpenses,
    deposit, 
    mission = 1000000,
    result,
    status,
    realyExp,
    expenses,
    fanExp,
    period = 9,
    accumulatedMonth = 0,
    budgetDay = 0;

start(); 

function isNumber (n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

function start(){
    do money = +prompt('Укажите Ваш ежемесячный доход');
    while(!isNumber(money)) {
        addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        deposit = confirm('Есть ли у вас депозит в банке?');
        expenses = getExpensesMonth();
        accumulatedMonth = getAccumulatedMonth(money, expenses);
        result = getTargetMonth(mission, accumulatedMonth);
        budgetDay = accumulatedMonth/30;
    }
};

function showTypeOf (data){
    return typeof data;
};

function getExpensesMonth (){
    let sum = 0;
    for(i = 0; i < 2; i++){
            if (i==0) realyExp = prompt('Какие обязательные расходы вы планируете в месяце?');
            else fanExp = prompt('Какие еще расходы вы планируете в месяце?');
        do amount = +prompt('Во сколько это обойдется?');
        while(!isNumber(amount)) sum += amount;
    }
    return sum;
};

function getAccumulatedMonth (money, expenses){
    return money - expenses;
};

function getTargetMonth (mission, accumulatedMonth){
    result = Math.ceil(mission/accumulatedMonth);
        if(result >= 0) return 'Цель будет достигнута через ' + result + ' месяцев';
        else return 'Цель не будет достигнута';
};

function getStatusIncome (income){
    if(income) return true;
    else return false;
};

console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));
console.log('Расходы за месяц составили ' + expenses + ' рублей');
console.log('Бюджет в месяц составляет ' + accumulatedMonth + ' рублей');
console.log(result);
console.log('Дневной бюджет составляет ' + budgetDay + ' рублей');
console.log(getStatusIncome(income));
