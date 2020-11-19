import smoothScroll from './smoothScroll';

const addCentralScroll = () => {
    const anchor = document.querySelector('a[href*="service-block"]');
    anchor.addEventListener('click', evt => smoothScroll(evt, anchor));
}

export default addCentralScroll;