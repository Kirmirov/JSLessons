'use strict'
const start = document.getElementById('start'), //кнопка старт  
    plusIncomeBtn = document.getElementsByTagName('button')[0], // кнопка добавить ряд в секции доп заработок
    plusExpensesBtn = document.getElementsByTagName('button')[1], // кнопка добавить ряд в секции доп расходы
    depositCheck = document.querySelector('#deposit-check'), //чек-бокс депозит
    incomeItemList = document.querySelectorAll('.additional_income-item'),
    valueInputList = document.querySelectorAll('[class*="value"]'),
    salaryAmount = document.querySelector('input.salary-amount'),
    expensesTitle = document.querySelector('input.expenses-title'),
    expensesAmount = document.querySelector('input.expenses-amount'),
    addExInput = document.querySelector('input.additional_expenses-item'),
    incomeTitle = document.querySelector('input.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    targetAmount = document.querySelector('input.target-amount');

let expensesItems = document.querySelectorAll('.expenses-items'),
    periodSelect = document.querySelector('.period-select'),
    incomeItems = document.querySelectorAll('.income-items'),
    rangeAmount = document.querySelector('.period-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    appData = {
        budget: 0,
        income: {},
        addIncome: [],
        expenses: {},
        addExpenses: [],
        incomeMonth: 0,
        deposit: false,
        persentDeposite: 0,
        moneyDeposite: 0,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,

        start: function(){
            appData.getAddExpenses();
            appData.getExpenses();
            appData.getExpensesMonth();
            appData.getIncome();
            appData.getBudget();
            appData.getAddIncome();

            appData.showResult();
        },
        getAddExpenses: function(){
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(function(item){
                item = item.trim();
                if(item !== ''){
                    appData.addExpenses.push(item);
                }
            });
        },
        getExpenses: function(){
            expensesItems.forEach(function(item){
                let itemExpenses = item.querySelector('.expenses-title').value;
                let amountExpenses = item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && amountExpenses !== ''){
                    appData.expenses[itemExpenses] = amountExpenses;
                }
            });
        },
        getExpensesMonth: function() {
            for(let key in appData.expenses){
                appData.expensesMonth += appData.expenses[key];
            }
        },
        getIncome: function(){
            incomeItems.forEach(function(item){
                let itemIncome = item.querySelector('.income-title').value;
                let amountIncome = item.querySelector('.income-amount').value;
                if(itemIncome !== '' && amountIncome !== ''){
                    appData.income[itemIncome] = amountIncome;
                }
            });
        },
        getBudget: function(){
            appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
            appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
        },
        getAddIncome: function(){
            incomeItemList.forEach(function(item){
                let itemValue = item.value.trim(); 
                if(itemValue !== ''){
                    appData.addIncome.push(itemValue);
                }
                for(let key in appData.addIncome){
                    appData.incomeMonth += appData.addIncome[key];
                }
            });
        },
        showResult: function(){
            valueInputList[0].value = appData.budgetMonth;
            valueInputList[1].value = appData.budgetDay;
            valueInputList[2].value = appData.expensesMonth; 
            valueInputList[3].value = appData.addIncome.join(', ');
            valueInputList[4].value = appData.addExpenses.join(', ');
            valueInputList[5].value = appData.calsSavedMoney();
            valueInputList[6].value = appData.getTargetMonth();
            periodSelect.addEventListener('input', function(){
                valueInputList[5].value = appData.budgetMonth * periodSelect.value;
            });
        },
        calsSavedMoney: function(){
            return appData.budgetMonth * periodSelect.value;
        },
        getTargetMonth: function(){ 
            return Math.ceil(targetAmount.value / appData.budgetMonth);
        },
        addIncomeBlock: function(){
            let cloneIncomeItem = incomeItems[0].cloneNode(true);
            cloneIncomeItem.childNodes[1].addEventListener('input', () => {
                cloneIncomeItem.childNodes[1].value = cloneIncomeItem.childNodes[1].value.replace(/[^а-я]/,'');
            });
            cloneIncomeItem.childNodes[3].addEventListener('input', () => {
                cloneIncomeItem.childNodes[3].value = cloneIncomeItem.childNodes[3].value.replace(/[^0-9]/,'');
            });
            cloneIncomeItem.querySelector('.income-title').value = '';
            cloneIncomeItem.querySelector('.income-amount').value = '';
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusIncomeBtn);
            incomeItems = document.querySelectorAll('.income-items');
            if(incomeItems.length === 3){
                plusIncomeBtn.style.display = 'none';
            }
        },
        addExpensesBlock: function(){
            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            cloneExpensesItem.childNodes[1].addEventListener('input', () => {
                cloneExpensesItem.childNodes[1].value = cloneExpensesItem.childNodes[1].value.replace(/[^а-я]/,'');
            });
            cloneExpensesItem.childNodes[3].addEventListener('input', () => {
                cloneExpensesItem.childNodes[3].value = cloneExpensesItem.childNodes[3].value.replace(/[^0-9]/,'');
            });
            cloneExpensesItem.querySelector('.expenses-title').value = '';
            cloneExpensesItem.querySelector('.expenses-amount').value = '';
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpensesBtn);
            expensesItems = document.querySelectorAll('.expenses-items');
            if (expensesItems.length === 3){
                plusExpensesBtn.style.display = 'none';
            }
        },
        getRange: function(){
            rangeAmount.innerHTML = periodSelect.value;
        },
        isNumber: function(value){
            return !isNaN(parseFloat(value)) && isFinite(value);
        },
        isEmpty: function(str) {
            return (!str || 0 === str.length);
        },
        
    };

hangListener();

function hangListener (){
    for (let incomeItem of incomeItemList) {
        incomeItem.addEventListener('input', () => {
            incomeItem.value = incomeItem.value.replace(/[^а-я]/,'');
        });
    }
}

start.addEventListener('click', () => {
    appData.budget = +salaryAmount.value;
    if(appData.isNumber(appData.budget) && !appData.isEmpty(appData.budget)) appData.start();
    else salaryAmount.value = '';
});

plusExpensesBtn.addEventListener('click', appData.addExpensesBlock);
plusIncomeBtn.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getRange);

incomeTitle.addEventListener('input', () => {
    incomeTitle.value = incomeTitle.value.replace(/[^а-я]/,'');
});
incomeAmount.addEventListener('input', () => {
    incomeAmount.value = incomeAmount.value.replace(/[^0-9]/,'');
});
expensesTitle.addEventListener('input', () => {
    expensesTitle.value = expensesTitle.value.replace(/[^а-я]/,'');
});
expensesAmount.addEventListener('input', () => {
    expensesAmount.value = expensesAmount.value.replace(/[^0-9]/,'');
});
targetAmount.addEventListener('input', () => {
    targetAmount.value = targetAmount.value.replace(/[^0-9]/,'');
});