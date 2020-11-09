'use strict';

class ToDo {
    constructor(form, input, todoList, todoCompleted, todoContainer) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted),
        this.todoContainer = document.querySelector(todoContainer),
        this.isEditTodo = false;
        this.todoData = new Map (JSON.parse(localStorage.getItem('ToDo')));
    };
    init(){
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.todoContainer.addEventListener('click', this.handler.bind(this));
        document.addEventListener('keydown', (evt) => {
            if(evt.code === 'Enter' && this.isEditTodo) {
                evt.preventDefault();
                this.saveEdit();
                }
        });
        this.render();
    };
    handler(evt){
        let target = evt.target;
        if(this.isEditTodo && target){
            this.saveEdit();
            return;
        }
        if(target.classList.contains('todo-remove')) this.deleteItem(target);
        if(target.classList.contains('todo-complete')) this.completedItem(target);
        if(target.classList.contains('todo-edit')) {
            this.isEditTodo = true;
            this.editItem(target);
        }
    };
    deleteItem(deleteBtn){
        const selectedLi = deleteBtn.closest('.todo-item');
        const selectedLiKey = selectedLi.key;
        this.animate ({
            duration: 2000,
            timing(timeFraction) {
                return timeFraction;
            },
            draw(progress) {
                selectedLi.style.opacity = 1 - progress;
            }
        });
        
        this.todoData.delete(selectedLiKey);
        setTimeout(this.render, 2100);
    };
    completedItem(selectedLiKey){
        const selectedLi = deleteBtn.closest('.todo-item');
        const selectedLiKey = selectedLi.key;
        this.todoData.get(selectedLiKey).completed = this.todoData.get(selectedLiKey).completed ? false : true;
        if(this.todoData.get(selectedLiKey).completed){
            this.animate ({
                duration: 2000,
                timing(timeFraction) {
                    return timeFraction;
                },
                draw(progress) {
                    selectedLi.style.opacity = 1 - progress;
                }
            });
        }
        this.render();
    };
    editItem(editBtn){ 
        const selectedSpan = editBtn.closest('.todo-item').firstElementChild;
        selectedSpan.contentEditable = true;
        selectedSpan.focus();
    };
    saveEdit(){
        const todoItemEdit = document.querySelectorAll('.text-todo');
        todoItemEdit.forEach((selectedSpan) => {
            if(selectedSpan.isContentEditable){
                const selectedLiKey = selectedSpan.closest('.todo-item').key;
                selectedSpan.contentEditable = false;
                this.todoData.get(selectedLiKey).value = selectedSpan.textContent;
                this.render();
            }
        });
    };
    addTodo(evt){
        evt.preventDefault();
        if(this.input.value.trim()){
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            }
            this.todoData.set(newTodo.key, newTodo);
            this.input.value = '';
            this.render();
        }
    };
    generateKey(){
        return '_' + Math.random().toString(36).substr(2, 9);
    };
    render (){
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.isEditTodo = false;
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    };
    createItem(todoItem) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todoItem.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todoItem.value}</span>
            <div class="todo-buttons">
                <button class="todo-edit"></button>
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);
        todoItem.completed ? this.todoCompleted.append(li) : this.todoList.append(li);
    };
    addToStorage() {
        localStorage.setItem('ToDo', JSON.stringify([...this.todoData]));
    };
    animate ({timing, draw, duration}, callback) {
        let start = performance.now();
        requestAnimationFrame(function animate(time) {
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;
            let progress = timing(timeFraction);
            draw(progress); 
            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
        });
    };
};

const toDo = new ToDo('.todo-control','.header-input', '.todo-list', '.todo-completed', '.todo-container');

toDo.init();
