const smoothScroll = () => {
    const anchor = document.querySelector('a[href*="service-block"]');
    anchor.addEventListener('click', evt => {
        evt.preventDefault();
        const blockID = anchor.getAttribute('href').substr(1);
        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};

export default smoothScroll;

