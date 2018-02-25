const TODO_LS_NAME = "To do app";
const todoList = document.querySelector('.todo-list');
const addTaskBtn = document.querySelector('.todo-task-btn');
const deleteTaskBtn = document.querySelectorAll('.btn-todo-item-delete');

class Task {
    constructor(text) {
        this.text = text;
    }
    getRootElement() {
        const taskElement = document.createElement('li');
        taskElement.classList.add('todo-text');
        taskElement.textContent = `${this.text}`;
        return taskElement;
    }
}

class List {
    constructor(task, btn) {
        this.Task = task;
        this.tasks = [];
        btn.addEventListener('click', this.addNewTaskHandler.bind(this));
        document.addEventListener("DOMContentLoaded", this.renderTasks.bind(this));
    }
    deleteTask(e) {
        e.target.parentNode.remove();
        this.tasks = [];
        const tasky = document.querySelectorAll('.todo-text');
        tasky.forEach(element => {
            this.tasks.push(new this.Task(element.textContent));
            
           
        });
        this.saveTasksToLS(this.tasks);
    }
    renderTasks() {
        const tasksFromLS = this.getTasksFromLS();
        tasksFromLS.forEach(task => {
            this.addNewTask(task.text);
        });
    }
    getTasksFromLS() {
        return JSON.parse(localStorage.getItem(TODO_LS_NAME)) || [];
    }
    saveTasksToLS(data) {
        const newData = JSON.stringify(data);
        localStorage.setItem(TODO_LS_NAME, newData);
    }
    createTaskBtn() {
        const taskBtn = document.createElement('button');
        taskBtn.setAttribute('class', 'btn fa fa-times btn-todo-item-delete');
        taskBtn.setAttribute('aria-hidden', 'true');
        taskBtn.addEventListener('click', this.deleteTask.bind(this));
        return taskBtn;
    }
    createTaskText(value) {
        const taskText = document.createElement('span');
        taskText.textContent = value;
        taskText.classList.add('todo-text');
        return taskText;
    }
    createTaskElement() {
        const taskElement = document.createElement('li');
        taskElement.classList.add('todo-item');
        return taskElement;
    }
    createTask(value) {
        const taskElement = this.createTaskElement();
        const taskText = this.createTaskText(value);
        const taskBtn = this.createTaskBtn();

        taskElement.appendChild(taskText);
        taskElement.appendChild(taskBtn);
        todoList.appendChild(taskElement);
    }
    addNewTask(text) {
        this.tasks = [...this.tasks, new this.Task(text)];
        this.saveTasksToLS(this.tasks);
        this.createTask(text);
    }
    addNewTaskHandler() {
        const todoInput = document.querySelector('.todo-task-input');
        if (todoInput.value !== '') {
            this.addNewTask(todoInput.value);
            todoInput.value = '';
            todoInput.style.border = '1px solid lime';
        } else {
            todoInput.style.border = '1px solid #ff0000';
        }
    }
}

const newToDo = new List(Task, addTaskBtn);