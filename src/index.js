    'use strict';

    import 'nodelist-foreach-polyfill';
    import "@babel/polyfill";
    import elementClosest from 'element-closest';
    elementClosest(window);
    import 'es6-promise';
    import 'fetch-polyfill';
    import 'formdata-polyfill';
    import "regenerator-runtime/runtime";
    import 'core-js';
    import 'url-polyfill';
    import 'element-remove';
    import 'dom-node-polyfills';
    import "scroll-behavior-polyfill";
    import 'whatwg-fetch';

    import countTimer from './modules/countTimer';
    import toggleMenu from './modules/toggleMenu';
    import popupMenu from './modules/popupMenu';
    import addCentralScroll from './modules/centralScroll';
    import tabs from './modules/tabs';
    import slider from './modules/slider';
    import changeFotos from './modules/changeFotos';
    import calculator from './modules/calculator';
    import sendForm from './modules/sendForm';
    // Timer
    countTimer('31 december 2020');
    // Header menu
    toggleMenu();
    // Popup menu
    popupMenu();
    //Smooth scroll
    addCentralScroll();
    //Tabs menu
    tabs();
    //Slider
    slider();
    //Replacement fotos
    changeFotos();
    //Calculator
    calculator (5000);
    //send form by ajax 
    sendForm('form1');
    sendForm('form2');
    sendForm('form3');
