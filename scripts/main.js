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
        period: 9,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        asking: function(questionAmount){
            appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую').toLocaleLowerCase().split(','),
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
            for (let i = 0; i < questionAmount; i++){
                let keyQuestion = prompt('Какие обязательные расходы вы планируете в месяце?');
                let valueQuestion = +prompt('Во сколько это обойдется?');
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
        }
    };
    
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


