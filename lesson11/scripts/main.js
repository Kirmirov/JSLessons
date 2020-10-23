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
    stringFieldList = document.querySelectorAll('input[placeholder="Наименование"]'),
    amountFieldList = document.querySelectorAll('input[placeholder="Сумма"]'),
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

        start: () => {
            appData.getAddExpenses();
            appData.getExpenses();
            appData.getExpensesMonth();
            appData.getIncome();
            appData.getBudget();
            appData.getAddIncome();

            appData.showResult();
        },
        getAddExpenses: () => {
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach((item) => {
                item = item.trim();
                if(item !== ''){
                    appData.addExpenses.push(item);
                }
            });
        },
        getExpenses: () => {
            expensesItems.forEach((item) => {
                let itemExpenses = item.querySelector('.expenses-title').value;
                let amountExpenses = +item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && amountExpenses !== ''){
                    appData.expenses[itemExpenses] = amountExpenses;
                }
            });
        },
        getExpensesMonth: () =>  {
            for(let key in appData.expenses){
                appData.expensesMonth += appData.expenses[key];
            }
        },
        getIncome: () => {
            incomeItems.forEach((item) => {
                let itemIncome = item.querySelector('.income-title').value;
                let amountIncome = +item.querySelector('.income-amount').value;
                if(itemIncome !== '' && amountIncome !== ''){
                    appData.income[itemIncome] = amountIncome;
                }
            });
        },
        getBudget: () => {
            appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
            appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
        },
        getAddIncome: () => {
            incomeItemList.forEach((item) => {
                let itemValue = item.value.trim(); 
                if(itemValue !== ''){
                    appData.addIncome.push(itemValue);
                }
                for(let key in appData.addIncome){
                    appData.incomeMonth += appData.addIncome[key];
                }
            });
        },
        showResult: () => {
            valueInputList[0].value = appData.budgetMonth;
            valueInputList[1].value = appData.budgetDay;
            valueInputList[2].value = appData.expensesMonth; 
            valueInputList[3].value = appData.addIncome.join(', ');
            valueInputList[4].value = appData.addExpenses.join(', ');
            valueInputList[5].value = appData.calsSavedMoney();
            valueInputList[6].value = appData.getTargetMonth();
            periodSelect.addEventListener('input', () => {
                valueInputList[5].value = appData.budgetMonth * periodSelect.value;
            });
        },
        calsSavedMoney: () => {
            return appData.budgetMonth * periodSelect.value;
        },
        getTargetMonth: () => { 
            return Math.ceil(targetAmount.value / appData.budgetMonth);
        },
        addIncomeBlock: () => {
            let cloneIncomeItem = incomeItems[0].cloneNode(true);
            cloneIncomeItem.childNodes[1].addEventListener('input', () => {
                cloneIncomeItem.childNodes[1].value = cloneIncomeItem.childNodes[1].value.replace(/[^А-Яа-я,. ]/,'');
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
        addExpensesBlock: () => {
            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            cloneExpensesItem.childNodes[1].addEventListener('input', () => {
                cloneExpensesItem.childNodes[1].value = cloneExpensesItem.childNodes[1].value.replace(/[^А-Яа-я,. ]/,'');
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
        getRange: () => {
            rangeAmount.innerHTML = periodSelect.value;
        },
        isNumber: (value) => {
            return !isNaN(parseFloat(value)) && isFinite(value);
        },
        isEmpty: (str) => {
            return (!str || 0 === str.length);
        },
        hangListener: () => {
            appData.hangListenerForStr();
            appData.hangListenerForNumb();
        },
        hangListenerForStr: () => {
            for (let stringFild of stringFieldList) {
                stringFild.addEventListener('input', () => {
                    stringFild.value = stringFild.value.replace(/[^А-Яа-я,. ]/,'');
                });
            }
        },
        hangListenerForNumb: () => {
            for (let amountFild of amountFieldList) {
                amountFild.addEventListener('input', () => {
                    amountFild.value = amountFild.value.replace(/[^0-9]/,'');
                });
            }
        }
    };

appData.hangListener();

start.addEventListener('click', () => {
    appData.budget = +salaryAmount.value;
    if(appData.isNumber(appData.budget) && !appData.isEmpty(appData.budget)) appData.start();
    else salaryAmount.value = '';
});

plusExpensesBtn.addEventListener('click', appData.addExpensesBlock);
plusIncomeBtn.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getRange);