'use strict'

const startBtn = document.getElementById('start'),
        selectFrom = document.getElementById('from'),
        selectTo = document.getElementById('to'),
        inputCash = document.getElementById('cash'),
        inputRezult = document.getElementById('rezult');

const start = () => {
    inputRezult.value = '';
    fetch('https://api.exchangeratesapi.io/latest')
    .then((response) => {
        if(response.status === 200){
            return (response.json());
        }
    })
    .then(response => calculate(response))
    .catch((err) => console.log(err));
};

const calculate = (response) => {   
    let currencyList = response.rates;
    let courseFrom = currencyList[selectFrom.value];
    let courseTo = currencyList[selectTo.value];
    if(selectTo.value === response.base) courseTo = 1;

    if(selectFrom.value == selectTo.value){
        inputRezult.value = inputCash.value;
    }else if (selectFrom.value === response.base) {
        inputRezult.value = (Math.ceil((inputCash.value * courseTo)*100)/100);
    }else{
        let course = inputCash.value * courseTo;
        inputRezult.value = (Math.ceil((course / courseFrom)*100)/100);
    }
        
    inputCash.value = '';
};

startBtn.addEventListener('click', start);