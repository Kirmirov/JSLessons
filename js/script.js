'use strict';

class ToDo {
    constructor(form, input, todoList, todoCompleted, todoContainer) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted),
        this.todoContainer = document.querySelector(todoContainer),
        this.todoData = new Map (JSON.parse(localStorage.getItem('ToDo')));
    };
    init(){
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.todoContainer.addEventListener('click', this.handler.bind(this));
        this.render();
    };
    handler(e){
        let target = e.target;
        if(target.classList.contains('todo-remove')) this.deleteItem(target.closest('.todo-item').key);
        if(target.classList.contains('todo-complete')) this.completedItem(target.closest('.todo-item').key);
        if(target.classList.contains('todo-edit')) this.editItem(target, target.closest('.todo-item').key);
    };
    deleteItem(selectedItemKey){
        for(let itemKey of this.todoData.keys()){
            if(itemKey === selectedItemKey) this.todoData.delete(itemKey);
        }
        this.render();
    };
    completedItem(selectedItemKey){
        for(let itemKey of this.todoData.keys()){
            if(itemKey === selectedItemKey){
                this.todoData.get(itemKey).completed = this.todoData.get(itemKey).completed ? false : true;
            }
        }
        this.render();
    };
    editItem(editBtn, selectedItemKey){
        let selectedSpan = editBtn.closest('.todo-item').firstElementChild;
        selectedSpan.contentEditable = true;
        selectedSpan.focus();
        console.log(selectedSpan.textContent);
        this.todoContainer.addEventListener('click', (evt) => {
            if(evt.target !== selectedSpan){
                selectedSpan.contentEditable = false;
                for(let itemKey of this.todoData.keys()){
                    if(itemKey === selectedItemKey) 
                    this.todoData.get(itemKey).value = selectedSpan.textContent;
                }
            }
            this.render();
        });
        
    };
    addTodo(e){
        e.preventDefault();
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
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    };
    createItem(todoItem) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todoItem.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo" contenteditable="false">${todoItem.value}</span>
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
};

const toDo = new ToDo('.todo-control','.header-input', '.todo-list', '.todo-completed', '.todo-container');

toDo.init();
