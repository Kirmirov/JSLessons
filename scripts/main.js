window.addEventListener("DOMContentLoaded", () => {
    'use strict';
    // Timer
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
            hours = Math.floor(timeRemaining / 60 / 60);
        return {timeRemaining, hours, minutes, seconds};
    }

    function formatTime(data) {
        if (data < 10) return '0' + data;
        else return data;
    }

    let timerId = setInterval( () => {    
        let timer = getTimeRemaning();
        timerHours.textContent = formatTime(timer.hours);
        timerMinutes.textContent = formatTime(timer.minutes);
        timerSeconds.textContent = formatTime(timer.seconds);
        
        if (timer.timeRemaining < 0) {
            clearInterval(timerId);
            timerHours.style.color = 'red';
            timerMinutes.style.color = 'red';
            timerSeconds.style.color = 'red';
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
        }
    }, 1000);

    };
    countTimer('31 december 2020');
    // Header menu
    function toggleMenu () {
        const btnMenu = document.querySelector('.menu');
        const menu = document.querySelector('menu');
        const closeBtn = document.querySelector('.close-btn');
        const menuItem = menu.querySelectorAll('ul>li');
        
        function actionMenu (){
            menu.classList.toggle('active-menu');
        }

        btnMenu.addEventListener('click', actionMenu);
        closeBtn.addEventListener('click', actionMenu);

        menuItem.forEach((elem) => {
            elem.addEventListener('click', actionMenu);
        });
    };
    toggleMenu();
    // Popup menu
    function popupMenu (){
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close');

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                if (document.documentElement.clientWidth > 768){
                    popupMove ();
                }
            });
        });
        
        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        function popupMove (){
            let start = Date.now();
            const popupContent = popup.querySelector('.popup-content');
            popupContent.style.top = '0';
            let timer = setInterval(function() {
                let timePassed = Date.now() - start;
                popupContent.style.top = timePassed / 10 + 'px';
                if (timePassed > 1500) clearInterval(timer);
            }, 20);
        }
    };
    popupMenu();
    //Smooth scrol
    const anchor = document.querySelector('a[href*="service-block"]');
    anchor.addEventListener('click', (event) => {
        event.preventDefault();
        const blockID = anchor.getAttribute('href').substr(1);
        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});