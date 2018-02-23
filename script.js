const TODO_LS_NAME = "To do app";

const todoList = document.querySelector('.todo-list');
const todoInput = document.querySelector('.todo-task-input');
const addTaskBtn = document.querySelector('.todo-task-btn');
const deleteTaskBtn = document.querySelectorAll('.btn-todo-item-delete');

class Task {
    constructor(text) {
        this.text = text;
    }
}

function getTaskFromLS() {
    return JSON.parse(localStorage.getItem(TODO_LS_NAME)) || [];
}

function saveTaskToLS(data) {
    const newData = JSON.stringify(data);
    localStorage.setItem(TODO_LS_NAME, newData);
}

function createTaskButton() {
    const btn = document.createElement('button');
    btn.setAttribute('class', 'btn fa fa-times btn-todo-item-delete');
    btn.setAttribute('aria-hidden', true);
    btn.addEventListener('click', deleteTask);
    return btn;
}
function createTaskText(text) {
    const div = document.createElement('span');
    div.textContent = `${text}`;
    div.classList.add('todo-text');
    return div;
}
function createTaskElement(text) {
    const task = document.createElement('li');
    const taskText = text;
    const div = createTaskText(taskText);

    const btn = createTaskButton();

    task.classList.add('todo-item');
    task.appendChild(div);
    task.appendChild(btn);
    return task;

}

function renderTasks(todos) {
    todos.forEach(todo => {
        todoList.appendChild(createTaskElement(todo.text));
    });
}

function removeTasks() {
    todoList.innerHTML = '';
}

function addNewTaskHandler() {
    const newTodoText = todoInput.value;

    const currentTodos = getTaskFromLS();


    if(newTodoText !== '') {
        const newTodos = [...currentTodos, new Task(newTodoText)];       
        saveTaskToLS(newTodos);
        removeTasks();
        renderTasks(newTodos);
    } else {
        todoInput.style.border = '2px solid #E9573F';
        return;
    }
    

   todoInput.value = '';
   
}
function deleteTask(e) {
    const clickedBtn = e.target;
    const parentClikedBtn = clickedBtn.parentNode;
    parentClikedBtn.remove();
    
    const tasks = document.querySelectorAll('.todo-text');
    const arr = [];
    tasks.forEach(element => {
        const cos = element.textContent;
        arr.push(new Task(cos));
       
    });
    saveTaskToLS(arr);

    
}

///////////////

addTaskBtn.addEventListener('click', addNewTaskHandler);
renderTasks(getTaskFromLS());


