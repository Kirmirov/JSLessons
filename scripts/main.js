window.addEventListener("DOMContentLoaded", () => {
    'use strict';
    // Timer
    const countTimer = (deadline) => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
    
    const getTimeRemaning = () => {
        let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
        return {timeRemaining, hours, minutes, seconds};
    };

    const formatTime = (data) => {
        if (data < 10) return '0' + data;
        else return data;
    };

    const timerId = setInterval( () => {    
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
    const toggleMenu = () => {
        const menu = document.querySelector('menu');
        
        const actionMenu = () => menu.classList.toggle('active-menu');
        document.addEventListener('click', (evt) =>{
            let target = evt.target;
            if(target.closest('.menu')){
                actionMenu();
                return;
            } 
            if(target.classList.contains('close-btn')) {
                actionMenu();
                return;
            } 
            if(target.matches('menu a')){
                smoothScroll(evt, target);
                actionMenu();
            } 
            if(!target.closest('menu')) menu.classList.remove('active-menu');
        });
    };
    toggleMenu();
    // Popup menu
    const popupMenu = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close');
        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                if (document.documentElement.clientWidth > 768){
                    animation ();
                }
            });
        });
        
        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        const animation = () => {
            const popupContent = popup.querySelector('.popup-content');
            popupContent.style.opacity = '0';
            let step = 0;
            const popupAnimation = () => {
                step += 0.05;
                popupContent.style.opacity = step;
                const myReq = requestAnimationFrame(popupAnimation);
                if(step === 1){
                    cancelAnimationFrame(myReq);
                } 
            }
            popupAnimation();
        };

        popup.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.popup-content');
            if(!target) popup.style.display = 'none';
        });

    };
    popupMenu();
    //Smooth scroll
    function smoothScroll (event, elem) {
        event.preventDefault();
        const blockID = elem.getAttribute('href').substr(1);
        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    const anchor = document.querySelector('a[href*="service-block"]');
    anchor.addEventListener('click', (evt) => {
        smoothScroll(evt, anchor);
    });
    //Tabs menu
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
                tab = tabHeader.querySelectorAll('.service-header-tab'),
                tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            tabContent.forEach((eContent, iContent) => {
                if(iContent === index){
                    tab[iContent].classList.add('active');
                    eContent.classList.remove('d-none');
                } else {
                    tab[iContent].classList.remove('active');
                    eContent.classList.add('d-none');
                }
            });
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if(target){
                tab.forEach((elem, index) => {
                    if(target === elem) toggleTabContent(index);
                });
            };
        });
    };
    tabs();
    //Slider
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            dotsList = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');
        
        slide.forEach((e, index) => {
            dotsList.insertAdjacentHTML('beforeend', 
            `<li class="dot ${index === 0 ? 'dot-active' : ''}"></li>`);
        });

        const dot = document.querySelectorAll('.dot');

        const prewSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };
    
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        let currentSlide = 0;
        const autoPlaySlide = () => {

            prewSlide(slide, currentSlide, 'portfolio-item-active');
            prewSlide(dot, currentSlide, 'dot-active');

            currentSlide++;
            if (currentSlide >= slide.length) currentSlide = 0;

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        let interval;
        const startSlide = (time = 15000) => {
            interval = setInterval(autoPlaySlide, time);
        };
        
        const stopSlide = () => {
            clearInterval(interval);
        };
    
        slider.addEventListener('click', (evt) => {
            evt.preventDefault();
            let target = evt.target;
    
            if (!target.matches('.portfolio-btn, .dot')) return;
            
            prewSlide(slide, currentSlide, 'portfolio-item-active');
            prewSlide(dot, currentSlide, 'dot-active');
    
            if (target.matches('#arrow-right')) currentSlide++;
            else if (target.matches('#arrow-left')) currentSlide--;
            else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) currentSlide = index;
                });
            }

            if (currentSlide >= slide.length) currentSlide = 0;
            if (currentSlide < 0) currentSlide = slide.length - 1;

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });
    
        slider.addEventListener('mouseover', (evt) => {
            if (evt.target.matches('.portfolio-btn') || 
                evt.target.matches('.dot')) stopSlide();
        
        });

        slider.addEventListener('mouseout', (evt) => {
            if (evt.target.matches('.portfolio-btn') || 
                evt.target.matches('.dot')) startSlide();
        });
        startSlide(1800);
    };
    slider();
});