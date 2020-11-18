const changeFotos = () => {
    const comandSection = document.querySelector('.command');
    let oldSrc, target;
    comandSection.addEventListener('mouseover', evt => {
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

export default changeFotos;