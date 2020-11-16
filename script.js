document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    const getDate = () => {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', './cars.json');
            request.setRequestHeader('Content-type', 'application/json');
            request.send();
            resolve(request);
        });
    };

    const setListener = (request) =>{
        return new Promise((resolve, reject) => {
            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) return;
                if (request.status === 200) resolve(JSON.parse(request.responseText));
                else reject();
            });
        });
    };

    const showResult = (data) => {
        data.cars.forEach(item => {
            if (item.brand === select.value) {
                const {brand, model, price} = item;
                output.innerHTML = `Тачка ${brand} ${model} <br>
                Цена: ${price}$`;
            }
        });
    };

    select.addEventListener('change', () => {
        getDate()
        .then(request => setListener(request))
        .then(data => showResult(data))
        .catch(output.innerHTML = 'Произошла ошибка');
    });

});