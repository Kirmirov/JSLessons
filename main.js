const switchBtn = document.querySelector('.switch'),
        board = document.querySelector('.board');

function switchColor(){
    let r, g, b;
    r = Math.floor(Math.random() * (256));
    g = Math.floor(Math.random() * (256));
    b = Math.floor(Math.random() * (256));
    let color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
    document.querySelector('body').style.backgroundColor = color;
    board.textContent = color;
    switchBtn.style.backgroundColor = color;
}

switchBtn.addEventListener('click', switchColor);