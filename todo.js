//selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
// const todosCount = document.querySelector(".todosCount");


//eventlisteners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
// todosCount.addEventListener('click', countTodos);

//funtions

var count = 0;
var addBtn = document.getElementById("addBtn");
var todosCount = document.getElementById("countOfTodos");

addBtn.onclick = function () {
    count++;
    todosCount.innerHTML = count;
}
    

function addTodo(event) {
    //prevent form from submitting and refreshing the page
    event.preventDefault();
    //create the singel todo div - that appears after click
    //check if input is empty
    if (todoInput.value.length === 0){
        count -= 1; 
        return alert("You need to enter a Todo task!"); 
    }	
    saveLocalTodos(todoInput.value);

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create LI list
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
   
    //check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // add/append to the list 
    todoList.appendChild(todoDiv);
    
    //clear todo input value
    todoInput.value = '';
}

function deleteCheck(e) {
    const item = e.target;
    //delete the todo
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        removeLocalTodos(todo);
        todo.remove();
        count--;
        todosCount.innerHTML = count;
    }
    // check mark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
    
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        // if no create one
        todos = [];
    } else {
    //if yes get all the data
    todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        // if no create one
        todos = [];
    } else {
    //if yes get all the data
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create LI list
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
   
    //check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // add/append to the list 
    todoList.appendChild(todoDiv);
        })
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        // if no create one
        todos = [];
    } else {
    //if yes get all the data
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoElement = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoElement), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}


