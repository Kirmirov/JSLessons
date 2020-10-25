const bookList = document.querySelectorAll('.book'),
        headListBook2 = bookList[0].querySelectorAll('ul>li'),
        headListBook5 = bookList[5].querySelectorAll('ul>li'),
        headListBook6 = bookList[2].querySelectorAll('ul>li');

bookList[5].after(bookList[2]);
bookList[3].before(bookList[4]);
bookList[0].before(bookList[1]);

document.body.style = "background-image: url(./image/you-dont-know-js.jpg)";

bookList[4].querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';

document.querySelector('.adv').remove();

headListBook2[9].before(headListBook2[7]);
headListBook2[9].after(headListBook2[2]);
headListBook2[4].before(headListBook2[8]);
headListBook2[3].after(headListBook2[6]);

headListBook5[1].after(headListBook5[9]);
headListBook5[4].after(headListBook5[2]);
headListBook5[8].before(headListBook5[5]);

headListBook6[8].insertAdjacentHTML('afterend', '<li>Глава 8: За пределами ES6</li>');