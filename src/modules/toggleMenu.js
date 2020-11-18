const toggleMenu = () => {
    const menu = document.querySelector('menu');
    
    const actionMenu = () => menu.classList.toggle('active-menu');
    document.addEventListener('click', evt =>{
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

export default toggleMenu;