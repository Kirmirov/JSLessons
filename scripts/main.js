window.addEventListener("DOMContentLoaded", () => {
    'use strict';

    import countTimer from ./modules/countTimer;
    import toggleMenu from ./modules/toggleMenu;
    import popupMenu from ./modules/popupMenu;
    import smoothScroll from ./modules/smoothScroll;
    import tabs from ./modules/tabs;
    import slider from ./modules/slider;
    import changeFotos from ./modules/changeFotos;
    import calculator from ./modules/calculator;
    import animate from ./modules/animate;
    import sendForm from ./modules/sendForm;
    // Timer
    countTimer('31 december 2020');
    // Header menu
    toggleMenu();
    // Popup menu
    popupMenu();
    //Smooth scroll
    smoothScroll();
    //Tabs menu
    tabs();
    //Slider
    slider();
    //Replacement fotos
    changeFotos();
    //Calculator
    calculator (5000);
    //Animation pattern
    //send form by ajax 
    sendForm('form1');
    sendForm('form2');
    sendForm('form3');
});