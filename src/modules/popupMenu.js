const popupMenu = () => {
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupClose = document.querySelector('.popup-close');
        
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
    popup.addEventListener('click', evt => {
        let target = evt.target;
        target = target.closest('.popup-content');
        if(!target) popup.style.display = 'none';
    });
};

export default popupMenu;