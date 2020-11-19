const sendForm = elementId => {
    const erroMessage = 'Что то пошло не так...',
        successMesage = 'Спасибо! Мы скоро свяжемся с Вами!';
    //Validation form
    const numberLimit = (elem) =>{
        elem.addEventListener('focusout', () => {
            if (!/\+?[78](\d){10}/g.test(elem.value)) elem.value = '';
        });
        elem.addEventListener('input', () => {
            elem.value = elem.value.replace(/[^+0-9]/,'');
            if (!/^\+?(\d){0,11}$/g.test(elem.value)) {
                elem.value = elem.value.substring(0, elem.value.length - 1);
            }
        }); 
    };

    const setValidation = validatedForm => {
            [...validatedForm].forEach(elem => {
                if(elem.tagName === 'INPUT'){
                    switch(elem.name){
                        case 'user_name': elem.addEventListener('input',
                            () => elem.value = elem.value.replace(/[^А-Яа-яЁё ]/,''));
                            break;
                        case 'user_email': elem.addEventListener('input',
                            () => elem.value = elem.value.replace(/[^\w@.]/,''));
                            break;
                        case 'user_phone': numberLimit(elem);
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
    form.addEventListener('submit', evt => {
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

    const getBody = form => {
        return new Promise ((resolve, reject) => {
            const formData = new FormData(form);
            let body = {};
            for (let val of formData.entries()){
                body[val[0]] = val[1];
            }
            if(body.length !== 0) resolve(body);
            else reject('Form is empty');
        });
    };
    const postData = body => {
        return new Promise ((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(body));
            request.addEventListener('readystatechange', () =>{
                if(request.readyState !== 4) return;
                if(request.status === 200) resolve();
                else reject('Error');
            });
        });
    }
};

export default sendForm;