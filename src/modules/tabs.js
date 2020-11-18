const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = index => {
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

    tabHeader.addEventListener('click', evt => {
        let target = evt.target;
        target = target.closest('.service-header-tab');
        if(target){
            tab.forEach((elem, index) => {
                if(target === elem) toggleTabContent(index);
            });
        };
    });
};

export default tabs;