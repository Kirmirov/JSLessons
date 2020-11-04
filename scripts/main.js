const input = document.querySelector('input'),
        p = document.querySelector('#ppp');

input.addEventListener('input', debounce(setText, 300));

function debounce (fn, time) {
    let timeout;
    return function() {
        let self = this;
        const functionCall = function() {
            return fn.apply(self, arguments);
        };
        clearTimeout(timeout);
        timeout = setTimeout(functionCall, time);
    }
};

function setText (){
    p.innerHTML = input.value;
}