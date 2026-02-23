const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDos = document.querySelector(".toDos");


const TODOLIST = "toDoList";
let toDoList = [];

function loadToDoList() {
    const loadedTodoList = localStorage.getItem(TODOLIST);
    if (loadedTodoList !== null) {
        const parsedToDoList = JSON.parse(loadedTodoList);
        for (let toDo of parsedToDoList) {
            const { text } = toDo;
            paintToDo(text);
            saveToDo(text);
        }
    }
}

function paintToDo(toDo) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delButton = document.createElement("button");
    delButton.innerText = "Del";
    delButton.addEventListener("click", delToDo);
    span.innerHTML = toDo;
    li.appendChild(span);
    li.appendChild(delButton);
    li.id = toDoList.length + 1;
    toDos.appendChild(li);
}

function delToDo(event) {
    const { target : button } = event;
    const li = button.parentNode;
    toDos.removeChild(li);
    toDoList = toDoList.filter((todo) => todo.id !== Number(li.id));
    localStorage.setItem(TODOLIST, JSON.stringify(toDoList));
}

function saveToDo(toDo) {
    const toDoObj = {
        text: toDo,
        id: toDoList.length + 1
    };
    toDoList.push(toDoObj);
    localStorage.setItem(TODOLIST, JSON.stringify(toDoList));
}

function creatToDo(event) {
    event.preventDefault();
    const toDo = toDoInput.value;
    paintToDo(toDo);
    saveToDo(toDo);
    toDoInput.value = "";
}

function init() {
    toDoForm.addEventListener("submit", creatToDo);
    loadToDoList();
}
init();