const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input")
const todoList = document.getElementById("todo-list");
const todoTemplate = document.getElementById("todo-template");

const TODOLIST = "todo-list";
let todoListData = [];
let editingId = null;

const handleFormSubmit = (event) => {
    event.preventDefault();
    const inputValue = todoInput.value.trim();
    if (inputValue === "") return;
    if (editingId !== null) {
        const todoupdate = {
            text: inputValue,
            id: editingId
        };
        todoListData = todoListData.map((todo) => todo.id === todoupdate.id ? todoupdate : todo);
        localStorage.setItem(TODOLIST, JSON.stringify(todoListData));
        const editTodoItem = todoList.querySelector(`.todo-item[id="${editingId}"]`);
        editTodoItem.querySelector('.item-title').textContent = inputValue;
    } else {
        const id = saveTodo(inputValue);
        paintTodo(inputValue, id);
    }
    todoInput.value = "";
    editingId = null;
};

todoForm.addEventListener("submit", handleFormSubmit);
loadTodoList();

function saveTodo(text) {
    const todoObj = {
        text: text,
        id: todoListData.length + 1
    };
    todoListData.push(todoObj);
    localStorage.setItem(TODOLIST, JSON.stringify(todoListData));
    return todoObj.id;
}

function paintTodo(text, id) {
    const todoItem = todoTemplate.content.cloneNode(true).querySelector(".todo-item");
    const delButton = todoItem.querySelector(".delete-btn");
    const editButton = todoItem.querySelector(".edit-btn");
    todoItem.querySelector('.item-title').textContent = text;
    delButton.addEventListener("click", delTodo);
    editButton.addEventListener("click", editTodo);
    todoItem.id = id;
    todoList.appendChild(todoItem);
}

function loadTodoList() {
    const loadedTodoList = localStorage.getItem(TODOLIST);
    if (loadedTodoList !== null) {
        const parsedTodoList = JSON.parse(loadedTodoList);
        todoListData = parsedTodoList;
        for (let todo of parsedTodoList) {
            paintTodo(todo.text, todo.id);
        }
    }
}

function delTodo(event) {
    const { target : button } = event;
    const li = button.parentNode;
    todoList.removeChild(li);
    todoListData = todoListData.filter((todo) => todo.id !== Number(li.id));
    todoListData.forEach((todo, index)=>{
        todo.id = index + 1;
    })
    const todoItems = todoList.querySelectorAll('.todo-item');
    todoItems.forEach((item, index) => {
        item.id = index + 1;
    })
    localStorage.setItem(TODOLIST, JSON.stringify(todoListData));
}

function editTodo(event) {
    const { target : button } = event;
    const editTodoItem = button.parentNode;
    editingId = Number(editTodoItem.id);
    const text = editTodoItem.querySelector('.item-title').textContent;
    todoInput.value = text;
}

