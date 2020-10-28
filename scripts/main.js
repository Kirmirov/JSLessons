
const startBtn = document.querySelector('#start'), //кнопка рассчитать
    cancelBtn = document.querySelector('#cancel'),
    plusIncomeBtn = document.getElementsByTagName('button')[0], // кнопка добавить ряд в секции доп заработок
    plusExpensesBtn = document.getElementsByTagName('button')[1], // кнопка добавить ряд в секции доп расходы
    depositCheck = document.querySelector('#deposit-check'), //чек-бокс депозит
    incomeItemList = document.querySelectorAll('.additional_income-item'),
    valueInputList = document.querySelectorAll('[class*="value"]'),
    salaryAmount = document.querySelector('input.salary-amount'),
    stringFieldList = document.querySelectorAll('input[placeholder="Наименование"]'),
    amountFieldList = document.querySelectorAll('input[placeholder="Сумма"]'),
    targetAmount = document.querySelector('input.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    rangeAmount = document.querySelector('.period-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item');

let incomeItems = document.querySelectorAll('.income-items'),
expensesItems = document.querySelectorAll('.expenses-items');

class AppData {
    constructor(){
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

    start () {
        if (salaryAmount.value === '') {
            startBtn.disabled = true;
            return;
        }
        this.budget = +salaryAmount.value;
        this.getExpInc();
        this.getExpensesMonth();
        this.getNamesIncExp();
        this.getBudget();
        this.showResult();
        this.blockInputText();
    };
    getNamesIncExp (){
        const count = item => {
            let itemsList;
            if(typeof item === "string"){
                item = item.trim();
                itemsList = this.addExpenses;
            }else {
                item = item.value.trim();
                itemsList = this.addIncome;
            }

            if (item !== '') {
                itemsList.push(item);
            }
        };
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(count);
        incomeItemList.forEach(count);
    };
    getExpInc () {
        const count = item => {
            const titleClass = item.className.split('-')[0];        
            const itemTitle = item.querySelector(`.${titleClass}-title`).value;
            const itemAmount = +item.querySelector(`.${titleClass}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[titleClass][itemTitle] = itemAmount;
            }
        }; 
        incomeItems.forEach(count);
        expensesItems.forEach(count);
        for (let key in this.income) {
            this.incomeMonth += this.income[key];
        }
    };
    getExpensesMonth () {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    };
    getBudget () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    };
    showResult () {
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
    calsSavedMoney () {
        return this.budgetMonth * periodSelect.value;
    };
    getTargetMonth () {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    };
    addPlusBlock (){
        const titleClass = this.parentNode.className.trim();
        let itemsList;
        if(titleClass === 'income') itemsList = incomeItems;
        else if (titleClass === 'expenses') itemsList = expensesItems;

        const cloneItem = itemsList[0].cloneNode(true);
        cloneItem.childNodes[1].addEventListener('input', () => {
            cloneItem.childNodes[1].value = cloneItem.childNodes[1].value.replace(/[^А-Яа-я,. ]/, '');
        });
        cloneItem.childNodes[3].addEventListener('input', () => {
            cloneItem.childNodes[3].value = cloneItem.childNodes[3].value.replace(/[^0-9]/, '');
        });
        cloneItem.querySelector(`.${titleClass}-title`).value = '';
        cloneItem.querySelector(`.${titleClass}-amount`).value = '';
        itemsList[0].parentNode.insertBefore(cloneItem, this);

        itemsList =  document.querySelectorAll(`.${titleClass}-items`);
        if (itemsList.length === 3) this.style.display = 'none';
    };
    resetAll () {
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
    blockInputText () {
        let inpitText = document.querySelectorAll('[type="text"]:not(.result-total)');
        inpitText.forEach(element => {
            element.disabled = true;
        });
        startBtn.style.display = 'none';
        cancelBtn.style.display = 'block';
    };
    getRange () {
        rangeAmount.innerHTML = periodSelect.value;
    };
    hangListener () {
        this.hangListenerForStr();
        this.hangListenerForNumb();
    };
    hangListenerForStr () {
        for (let stringFild of stringFieldList) {
            stringFild.addEventListener('input', function () {
                stringFild.value = stringFild.value.replace(/[^А-Яа-я,. ]/, '');
            });
        }
    };
    hangListenerForNumb () {
        for (let amountFild of amountFieldList) {
            amountFild.addEventListener('input', function () {
                amountFild.value = amountFild.value.replace(/[^0-9]/, '');
            });
        }
    };
    eventsListeners () {
        this.hangListener();
        startBtn.addEventListener('click', this.start.bind(this));
        cancelBtn.addEventListener('click', this.resetAll.bind(this));
        salaryAmount.addEventListener('input', function () {
            if (salaryAmount.value !== '') startBtn.disabled = false;
            else startBtn.disabled = true;
        });
        plusExpensesBtn.addEventListener('click', this.addPlusBlock);
        plusIncomeBtn.addEventListener('click', this.addPlusBlock);
        periodSelect.addEventListener('input', this.getRange.bind(this));
    };
};
const appData = new AppData ();
appData.eventsListeners();