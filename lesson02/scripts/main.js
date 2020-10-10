let money = 1000000, 
    income = '2000000', 
    addExpenses = 'food, internet, goods', 
    deposit = true, 
    mission = 5000000, 
    period = 9,
    budgetDay = money/30,
    num = 266219,
    numArr = num.toString().split(''),
    numResult = 1;

numList.forEach(function(i){
    numResult *= i;
});
exNumResult = numResult**3;
numResultArr = exNumResult.toString().split('');

//low block
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");
console.log(addExpenses.toLocaleLowerCase().split(''));
console.log(budgetDay);
// Hard block
console.log(numResult);
console.log(exNumResult);
console.log(numResultList[0], numResultList[1]);





