const body = document.querySelector('body');

function DomElement (selector, height, width, bg, fontSize, position) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.position = position;
};

DomElement.prototype.createElem = function (){
    let element;
    if(this.selector[0] == '.'){
        element = document.createElement('div');
        element.classList.add(this.selector.slice(1));
    } else if (this.selector[0] == '#'){
        element = document.createElement('p');
        element.classList.add(this.selector.slice(1));
    }
    element.style.cssText = `
    height:  ${this.height}px;
    width:  ${this.width}px;
    background:  ${this.bg};
    font-size:  ${this.fontSize}px;
    position: ${this.position};
    `;
    element.textContent = '!MOVE ME MASTER!';
    body.append(element);
};

DomElement.prototype.movement = function (){
    document.addEventListener('keydown', function (event) {
        const square = document.querySelector('div');
        let squareLeft = parseInt(square.style.left);
        let squareTop = parseInt(square.style.top);
        if (!isNaN(square.style.left)) squareLeft = 0;
        if (!isNaN(square.style.top)) squareTop = 0;
        if (event.code == 'ArrowLeft') {
            squareLeft += -10;
            square.style.left = squareLeft + 'px';  
        } else if (event.code == 'ArrowUp') {
            squareTop += -10;
            square.style.top = squareTop + 'px';
        } else if (event.code == 'ArrowRight') {
            squareLeft += +10;
            square.style.left = squareLeft + 'px';
        } else if (event.code == 'ArrowDown') {
            squareTop += 10;
            square.style.top = squareTop + 'px';
        }
    });
}
document.addEventListener("DOMContentLoaded", function() {
    const Dom = new DomElement('.charg', '100', '100', 'red', '20', 'absolute');
    Dom.createElem();
    Dom.movement();
});
