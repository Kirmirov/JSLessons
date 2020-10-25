'use strict'

const todoControl = document.querySelector('.todo-control'),
        headerInput = document.querySelector('.header-input'),
        todoList = document.querySelector('.todo-list'),
        todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

render();

function render (){
    if(JSON.parse(localStorage.getItem("todoData")).length !== 0){
        todoData = JSON.parse(localStorage.getItem("todoData"));
    }
    todoList.textContent = '';
    todoCompleted.textContent = '';
    todoData.forEach((item) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">'+ item.value +'</span>' +
        '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
        '</div>';
        if(item.completed) todoCompleted.append(li);
        else todoList.append(li);
        hangListenerForCompletBtn(item, li);
        hangListenerForDeletBtn(li);
    });
};

function hangListenerForCompletBtn (item, elementHTML){
    const todoCompletedBtn = elementHTML.querySelector('.todo-complete');
    todoCompletedBtn.addEventListener('click', () => {
        item.completed = !item.completed;
        localStorage.setItem('todoData', JSON.stringify(todoData));
        render();
    });
};

function hangListenerForDeletBtn (elementHTML){
    const todoRemoveBtn = elementHTML.querySelector('.todo-remove');
    todoRemoveBtn.addEventListener('click', () => {
        let textTodo = todoRemoveBtn.closest('li.todo-item').querySelector('.text-todo').textContent;
        todoData.forEach((i) => {
            if(i.value == textTodo){
                todoData.splice(todoData.indexOf(item), 1);
                localStorage.setItem('todoData', JSON.stringify(todoData));
                render();
            }
        });
    });
}

todoControl.addEventListener('submit', (e) => {
    e.preventDefault();
    if(headerInput.value === '') return;
    else{
        const newTodo = {
            value: headerInput.value,
            completed: false
        }
        todoData.push(newTodo);
        localStorage.setItem('todoData', JSON.stringify(todoData));
        headerInput.value = '';
        render();
    }
});

