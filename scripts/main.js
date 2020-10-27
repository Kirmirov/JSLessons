
const startBtn = document.querySelector('#start'), //кнопка рассчитать
    cancelBtn = document.querySelector('#cancel'),
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
    additionalExpensesItem = document.querySelector('.additional_expenses-item');

const AppData = function () {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
};

AppData.prototype.start = function () {
    if (salaryAmount.value === '') {
        startBtn.disabled = true;
        return;
    }
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
    this.blockInputText();
};
AppData.prototype.getAddExpenses = function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
        item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getExpenses = function () {
    expensesItems.forEach((item) => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let amountExpenses = +item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && amountExpenses !== '') {
            this.expenses[itemExpenses] = amountExpenses;
        }
    });
};
AppData.prototype.getExpensesMonth = function () {
    for (let key in this.expenses) {
        this.expensesMonth += this.expenses[key];
    }
};
AppData.prototype.getIncome = function () {
    incomeItems.forEach((item) => {
        let itemIncome = item.querySelector('.income-title').value;
        let amountIncome = +item.querySelector('.income-amount').value;
        if (itemIncome !== '' && amountIncome !== '') {
            this.income[itemIncome] = amountIncome;
        }
    });
    for (let key in this.income) {
        this.incomeMonth += this.income[key];
    }
};
AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
};
AppData.prototype.getAddIncome = function () {
    incomeItemList.forEach((item) => {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.showResult = function () {
    valueInputList[0].value = this.budgetMonth;
    valueInputList[1].value = this.budgetDay;
    valueInputList[2].value = this.expensesMonth;
    valueInputList[3].value = this.addIncome.join(', ');
    valueInputList[4].value = this.addExpenses.join(', ');
    valueInputList[5].value = this.calsSavedMoney();
    valueInputList[6].value = this.getTargetMonth();
    periodSelect.addEventListener('input', () => {
        valueInputList[5].value = this.budgetMonth * periodSelect.value;
    });
};
AppData.prototype.calsSavedMoney = function () {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.getTargetMonth = function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
};
AppData.prototype.addIncomeBlock = function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.childNodes[1].addEventListener('input', () => {
        cloneIncomeItem.childNodes[1].value = cloneIncomeItem.childNodes[1].value.replace(/[^А-Яа-я,. ]/, '');
    });
    cloneIncomeItem.childNodes[3].addEventListener('input', () => {
        cloneIncomeItem.childNodes[3].value = cloneIncomeItem.childNodes[3].value.replace(/[^0-9]/, '');
    });
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusIncomeBtn);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
        plusIncomeBtn.style.display = 'none';
    }
};
AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.childNodes[1].addEventListener('input', () => {
        cloneExpensesItem.childNodes[1].value = cloneExpensesItem.childNodes[1].value.replace(/[^А-Яа-я,. ]/, '');
    });
    cloneExpensesItem.childNodes[3].addEventListener('input', () => {
        cloneExpensesItem.childNodes[3].value = cloneExpensesItem.childNodes[3].value.replace(/[^0-9]/, '');
    });
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpensesBtn);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        plusExpensesBtn.style.display = 'none';
    }
},
AppData.prototype.resetAll = function () {
    let inputText = document.querySelectorAll('[type="text"]:not(.result-total)');
    let inputAll = document.querySelectorAll('input:not(.period-select)');
    startBtn.disabled = false;

    inputAll.forEach(element => {
        element.value = '';
    });
    inputText.forEach(element => {
        element.disabled = false;
    });

    this.budget = 0;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.incomeMonth = 0;
    this.deposit = false;
    this.persentDeposite = 0;
    this.moneyDeposite = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;

    startBtn.style.display = 'block';
    cancelBtn.style.display = 'none';
    periodSelect.value = 1;
    rangeAmount.textContent = periodSelect.value;

    expensesItems.forEach((item, k) => {
        if (k !== 0) item.remove();
    });
    plusExpensesBtn.style.display = 'block';

    incomeItems.forEach((item, k) => {
        if (k !== 0) item.remove();
    });
    plusIncomeBtn.style.display = 'block';
};
AppData.prototype.blockInputText = function () {
    let inpitText = document.querySelectorAll('[type="text"]:not(.result-total)');

    inpitText.forEach(element => {
        element.disabled = true;
    });
    startBtn.style.display = 'none';
    cancelBtn.style.display = 'block';
};
AppData.prototype.getRange = function () {
    rangeAmount.innerHTML = periodSelect.value;
};
AppData.prototype.hangListener = function () {
    this.hangListenerForStr();
    this.hangListenerForNumb();
};
AppData.prototype.hangListenerForStr = function () {
    for (let stringFild of stringFieldList) {
        stringFild.addEventListener('input', function () {
            stringFild.value = stringFild.value.replace(/[^А-Яа-я,. ]/, '');
        });
    }
};
AppData.prototype.hangListenerForNumb = function () {
    for (let amountFild of amountFieldList) {
        amountFild.addEventListener('input', function () {
            amountFild.value = amountFild.value.replace(/[^0-9]/, '');
        });
    }
};

AppData.prototype.eventsListeners = function () {
    this.hangListener();
    startBtn.addEventListener('click', this.start.bind(this));
    cancelBtn.addEventListener('click', this.resetAll.bind(this));
    salaryAmount.addEventListener('input', function () {
        if (salaryAmount.value !== '') startBtn.disabled = false;
        else startBtn.disabled = true;
    });
    plusExpensesBtn.addEventListener('click', this.addExpensesBlock);
    plusIncomeBtn.addEventListener('click', this.addIncomeBlock);
    periodSelect.addEventListener('input', this.getRange.bind(this));
};

const appData = new AppData ();
appData.eventsListeners();
