'use strict'

let money = +prompt('Укажите Ваш ежемесячный доход'), 
    appData = {
        budget: money,
        income: {},
        addIncome: [],
        expenses: {},
        addExpenses: [],
        deposit: false,
        mission: 1000000,
        persentDeposite: 0,
        moneyDeposite: 0,
        period: 9,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        asking: function(questionAmount){
            if(confirm('Есть ли у вас дополнительный заработок?')){
                let itemIncome = appData.checkingResponse('Какой у вас есть дополнительный заработок?', true);
                let cashIncome = appData.checkingResponse('Сколько в месяц вы на этом зарабатываете?', false);
                appData.income[itemIncome] = cashIncome;
            }
            appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую').split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
            for (let i = 0; i < questionAmount; i++){
                let keyQuestion = appData.checkingResponse('Какие обязательные расходы вы планируете в месяце?', true);
                let valueQuestion = appData.checkingResponse('Во сколько это обойдется?', false);
                appData.expenses[keyQuestion] = valueQuestion;
            }
        },
        getExpensesMonth: function() {
            for(let key in appData.expenses){
                appData.expensesMonth += appData.expenses[key];
            }
        },
        getBudget: function(){
            appData.budgetMonth = appData.budget - appData.expensesMonth;
            appData.budgetDay = appData.budgetMonth / 30;
        },
        getTargetMonth: function(){
            let res = Math.ceil(appData.mission / appData.budgetMonth);
            if(res >= 0) return 'Цель будет достигнута через ' + res + ' месяцев';
            else return 'Цель не будет достигнута';
        },
        getStatusIncome: function(){
            if(appData.budgetMonth >= 1200) return 'У вас высокий уровень дохода';
            else if(appData.budgetMonth >= 600 && appData.budgetMonth < 1200) return 'У вас средний уровень дохода';
            else if(appData.budgetMonth < 600 && appData.budgetMonth >= 0) return 'К сожалению у вас уровень дохода ниже среднего';
            else if (appData.budgetMonth < 0) return 'Что то пошло не так';
        },
        getInfoDeposite: function(){
            if(appData.deposit){
                appData.persentDeposite = appData.checkingResponse('Какой годовой процент по депозиту?', false);
                appData.moneyDeposite = appData.checkingResponse('Какая сумма на депозитном счете?', false);
            }
        },
        calsSavedMoney: function(){
            return appData.budgetMonth * appData.period;
        },
        isNumber: function(answer){
            return !isNaN(parseFloat(answer)) && isFinite(answer);
        },
        isEmpty: function(str) {
            return (!str || 0 === str.length);
        },
        checkingResponse: function (questionText, isString){
            let userAnswer;
            if(isString){
                do userAnswer = prompt(questionText).trim(); 
                while(appData.isEmpty(userAnswer) || appData.isNumber(userAnswer))
                return userAnswer; 
            } else {
                do userAnswer = prompt(questionText);
                while(!appData.isNumber(userAnswer))
                return +userAnswer; 
            }         
        },
        getMyExpenses: function(){
            let string = '';
            for (let key in appData.addExpenses){
                let word = appData.addExpenses[key].trim();
                let firstChar = word.substring(0, 1).toUpperCase();
                let leftover = word.substring(1, word.length).toLowerCase();
                string += firstChar + leftover + ',' + ' ';
            }
            return string;
        }
    };

const calculateBtn = document.getElementById('start'),
    plusIncomeBtn = document.getElementsByTagName('button')[0],
    plusExpensesBtn = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    incomeItemList = document.querySelectorAll('.additional_income-item'),
    valueInputList = document.querySelectorAll('[class*="value"]'),
    monthAmountInput = document.querySelector('input.salary-amount'),
    addIncomeInput = document.querySelector('input.income-title'),
    addAmountInput = document.querySelector('input.income-amount'),
    mandatoryExInput = document.querySelector('input.expenses-title'),
    mandatoryAmountInput = document.querySelector('input.expenses-amount'),
    addExInput = document.querySelector('input.additional_expenses-item'),
    targetInput = document.querySelector('input.target-amount');

appData.asking(2);
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log(appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log('Наша программа включает в себя данные: ');
for(let key in appData){
    console.log(key + ' ' + appData[key]);
}
console.log(appData.getMyExpenses());
