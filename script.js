'use strict'

const startBtn = document.getElementById('start'),
        selectFrom = document.getElementById('from'),
        selectTo = document.getElementById('to'),
        inputCash = document.getElementById('cash'),
        inputRezult = document.getElementById('rezult');

// const start = () => {
//     const getCurrencyList = () => {
//         return fetch('https://api.exchangeratesapi.io/latest')
//     };
//     const calculate = () => {
//         if(selectFrom.value == selectTo.value){
//             inputRezult.value = inputCash.value;
//         }
//         if(selectFrom.value !== 'RUB'){ // Если не равны рублю, то
//             courseRu = inputCash.value * currencyList[selectFrom.value]; // Переводим сумму в рубли
//             inputRezult.value = Math.ceil((courseRu / currencyList[selectTo.value])*100)/100; // Делим на курс и округляем до сотых
//         } else { // Если не равны
//             inputRezult.value = Math.ceil((inputCash.value * currencyList[selectTo.value])*100)/100; // Умножаем на курс и округляем до сотых
//         }
//     };
//     calculate();
// };

const getCurrencyList = () => {
    fetch('https://api.exchangeratesapi.io/latest')
    .then((response) => {
        if(response.status === 200){
            return response.json();
        }
    }).then((response) => console.log(response))
    .catch((err) => console.log(err));
};


startBtn.addEventListener('click', getCurrencyList);

