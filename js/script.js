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
        if(target.classList.contains('todo-remove')) this.deleteItem(target.closest('.todo-item'), target.closest('.todo-item').key);
        if(target.classList.contains('todo-complete')) this.completedItem(target.closest('.todo-item'), target.closest('.todo-item').key);
        if(target.classList.contains('todo-edit')) {
            this.isEditTodo = true;
            this.editItem(target);
        }
    };
    deleteItem(selectedLi, selectedLiKey){
        this.animate ({
            duration: 400,
            timing(timeFraction) {
                return timeFraction;
            },
            draw(progress) {
                selectedLi.style.opacity = 1 - progress;
            }
        });
        
        this.todoData.delete(selectedLiKey);
        setTimeout(this.render.bind(this), 410);
    };
    completedItem(selectedLi, selectedLiKey){
        this.todoData.get(selectedLiKey).completed = this.todoData.get(selectedLiKey).completed ? false : true;
        if(this.todoData.get(selectedLiKey).completed){
            const parentList = selectedLi.closest('.todo-list');
            let selectedLiNumb = 0;
            for(let index in parentList.children) {
                if(parentList.children[index] == selectedLi) selectedLiNumb = +index;
            }
            const move = (Math.abs(selectedLiNumb - parentList.children.length) * 60) - 10;
            this.animate ({
                duration: 500,
                timing(timeFraction) {
                    return timeFraction;
                },
                draw(progress) {
                    selectedLi.style.zIndex = "9";
                    selectedLi.style.transform = `translateY(${move * progress}px)`;
                    }
                });
        } else {
            const parentList = selectedLi.closest('.todo-completed');
            let selectedLiNumb = 0 ;
            for(let index in parentList.children) {
                if(parentList.children[index] == selectedLi) selectedLiNumb = +index;
            }
            const move = 0 - ((selectedLiNumb + 1) * 60);
            console.log(selectedLiNumb);
            this.animate ({
                duration: 500,
                timing(timeFraction) {
                    return timeFraction;
                },
                draw(progress) {
                    selectedLi.style.zIndex = "9";
                    selectedLi.style.transform = `translateY(${move * progress}px)`;
                    }
                });
        }
        setTimeout(this.render.bind(this), 500);
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
        todoItem.completed ? this.todoCompleted.prepend(li) : this.todoList.prepend(li);
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
