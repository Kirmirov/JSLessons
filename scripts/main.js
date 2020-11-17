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
            hours = Math.floor((timeRemaining / 60 / 60)/24);
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
                if (document.documentElement.clientWidth > 768){ // disabling animation when the display is small
                    const popupContent = popup.querySelector('.popup-content');
                    animate ({
                        duration: 400,
                        timing(timeFraction) {
                            return timeFraction;
                        },
                        draw(progress) {
                            popupContent.style.opacity = progress * 1;
                        }
                    });
                }
            });
        });
        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
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
    };
    const anchor = document.querySelector('a[href*="service-block"]');
    anchor.addEventListener('click', evt => smoothScroll(evt, anchor));
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

        const prewSlide = (elem, index, strClass) => elem[index].classList.remove(strClass);
    
        const nextSlide = (elem, index, strClass) => elem[index].classList.add(strClass);

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
        const startSlide = (time = 15000) => interval = setInterval(autoPlaySlide, time);
        
        const stopSlide = () => clearInterval(interval);
    
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
    //Replacement fotos
    const changeFotos = () => {
        const comandSection = document.querySelector('.command');
        let oldSrc, target;
        comandSection.addEventListener('mouseover', (evt) => {
            target = evt.target;
            if(target.classList.contains('command__photo')){
                oldSrc = target.src;
                target.src = target.dataset.img;
            }
        });
        comandSection.addEventListener('mouseout', () => {
            if(target.classList.contains('command__photo')) target.src = oldSrc;
        });
    };
    changeFotos();
    //Calculator
    const calcValidate = () => {
        const calcInputs = document.querySelectorAll('input.calc-item');
    
        calcInputs.forEach(item => item.addEventListener('input', () => item.value = item.value.replace(/\D/g, '')));
    };
    calcValidate();

    const calculator = (price = 1000) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');
    
        const countSum = () => {
            let total = 0,
            countValue = 1,
            dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;
    
            if (calcCount.value > 1) countValue += (calcCount.value - 1) / 10;
            if (calcDay.value && calcDay.value < 5) dayValue *= 2;
            else if (calcDay.value && calcDay.value < 10) dayValue *= 1.5;
            if (typeValue && squareValue) total = price * typeValue * countValue * dayValue;
            
            animate ({
                duration: 500,
                timing(timeFraction) {
                    return timeFraction;
                },
                draw(progress) {
                    totalValue.textContent = Math.floor(progress * total);
                }
            });
        };
        calcBlock.addEventListener('change', evt => {
            const target = evt.target;
            if (target.matches('select') || target.matches('input')) countSum();
        });
    };
    calculator (5000);
    //Animation pattern
    const animate = ({timing, draw, duration}, callback) => {
        let start = performance.now();
        requestAnimationFrame(function animate(time) {
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;
            let progress = timing(timeFraction);
            draw(progress); 
            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
        });
    };
    const sendForm = (elementId) => {
        const erroMessage = 'Что то пошло не так...',
            loadMessage = 'Загрузка...',
            successMesage = 'Спасибо! Мы скоро свяжемся с Вами!';
        //Validation form
        const setValidation = (validatedForm) =>{
                [...validatedForm].forEach((elem)=>{
                    if(elem.tagName === 'INPUT'){
                        switch(elem.name){
                            case 'user_name': elem.addEventListener('input',
                                () => elem.value = elem.value.replace(/[^А-Яа-яЁё ]/,''));
                                break;
                            case 'user_email': elem.addEventListener('input',
                                () => elem.value = elem.value.replace(/[^\w@.]/,''));
                                break;
                            case 'user_phone': elem.addEventListener('input',
                                () => elem.value = elem.value.replace(/[^0-9+]/,''));
                                break;
                            case 'user_message':elem.addEventListener('input',
                                () => elem.value = elem.value.replace(/[^А-Яа-яЁё., ]/,''));
                                break;
                        default: console.error('Не верно названы поля формы!');
                    }
                }
            });
        };
            
        const form = document.getElementById(elementId);
        setValidation(form);
        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem;';
        statusMessage.style.color = '#fff';
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.insertAdjacentHTML('beforeend', `
                <div class='loadingio-spinner-pulse-vurmag0hkuj'>
                    <div class='ldio-3ckt5h1dy4j'>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            `);

            getBody(form)
            .then(body => postData(body))
            .then(() => {
                statusMessage.textContent = successMesage;
                form.reset();
                setTimeout(()=>{
                    statusMessage.textContent = '';
                }, 5000);
            }, () => {
                statusMessage.textContent = erroMessage;
                form.reset();
                setTimeout(()=>{
                    statusMessage.textContent = '';
                }, 5000);
            }).catch(error => console.error(error));
        });

        const getBody = (form) => {
            return new Promise ((resolve, reject) => {
                const formData = new FormData(form);
                let body = {};
                for (let val of formData.entries()){
                    body[val[0]] = val[1];
                }
                resolve(body);
            });
        };
        const postData = (body) => {
            return new Promise ((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.open('POST', './server.php');
                request.setRequestHeader('Content-Type', 'application/json');
                request.send(JSON.stringify(body));
                request.addEventListener('readystatechange', () =>{
                    if(request.readyState !== 4) return;
                    if(request.status === 200) resolve();
                    else reject();
                });
            });
            
        }

    };
    sendForm('form1');
    sendForm('form2');
    sendForm('form3');
});