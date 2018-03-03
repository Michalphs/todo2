const TODO_LS_NAME = "To do app";


class Task {
    constructor(text) {
        this.text = text;
    }
}
class List {
    constructor() {
        this.tasks = [];
        this.getRootElements();
    }
    // getTasks() {
    //     const tasksFromLS = getTasksFromLS();
    //     const renderElements = this.getRootElements();
    //     console.log(tasksFromLS.length);
    //     tasksFromLS.forEach(task => {

    //         this.createTask(task.text);
    //         this.saveTasksToArr(task.text);
    //     });
    // }
    getRootElements() {
        const todoContainer = document.querySelector('.todo-task');
        const btnAddTask = document.createElement('button');
        const inputAddTask = document.createElement('input');

        inputAddTask.classList.add('todo-task-input');
        inputAddTask.setAttribute('name', 'input-new-task');
        inputAddTask.setAttribute('type', 'text');
        inputAddTask.setAttribute('placeholder', 'Enter your new todo task');

        btnAddTask.setAttribute('class', 'btn todo-task-btn fa fa-plus');
        btnAddTask.addEventListener('click', this.addNewTaskElemnt.bind(this));

        todoContainer.appendChild(inputAddTask);
        todoContainer.appendChild(btnAddTask);
    }

    saveTasksToArr(text) {
        this.tasks = [...this.tasks, new Task(text)];
        saveTasksToLS(this.tasks);
    }
    deleteTask(e) {
        e.target.parentNode.remove();
        this.tasks = [];
        const tasky = document.querySelectorAll('.todo-text');
        tasky.forEach(element => {
            this.tasks.push(new Task(element.textContent));
        });
        saveTasksToLS(this.tasks);
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
        const todoList = document.querySelector('.todo-list');
        const taskElement = this.createTaskElement();
        const taskText = this.createTaskText(value);
        const taskBtn = this.createTaskBtn();
        const addTaskToLS = this.saveTasksToArr(value);

        taskElement.appendChild(taskText);
        taskElement.appendChild(taskBtn);
        todoList.appendChild(taskElement);
    }
    addNewTaskElemnt() {
        const todoInput = document.querySelector('.todo-task-input');

        if (todoInput.value !== '') {
            this.createTask(todoInput.value);
            todoInput.value = '';
            todoInput.style.border = '1px solid lime';
        } else {
            todoInput.style.border = '1px solid #ff0000';
        }
    }
}

function getTasksFromLS() {
    return JSON.parse(localStorage.getItem(TODO_LS_NAME)) || [];
}

function saveTasksToLS(data) {
    const newData = JSON.stringify(data);
    localStorage.setItem(TODO_LS_NAME, newData);
}
const newTodo = new List();

const tasksFromLS = getTasksFromLS();
tasksFromLS.forEach(task => {
    newTodo.createTask(task.text);
});