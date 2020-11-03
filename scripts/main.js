window.addEventListener("DOMContentLoaded", () => {
    'use strict';

    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
    
    function getTimeRemaning(){
        let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60) / 24;
        return {timeRemaining, hours, minutes, seconds};
    }

    function formatTime(data) {
        if (data < 10) return '0' + data;
        else return data;
    }

    let timerId = setInterval( () => {    
        let timer = getTimeRemaning();
        timerHours.style.color = 'red';
        timerMinutes.style.color = 'red';
        timerSeconds.style.color = 'red';
        timerHours.textContent = formatTime(timer.hours);
        timerMinutes.textContent = formatTime(timer.minutes);
        timerSeconds.textContent = formatTime(timer.seconds);
        
        if (timer.timeRemaining < 0) {
            clearInterval(timerId);
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
        }
    }, 1000);

    };
    countTimer('31 december 2019');

});