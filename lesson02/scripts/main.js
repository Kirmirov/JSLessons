let money = 1000000, 
    income = '2000000', 
    addExpenses = 'food, internet, goods', 
    deposit = true, 
    mission = 5000000, 
    period = 9,
    budgetDay = money/30,
    addExpensesList = addExpenses.toLocaleLowerCase().split('');

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");
console.log(addExpensesList);
console.log(budgetDay);

