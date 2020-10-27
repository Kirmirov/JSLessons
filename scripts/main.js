const body = document.querySelector('body');

function DomElement (selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
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
    `;
    element.textContent = '!CREATE ME MASTER!';
    body.append(element);
};

let dom = new DomElement('#rahga', '60', '60', 'red', '30');
dom.createElem();

let dom2 = new DomElement('.lock', '80', '100', 'green', '20');
dom2.createElem();
