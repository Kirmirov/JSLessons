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
    accumulatedMonth = getAccumulatedMonth (money, realyAmount, fanAmount, getExpensesMonth),
    budgetDay = accumulatedMonth/30;
    
getExpensesMonth (realyAmount, fanAmount);

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

function getStatusIncome (income){
    if(income) return true;
    else return false;
};

console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));
console.log(getTargetMonth(mission, accumulatedMonth));
console.log(accumulatedMonth);
console.log(budgetDay);
console.log(getStatusIncome(income));
